"use client";

import { motion } from "framer-motion";
import { Tag, Clock, Zap, Gift, Percent, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/I18nContext";
import { useState, useEffect } from "react";
import api from "@/utils/api";

const MOCK_OFFERS = [
  {
    id: 1,
    badge: "🔥 HOT",
    discount: "50%",
    title: { en: "First Order Free Delivery", ar: "توصيل مجاني على أول طلب" },
    description: { en: "Get free delivery on your first order with any restaurant.", ar: "احصل على توصيل مجاني في أول طلباتك من أي مطعم." },
    code: "FIRST50",
    expires: { en: "Expires in 3 days", ar: "تنتهي خلال 3 أيام" },
    color: "from-cyber-pink/20 to-transparent",
    border: "border-cyber-pink/30",
    glow: "shadow-neon-pink",
  },
  {
    id: 2,
    badge: "⚡ FLASH",
    discount: "30%",
    title: { en: "Weekend Mega Deal", ar: "عرض نهاية الأسبوع الكبير" },
    description: { en: "30% off on all orders above 200 EGP every Friday and Saturday.", ar: "خصم 30% على كل الطلبات فوق 200 جنيه كل جمعة وسبت." },
    code: "WEEKEND30",
    expires: { en: "Every Weekend", ar: "كل نهاية أسبوع" },
    color: "from-cyber-cyan/20 to-transparent",
    border: "border-cyber-cyan/30",
    glow: "shadow-neon-cyan",
  },
  {
    id: 3,
    badge: "🎁 GIFT",
    discount: "FREE",
    title: { en: "Refer a Friend", ar: "شارك مع صديق" },
    description: { en: "Refer a friend and both of you get a free item on your next order.", ar: "شارك صديق واحصلوا على منتج مجاني في طلبكم القادم." },
    code: "REFERFRIEND",
    expires: { en: "Ongoing", ar: "مستمر" },
    color: "from-cyber-lime/20 to-transparent",
    border: "border-cyber-lime/30",
    glow: "",
  },
  {
    id: 4,
    badge: "🍕 COMBO",
    discount: "20%",
    title: { en: "Combo Meal Special", ar: "عرض وجبة الكومبو" },
    description: { en: "Order any combo meal and get 20% off plus a free drink.", ar: "اطلب أي وجبة كومبو واحصل على خصم 20% + مشروب مجاني." },
    code: "COMBO20",
    expires: { en: "Expires in 7 days", ar: "تنتهي خلال 7 أيام" },
    color: "from-cyber-pink/10 to-cyber-cyan/10",
    border: "border-white/10",
    glow: "",
  },
];

export default function OffersPage() {
  const { lang } = useTranslation();
  const [offersList, setOffersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/offers");
        if (res.data && res.data.data && res.data.data.length > 0) {
          setOffersList(res.data.data);
        } else {
          setOffersList(MOCK_OFFERS);
        }
      } catch (err) {
        console.error("Offers fetch error, falling back to mock data:", err);
        setOffersList(MOCK_OFFERS);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 size={48} className="text-cyber-cyan animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-20 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
      >
        <div className="inline-block px-4 py-1 rounded-full glass border-white/5 text-[10px] font-black uppercase tracking-widest text-cyber-pink mb-4">
          {lang === 'ar' ? "عروض حصرية" : "Exclusive Deals"}
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 italic uppercase tracking-tighter text-glow-pink">
          {lang === 'ar' ? "العروض و" : "Hot"} <br />
          <span className="text-cyber-cyan">{lang === 'ar' ? "التخفيضات" : "Offers"}</span>
        </h1>
        <p className="text-white/40 max-w-md font-medium leading-relaxed">
          {lang === 'ar' 
            ? "استمتع بأفضل العروض والخصومات الحصرية على مطاعمك المفضلة."
            : "Enjoy the best exclusive deals and discounts on your favorite restaurants."}
        </p>
      </motion.div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offersList.map((offer, i) => (
          <motion.div
            key={offer._id || offer.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass rounded-[40px] p-10 border ${offer.border || 'border-cyber-pink/30'} ${offer.glow || 'shadow-neon-pink'} relative overflow-hidden group hover:scale-[1.02] transition-all duration-500`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${offer.color || 'from-cyber-pink/20 to-transparent'} opacity-50`}></div>

            <div className="relative z-10">
              {/* Top Row */}
              <div className="flex items-start justify-between mb-8">
                <span className="text-xs font-black uppercase tracking-widest glass px-4 py-2 rounded-full border-white/10">
                  {offer.badge}
                </span>
                <span className="text-5xl font-black text-cyber-pink italic">
                  {offer.discount}
                </span>
              </div>

              {/* Content */}
              <h2 className={`text-2xl font-black text-white mb-4 italic uppercase tracking-tighter ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                {offer.title[lang] || offer.title.en}
              </h2>
              <p className={`text-white/40 text-sm font-medium leading-relaxed mb-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                {offer.description[lang] || offer.description.en}
              </p>

              {/* Promo Code */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 glass bg-white/5 rounded-2xl px-6 py-4 border border-dashed border-white/20 font-mono text-cyber-cyan font-black tracking-widest text-center">
                  {offer.code}
                </div>
                <button
                  onClick={() => navigator.clipboard?.writeText(offer.code)}
                  className="px-6 py-4 rounded-2xl bg-cyber-gradient font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-neon-pink"
                >
                  {lang === 'ar' ? "نسخ" : "Copy"}
                </button>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                <Clock size={12} className="text-cyber-cyan" />
                <span>{offer.expires[lang] || offer.expires.en}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-20 glass rounded-[40px] p-12 border-white/5 text-center relative overflow-hidden"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyber-pink/10 rounded-full blur-[80px]"></div>
        <div className="relative z-10">
          <Percent size={48} className="text-cyber-pink mx-auto mb-6 opacity-60" />
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4">
            {lang === 'ar' ? "المزيد من العروض قادمة!" : "More Offers Coming Soon!"}
          </h2>
          <p className="text-white/40 font-medium mb-8 max-w-md mx-auto">
            {lang === 'ar' ? "اطلب الآن واستمتع بأفضل الأسعار." : "Order now and enjoy the best prices."}
          </p>
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-cyber-gradient font-black uppercase tracking-widest shadow-neon-pink hover:scale-105 transition-all"
          >
            <span>{lang === 'ar' ? "تصفح المطاعم" : "Browse Restaurants"}</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
