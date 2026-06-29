"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Utensils, ClipboardList, Settings, LogOut, Package, Tag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/I18nContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { t, lang } = useTranslation();

  const NAV_ITEMS = [
    { name: t("admin_title"), icon: LayoutDashboard, href: "/admin" },
    { name: t("nav_restaurants"), icon: Utensils, href: "/admin/restaurants" },
    { name: t("admin_menu_title"), icon: Package, href: "/admin/menu" },
    { name: t("nav_my_orders"), icon: ClipboardList, href: "/admin/orders" },
    { name: lang === 'ar' ? "العروض والخصومات" : "Offers & Promos", icon: Tag, href: "/admin/offers" },
    { name: lang === 'ar' ? "الإعدادات" : "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className={`w-72 glass h-[calc(100vh-2rem)] sticky top-4 rounded-[40px] p-8 flex flex-col border-white/5 shadow-2xl relative overflow-hidden`}>
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyber-cyan/5 rounded-full blur-[80px]"></div>
      
      <div className="mb-14 px-4 relative z-10">
        <h2 className={`text-2xl font-black text-glow-pink italic tracking-tighter uppercase ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          TALABAT <span className="text-cyber-cyan">JUNIOR</span>
        </h2>
        <div className={`text-[9px] text-white/30 font-black uppercase tracking-[0.4em] mt-2 ${lang === 'ar' ? 'text-left' : 'text-right'}`}>Admin Control</div>
      </div>

      <nav className="flex-1 space-y-3 relative z-10">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group relative overflow-hidden ${
                isActive 
                  ? "bg-white/10 text-white shadow-inner border border-white/10 italic" 
                  : "hover:bg-white/5 text-white/40 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div 
                   layoutId="activeSidebar"
                   className={`absolute inset-y-2 ${lang === 'ar' ? 'right-0' : 'left-0'} w-1 bg-cyber-pink shadow-neon-pink`}
                />
              )}
              <Icon size={20} className={isActive ? "text-cyber-cyan" : "group-hover:text-cyber-cyan transition-colors"} />
              <span className="font-black text-[13px] uppercase tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/5 relative z-10">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/30 hover:text-red-500 hover:bg-red-500/[0.03] transition-all group border border-transparent hover:border-red-500/10"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-black text-xs uppercase tracking-widest">{lang === 'ar' ? 'تسجيل خروج' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );
}
