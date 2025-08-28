import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory store for rate limiting (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  MAX_REQUESTS: 3, // Maximum requests per window
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  BLOCK_DURATION: 60 * 60 * 1000, // 1 hour block for violations
};

// Email configuration with support for multiple services
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;
  const emailSecure = process.env.EMAIL_SECURE === 'true';

  if (!emailUser || !emailPass) {
    throw new Error('Email credentials not configured');
  }

  // If custom SMTP is configured, use it
  if (emailHost) {
    return nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPort || '587'),
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
  }

  // Default to Gmail
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
};

// Slack webhook configuration
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// Rate limiting function
const checkRateLimit = (identifier: string): { allowed: boolean; remaining: number; resetTime: number } => {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT.WINDOW_MS
    });
    return { allowed: true, remaining: RATE_LIMIT.MAX_REQUESTS - 1, resetTime: now + RATE_LIMIT.WINDOW_MS };
  }
  
  if (record.count >= RATE_LIMIT.MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }
  
  // Increment count
  record.count++;
  rateLimitStore.set(identifier, record);
  
  return { allowed: true, remaining: RATE_LIMIT.MAX_REQUESTS - record.count, resetTime: record.resetTime };
};

// Spam detection function
const detectSpam = (data: any, userAgent: string, ip: string): { isSpam: boolean; reason?: string } => {
  // Check for honeypot field - only consider it spam if it has actual content
  // Allow empty string, undefined, or null values
  if (data.website && typeof data.website === 'string' && data.website.trim() !== '') {
    console.log('Honeypot field contains:', JSON.stringify(data.website));
    return { isSpam: true, reason: 'Honeypot field filled' };
  }
  
  // Check for suspicious patterns in message
  const suspiciousPatterns = [
    /\b(viagra|casino|loan|debt|credit|money|free|winner|lottery)\b/i,
    /\b(click here|buy now|limited time|act now|urgent)\b/i,
    /https?:\/\/[^\s]+/g, // Multiple URLs
    /\b[A-Z]{10,}\b/, // ALL CAPS words
    /\b\w{50,}\b/, // Very long words
  ];
  
  const message = data.message || '';
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(message)) {
      return { isSpam: true, reason: 'Suspicious content detected' };
    }
  }
  
  // Check for repeated characters
  if (/(.)\1{5,}/.test(message)) {
    return { isSpam: true, reason: 'Repeated characters detected' };
  }
  
  // Check for very short messages (likely spam)
  if (message.length < 10) {
    return { isSpam: true, reason: 'Message too short' };
  }
  
  // Check for suspicious user agents
  const suspiciousUserAgents = [
    /bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i
  ];
  
  for (const pattern of suspiciousUserAgents) {
    if (pattern.test(userAgent)) {
      return { isSpam: true, reason: 'Suspicious user agent' };
    }
  }
  
  return { isSpam: false };
};

// Auto-reply email template
const createAutoReplyTemplate = (data: any) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
      <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0; font-size: 28px;">Thank You for Contacting BytesFlux!</h1>
        </div>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #2563eb;">
          <p style="margin: 0; color: #1e40af; font-size: 16px;">
            Hi ${data.firstName},<br><br>
            We've received your inquiry about <strong>${data.service}</strong> and we're excited to help bring your vision to life!
          </p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: #1e40af; margin-top: 0;">What Happens Next?</h3>
          <ol style="color: #374151; line-height: 1.6;">
            <li><strong>Within 2 hours:</strong> Our team will review your requirements</li>
            <li><strong>Within 24 hours:</strong> You'll receive a detailed project proposal</li>
            <li><strong>Within 48 hours:</strong> We'll schedule a free consultation call</li>
          </ol>
        </div>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #16a34a;">
          <h3 style="color: #166534; margin-top: 0;">Your Project Details</h3>
          <p style="margin: 0; color: #166534;">
            <strong>Service:</strong> ${data.service}<br>
            <strong>Budget Range:</strong> ${data.budget || 'To be discussed'}<br>
            <strong>Message:</strong> ${data.message.substring(0, 100)}${data.message.length > 100 ? '...' : ''}
          </p>
        </div>
        
        <div style="text-align: center; margin-bottom: 25px;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Need immediate assistance? Call us at <strong>+92 3275734699</strong>
          </p>
        </div>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin-top: 0;">Why Choose BytesFlux?</h3>
          <ul style="color: #92400e; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>✅ 100% Satisfaction Guarantee</li>
            <li>✅ Competitive Pakistan Market Pricing</li>
            <li>✅ Fast Delivery Without Compromising Quality</li>
            <li>✅ Ongoing Support & Maintenance</li>
            <li>✅ SEO-Friendly Development Practices</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            This is an automated response. Please do not reply to this email.<br>
            For questions, contact us at <a href="mailto:hello@bytesflux.com" style="color: #2563eb;">hello@bytesflux.com</a>
          </p>
        </div>
      </div>
    </div>
  `;
};

// Email template for contact form (admin notification)
const createEmailTemplate = (data: any) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Contact Form Submission</h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e40af; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      </div>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e40af; margin-top: 0;">Project Details</h3>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Budget Range:</strong> ${data.budget || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; color: #166534;">
          <strong>Submitted at:</strong> ${new Date().toLocaleString('en-US', { 
            timeZone: 'Asia/Karachi',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #6b7280; font-size: 14px;">
          This email was sent from the BytesFlux contact form.
        </p>
      </div>
    </div>
  `;
};

