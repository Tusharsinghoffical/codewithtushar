import { PROJECTS, SERVICES, SAAS_PRODUCTS } from '../constants';
import { BLOG_POSTS } from '../pages/Blog';

export interface SearchItem {
  id: string;
  type: 'project' | 'service' | 'blog' | 'saas';
  title: string;
  description: string;
  link: string;
  image?: string;
  tags?: string[];
}

// Normalize projects
const projectItems: SearchItem[] = PROJECTS.map(project => ({
  id: `project-${project.id}`,
  type: 'project',
  title: project.title,
  description: project.description,
  link: `/projects?project=${project.id}`,
  image: project.imageUrl,
  tags: project.tags
}));

// Normalize SaaS products
const saasItems: SearchItem[] = (SAAS_PRODUCTS || []).map(product => ({
  id: `saas-${product.id}`,
  type: 'saas',
  title: `${product.title} — ${product.tagline}`,
  description: product.description,
  link: product.pageUrl,
  image: product.bannerImage,
  tags: [...product.tags, ...product.techStack]
}));

// Normalize services
const serviceItems: SearchItem[] = SERVICES.map(service => ({
  id: `service-${service.id}`,
  type: 'service',
  title: service.title.split('|')[0].trim(),
  description: service.description,
  link: `/services`,
  tags: service.techStack
}));

// Normalize blogs
const blogItems: SearchItem[] = BLOG_POSTS.map(blog => ({
  id: `blog-${blog.id}`,
  type: 'blog',
  title: blog.title,
  description: blog.excerpt,
  link: `/blog/${blog.id}`,
  tags: blog.tags
}));

// Unified search data
export const searchData: SearchItem[] = [
  ...saasItems,
  ...projectItems,
  ...serviceItems,
  ...blogItems
];

export default searchData;
