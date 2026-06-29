"use client";

import RestaurantCard from "@/components/RestaurantCard";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/context/I18nContext";
import api from "@/utils/api";

export default function RestaurantsPage() {
  const { t, lang } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const res = await api.get("/restaurants");
        setRestaurants(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
        setError(lang === 'ar' ? "تعذر تحميل المطاعم. تأكد من تشغيل الخادم." : "Failed to load restaurants. Make sure the server is running.");
        // Fallback mock data
        setRestaurants([
          { _id: "mock1", name: lang === 'ar' ? "برجر جونيور" : "Burger Junior", rating: 4.8, deliveryTime: "20-30", distance: "1.2", category: "burger" },
          { _id: "mock2", name: lang === 'ar' ? "سوشي المستقبل" : "Future Sushi", rating: 4.9, deliveryTime: "40-50", distance: "3.5", category: "sushi" },
          { _id: "mock3", name: lang === 'ar' ? "بيتزا النيون" : "Neon Pizza", rating: 4.6, deliveryTime: "30-40", distance: "2.1", category: "pizza" },
          { _id: "mock4", name: lang === 'ar' ? "شاورما الماتريكس" : "Matrix Shawarma", rating: 4.7, deliveryTime: "15-25", distance: "0.8", category: "oriental" },
          { _id: "mock5", name: lang === 'ar' ? "نودلز سايبر" : "Cyber Noodles", rating: 4.5, deliveryTime: "35-45", distance: "4.2", category: "asian" },
          { _id: "mock6", name: lang === 'ar' ? "باستا الرقمية" : "Digital Pasta", rating: 4.4, deliveryTime: "25-35", distance: "1.9", category: "italian" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [lang]);

  const CATEGORIES = [
    { id: "all", label: t("category_all") },
    { id: "burger", label: t("category_burger") },
    { id: "pizza", label: t("category_pizza") },
    { id: "sushi", label: t("category_sushi") },
  ];

  const filteredRestaurants = restaurants.filter(r => {
    const name = r.name || "";
    const category = r.category || "";
    const matchesCategory = activeCategory === "all" || category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-20 pb-32">
      {/* Header */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <div>
          <div className="inline-block px-4 py-1 rounded-full glass border-white/5 text-[10px] font-black uppercase tracking-widest text-cyber-cyan mb-4">
            {t("explore_label") || "Discovery"}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-glow-pink italic uppercase tracking-tighter">
             {lang === 'ar' ? "استكشف " : "Explore "} <br />
             <span className="text-cyber-cyan uppercase">{lang === 'ar' ? "المطاعم" : "Restaurants"}</span>
          </h1>
          <p className="text-white/40 max-w-md font-medium leading-relaxed">
            {t("restaurants_subtitle") || "Curated selection of premium partners delivering excellence to your doorstep."}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <input 
              type="text" 
              placeholder={t("search_placeholder")} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass bg-white/5 border-white/10 rounded-2xl px-6 py-4 pr-12 focus:border-cyber-cyan transition-all outline-none w-full md:w-80 group-hover:border-white/20 font-medium"
            />
            <Search className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-white/30`} size={20} />
          </div>
          <button className="glass p-4 rounded-2xl hover:bg-white/10 transition-all border-white/5 text-cyber-pink">
            <SlidersHorizontal size={22} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-4 overflow-x-auto pb-8 mb-16 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-8 py-3 rounded-2xl whitespace-nowrap transition-all font-black text-xs uppercase tracking-widest border ${
              activeCategory === cat.id 
                ? "bg-cyber-gradient border-transparent shadow-neon-pink text-white" 
                : "glass border-white/5 text-white/40 hover:text-white hover:border-white/20"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="glass mb-8 px-6 py-4 rounded-2xl border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest text-center">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        /* Grid */
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center glass rounded-[40px] border-white/5">
               <p className="text-white/20 font-black uppercase tracking-[0.3em]">{t("no_results") || "No Matches Found"}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
