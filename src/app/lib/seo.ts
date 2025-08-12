// SEO and Schema Markup Generator
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogType: string;
  ogImage?: string;
  twitterCard: string;
  schemaMarkup: any;
}

export interface BlogPostSEO {
  title: string;
  description: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  image?: string;
  category: string;
  tags: string[];
  slug: string;
  views: number;
  rating: number;
  totalRatings: number;
}

// Generate schema markup for blog posts
export const generateBlogPostSchema = (post: BlogPostSEO): any => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image ? post.image : undefined,
    "author": {
      "@type": "Person",
      "name": post.author,
      "identifier": post.authorId
    },
    "publisher": {
      "@type": "Organization",
      "name": "BytesFlux",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bytesflux.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bytesflux.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(' ').length,
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ReadAction",
        "userInteractionCount": post.views
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ReviewAction",
        "userInteractionCount": post.totalRatings
      }
    ]
  };

  // Add rating if available
  if (post.rating > 0) {
    (schema as any).aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": post.rating,
      "reviewCount": post.totalRatings,
    };
  }

  return schema;
};

// Generate schema markup for blog listing page
export const generateBlogListSchema = (): any => {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "BytesFlux Blog",
    "description": "Insights, tutorials, and industry trends from our team of experts in software development, design, and digital marketing.",
    "url": "https://bytesflux.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "BytesFlux",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bytesflux.com/logo.png"
      }
    }
  };
};

// Generate schema markup for organization
export const generateOrganizationSchema = (): any => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BytesFlux",
    "description": "Professional web development, mobile apps, and digital solutions company",
    "url": "https://bytesflux.com",
    "logo": "https://bytesflux.com/logo.png",
    "sameAs": [
      "https://twitter.com/bytesflux",
      "https://linkedin.com/company/bytesflux",
      "https://facebook.com/bytesflux"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "email": "info@bytesflux.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressLocality": "San Francisco",
      "addressRegion": "CA"
    }
  };
};

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>): any => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// Generate FAQ schema
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>): any => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate local business schema
export const generateLocalBusinessSchema = (): any => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BytesFlux",
    "description": "Professional web development and digital solutions company",
    "url": "https://bytesflux.com",
    "telephone": "+1-555-0123",
    "email": "info@bytesflux.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 37.7749,
        "longitude": -122.4194
      },
      "geoRadius": "50000"
    }
  };
}; 