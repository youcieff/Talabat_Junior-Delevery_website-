"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Clock, MapPin, Star, Users, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/I18nContext";

const STATS = [
  { value: "50K+", label: { en: "Happy Customers", ar: "عميل سعيد" } },
  { value: "200+", label: { en: "Partner Restaurants", ar: "مطعم شريك" } },
  { value: "4.9", label: { en: "Average Rating", ar: "متوسط التقييم" } },
  { value: "30min", label: { en: "Average Delivery", ar: "متوسط التوصيل" } },
];

const FEATURES = [
  {
    icon: Zap,
    title: { en: "Lightning Fast Delivery", ar: "توصيل فائق السرعة" },
    desc: { en: "Our riders ensure your food arrives hot and fresh within 30 minutes.", ar: "سعاتنا يضمنوا وصول طعامك ساخناً وطازجاً في أقل من 30 دقيقة." },
    color: "text-cyber-cyan",
    bg: "bg-cyber-cyan/10",
    border: "border-cyber-cyan/20",
  },
  {
    icon: Shield,
    title: { en: "Safe & Secure Payments", ar: "مدفوعات آمنة وموثوقة" },
    desc: { en: "All transactions are encrypted and secured with the latest technology.", ar: "جميع المعاملات مشفرة ومؤمنة بأحدث التقنيات." },
    color: "text-cyber-pink",
    bg: "bg-cyber-pink/10",
    border: "border-cyber-pink/20",
  },
  {
    icon: Star,
    title: { en: "Premium Quality", ar: "جودة فاخرة" },
    desc: { en: "We partner only with top-rated restaurants that meet our quality standards.", ar: "نتعاون فقط مع المطاعم ذات التقييم الأعلى التي تلبي معاييرنا." },
    color: "text-cyber-lime",
    bg: "bg-cyber-lime/10",
    border: "border-cyber-lime/20",
  },
  {
    icon: Users,
    title: { en: "Community Driven", ar: "مجتمع متكامل" },
    desc: { en: "Built by food lovers, for food lovers. Real ratings from real customers.", ar: "بُني بواسطة محبي الطعام، لمحبي الطعام. تقييمات حقيقية من عملاء حقيقيين." },
    color: "text-cyber-cyan",
    bg: "bg-cyber-cyan/10",
    border: "border-cyber-cyan/20",
  },
];

const TEAM = [
  { name: "Youssef Maged", role: { en: "Founder & Full Stack Developer", ar: "المؤسس ومطور الواجهتين" }, emoji: "👨‍💻" },
  { name: "Talabat Junior", role: { en: "AI-Powered Platform", ar: "منصة مدعومة بالذكاء الاصطناعي" }, emoji: "🤖" },
];

export default function AboutPage() {
  const { lang } = useTranslation();
  const ChevronIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <div className="pb-32">
      {/* Hero */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cyber-gradient opacity-5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-pink/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px]"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <div className="inline-block px-4 py-1 rounded-full glass border-white/5 text-[10px] font-black uppercase tracking-widest text-cyber-cyan mb-6">
            {lang === 'ar' ? "من نحن" : "Our Story"}
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 text-white">
            {lang === 'ar' ? "طلبات" : "Talabat"}{" "}
            <span className="text-glow-pink text-cyber-pink">Junior</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
            {lang === 'ar'
              ? "منصة توصيل طعام نيو-سايبربانك من الجيل القادم. نربط بينك وبين أفضل المطاعم بأسرع توصيل وأعلى جودة."
              : "A next-gen neo-cyberpunk food delivery platform. We connect you with the best restaurants with the fastest delivery and highest quality."}
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-[32px] p-8 text-center border-white/5 hover:border-cyber-cyan/20 transition-all group"
            >
              <div className="text-4xl md:text-5xl font-black text-cyber-cyan mb-3 group-hover:text-glow-cyan transition-all italic">
                {stat.value}
              </div>
              <div className="text-white/30 text-[10px] font-black uppercase tracking-widest">
                {stat.label[lang] || stat.label.en}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className={`mb-24 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="inline-block px-4 py-1 rounded-full glass border-white/5 text-[10px] font-black uppercase tracking-widest text-cyber-pink mb-4">
            {lang === 'ar' ? "مميزاتنا" : "Why Choose Us"}
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-16">
            {lang === 'ar' ? "لماذا " : "Why "}<span className="text-cyber-cyan">{lang === 'ar' ? "طلبات جونيور؟" : "Talabat Junior?"}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`glass rounded-[32px] p-10 border ${feature.border} group hover:scale-[1.02] transition-all duration-300`}
                >
                  <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} className={feature.color} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-4 italic uppercase tracking-tight">
                    {feature.title[lang] || feature.title.en}
                  </h3>
                  <p className="text-white/40 font-medium leading-relaxed">
                    {feature.desc[lang] || feature.desc.en}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className={`mb-24 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-12">
            {lang === 'ar' ? "فريق العمل" : "The"} <span className="text-cyber-pink">{lang === 'ar' ? "" : "Team"}</span>
          </h2>
          <div className="flex gap-8 flex-wrap">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass rounded-[32px] p-10 border-white/5 hover:border-cyber-pink/20 transition-all text-center min-w-[200px] flex-1"
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="font-black text-white text-lg mb-2">{member.name}</h3>
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                  {member.role[lang] || member.role.en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-[40px] p-16 border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyber-gradient opacity-5"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
              {lang === 'ar' ? "جاهز للطلب؟" : "Ready to Order?"}
            </h2>
            <p className="text-white/40 mb-8 font-medium max-w-md mx-auto">
              {lang === 'ar' ? "تصفح مئات المطاعم واطلب وجبتك المفضلة الآن." : "Browse hundreds of restaurants and order your favorite meal now."}
            </p>
            <Link
              href="/restaurants"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-cyber-gradient font-black uppercase tracking-widest shadow-neon-pink hover:scale-105 transition-all"
            >
              <span>{lang === 'ar' ? "ابدأ الطلب" : "Start Ordering"}</span>
              <ChevronIcon size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
