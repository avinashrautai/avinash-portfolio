export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string;
  status: string;
  year: string;
  direction?: string;
  image_url?: string | null;
  published: boolean;
  sort_order: number;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  body: string;
  category: string;
  published_at: string;
  published: boolean;
};

export type SiteSettings = {
  contact_email: string;
  location: string;
  availability: string;
  about_intro: string;
};
