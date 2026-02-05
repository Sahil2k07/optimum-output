import { prisma } from "../config/prisma.js";

const guestUser = {
  id: 1,
  email: "guest.user@gmail.com",
  name: "Guest User",
};

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    description:
      "High-quality over-ear wireless headphones with noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&h=300&fit=crop",
    quantity: 10,
    price: 199.99,
  },
  {
    id: 2,
    title: "Smart Watch",
    description: "Stylish smartwatch with heart rate monitoring and GPS.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&h=300&fit=crop",
    quantity: 15,
    price: 149.5,
  },
  {
    id: 3,
    title: "Gaming Mouse",
    description: "Ergonomic RGB gaming mouse with adjustable DPI.",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&h=300&fit=crop",
    quantity: 25,
    price: 49.99,
  },
  {
    id: 4,
    title: "Mechanical Keyboard",
    description:
      "Compact mechanical keyboard with tactile switches and RGB lighting.",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400&h=300&fit=crop",
    quantity: 20,
    price: 89.99,
  },
  {
    id: 5,
    title: "4K Monitor",
    description: "Ultra HD 27-inch monitor with HDR support and slim bezels.",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&h=300&fit=crop",
    quantity: 8,
    price: 399.99,
  },
  {
    id: 6,
    title: "Bluetooth Speaker",
    description:
      "Portable waterproof Bluetooth speaker with 12-hour battery life.",
    image:
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=400&h=300&fit=crop",
    quantity: 30,
    price: 59.99,
  },
  {
    id: 7,
    title: "External SSD 1TB",
    description: "Fast portable SSD with USB-C support and compact design.",
    image:
      "https://imgs.search.brave.com/0VSYQP0mjIYI09hgcXkRrfHNhe9jmTB6_V8yJ5Cieto/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly94Lmlt/YXN0dWRlbnQuY29t/L2NvbnRlbnQvMDA2/MjQ1M19jcnVjaWFs/LXgxMC1wcm8tMXRi/LXBvcnRhYmxlLWV4/dGVybmFsLXNzZF8z/NjAucG5n",
    quantity: 12,
    price: 129.99,
  },
  {
    id: 8,
    title: "Action Camera",
    description: "Waterproof 4K action camera with wide-angle lens.",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=400&h=300&fit=crop",
    quantity: 6,
    price: 249.99,
  },
  {
    id: 9,
    title: "Drone with Camera",
    description: "Compact drone with 1080p camera and easy controls.",
    image:
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=400&h=300&fit=crop",
    quantity: 4,
    price: 349.99,
  },
  {
    id: 10,
    title: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for ergonomic setup.",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400&h=300&fit=crop",
    quantity: 18,
    price: 29.99,
  },
  {
    id: 11,
    title: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card slots.",
    image:
      "https://imgs.search.brave.com/lOKmgejK-K98Fd_PT63VaD1fh2GGOykeAHmORb44xtw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ltYWdl/LzYxMi82MTIva2h0/Z2hvdzAtMC91c2It/Z2FkZ2V0L2UvbC90/L3plYi10YTUwMHUt/NC1pbi0xLXplYnJv/bmljcy1vcmlnaW5h/bC1pbWFmeHF5Z2Z6/M2dqZnVmLmpwZWc_/cT03MA",
    quantity: 22,
    price: 49.99,
  },
  {
    id: 12,
    title: "Wireless Charger",
    description: "Fast wireless charging pad compatible with all Qi devices.",
    image:
      "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=400&h=300&fit=crop",
    quantity: 40,
    price: 39.99,
  },
  {
    id: 13,
    title: "Smart Home Camera",
    description: "Indoor security camera with night vision and motion alerts.",
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=400&h=300&fit=crop",
    quantity: 14,
    price: 99.99,
  },
  {
    id: 14,
    title: "Noise Cancelling Earbuds",
    description:
      "Compact earbuds with active noise cancellation and long battery life.",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&h=300&fit=crop",
    quantity: 28,
    price: 79.99,
  },
  {
    id: 15,
    title: "Smart Light Bulb",
    description: "WiFi-enabled LED smart bulb with color-changing options.",
    image:
      "https://imgs.search.brave.com/-1ZqN5pKWBnf-AP9Ke1hoMlu1hV-Y0RXZ8FTBDT0KTg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudHAtbGluay5j/b20vdXBsb2FkL2lt/YWdlLWxpbmUvVGFw/b19MNTEwRV9FVV8z/LjBfT3ZlcnZpZXdf/MDJfbm9ybWFsXzIw/MjQxMTAxMDYxMjI1/dy5qcGc",
    quantity: 50,
    price: 24.99,
  },
];

async function initData() {
  await prisma.user.upsert({
    where: { id: guestUser.id },
    update: {},
    create: {
      email: guestUser.email,
      name: guestUser.name,
    },
  });

  console.log("Guest user added");

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        stock: {
          update: {
            quantity: p.quantity,
          },
        },
        image: p.image,
        title: p.title,
        description: p.description,
      },
      create: {
        title: p.title,
        description: p.description,
        image: p.image,
        price: p.price,
        stock: {
          create: {
            quantity: p.quantity,
          },
        },
      },
    });

    console.log(`Product with id ${p.id} added`);
  }
}

initData()
  .catch((e) => {
    console.log("Someting went wrong");

    console.error(e);
  })
  .then(() => console.log("Data seeded successfully"));
