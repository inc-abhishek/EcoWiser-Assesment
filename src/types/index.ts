export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  userId: string;
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  brandId: string;
  userId: string;
  createdAt: number;
}