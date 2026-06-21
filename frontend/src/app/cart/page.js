"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/I18nContext";
import api from "@/utils/api";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, cartTotal, clearCart } = useCart();
  const { t, lang } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const finalTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const orderData = {
        items: cartItems.map(item => ({
          menuItem: item._id || item.id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: finalTotal,
        // For simplicity, we assume the first item's restaurant is the target
        // Real implementation should probably enforce single-restaurant cart
        restaurant: cartItems[0]?.restaurantId || "648f12345678901234567890" 
      };

      await api.post("/orders", orderData);
      
      setOrderSuccess(true);
      clearCart();
      
      // Auto redirect to orders after 3 seconds
      setTimeout(() => {
        router.push("/orders");
      }, 3000);

    } catch (err) {
      console.error("Order error:", err);
      setError(lang === 'ar' ? "فشل إتمام الطلب. يرجى المحاولة لاحقاً." : "Failed to place order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="w-24 h-24 bg-cyber-lime/10 rounded-full flex items-center justify-center mb-8 border border-cyber-lime/30 shadow-neon-lime"
        >
          <CheckCircle2 size={48} className="text-cyber-lime" />
        </motion.div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
          {lang === 'ar' ? "تم استلام طلبك بنجاح!" : "Order Placed Successfully!"}
        </h1>
        <p className="text-white/40 mb-12 max-w-sm">
          {lang === 'ar' ? "سيتم توصيل طلبك في أسرع وقت. يمكنك تتبع الحالة من صفحة طلباتي." : "Your order will be delivered soon. You can track its status in the My Orders page."}
        </p>
        <Link 
          href="/orders" 
          className="px-10 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all font-black uppercase tracking-widest text-xs border border-white/10"
        >
          {t("nav_my_orders")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-[80vh]">
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">{t("cart_title")}</h1>
        <div className="h-1 w-20 bg-cyber-gradient rounded-full"></div>
      </div>

      {cartItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-20 rounded-[40px] text-center border-dashed border-white/10"
        >
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
             <ShoppingBag size={48} className="text-white/20" />
          </div>
          <h2 className="text-2xl font-bold text-white/40 mb-6">{t("cart_empty")}</h2>
          <Link 
            href="/restaurants" 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyber-gradient font-black uppercase tracking-widest hover:scale-105 transition-all shadow-neon-pink"
          >
            {t("btn_order_now")}
            {lang === 'ar' ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id || item._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass p-6 rounded-[32px] flex items-center gap-6 border-white/5 group hover:border-cyber-cyan/30 transition-all"
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                    {item.category === "Drinks" || item.category === "مشروبات" ? "🥤" : "🍔"}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                       <h3 className="font-black text-xl italic uppercase tracking-tight">{item.name}</h3>
                       <button 
                        onClick={() => removeFromCart(item.id || item._id)}
                        className="text-white/20 hover:text-red-500 transition-colors p-2"
                       >
                         <Trash2 size={18} />
                       </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4 glass bg-white/5 rounded-xl px-2 py-1">
                          <button 
                            onClick={() => removeFromCart(item.id || item._id)}
                            className="p-1 hover:text-cyber-cyan transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => addToCart(item)}
                            className="p-1 hover:text-cyber-pink transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                       </div>
                       <span className="font-black text-cyber-cyan italic">
                         {item.price * item.quantity} {t("currency")}
                       </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Card */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="glass p-8 rounded-[40px] border-white/10 relative overflow-hidden">
               <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyber-pink/10 rounded-full blur-[60px]"></div>
               
               <h3 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-cyber-cyan border-b border-white/10 pb-4">
                 {t("order_summary")}
               </h3>
               
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-bold uppercase">{t("subtotal")}</span>
                    <span className="font-black">{cartTotal} {t("currency")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-bold uppercase">{t("delivery_fee")}</span>
                    <span className="font-black text-cyber-pink">+{deliveryFee} {t("currency")}</span>
                  </div>
                  <div className="h-[2px] bg-white/5 my-4"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest text-cyber-cyan">{t("total")}</span>
                    <span className="text-3xl font-black italic text-glow-pink">
                      {finalTotal} <span className="text-[10px] text-white/40 not-italic">{t("currency")}</span>
                    </span>
                  </div>
               </div>

               {error && (
                 <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-xs font-bold mb-6 text-center">
                    {error}
                 </div>
               )}

               <button 
                 onClick={handlePlaceOrder}
                 disabled={loading}
                 className={`w-full py-5 rounded-2xl bg-cyber-gradient font-black text-lg shadow-neon-pink hover:scale-[1.02] transition-all flex items-center justify-center gap-4 uppercase italic tracking-tighter group disabled:opacity-50 disabled:grayscale`}
               >
                  {loading ? (
                    <Loader2 size={22} className="animate-spin" />
                  ) : (
                    <CreditCard size={22} className="group-hover:rotate-12 transition-transform" />
                  )}
                  <span>{t("btn_checkout")}</span>
               </button>
               
               {!user && (
                 <p className="mt-4 text-[10px] text-center text-cyber-cyan font-bold uppercase tracking-widest animate-pulse">
                    {lang === 'ar' ? 'يجب تسجيل الدخول لإتمام الطلب' : 'Login required to checkout'}
                 </p>
               )}
               
               <p className="mt-6 text-[10px] text-center text-white/20 font-bold uppercase tracking-widest leading-relaxed">
                  {lang === 'ar' ? 'بالضغط على إتمام الطلب، أنت توافق على شروط الخدمة' : 'By placing the order, you agree to the Terms of Service'}
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
