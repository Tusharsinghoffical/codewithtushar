import { PROJECTS, SERVICES } from '../constants';
import { BLOG_POSTS } from '../pages/Blog';

export interface SearchItem {
  id: string;
  type: 'project' | 'service' | 'blog';
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
  link: `/projects`,
  image: project.imageUrl,
  tags: project.tags
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
  ...projectItems,
  ...serviceItems,
  ...blogItems
];

export default searchData;
