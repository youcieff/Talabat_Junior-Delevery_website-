"use client";

import { useState, createContext, useContext, useEffect } from "react";

const translations = {
  ar: {
    // Navbar
    nav_restaurants: "المطاعم",
    nav_offers: "العروض",
    nav_about: "عنا",
    nav_login: "دخول",
    nav_logout: "خروج",
    nav_my_orders: "طلباتي",
    
    // Landing
    hero_tagline: "جيل جديد من التوصيل",
    hero_title_line1: "تذوق",
    hero_title_line2: "المستقبل",
    hero_subtitle: "استكشف أفضل المطاعم في منطقتك مع تجربة بصرية فريدة. سرعة، أمان، ونكهة لا تُنسى.",
    btn_order_now: "اطلب الآن",
    featured_restaurants: "المطاعم المميزة",
    view_all: "عرض الكل",
    
    // Restaurants
    search_placeholder: "ابحث عن مطعم...",
    category_all: "الكل",
    category_burger: "برجر",
    category_pizza: "بيتزا",
    category_sushi: "سوشي",
    
    // Admin
    admin_title: "لوحة التحكم",
    admin_subtitle: "نظرة عامة على نشاط النظام والطلبات الحالية.",
    admin_stats_sales: "إجمالي المبيعات",
    admin_stats_orders: "الطلبات النشطة",
    admin_stats_restaurants: "المطاعم المسجلة",
    admin_stats_users: "المستخدمين",
    admin_stats_change: "من الشهر الماضي",
    admin_restaurants_title: "إدارة المطاعم",
    admin_restaurants_subtitle: "إضافة وتعديل بيانات المطاعم المسجلة في النظام.",
    admin_orders_title: "إدارة الطلبات",
    admin_orders_subtitle: "متابعة وتحديث حالة طلبات العملاء في الوقت الفعلي.",
    filter_all: "الكل",
    btn_add_restaurant: "إضافة مطعم جديد",
    search_restaurant_placeholder: "ابحث عن مطعم...",
    btn_edit: "تعديل",
    btn_delete: "حذف",
    admin_menu_title: "إدارة المنيو",
    admin_menu_subtitle: "إضافة وتحديث الوجبات والأصناف لجميع المطاعم.",
    btn_add_item: "إضافة صنف جديد",
    label_all_restaurants: "جميع المطاعم",
    search_item_placeholder: "ابحث عن وجبة...",
    table_item: "الصنف",
    status_available: "متوفر",
    status_unavailable: "غير متوفر",
    recent_orders: "آخر الطلبات",
    table_order: "الطلب",
    table_customer: "العميل",
    table_restaurant: "المطعم",
    table_amount: "المبلغ",
    table_status: "الحالة",
    btn_view_all: "عرض الكل",
    
    // Auth
    login_title_1: "تسجيل",
    login_title_2: "الدخول",
    register_title_1: "إنشاء",
    register_title_2: "حساب",
    placeholder_name: "الاسم الكامل",
    placeholder_phone: "رقم الهاتف",
    placeholder_email: "البريد الإلكتروني",
    placeholder_password: "كلمة المرور",
    placeholder_confirm_password: "تأكيد كلمة المرور",
    btn_login: "دخول",
    btn_register: "إنشاء حساب",
    footer_no_account: "ليس لديك حساب؟",
    footer_have_account: "لديك حساب بالفعل؟",
    footer_register_link: "أنشئ حسابك الآن",
    footer_login_link: "تسجيل الدخول",
    error_login: "فشل تسجيل الدخول. يرجى التحقق من بياناتك.",
    error_password_mismatch: "كلمات المرور غير متوافقة",
    error_register: "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.",
    role_user: "عميل",
    role_admin: "مدير",
    role_label: "نوع الحساب",
    
    // General
    no_results: "لم يتم العثور على نتائج لبحثك",
    explore_label: "اكتشف",
    restaurants_subtitle: "مجموعة مختارة من أفضل الشركاء الذين يقدمون التميز حتى باب منزلك.",
    unit_min: "دقيقة",
    label_menu: "القائمة",
    btn_add_to_cart: "إضافة للسلة",
    currency: "ج.م",
    best_seller: "الأكثر مبيعاً",
    
    // Cart & Checkout
    cart_title: "عربة التسوق",
    cart_empty: "عربة التسوق فارغة حالياً",
    order_summary: "ملخص الطلب",
    subtotal: "الإجمالي الفرعي",
    delivery_fee: "رسوم التوصيل",
    total: "الإجمالي الكلي",
    btn_checkout: "إتمام الطلب",
    
    // Orders
    orders_title: "طلباتي",
    orders_subtitle: "تتبع حالة طلباتك الحالية ومراجعة سجل طلباتك السابقة.",
    order_id: "رقم الطلب",
    label_address: "عنوان التوصيل",
    label_items: "أصناف",
    status_pending: "قيد الانتظار",
    status_confirmed: "تم التأكيد",
    status_delivered: "تم التسليم",
    status_cancelled: "ملغي",
    no_orders: "لا يوجد طلبات سابقة",
  },
  en: {
    // Navbar
    nav_restaurants: "Restaurants",
    nav_offers: "Offers",
    nav_about: "About",
    nav_login: "Login",
    nav_logout: "Logout",
    nav_my_orders: "My Orders",
    
    // Landing
    hero_tagline: "Next Generation Delivery",
    hero_title_line1: "Taste",
    hero_title_line2: "The Future",
    hero_subtitle: "Explore high-rated restaurants with a unique visual experience. Speed, security, and unforgettable flavor.",
    btn_order_now: "Order Now",
    featured_restaurants: "Featured Restaurants",
    view_all: "View All",
    
    // Restaurants
    search_placeholder: "Search restaurants...",
    category_all: "All",
    category_burger: "Burger",
    category_pizza: "Pizza",
    category_sushi: "Sushi",
    
    // Admin
    admin_title: "Dashboard",
    admin_subtitle: "System activity overview and recent orders.",
    admin_stats_sales: "Total Sales",
    admin_stats_orders: "Active Orders",
    admin_stats_restaurants: "Restaurants",
    admin_stats_users: "Total Users",
    admin_stats_change: "from last month",
    admin_restaurants_title: "Restaurant Management",
    admin_restaurants_subtitle: "Add and edit restaurant data in the system.",
    admin_orders_title: "Order Tracking",
    admin_orders_subtitle: "Monitor and update customer order status in real-time.",
    filter_all: "All",
    btn_add_restaurant: "Add Restaurant",
    search_restaurant_placeholder: "Search for a restaurant...",
    btn_edit: "Edit",
    btn_delete: "Delete",
    admin_menu_title: "Menu Management",
    admin_menu_subtitle: "Add and update meals and categories for all restaurants.",
    btn_add_item: "Add New Item",
    label_all_restaurants: "All Restaurants",
    search_item_placeholder: "Search for a meal...",
    table_item: "Item",
    status_available: "Available",
    status_unavailable: "Unavailable",
    recent_orders: "Recent Orders",
    table_order: "Order",
    table_customer: "Customer",
    table_restaurant: "Restaurant",
    table_amount: "Amount",
    table_status: "Status",
    btn_view_all: "View All",

    // Auth
    login_title_1: "Access",
    login_title_2: "Portal",
    register_title_1: "Create",
    register_title_2: "Account",
    placeholder_name: "Full Name",
    placeholder_phone: "Phone Number",
    placeholder_email: "Email Address",
    placeholder_password: "Password",
    placeholder_confirm_password: "Confirm Password",
    btn_login: "Login",
    btn_register: "Register",
    footer_no_account: "Don't have an account?",
    footer_have_account: "Already have an account?",
    footer_register_link: "Create Account",
    footer_login_link: "Login Now",
    error_login: "Authentication failed. Please check your credentials.",
    error_password_mismatch: "Passwords do not match",
    error_register: "Failed to create account. Please try again.",
    role_user: "Customer",
    role_admin: "Admin",
    role_label: "Account Type",
    
    // General
    no_results: "No results found for your search",
    explore_label: "Discovery",
    restaurants_subtitle: "Curated selection of premium partners delivering excellence to your doorstep.",
    unit_min: "min",
    label_menu: "Menu",
    btn_add_to_cart: "Add to Cart",
    currency: "EGP",
    best_seller: "Most Popular",

    // Cart & Checkout
    cart_title: "Shopping Cart",
    cart_empty: "Your cart is currently empty",
    order_summary: "Order Summary",
    subtotal: "Subtotal",
    delivery_fee: "Delivery Fee",
    total: "Total Amount",
    btn_checkout: "Place Order",
    
    // Orders
    orders_title: "My Orders",
    orders_subtitle: "Track your live orders and review your history.",
    order_id: "Order ID",
    label_address: "Delivery Address",
    label_items: "Items",
    status_pending: "Pending",
    status_confirmed: "Confirmed",
    status_delivered: "Delivered",
    status_cancelled: "Cancelled",
    no_orders: "No orders found",
  }
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en"); // Default to English for professional look

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLang(savedLang);
    document.dir = savedLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLang;
  }, [lang]);

  const toggleLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useTranslation = () => useContext(I18nContext);
