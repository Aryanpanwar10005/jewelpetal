export function shopifyImage(url: string, size: 'small' | 'medium' | 'large' | 'hero' | string, quality?: number): string {
  if (!url) return '';
  // Only modify URLs hosted on Shopify's CDN
  if (!url.startsWith('http') || !url.includes('shopify.com')) {
    return url;
  }
  
  const match = url.match(/\.(jpg|jpeg|gif|png|webp|avif)($|\?)/i);
  if (!match) return url;
  
  const widthMatches: Record<string, string> = {
    small: '_400x',
    medium: '_800x',
    large: '_1200x',
    hero: '_1600x'
  };

  const suffix = widthMatches[size] || `_${size}x`;
  return url.replace(match[0], `${suffix}${match[0]}`);
}

export function shopifyImageSrcSet(url: string, sizes: string[]): string | undefined {
  if (!url) return undefined;
  if (!url.startsWith('http') || !url.includes('shopify.com')) {
    return undefined;
  }
  return sizes.map(size => {
    const width = size === 'small' ? '400w' : size === 'medium' ? '800w' : size === 'large' ? '1200w' : size === 'hero' ? '1600w' : `${size}w`;
    return `${shopifyImage(url, size)} ${width}`;
  }).join(', ');
}