// Slack notification template
const createSlackMessage = (data: any) => {
  return {
    text: "🎯 New Contact Form Submission - BytesFlux",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🎯 New Contact Form Submission",
          emoji: true
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Name:*\n${data.firstName} ${data.lastName}`
          },
          {
            type: "mrkdwn",
            text: `*Email:*\n${data.email}`
          },
          {
            type: "mrkdwn",
            text: `*Phone:*\n${data.phone || 'Not provided'}`
          },
          {
            type: "mrkdwn",
            text: `*Service:*\n${data.service}`
          }
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Budget Range:*\n${data.budget || 'Not specified'}`
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Message:*\n${data.message}`
        }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `📅 Submitted at ${new Date().toLocaleString('en-US', { 
              timeZone: 'Asia/Karachi',
              year: 'numeric', 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}`
          }
        ]
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Reply to Email",
              emoji: true
            },
            style: "primary",
            url: `mailto:${data.email}?subject=Re: Your BytesFlux Inquiry`
          }
        ]
      }
    ]
  };
};

// Send Slack notification
const sendSlackNotification = async (data: any) => {
  if (!SLACK_WEBHOOK_URL) {
    console.log('Slack webhook URL not configured, skipping notification');
    return;
  }

  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createSlackMessage(data)),
    });

    if (!response.ok) {
      throw new Error(`Slack notification failed: ${response.statusText}`);
    }

    console.log('Slack notification sent successfully');
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
};

// Send auto-reply email to user
const sendAutoReply = async (data: any) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'hello@bytesflux.com',
      to: data.email,
      subject: `Thank you for contacting BytesFlux - We'll get back to you soon!`,
      html: createAutoReplyTemplate(data),
      replyTo: process.env.CONTACT_EMAIL || 'hello@bytesflux.com'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    throw error;
  }
};

// Send email to admin
const sendEmail = async (data: any) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.CONTACT_EMAIL || 'hello@bytesflux.com',
      subject: `New Contact Form Submission - ${data.firstName} ${data.lastName}`,
      html: createEmailTemplate(data),
      replyTo: data.email
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending admin email:', error);
    throw error;
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, service, budget, message, website = '' } = body;

    // Get client IP and user agent for spam detection
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Debug logging
    console.log('Contact form submission from IP:', ip);
    console.log('User Agent:', userAgent);
    console.log('Form data received:', JSON.stringify(body, null, 2));
    console.log('Website field details:', {
      value: body.website,
      type: typeof body.website,
      length: body.website ? body.website.length : 'N/A',
      trimmed: body.website ? body.website.trim() : 'N/A'
    });

    // Rate limiting check
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': RATE_LIMIT.MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetTime.toString()
          }
        }
      );
    }

    // Spam detection (temporarily disabled for debugging)
    const spamCheck = detectSpam(body, userAgent, ip);
    if (spamCheck.isSpam) {
      console.log(`⚠️ Spam detected from ${ip}: ${spamCheck.reason}`);
      console.log('Request body:', JSON.stringify(body, null, 2));
      console.log('Website field value:', body.website, 'Type:', typeof body.website);
      
      // Temporarily allow submissions for debugging
      console.log('⚠️ Temporarily allowing submission for debugging purposes');
      // return NextResponse.json(
      //   { error: 'Your message could not be sent. Please try again later.' },
      //   { status: 400 }
      // );
    }
    
    // Log successful spam check
    console.log('✅ Spam check passed for IP:', ip);

    // Validation
    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phone validation (if provided)
    if (phone && !/^[\+]?[0-9\s\-\(\)]{7,}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 2000 characters' },
        { status: 400 }
      );
    }

    // Prepare data
    const formData = {
      firstName,
      lastName,
      email,
      phone: phone || '',
      service,
      budget: budget || '',
      message
    };

    // Send emails concurrently (auto-reply to user and notification to admin)
    const [autoReplyResult, adminEmailResult] = await Promise.allSettled([
      sendAutoReply(formData),
      sendEmail(formData)
    ]);

    // Send Slack notification
    sendSlackNotification(formData);

    // Check if emails were sent successfully
    if (autoReplyResult.status === 'rejected') {
      console.error('Auto-reply failed:', autoReplyResult.reason);
    }

    if (adminEmailResult.status === 'rejected') {
      throw new Error('Failed to send admin notification');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours. Please check your email for a confirmation.',
        rateLimit: {
          remaining: rateLimit.remaining,
          resetTime: rateLimit.resetTime
        }
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT.MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString()
        }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        error: 'Sorry, there was an error sending your message. Please try again or contact us directly.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint is working' },
    { status: 200 }
  );
} 