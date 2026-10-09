# 🛒 Whatbytes E-Commerce Store

> 🚀 **Live Demo URL:** [https://manoharkale-whatbytes-assignment.vercel.app/](https://manoharkale-whatbytes-assignment.vercel.app/)

Designed and developed as part of the **Whatbytes Frontend Assignment**, this project features responsive product discovery, real-time multi-facet filtering, URL-synced search and sort, a persistent shopping cart with promo code support, dynamic product detail showcases, customer review submission, and an interactive checkout flow.

---

## 🌟 Key Features

### 🔍 1. Dynamic Product Catalog & Multi-Facet Filtering
- **Category Filtering**: Seamlessly filter products across multiple categories (*Electronics*, *Clothing*, *Home*, *All*).
- **Dual Price Filters**: Interactive price range slider (0–1000) and precision numerical stepper input.
- **Instant Search**: Real-time keyword search spanning product titles, descriptions, categories, and brands.
- **Multi-Criteria Sorting**:
  - `Featured` (Default showcase order)
  - `Price: Low to High`
  - `Price: High to Low`
  - `Top Rated` (Rating based)
  - `Alphabetical (A-Z)`
- **URL Parameter Synchronization**: All filter, search, and sort states are reflected directly in URL search parameters (`?category=...&price=...&search=...&sort=...`), enabling shareable URLs, bookmarking, and native browser back/forward navigation.
- **Responsive Mobile Drawer**: Collapsible mobile filter drawer with animated transitions for smaller screens.
- **Featured Card Layout**: Distinctive large-format card highlight for flagship items (e.g. Smartphone).

### 📦 2. Comprehensive Product Detail Page (`/product/[id]`)
- **Static & Dynamic Rendering**: Optimized route generation via `generateStaticParams` and dynamic OpenGraph/SEO metadata via `generateMetadata`.
- **Interactive Image Gallery**: High-resolution image showcase with thumbnail switcher and hover magnification.
- **Stock & Badge Status**: Real-time stock counts, in-stock/low-stock status pills, and discount percentage tags.
- **Quantity Selector & Quick Purchase**: Increment/decrement controls with direct `Add to Cart` and express `Buy Now` (redirects to cart).
- **Tabbed / Structured Specs**: Feature checklists, material specifications, warranty, and fast shipping policies.
- **Customer Reviews & Ratings**:
  - Visual star rating breakdown with rating statistics.
  - Existing customer review feed with dates and verified buyer badges.
  - Interactive **"Write a Review"** form allowing users to submit new reviews on the fly.
- **Related Products Carousel**: Curated suggestions based on the current product catalog.

### 🛍️ 3. Full-Featured Shopping Cart & Checkout (`/cart`)
- **Persistent State**: Cart state saved in `localStorage` across page reloads and browser sessions.
- **Granular Controls**: Update individual item quantities or remove specific items with instant price recalculations.
- **Order Summary Engine**:
  - Subtotal calculation
  - Estimated tax calculation (8%)
  - Dynamic shipping logic (Free shipping on orders over $100, $10 flat rate otherwise)
- **Promo / Coupon Code Engine**:
  - `WHATBYTES` → $20 Flat Discount
  - `SAVE20` → $20 Flat Discount
  - `SAVE10` → 10% Percentage Discount
- **Order Checkout Simulation**:
  - Processing animation spinner.
  - Instant order confirmation modal with generated Order Tracking ID (e.g. `WB-784912`).
  - Automatic cart clearing upon successful purchase.
- **Empty State UX**: Helpful empty cart graphics with one-click CTA to return to shopping.

### 🔔 4. Global Toast Notification System
- Non-intrusive animated toast notifications triggered on adding items, removing items, and clearing cart.
- Includes product image thumbnails, clear feedback text, and automatic 3.5s dismiss timer.

---

## 🛠️ Tech Stack & Architecture

| Technology | Purpose |
| :--- | :--- |
| **[Next.js 16](https://nextjs.org/)** | React Framework with App Router, Turbopack, and Server Components |
| **[React 19](https://react.dev/)** | Core UI library with hooks, Suspense, and state primitives |
| **[TypeScript](https://www.typescriptlang.org/)** | Type safety, strict contracts for products, filters, reviews, and cart |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Modern utility-first styling system |
| **[Lucide React](https://lucide.dev/)** | Crisp, lightweight icons |
| **React Context API** | Centralized global cart state and toast notification manager |
| **Browser LocalStorage** | Client-side cart persistence across browser sessions |

---

## 📂 Project Structure

```text
whatbytes-asignment/
├── public/                     # Static assets & icons
├── src/
│   ├── app/
│   │   ├── cart/
│   │   │   └── page.tsx        # Shopping Cart & Checkout page
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Dynamic Product Detail page (SSR + generateStaticParams)
│   │   ├── favicon.ico         # App favicon
│   │   ├── globals.css         # Global Tailwind CSS styles and font variables
│   │   ├── layout.tsx          # Root layout wrapping CartProvider & Geist fonts
│   │   └── page.tsx            # Main catalog page with sidebar filters & product grid
│   ├── components/
│   │   ├── FeaturedProductCard.tsx   # Highlighted horizontal product card
│   │   ├── Footer.tsx                # Multi-column footer with newsletter & links
│   │   ├── Header.tsx                # Sticky top navbar with live search & cart counter
│   │   ├── ProductCard.tsx           # Standard product card with quick-add & badge
│   │   ├── ProductDetailClient.tsx   # Interactive client component for product details
│   │   ├── RatingStars.tsx           # Reusable SVG star rating component
│   │   ├── SidebarFilters.tsx        # Category and price filter widgets
│   │   └── ToastContainer.tsx        # Global floating notifications container
│   ├── context/
│   │   └── CartContext.tsx     # Context for cart state, pricing calculations & toasts
│   ├── data/
│   │   └── products.ts         # Mock product inventory & sample customer reviews
│   └── types/
│       └── index.ts            # TypeScript interfaces (Product, CartItem, Review, FilterState)
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.18.0` or higher (Node `v20+` recommended)
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ManoharBari/whatbytes-assignment.git
   cd whatbytes-assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   - **Local Development**: [http://localhost:3000](http://localhost:3000)
   - **Live Production Deployment**: [https://manoharkale-whatbytes-assignment.vercel.app/](https://manoharkale-whatbytes-assignment.vercel.app/)

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server on `http://localhost:3000` |
| `npm run build` | Compiles the production build with type checking and static generation |
| `npm run start` | Starts the optimized production server after building |
| `npm run lint` | Runs ESLint to verify code quality and style conventions |

---

## 🎟️ Coupon Codes for Testing

Test the checkout promo discount system using any of the following demo codes on the `/cart` page:

| Coupon Code | Discount Applied |
| :--- | :--- |
| `WHATBYTES` | **$20.00 Flat Discount** |
| `SAVE20` | **$20.00 Flat Discount** |
| `SAVE10` | **10% Off Subtotal** |

---

## 📱 Responsive & Design Highlights

- **Mobile First**: Built with responsive layouts adapting across mobile, tablet, laptop, and ultrawide screens.
- **Custom Design System**: Consistent brand palette with deep navy `#0f2942`, vibrant cobalt `#0b5cb5`, slate backgrounds `#f5f8fc`, and emerald accents for badges.
- **Accessibility & UX**: Clear ARIA labels, semantic HTML tags, keyboard navigation support, and instant visual feedback on actions.

---

## 📄 License

This project is created for evaluation purposes for the **Whatbytes** recruitment process.
