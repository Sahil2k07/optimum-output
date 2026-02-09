export type ListProductRequest = {
  skip: number;
  take: number;
  filter?: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
};

export type ListProductResponse = {
  total: number;
  products: Product[];
};

export type ManageProductRequest = {
  id?: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
};
