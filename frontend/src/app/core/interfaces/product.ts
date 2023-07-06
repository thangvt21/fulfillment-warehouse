export interface Product {
  id: number;
  name: string;
  code: string;
  weightUnit: string;
  weight: number | null;
  Lenght: number | null;
  Width: number | null;
  Height: number | null;
  price: number | null;
  description: string;
  imgUrl: string;
}
