# Stylehive — E-Commerce Store

  A modern, fully-featured e-commerce storefront built with React 18, TypeScript, and TanStack Query. Products are sourced from
  the [DummyJSON](https://dummyjson.com) API.

  ---

  ## Features

  - **Product browsing** — infinite scroll with automatic pagination
  - **Category filtering** — sidebar + header nav + "All Categories" dropdown
  - **Product search** — live search with debounced suggestions dropdown
  - **Product detail page** — full info with similar products section
  - **Shopping cart** — add, remove, increment/decrement quantity
  - **Favourites** — save and unsave products
  - **Skeleton loading** — shimmer placeholders while data loads
  - **Code splitting** — route-level lazy loading for fast initial load
  - **Responsive design** — mobile-first SCSS with BEM methodology

  ---

  ## Tech Stack

  | Layer | Library |
  |---|---|
  | UI | React 18 |
  | Language | TypeScript (strict mode) |
  | Routing | React Router v6 |
  | Server state | TanStack Query v5 |
  | Client state | Redux Toolkit (`createEntityAdapter`) |
  | Styling | SCSS + BEM |
  | Icons | FontAwesome 6 |
  | Carousel | React Slick |
  | API | DummyJSON REST API |

  ---

  ## Project Structure

  src/
  ├── api/            # Typed fetch functions
  ├── assets/         # Global styles, variables, routes
  ├── components/     # Reusable UI components
  │   ├── Navbar/
  │   ├── Footer/
  │   ├── SearchBox/
  │   ├── ProductCard/
  │   ├── CardSlider/
  │   ├── ShopSideBar/
  │   ├── IconsBox/
  │   └── ui/         # Skeleton loaders
  ├── hooks/          # Custom React hooks
  ├── lib/            # QueryClient + query key factory
  ├── pages/          # Route-level page components
  │   ├── Home/
  │   ├── Shop/
  │   ├── ProductDetials/
  │   └── Layout/
  ├── redux/          # Store, cartSlice, favouriteSlice
  └── types/          # Shared TypeScript interfaces

  ---

  ## Getting Started

  ### Prerequisites

  - Node.js ≥ 16
  - npm ≥ 8

  ### Install dependencies

  ```bash
  npm install

  Run in development

  npm start

  Opens at http://localhost:3000.

  Production build

  npm run build

  ---
  Key Architectural Decisions

  TanStack Query for all data fetching — replaces useEffect-based fetching with automatic caching, background refetching, and
  deduplication. Cache is set to 5 minutes stale / 10 minutes gc.

  Normalized Redux with createEntityAdapter — cart and favourites stored as { ids, entities } dictionaries enabling O(1) lookups
  instead of O(n) .find() / .some() calls.

  Infinite scroll via useInfiniteQuery — loads 20 products per page, appending as the user scrolls. fetchNextPage is called when
  within 300px of the bottom.

  React.lazy route splitting — each page is a separate chunk. A PageFallback skeleton is shown via <Suspense> while the chunk
  loads.

  ---
  Available Scripts

  ┌───────────────┬───────────────────────────────────┐
  │    Script     │            Description            │
  ├───────────────┼───────────────────────────────────┤
  │ npm start     │ Start development server          │
  ├───────────────┼───────────────────────────────────┤
  │ npm run build │ Create optimised production build │
  ├───────────────┼───────────────────────────────────┤
  │ npm test      │ Run test suite                    │
  ├───────────────┼───────────────────────────────────┤
  │ npm run eject │ Eject CRA config (irreversible)   │
  └───────────────┴───────────────────────────────────┘

  ---
  Credits

  - Product data — DummyJSON
  - Powered by Abdelhakam Elewa