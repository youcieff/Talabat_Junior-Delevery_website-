"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, User, Search, Menu, LogOut, Languages } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/I18nContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`glass rounded-2xl flex items-center justify-between px-6 py-3 transition-colors ${
          isScrolled ? "bg-black/40" : "bg-black/20"
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-cyber-gradient p-0.5 shadow-neon-pink">
              <div className="w-full h-full bg-background rounded-[7px] flex items-center justify-center font-black text-xl italic text-cyber-cyan">
                J
              </div>
            </div>
            <span className="text-xl font-black tracking-tighter text-glow-pink italic uppercase">
              TALABAT<span className="text-cyber-cyan">JUNIOR</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/restaurants">{t("nav_restaurants")}</NavLink>
            <NavLink href="/offers">{t("nav_offers")}</NavLink>
            <NavLink href="/about">{t("nav_about")}</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLang}
              className="p-2 flex items-center gap-2 hover:text-cyber-cyan transition-all glass rounded-xl border-white/5 px-3"
            >
              <Languages size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            <div className="w-[1px] h-6 bg-white/5 mx-1 hidden md:block"></div>

            <button className="p-2 hover:text-cyber-cyan transition-colors">
              <Search size={20} />
            </button>
            
            <Link href="/cart" className="p-2 hover:text-cyber-pink transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-pink rounded-full text-[10px] flex items-center justify-center font-bold animate-pulse shadow-neon-pink">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/orders" className="hidden lg:block text-xs font-bold text-white/40 hover:text-white transition-colors">{t("nav_my_orders")}</Link>
                <div className="w-[1px] h-4 bg-white/10 hidden lg:block mx-1"></div>
                <span className="hidden lg:block text-xs font-bold text-cyber-cyan uppercase italic">{user.name}</span>
                <button onClick={logout} className="p-2 text-white/40 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/register" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-2 rounded-xl border border-white/10 transition-all group font-bold text-xs uppercase tracking-tight text-white/40 hover:text-white">
                <span>{lang === 'ar' ? 'إنشاء حساب' : 'Sign Up'}</span>
              </Link>
              <Link href="/login" className="flex items-center gap-2 bg-cyber-gradient px-5 py-2 rounded-xl shadow-neon-pink hover:scale-[1.02] transition-all group font-bold text-xs uppercase tracking-tight">
                <User size={16} className="group-hover:scale-110 transition-transform" />
                <span>{t("nav_login")}</span>
              </Link>
            </div>
            )}
            
            <button className="md:hidden p-2 text-white/40">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="relative text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-all group py-1"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyber-gradient transition-all group-hover:w-full"></span>
    </Link>
  );
}
