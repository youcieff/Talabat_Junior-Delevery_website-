"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, ShoppingPlus, ChevronRight, ChevronLeft, Info, Utensils, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/context/I18nContext";
import api from "@/utils/api";
import { MOCK_RESTAURANTS } from "@/data/mockData";

export default function RestaurantMenuPage() {
  const { id } = useParams();
  const { t, lang } = useTranslation();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const isDemoId = typeof id === 'string' && id.startsWith('demo-');
      
      if (isDemoId) {
        setLoading(true);
        const mockRest = MOCK_RESTAURANTS.find(r => r._id === id);
        if (mockRest) {
          setRestaurant({
            ...mockRest,
            name: mockRest.name[lang] || mockRest.name.en,
            description: mockRest.description[lang] || mockRest.description.en,
          });
          
          const localizedMenu = (mockRest.menuItems || []).map(item => ({
            ...item,
            id: item._id,
            name: item.name[lang] || item.name.en,
            description: item.description[lang] || item.description.en,
          }));
          setMenuItems(localizedMenu);
          setError(null);
        } else {
          setError(lang === 'ar' ? "المطعم غير موجود" : "Restaurant not found.");
        }
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch restaurant details
        const res = await api.get(`/restaurants/${id}`);
        setRestaurant(res.data.data);
        
        // Fetch menu items for this restaurant
        const menuRes = await api.get(`/menu-items/restaurant/${id}`);
        setMenuItems(menuRes.data.data || []);
        
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        
        // Find in MOCK_RESTAURANTS for Vercel/demo fallback
        const mockId = typeof id === 'string' && !id.startsWith('demo-') ? `demo-${id}` : id;
        const mockRest = MOCK_RESTAURANTS.find(r => r._id === id || r._id === mockId || r.id === Number(id));
        if (mockRest) {
          setRestaurant({
            ...mockRest,
            name: mockRest.name[lang] || mockRest.name.en,
            description: mockRest.description[lang] || mockRest.description.en,
          });
          
          const localizedMenu = (mockRest.menuItems || []).map(item => ({
            ...item,
            id: item._id,
            name: item.name[lang] || item.name.en,
            description: item.description[lang] || item.description.en,
          }));
          setMenuItems(localizedMenu);
          setError(null);
        } else {
          setError(lang === 'ar' ? "تعذر تحميل البيانات. تأكد من تشغيل الخادم وقاعدة البيانات." : "Failed to load data. Make sure server and DB are running.");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [id, lang]);

  const categories = ["all", ...new Set(menuItems.map(item => item.category))];

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Restaurant Header */}
      <div className="relative h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
        <div className="absolute inset-0 bg-cyber-gradient opacity-10"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error && (
              <div className="glass px-4 py-2 rounded-xl text-red-400 bg-red-400/10 flex items-center gap-2 mb-6 w-fit">
                <AlertCircle size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">{error}</span>
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-6">
                <div className="glass px-5 py-2 rounded-2xl text-cyber-lime font-black flex items-center gap-2 shadow-lg">
                  <Star size={18} className="fill-current" />
                  {restaurant.rating}
                </div>
                <div className="glass px-5 py-2 rounded-2xl text-white/70 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Clock size={16} className="text-cyber-cyan" />
                  <span>{restaurant.deliveryTime} {t("unit_min")}</span>
                </div>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-glow-pink mb-6 italic uppercase leading-none">
              {restaurant.name}
            </h1>
            <p className="text-white/50 max-w-2xl text-xl leading-relaxed italic border-l-4 border-cyber-cyan pl-6">
               {restaurant.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 lg:flex gap-16">
        {/* Sidebar Nav */}
        <div className="lg:w-72 mb-10 lg:mb-0">
          <div className="glass p-6 rounded-[32px] sticky top-32 border-white/5">
            <h3 className={`font-black text-xs uppercase tracking-[0.3em] mb-8 text-cyber-cyan border-white/10 pb-4 border-b ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {t("label_menu")}
            </h3>
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} px-6 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest group relative overflow-hidden ${
                    activeTab === cat 
                      ? "bg-white/10 text-white shadow-inner" 
                      : "text-white/30 hover:text-white/60 hover:bg-white/5"
                  }`}
                >
                  <span className="relative z-10">{cat === 'all' ? t("category_all") : cat}</span>
                  {activeTab === cat && (
                    <motion.div 
                      layoutId="activeTab"
                      className={`absolute inset-y-2 ${lang === 'ar' ? 'right-0' : 'left-0'} w-1 bg-cyber-pink shadow-neon-pink`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
              {activeTab === 'all' ? t("category_all") : activeTab}
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-cyber-cyan/30 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {menuItems
                .filter(item => activeTab === 'all' || item.category === activeTab)
                .map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id || item._id}
                    className="glass p-8 rounded-[40px] flex items-center gap-8 group hover:border-cyber-cyan/30 transition-all border-white/5 relative overflow-hidden"
                  >
                    <div className="flex-1 relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-black text-2xl group-hover:text-cyber-cyan transition-colors leading-tight">{item.name}</h4>
                      </div>
                      <p className="text-white/30 text-xs font-medium mb-8 leading-relaxed line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xl text-cyber-pink italic uppercase">
                          {item.price} <span className="text-[10px] text-white/40 not-italic">{t("currency")}</span>
                        </span>
                        
                        <button 
                          onClick={() => addToCart(item)}
                          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 hover:bg-cyber-gradient transition-all group/add shadow-lg hover:shadow-neon-pink hover:scale-105"
                        >
                          <Utensils size={18} className="text-white group-hover/add:scale-110 transition-transform" />
                          <span className="font-black text-[10px] uppercase tracking-widest">{t("btn_add_to_cart")}</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="w-28 h-28 rounded-3xl bg-white/5 flex items-center justify-center text-4xl shrink-0 group-hover:rotate-12 transition-transform shadow-inner relative z-10 border border-white/5">
                       {item.category === "Drinks" || item.category === "مشروبات" ? "🥤" : "🍔"}
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
