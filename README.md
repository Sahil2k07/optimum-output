# Optimum Output – Full-Stack Developer Assignment

A small full-stack application built as part of the Optimum Output
Junior Full-Stack Developer assignment. The application allows
managing products, tracking stock, and creating customer orders.

---

## Tech Stack

### Backend

- TypeScript
- Node.js
- Express
- SQLite
- Prisma ORM
- Zod (validation)
- CORS

### Frontend

- TypeScript
- React
- TanStack React Query
- shadcn/ui
- Axios

---

## Features & Implementation Details

### Frontend

- All API calls are handled using **TanStack React Query**, including queries and mutations.
- The **Home page** displays a paginated list of products along with their available stock.
- Users can add products to a **cart**, which is managed using **React Context API**.
- Orders are placed from the cart, and stock is updated accordingly.

#### Orders

- An **Orders page** allows users to view their own orders only.
- Order details include products, quantities, and total amount.

#### Product Management

- A dedicated **Products page** is available for users with the **WHOLESELLER** role.
- WHOLESELLERS can create, update, and delete products.
- Product deletion safely removes related data using database transactions.

#### Authentication (UI)

- A simple **sign-in page** is provided with two options:
  - Continue as **Customer**
  - Continue as **Wholeseller**
- Based on the selected role, a corresponding token is used for API access.

---

### Backend

- Built using **Node.js, Express, TypeScript**, and **Prisma ORM**.
- **SQLite** is used as the database for simplicity and ease of setup.

#### Authentication & Authorization

- Authentication is handled using a **hardcoded token**, mapped to user roles.
- An `authMiddleware` validates the token for all protected routes.
- A `roleMiddleware` enforces role-based access control and returns `403 Forbidden` when unauthorized.
- The backend supports **ADMIN**, **WHOLESELLER**, and **CUSTOMER** roles, although the current UI uses only WHOLESELLER and CUSTOMER.
- ADMIN users have full API access by design.

#### Orders & Stock Management

- Order creation is handled inside a **database transaction** to ensure consistency.
- Stock levels are updated atomically when an order is placed.
- Business logic ensures that stock quantities **never go below zero**.
- Product deletion also uses **transactions** to avoid orphaned or inconsistent records.

---

### Data Seeding

- A Prisma **seed script** is included to pre-populate the database with sample products.
- This allows for easy inspection and testing of the application.

---

## Database Schema

### User

| Field    | Type      | Description                              |
| -------- | --------- | ---------------------------------------- |
| id       | Int       | Primary key                              |
| email    | String    | Unique user email                        |
| name     | String    | User name                                |
| role     | Role      | User role (CUSTOMER, WHOLESELLER, ADMIN) |
| orders   | Order[]   | Orders placed by the user                |
| products | Product[] | Products created by the user             |

---

### Product

| Field       | Type        | Description                          |
| ----------- | ----------- | ------------------------------------ |
| id          | Int         | Primary key                          |
| title       | String      | Product title                        |
| description | String      | Product description                  |
| price       | Decimal     | Product price                        |
| image       | String      | Product image URL                    |
| stock       | Stock?      | One-to-one stock record              |
| orderItems  | OrderItem[] | Order items referencing this product |
| createdBy   | User        | User who created the product         |
| createdById | Int         | Creator user ID                      |
| createdAt   | DateTime    | Creation timestamp                   |
| updatedAt   | DateTime    | Last update timestamp                |

---

### Stock

| Field     | Type    | Description              |
| --------- | ------- | ------------------------ |
| id        | Int     | Primary key              |
| quantity  | Int     | Available stock quantity |
| product   | Product | Associated product       |
| productId | Int     | Unique product ID        |

---

### Order

| Field      | Type        | Description                 |
| ---------- | ----------- | --------------------------- |
| id         | Int         | Primary key                 |
| user       | User        | User who placed the order   |
| userId     | Int         | User ID                     |
| total      | Decimal     | Total order amount          |
| createdAt  | DateTime    | Creation timestamp          |
| updatedAt  | DateTime    | Last update timestamp       |
| orderItems | OrderItem[] | Items included in the order |

---

### OrderItem

| Field     | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| id        | Int     | Primary key                    |
| order     | Order   | Parent order                   |
| orderId   | Int     | Order ID                       |
| product   | Product | Associated product             |
| productId | Int     | Product ID                     |
| quantity  | Int     | Quantity ordered               |
| price     | Decimal | Product price at time of order |

---

### Role (Enum)

| Value       |
| ----------- |
| CUSTOMER    |
| WHOLESELLER |
| ADMIN       |

---

## Starting the Project

1. Clone the repo:

   ```bash
   git clone https://github.com/Sahil2k07/optimum-output.git
   ```

2. Start the Frontend / Navigate to frontend first:

   ```bash
   npm install

   npm run build

   npm run preview
   ```

3. Start the Backend / Navigate to backend directory first:

   ```bash
   npm install

   npx prisma migrate deploy

   npx prisma generate

   npm run seed

   npm start
   ```
