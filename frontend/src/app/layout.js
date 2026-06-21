import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { I18nProvider } from "@/context/I18nContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata = {
  title: "Talabat Junior | طلبات جونيور",
  description: "اطلب أكلك المفضل بلمسة واحدة في عالم طلبات جونيور",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.variable} ${orbitron.variable}`}>
        <AuthProvider>
          <CartProvider>
            <I18nProvider>
              <Navbar />
              <main className="pt-24 min-h-screen">
                {children}
              </main>
            </I18nProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
