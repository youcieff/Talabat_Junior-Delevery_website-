// Shared mock data for demo mode (used when API is unavailable)
// Images reference files in /public/images/restaurants/

export const MOCK_RESTAURANTS = [
  {
    _id: "demo-1",
    name: { en: "Junior Burger", ar: "برجر جونيور" },
    image: "/images/restaurants/burger.png",
    rating: 4.8,
    deliveryTime: "20-30",
    distance: "1.2",
    category: "burger",
    description: {
      en: "Future flavor in every bite. Premium aged beef patties grilled to perfection.",
      ar: "نكهة المستقبل في كل قضمة. شرائح لحم بقري فاخرة مشوية بإتقان.",
    },
    menuItems: [
      { _id: "m1-1", name: { en: "Classic Cheeseburger", ar: "تشيز برجر كلاسيك" }, price: 120, category: "Burger", description: { en: "Grilled beef, cheddar, lettuce, tomato.", ar: "لحم مشوي، شيدر، خس، طماطم." }, emoji: "🍔" },
      { _id: "m1-2", name: { en: "Double Smash Burger", ar: "دبل سماش برجر" }, price: 175, category: "Burger", description: { en: "Double smashed patties, special sauce, pickles.", ar: "باتيين مدهوسين، صوص خاص، مخلل." }, emoji: "🍔" },
      { _id: "m1-3", name: { en: "Crispy Chicken Sandwich", ar: "ساندويتش دجاج مقرمش" }, price: 140, category: "Chicken", description: { en: "Crispy fried chicken, coleslaw, jalapeño sauce.", ar: "دجاج مقرمش، كول سلو، صوص جالابينيو." }, emoji: "🥪" },
      { _id: "m1-4", name: { en: "Neon Loaded Fries", ar: "فريز نيون" }, price: 55, category: "Sides", description: { en: "Crispy fries topped with cheese sauce & bacon bits.", ar: "بطاطس مقرمشة مع صوص الجبن وبيكون." }, emoji: "🍟" },
      { _id: "m1-5", name: { en: "Cyber Blue Shake", ar: "كيب بلو شيك" }, price: 65, category: "Drinks", description: { en: "Blueberry & vanilla milkshake in neon blue.", ar: "ميلك شيك توت وفانيليا." }, emoji: "🥤" },
    ],
  },
  {
    _id: "demo-2",
    name: { en: "Future Sushi", ar: "سوشي المستقبل" },
    image: "/images/restaurants/sushi.png",
    rating: 4.9,
    deliveryTime: "30-45",
    distance: "3.5",
    category: "sushi",
    description: {
      en: "Authentic Japanese omakase experience with a neo-cyberpunk aesthetic.",
      ar: "تجربة أوماكاسي يابانية أصيلة بأسلوب نيو-سايبربانك.",
    },
    menuItems: [
      { _id: "m2-1", name: { en: "Dragon Roll", ar: "رول التنين" }, price: 210, category: "Rolls", description: { en: "Shrimp tempura, avocado, topped with tuna & eel sauce.", ar: "روبيان تيمبورا، أفوكادو، تونة وصوص ثعبان البحر." }, emoji: "🍣" },
      { _id: "m2-2", name: { en: "Rainbow Sashimi", ar: "سيشيمي راينبو" }, price: 190, category: "Sashimi", description: { en: "6 premium slices: tuna, salmon, yellowtail, octopus.", ar: "6 شرائح فاخرة: تونة، سالمون، ييلوتيل، أخطبوط." }, emoji: "🍱" },
      { _id: "m2-3", name: { en: "Spicy Tuna Roll", ar: "رول التونة الحارة" }, price: 150, category: "Rolls", description: { en: "Spicy tuna, cucumber, sriracha mayo.", ar: "تونة حارة، خيار، مايونيز سريراتشا." }, emoji: "🍣" },
      { _id: "m2-4", name: { en: "Miso Soup", ar: "شوربة ميسو" }, price: 40, category: "Soup", description: { en: "Traditional miso with tofu, wakame & green onion.", ar: "ميسو تقليدي مع توفو، واكامي وبصل أخضر." }, emoji: "🍲" },
      { _id: "m2-5", name: { en: "Matcha Lemonade", ar: "ليمونادة ماتشا" }, price: 55, category: "Drinks", description: { en: "Japanese matcha with fresh lemon, cold pressed.", ar: "ماتشا ياباني مع ليمون طازج." }, emoji: "🍵" },
    ],
  },
  {
    _id: "demo-3",
    name: { en: "Neon Pizza", ar: "بيتزا النيون" },
    image: "/images/restaurants/pizza.png",
    rating: 4.7,
    deliveryTime: "25-35",
    distance: "2.1",
    category: "pizza",
    description: {
      en: "Neapolitan-style wood-fired pizza with a cyberpunk twist.",
      ar: "بيتزا نابوليتانية محمصة بالحطب بلمسة سايبربانك.",
    },
    menuItems: [
      { _id: "m3-1", name: { en: "Margherita Classica", ar: "مارغريتا كلاسيكا" }, price: 130, category: "Pizza", description: { en: "San Marzano tomato, buffalo mozzarella, fresh basil.", ar: "طماطم سان مارزانو، موزاريلا جاموس، ريحان طازج." }, emoji: "🍕" },
      { _id: "m3-2", name: { en: "Cyber Pepperoni", ar: "بيبروني سايبر" }, price: 160, category: "Pizza", description: { en: "Double pepperoni, red sauce, mozzarella, chili oil.", ar: "بيبروني مزدوج، صوص أحمر، موزاريلا، زيت فلفل حار." }, emoji: "🍕" },
      { _id: "m3-3", name: { en: "Truffle Mushroom Pizza", ar: "بيتزا الكمأ والفطر" }, price: 195, category: "Pizza", description: { en: "Wild mushrooms, truffle oil, parmesan, arugula.", ar: "فطر بري، زيت كمأ، بارميزان، جرجير." }, emoji: "🍕" },
      { _id: "m3-4", name: { en: "Garlic Breadsticks", ar: "خبز الثوم" }, price: 45, category: "Sides", description: { en: "Oven-baked breadsticks with garlic butter & herbs.", ar: "عيدان خبز بالفرن مع زبدة الثوم والأعشاب." }, emoji: "🥖" },
      { _id: "m3-5", name: { en: "San Pellegrino", ar: "مياه سان بيليجرينو" }, price: 30, category: "Drinks", description: { en: "Premium Italian sparkling water.", ar: "مياه إيطالية فوارة فاخرة." }, emoji: "🍾" },
    ],
  },
  {
    _id: "demo-4",
    name: { en: "Matrix Shawarma", ar: "شاورما الماتريكس" },
    image: "/images/restaurants/burger.png",
    rating: 4.7,
    deliveryTime: "15-25",
    distance: "0.8",
    category: "oriental",
    description: {
      en: "Authentic Middle Eastern shawarma with premium cuts and secret spices.",
      ar: "شاورما شرق أوسطية أصيلة بقطع فاخرة وتوابل سرية.",
    },
    menuItems: [
      { _id: "m4-1", name: { en: "Chicken Shawarma Wrap", ar: "ساندويتش شاورما دجاج" }, price: 90, category: "Shawarma", description: { en: "Marinated chicken, garlic sauce, pickles, fries.", ar: "دجاج متبل، صوص ثوم، مخلل، بطاطس." }, emoji: "🌯" },
      { _id: "m4-2", name: { en: "Mixed Meat Platter", ar: "طبق اللحوم المشكلة" }, price: 220, category: "Platter", description: { en: "Chicken & lamb shawarma, hummus, fresh salad.", ar: "شاورما دجاج ولحم، حمص، سلطة طازجة." }, emoji: "🍽️" },
      { _id: "m4-3", name: { en: "Falafel Box", ar: "علبة فلافل" }, price: 60, category: "Sides", description: { en: "Crispy falafel with tahini and pita bread.", ar: "فلافل مقرمشة مع طحينة وخبز عربي." }, emoji: "🧆" },
      { _id: "m4-4", name: { en: "Ayran Yogurt Drink", ar: "عيران" }, price: 25, category: "Drinks", description: { en: "Cold salted yogurt drink, Turkish style.", ar: "مشروب زبادي بارد مملح بالطريقة التركية." }, emoji: "🥛" },
    ],
  },
  {
    _id: "demo-5",
    name: { en: "Cyber Noodles", ar: "نودلز سايبر" },
    image: "/images/restaurants/sushi.png",
    rating: 4.5,
    deliveryTime: "35-45",
    distance: "4.2",
    category: "asian",
    description: {
      en: "Pan-Asian noodle bar featuring ramen, pad thai, and more.",
      ar: "بار نودلز آسيوي يضم رامن وباد تاي وغيرها.",
    },
    menuItems: [
      { _id: "m5-1", name: { en: "Tonkotsu Ramen", ar: "رامن تونكوتسو" }, price: 175, category: "Ramen", description: { en: "Rich pork broth, soft egg, chashu pork, bamboo.", ar: "مرق لحم غني، بيضة طرية، لحم شاشو، خيزران." }, emoji: "🍜" },
      { _id: "m5-2", name: { en: "Spicy Pad Thai", ar: "باد تاي حار" }, price: 145, category: "Noodles", description: { en: "Stir-fried rice noodles, shrimp, peanuts, lime.", ar: "نودلز أرز مقلية، روبيان، فول سوداني، ليمون." }, emoji: "🍝" },
      { _id: "m5-3", name: { en: "Gyoza Dumplings", ar: "جيوزا" }, price: 80, category: "Sides", description: { en: "Pan-fried pork & cabbage dumplings, ponzu dip.", ar: "دمبلنج لحم وملفوف، صوص بونزو." }, emoji: "🥟" },
      { _id: "m5-4", name: { en: "Bubble Tea", ar: "بابل تي" }, price: 55, category: "Drinks", description: { en: "Taro milk tea with black boba pearls.", ar: "شاي حليب تارو مع لؤلؤ بوبا الأسود." }, emoji: "🧋" },
    ],
  },
  {
    _id: "demo-6",
    name: { en: "Digital Pasta", ar: "باستا الرقمية" },
    image: "/images/restaurants/pizza.png",
    rating: 4.4,
    deliveryTime: "25-35",
    distance: "1.9",
    category: "italian",
    description: {
      en: "Handmade Italian pasta crafted fresh daily with artisan sauces.",
      ar: "باستا إيطالية مصنوعة يدوياً طازجة يومياً مع صوصات فنية.",
    },
    menuItems: [
      { _id: "m6-1", name: { en: "Cacio e Pepe", ar: "كاتشيو إي بيبي" }, price: 140, category: "Pasta", description: { en: "Pecorino romano, black pepper, spaghetti.", ar: "بيكورينو رومانو، فلفل أسود، سباغيتي." }, emoji: "🍝" },
      { _id: "m6-2", name: { en: "Lasagna Bolognese", ar: "لازانيا بولونيز" }, price: 180, category: "Pasta", description: { en: "Layers of fresh pasta, slow-cooked meat ragù, béchamel.", ar: "طبقات من الباستا الطازجة، راغو لحم مطهو ببطء، بيشميل." }, emoji: "🥘" },
      { _id: "m6-3", name: { en: "Tiramisu", ar: "تيراميسو" }, price: 75, category: "Dessert", description: { en: "Classic Italian dessert with espresso-soaked ladyfingers.", ar: "حلوى إيطالية كلاسيكية مع بسكويت مغمور في الإسبريسو." }, emoji: "🍰" },
      { _id: "m6-4", name: { en: "Italian Soda", ar: "صودا إيطالية" }, price: 35, category: "Drinks", description: { en: "San Pellegrino limonata, blood orange.", ar: "صودا إيطالية بالليمون والبرتقال الأحمر." }, emoji: "🥤" },
    ],
  },
];

// Helper to get restaurant name in current language
export function getRestaurantName(restaurant, lang) {
  if (typeof restaurant.name === 'object') {
    return restaurant.name[lang] || restaurant.name.en;
  }
  return restaurant.name;
}

// Helper to get restaurant description in current language
export function getRestaurantDesc(restaurant, lang) {
  if (typeof restaurant.description === 'object') {
    return restaurant.description[lang] || restaurant.description.en;
  }
  return restaurant.description || "";
}

// Get mock restaurant by ID
export function getMockRestaurantById(id) {
  return MOCK_RESTAURANTS.find(r => r._id === id) || null;
}
