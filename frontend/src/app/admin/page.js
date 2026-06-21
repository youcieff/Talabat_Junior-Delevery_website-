"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Utensils, ShoppingBag, ArrowUpRight, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/context/I18nContext";
import api from "@/utils/api";

export default function AdminDashboard() {
  const { t, lang } = useTranslation();
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch real stats
        const ordersRes = await api.get("/orders");
        const restRes = await api.get("/restaurants");
        const usersRes = { data: { count: 450 } }; // Mock user count for now
        
        const allOrders = ordersRes.data.data || [];
        const totalSales = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        
        setStats([
          { name: t("admin_stats_sales"), value: `${totalSales.toLocaleString()} ${t("currency")}`, change: "+12%", icon: TrendingUp, color: "text-cyber-lime" },
          { name: t("admin_stats_orders"), value: allOrders.length.toString(), change: `+${allOrders.filter(o => o.status === 'pending').length}`, icon: ShoppingBag, color: "text-cyber-pink" },
          { name: t("admin_stats_restaurants"), value: (restRes.data.data?.length || 0).toString(), change: "+2", icon: Utensils, color: "text-cyber-cyan" },
          { name: t("admin_stats_users"), value: usersRes.data.count.toString(), change: "+18%", icon: Users, color: "text-white" },
        ]);
        
        setRecentOrders(allOrders.slice(0, 5));
        
        setLoading(false);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(lang === 'ar' ? "فشل تحميل بيانات النشاط." : "Failed to load activity data.");
        setLoading(false);
        
        // Fallback for demo
        setStats([
          { name: t("admin_stats_sales"), value: `0 ${t("currency")}`, change: "0%", icon: TrendingUp, color: "text-cyber-lime" },
          { name: t("admin_stats_orders"), value: "0", change: "0", icon: ShoppingBag, color: "text-cyber-pink" },
          { name: t("admin_stats_restaurants"), value: "0", change: "0", icon: Utensils, color: "text-cyber-cyan" },
          { name: t("admin_stats_users"), value: "0", change: "0%", icon: Users, color: "text-white" },
        ]);
      }
    };

    fetchDashboardData();
  }, [lang, t]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
       <Loader2 size={48} className="text-cyber-cyan animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
            {t("admin_title")}
          </h1>
          <p className="text-white/40 text-lg italic border-l-4 border-cyber-cyan pl-6">
            {t("admin_subtitle")}
          </p>
        </div>
        <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5">
           <button className="px-6 py-2 rounded-xl bg-white/10 text-white text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'اليوم' : 'Today'}</button>
           <button className="px-6 py-2 rounded-xl text-white/30 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">{lang === 'ar' ? 'الأسبوع' : 'Week'}</button>
           <button className="px-6 py-2 rounded-xl text-white/30 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">{lang === 'ar' ? 'الشهر' : 'Month'}</button>
        </div>
      </div>

      {error && (
        <div className="glass p-6 rounded-3xl border-red-500/20 text-red-500 flex items-center gap-4 bg-red-400/5 italic font-black uppercase tracking-widest text-[10px]">
           <AlertCircle size={20} />
           {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.name}
              className="glass p-8 rounded-[40px] border-white/5 relative overflow-hidden group hover:border-cyber-cyan/30 transition-all shadow-xl"
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-4">
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">{stat.name}</p>
                  <h3 className="text-3xl font-black italic tracking-tighter text-white">{stat.value}</h3>
                  <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${stat.color}`}>
                    <ArrowUpRight size={14} />
                    <span>{stat.change} {t("admin_stats_change")}</span>
                  </div>
                </div>
                <div className={`p-4 rounded-3xl bg-white/5 group-hover:bg-cyber-gradient transition-all shadow-inner ${stat.color} group-hover:text-white`}>
                  <Icon size={28} />
                </div>
              </div>
              <Icon size={140} className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all group-hover:scale-110 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders table */}
      <div className="glass rounded-[50px] overflow-hidden border-white/5 shadow-2xl">
        <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="w-3 h-10 bg-cyber-pink rounded-full shadow-neon-pink"></div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">{t("recent_orders")}</h3>
          </div>
          <button className="text-[10px] font-black uppercase tracking-[0.3em] text-cyber-cyan hover:text-white transition-colors flex items-center gap-2 group">
            {t("btn_view_all")}
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead>
              <tr className="text-white/20 text-[10px] uppercase font-black tracking-[0.3em] border-b border-white/5">
                <th className="px-10 py-6">{t("table_order")}</th>
                <th className="px-10 py-6">{t("table_customer")}</th>
                <th className="px-10 py-6">{t("table_restaurant")}</th>
                <th className="px-10 py-6">{t("table_amount")}</th>
                <th className="px-10 py-6">{t("table_status")}</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-white/60">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-10 py-20 text-center text-white/20 uppercase tracking-[0.5em] italic font-black">
                    {lang === 'ar' ? 'لا توجد طلبات حديثة حالياً' : 'No recent orders found'}
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                    <td className="px-10 py-8 font-black text-white italic tracking-widest text-xs uppercase">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-black shadow-inner uppercase">
                            {order.user?.name?.slice(0, 2) || "UR"}
                          </div>
                          <span>{order.user?.name || (lang === 'ar' ? "مستعمل" : "User")}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-cyber-cyan uppercase tracking-tighter">
                      {order.restaurant?.name || (lang === 'ar' ? 'غير معروف' : 'Unknown')}
                    </td>
                    <td className="px-10 py-8 font-black text-white italic">
                      {order.totalAmount} <span className="text-[10px] text-white/30 not-italic uppercase ml-1">{t("currency")}</span>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                        order.status === 'delivered' 
                          ? 'bg-cyber-lime/10 text-cyber-lime border-cyber-lime/20 shadow-neon-lime'
                          : order.status === 'pending'
                          ? 'bg-cyber-pink/10 text-cyber-pink border-cyber-pink/20 shadow-neon-pink'
                          : 'bg-white/5 text-white/20 border-white/10'
                      }`}>
                        {t(`status_${order.status}`)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
