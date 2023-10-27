export type Banner = {
  id: string;
  name: string;
  description: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string | null;
};
