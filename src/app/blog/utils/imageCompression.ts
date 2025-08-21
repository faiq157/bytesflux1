// Image compression and resizing utility for Supabase uploads

interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  maxFileSize?: number; // in bytes
}

interface CompressedImage {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  width: number;
  height: number;
}

export class ImageCompressor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  /**
   * Compress and resize an image file
   */
  async compressImage(
    file: File,
    options: CompressionOptions = {}
  ): Promise<CompressedImage> {
    const {
      maxWidth = 1200,
      maxHeight = 1200,
      quality = 0.8,
      format = 'jpeg',
      maxFileSize = 2 * 1024 * 1024 // 2MB default
    } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        
        // Calculate new dimensions while maintaining aspect ratio
        const { width, height } = this.calculateDimensions(
          img.width,
          img.height,
          maxWidth,
          maxHeight
        );

        // Set canvas dimensions
        this.canvas.width = width;
        this.canvas.height = height;

        // Clear canvas and draw resized image
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob with specified quality and format
        this.canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            // Create new file with compressed data
            const compressedFile = new File([blob], file.name, {
              type: `image/${format}`,
              lastModified: Date.now(),
            });

            const originalSize = file.size;
            const compressedSize = compressedFile.size;
            const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

            // If still too large, compress further
            if (compressedSize > maxFileSize && quality > 0.3) {
              this.compressImage(compressedFile, {
                ...options,
                quality: quality * 0.8,
              }).then(resolve).catch(reject);
            } else {
              resolve({
                file: compressedFile,
                originalSize,
                compressedSize,
                compressionRatio,
                width,
                height,
              });
            }
          },
          `image/${format}`,
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  }

  /**
   * Calculate new dimensions while maintaining aspect ratio
   */
  private calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    let { width, height } = { width: originalWidth, height: originalHeight };

    // Calculate scaling factor
    const scaleX = maxWidth / width;
    const scaleY = maxHeight / height;
    const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down

    if (scale < 1) {
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    return { width, height };
  }

  /**
   * Get file size in human readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Validate file type
   */
  static isValidImageType(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    return validTypes.includes(file.type);
  }

  /**
   * Get optimal compression settings based on file size
   */
  static getOptimalSettings(fileSize: number): CompressionOptions {
    if (fileSize > 5 * 1024 * 1024) { // > 5MB
      return {
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.6,
        format: 'jpeg',
        maxFileSize: 1 * 1024 * 1024 // 1MB target
      };
    } else if (fileSize > 2 * 1024 * 1024) { // > 2MB
      return {
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.7,
        format: 'jpeg',
        maxFileSize: 1.5 * 1024 * 1024 // 1.5MB target
      };
    } else {
      return {
        maxWidth: 1200,
        maxHeight: 1200,
        quality: 0.8,
        format: 'jpeg',
        maxFileSize: 2 * 1024 * 1024 // 2MB target
      };
    }
  }
}

/**
 * Compress image with progress callback
 */
export async function compressImageWithProgress(
  file: File,
  onProgress?: (progress: number) => void,
  options?: CompressionOptions
): Promise<CompressedImage> {
  const compressor = new ImageCompressor();
  
  if (onProgress) {
    onProgress(10); // Starting compression
  }

  try {
    const result = await compressor.compressImage(file, options);
    
    if (onProgress) {
      onProgress(100); // Compression complete
    }

    return result;
  } catch (error) {
    if (onProgress) {
      onProgress(0); // Error occurred
    }
    throw error;
  }
}

/**
 * Batch compress multiple images
 */
export async function compressImages(
  files: File[],
  options?: CompressionOptions
): Promise<CompressedImage[]> {
  const compressor = new ImageCompressor();
  const results: CompressedImage[] = [];

  for (const file of files) {
    try {
      const result = await compressor.compressImage(file, options);
      results.push(result);
    } catch (error) {
      console.error(`Failed to compress ${file.name}:`, error);
      // Return original file if compression fails
      results.push({
        file,
        originalSize: file.size,
        compressedSize: file.size,
        compressionRatio: 0,
        width: 0,
        height: 0,
      });
    }
  }

  return results;
}

export default ImageCompressor; 