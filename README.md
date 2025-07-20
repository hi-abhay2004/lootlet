# 🛒 Lootlet – Modern E‑Commerce Frontend

A sleek, scalable e-commerce frontend built with Next.js (App Router), designed to deliver a fast and dynamic shopping experience. Lootlet is your one-stop demo app featuring authentication, product search, category routing, and responsive design—all powered by modern web technologies.

---

## 🚀 Features

- ✅ Dynamic category and subcategory pages
- ✅ Search functionality using `useSearchParams()` with CSR
- ✅ Product listings from [DummyJSON](https://dummyjson.com/)
- ✅ Clerk authentication (Sign up, Login, SSO)
- ✅ Cart & checkout flow with order success screen
- ✅ Responsive UI using Tailwind CSS & Material UI
- ✅ Server Actions & API routes for backend logic
- ✅ Static assets for banner carousel and icons

---

## 🧪 What’s Working

| Feature                   | Status           |
|---------------------------|------------------|
| Category routing          | ✅ Fully dynamic  |
| Product listing           | ✅ Integrated     |
| Search with query params  | ✅ Client-side rendered |
| Clerk Authentication      | ✅ Integrated     |
| Cart + Checkout           | ✅ Functional     |
| Success & Orders page     | ✅ Working        |
| Responsive design         | ✅ Mobile-friendly |
| API Routes (`/api/...`)   | ✅ Enabled        |

---

## 🧭 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Material UI](https://mui.com/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **API/Data**: [DummyJSON](https://dummyjson.com/) (Product Data)
- **State Management**: React Context (for Cart)
- **Deployment**: Vercel / Netlify

---

## 📦 Installation

git clone https://github.com/hi-abhay2004/lootlet.git
cd flipkart-frontend
npm install



🔐 Environment Setup
Create a .env.local file in the root and add your Clerk keys:

ini
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
💡 You can get these from the Clerk Dashboard

🧑‍💻 Running Locally
npm run dev



👨‍💻 Author
Built with 💙 by Abhay
