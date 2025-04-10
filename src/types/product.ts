export type Product = {
  id: string;
  title: string;
  price: number;
};

export type CartProduct = Product & { qty: number };
