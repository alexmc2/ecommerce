// app/not-found.tsx
import Custom404 from "@/components/404";
import Footer from "@/components/footer";
import Header from "@/components/header";
import CartDrawer from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/CartProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <CartProvider>
      <Header />
      <Custom404 />
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
