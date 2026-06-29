"use client";

import Hero from "@/components/Hero";
import RestaurantCard from "@/components/RestaurantCard";
import { useTranslation } from "@/context/I18nContext";
import { motion } from "framer-motion";
import { ArrowUpRight, Utensils, Clock, CreditCard } from "lucide-react";
import Link from "next/link";
import { MOCK_RESTAURANTS, getRestaurantName, getRestaurantDesc } from "@/data/mockData";

export default function Home() {
  const { t, lang } = useTranslation();

  // Use first 3 from shared mock data - properly localized
  const featuredRestaurants = MOCK_RESTAURANTS.slice(0, 3).map(r => ({
    ...r,
    name: getRestaurantName(r, lang),
    description: getRestaurantDesc(r, lang),
  }));

  return (
    <div className="relative overflow-hidden bg-background">
      <Hero />
      
      {/* Featured Section */}
      <section className="py-32 bg-black/[0.02] relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-cyber-pink rounded-full shadow-neon-pink"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyber-cyan italic">{lang === 'ar' ? 'الأفضل في منطقتك' : 'Top Rated Nearby'}</span>
               </div>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white italic uppercase leading-none">
                 {t("featured_restaurants")}
               </h2>
            </div>
            
            <Link 
              href="/restaurants" 
              className="text-xs font-black uppercase tracking-[0.3em] text-cyber-cyan hover:text-white transition-all flex items-center gap-3 group border-b border-white/5 pb-2 border-dashed"
            >
              {t("view_all")}
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredRestaurants.map((restaurant, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={restaurant._id}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 container mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
               <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-cyber-cyan shadow-inner">
                  <Utensils size={32} />
               </div>
               <h4 className="text-2xl font-black italic uppercase tracking-tight">{lang === 'ar' ? 'جودة فائقة' : 'Premium Quality'}</h4>
               <p className="text-white/40 text-sm leading-relaxed font-medium">
                  {lang === 'ar' ? 'نحن نضمن لك الحصول على أفضل تجربة طعام من شركائنا الموثوقين حصراً.' : 'We guarantee the best dining experience from our exclusive trusted partners.'}
               </p>
            </div>
            <div className="space-y-6">
               <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-cyber-pink shadow-inner">
                  <Clock size={32} />
               </div>
               <h4 className="text-2xl font-black italic uppercase tracking-tight">{lang === 'ar' ? 'سرعة التوصيل' : 'Lightning Fast'}</h4>
               <p className="text-white/40 text-sm leading-relaxed font-medium">
                  {lang === 'ar' ? 'نظام توصيل ذكي يضمن وصول طلبك في أسرع وقت ممكن وبأفضل حالة.' : 'Intelligent delivery system ensuring your order arrives as fast as possible in peak condition.'}
               </p>
            </div>
            <div className="space-y-6">
               <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-cyber-lime shadow-inner">
                  <CreditCard size={32} />
               </div>
               <h4 className="text-2xl font-black italic uppercase tracking-tight">{lang === 'ar' ? 'تتبع فوري' : 'Live Tracking'}</h4>
               <p className="text-white/40 text-sm leading-relaxed font-medium">
                  {lang === 'ar' ? 'تابع طلبك لحظة بلحظة منذ خروجه من المطعم حتى وصوله لباب منزلك.' : 'Follow your order every second from the moment it leaves the kitchen until it reaches your door.'}
               </p>
            </div>
         </div>
      </section>
    </div>
  );
}
