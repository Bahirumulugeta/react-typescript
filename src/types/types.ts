// Types for blog creation
type BlogCreation = {
  title: string;
  content: string;
  imageUrl: string;
};
// Types for blog update
type BlogUpdate = {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
};

// Blog type intersection of both
type Blog = {
  id:number;
  title:string;
  content:string;
  imageUrl:string;
  createdAt:Date;
};

export type { Blog, BlogCreation, BlogUpdate };
