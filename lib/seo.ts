/**
 * SEO Helper Utility
 * Provides functions to dynamically update and manage SEO meta tags and structured data
 */

interface StructuredDataOptions {
  type: 'Person' | 'Organization' | 'WebSite' | 'WebPage' | 'Article' | 'Product' | 'Service' | 'BreadcrumbList' | 'LocalBusiness' | 'ProfessionalService';
  data: any;
}

/**
 * Add or update structured data (JSON-LD) in the document head
 */
export const addStructuredData = ({ type, data }: StructuredDataOptions): void => {
  const scriptId = `structured-data-${type.toLowerCase()}`;
  let scriptElement: HTMLElement | null = document.getElementById(scriptId);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'application/ld+json');
    scriptElement.id = scriptId;
    document.head.appendChild(scriptElement);
  }

  scriptElement.textContent = JSON.stringify(structuredData);
};

/**
 * Remove structured data from the document head
 */
export const removeStructuredData = (type: string): void => {
  const scriptId = `structured-data-${type.toLowerCase()}`;
  const scriptElement = document.getElementById(scriptId);
  if (scriptElement) {
    scriptElement.remove();
  }
};

/**
 * Update multiple meta tags at once
 */
export const updateMetaTags = (tags: Record<string, string>): void => {
  Object.entries(tags).forEach(([name, content]) => {
    let element: HTMLMetaElement | null;
    
    // Check for property-based meta tags (Open Graph)
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      element = document.querySelector(`meta[property="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta') as HTMLMetaElement;
        element.setAttribute('property', name);
        document.head.appendChild(element);
      }
    } else {
      element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta') as HTMLMetaElement;
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
    }
    
    element.setAttribute('content', content);
  });
};

import { SITE_URL, SITE_NAME, getActiveDomain } from '../constants';

/**
 * Generate canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
  return `${getActiveDomain()}${path}`;
};

/**
 * Preload critical resources for better performance
 */
export const preloadResource = (url: string, asType?: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.crossOrigin = 'anonymous';
  
  if (asType) {
    link.setAttribute('as', asType);
  }
  
  document.head.appendChild(link);
};

/**
 * Add DNS prefetch for external domains
 */
export const addDnsPrefetch = (domain: string): void => {
  const existingLink = document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`);
  if (!existingLink) {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  }
};

/**
 * Comprehensive SEO setup for a page
 */
export const setupPageSEO = (options: {
  title: string;
  description: string;
  keywords: string;
  path: string;
  imageUrl?: string;
  type?: 'website' | 'article' | 'profile';
}): void => {
  const { title, description, keywords, path, imageUrl = `${SITE_URL}/tushar-singh-optimized.jpg`, type = 'website' } = options;
  const canonicalUrl = getCanonicalUrl(path);
  const brandTitle = SITE_NAME;

  // Update basic meta tags
  updateMetaTags({
    'description': description,
    'keywords': keywords,
    'title': title,
    'og:title': `${title} | ${brandTitle}`,
    'og:description': description,
    'og:url': canonicalUrl,
    'og:type': type,
    'og:image': imageUrl,
    'twitter:title': `${title} | ${brandTitle}`,
    'twitter:description': description,
    'twitter:image': imageUrl,
    'twitter:card': 'summary_large_image'
  });

  // Update document title
  document.title = `${title} | ${brandTitle}`;

  // Update canonical link
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonicalUrl);
  }

  // Add WebSite structured data
  addStructuredData({
    type: 'WebSite',
    data: {
      name: SITE_NAME,
      alternateName: [SITE_NAME, 'codewithtushar.me', 'www.codewithtushar.me'],
      url: SITE_URL,
      sameAs: ['https://www.codewithtushar.me'],
      description: description,
      publisher: {
        '@type': 'Person',
        name: 'Tushar Singh'
      }
    }
  });

  // Add BreadcrumbList structured data
  addStructuredData({
    type: 'BreadcrumbList',
    data: {
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${getActiveDomain()}/`
        },
        ...(path !== '/' ? [{
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: canonicalUrl
        }] : [])
      ]
    }
  });
};

/**
 * Track page view for analytics (optional integration)
 */
export const trackPageView = (path: string, title: string): void => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_title: title,
      page_location: window.location.href,
      page_path: path
    });
  }
};

export default {
  addStructuredData,
  removeStructuredData,
  updateMetaTags,
  getCanonicalUrl,
  preloadResource,
  addDnsPrefetch,
  setupPageSEO,
  trackPageView
};
