import { type GetProductView } from "../../views/product";

const demoList = [
  {
    id: 1,
    title: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with adjustable DPI and long battery life.",
    image: "https://via.placeholder.com/300x200?text=Wireless+Mouse",
    price: 999,
    stock: 25,
  },
  {
    id: 2,
    title: "Mechanical Keyboard",
    description:
      "RGB mechanical keyboard with blue switches and aluminum body.",
    image: "https://via.placeholder.com/300x200?text=Mechanical+Keyboard",
    price: 3499,
    stock: 12,
  },
  {
    id: 3,
    title: "USB-C Hub",
    description:
      "6-in-1 USB-C hub with HDMI, USB 3.0, and power delivery support.",
    image: "https://via.placeholder.com/300x200?text=USB-C+Hub",
    price: 1899,
    stock: 40,
  },
  {
    id: 4,
    title: "Noise Cancelling Headphones",
    description:
      "Over-ear headphones with active noise cancellation and deep bass.",
    image: "https://via.placeholder.com/300x200?text=Headphones",
    price: 6999,
    stock: 8,
  },
  {
    id: 5,
    title: "Laptop Stand",
    description:
      "Adjustable aluminum laptop stand for better ergonomics and cooling.",
    image: "https://via.placeholder.com/300x200?text=Laptop+Stand",
    price: 1499,
    stock: 30,
  },
];

export class ProductService {
  getProducts = async ({ skip, take }: GetProductView) => {
    return { total: demoList.length, products: demoList };
  };
}

export default new ProductService();
