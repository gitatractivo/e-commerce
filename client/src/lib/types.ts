export type Banner = {
  id: string;
  name: string;
  description: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string | undefined;
};

export type Category =   {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  products: number
};

export type Product =  {
    category: {
        name: string;
        id: string;
    };
    images: {
        url: string;
    }[];
} & {
    id: string;
    categoryId: string;
    name: string;
    price: number;
    isFeatured: boolean;
    isArchived: boolean;
    sizeId: string;
    colorId: string;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
}

export type Size = {
  id: string;
  name: string;
  value: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};
export type Color= {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
};
