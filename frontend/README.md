## Multi-Store E-commerce Platform

A modern, responsive e-commerce platform that allows users to browse multiple stores, add products to store-specific shopping carts, and complete the checkout process. Built with Next.js, and Tailwind CSS.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Client State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Server State Management**: [Supabase](https://supabase.com/) with [Tanstack Query](https://tanstack.com/query)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod) validation
- **Authentication**: Supabase auth provider with role-based access control

## ✨ Features

### Store Management
- Browse multiple stores with detailed information
- View store-specific products and offerings
- Filter and search stores (planned)

### Shopping Experience
- Store-specific shopping carts
- Product customization with options
- Real-time price calculations
- Persistent cart storage

### Checkout Process
- Multi-step checkout flow
- Order information collection
- Order review and confirmation
- Order history tracking

### User Management
- Authentication with role-based access control
- User profiles
- Different permissions for store owners and customers

### Admin Dashboard
- Store management for owners
- Product and inventory management
- Order processing and tracking
- Sales analytics and reporting