"use client";

import { motion } from "framer-motion";
import { Star, Clock, MapPin, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/I18nContext";

export default function RestaurantCard({ restaurant }) {
  const { lang, t } = useTranslation();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass group rounded-[40px] overflow-hidden border-white/5 hover:border-cyber-pink/30 transition-all duration-500 relative"
    >
      <Link href={`/restaurants/${restaurant._id || restaurant.id}`}>
        <div className="relative h-56 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60"></div>
          
          <div className="w-full h-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
            {restaurant.image && restaurant.image !== 'no-photo.jpg' ? (
               <img 
                 src={restaurant.image.startsWith('http') ? restaurant.image : `http://localhost:5000${restaurant.image}`} 
                 alt={restaurant.name} 
                 className="w-full h-full object-cover" 
               />
            ) : (
               <Utensils size={48} className="text-white/10 stroke-1" />
            )}
          </div>
          
          <div className="absolute top-6 right-6 z-20 flex gap-2">
            <div className="glass px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 text-cyber-lime border-cyber-lime/20 shadow-lg">
              <Star size={12} className="fill-current" />
              {restaurant.rating || "4.8"}
            </div>
          </div>
          
          <div className={`absolute bottom-6 ${lang === 'ar' ? 'right-6' : 'left-6'} z-20`}>
             <h3 className="text-2xl font-black text-white group-hover:text-cyber-cyan transition-colors italic uppercase tracking-tighter leading-none">
               {restaurant.name}
             </h3>
          </div>
        </div>
      </Link>

      <div className="p-8">
        <p className={`text-white/40 text-[10px] uppercase font-black tracking-widest mb-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
           {restaurant.category || t("category_all")}
        </p>
        <p className={`text-white/40 text-sm mb-8 line-clamp-2 font-medium leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          {restaurant.description || (lang === 'ar' 
            ? "أشهى المأكولات المحضرة بعناية فائقة وتوصيل سريع حتى باب منزلك." 
            : "The finest meals prepared with ultimate care, delivered fast to your door.")}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className={`flex items-center gap-6 text-white/30 font-bold text-[10px] uppercase tracking-widest ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-cyber-cyan" />
              <span>{restaurant.deliveryTime || "25-35"} {t("unit_min")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-cyber-pink" />
              <span>{restaurant.distance || "1.2"} {lang === 'ar' ? 'كم' : 'KM'}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
