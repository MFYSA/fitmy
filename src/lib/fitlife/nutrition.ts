import type { NutritionArticle } from "./types";

export const NUTRITION_DISCLAIMER =
  "This is general educational information only and is not medical or dietary advice. Individual needs vary. Speak to a qualified doctor or registered dietitian before making significant changes, especially if you have a health condition, are pregnant, or take medication.";

export const NUTRITION_ARTICLES: NutritionArticle[] = [
  {
    slug: "protein",
    icon: "🍗",
    title: "Protein",
    summary: "The building block your body uses to repair and maintain muscle.",
    description:
      "Protein provides amino acids, which your body uses to repair tissue after training and to maintain muscle over time. Most general guidance suggests spreading protein across your meals rather than eating it all in one sitting.",
    benefits: [
      "Supports muscle repair after training",
      "Tends to be filling, which can help with appetite management",
      "Contributes to maintaining muscle while losing weight",
    ],
    examples: ["Chicken and turkey", "Fish and seafood", "Eggs", "Greek yoghurt", "Lentils and beans", "Tofu and tempeh"],
    tips: [
      "Aim to include a protein source in each main meal.",
      "Plant proteins work well when you combine a variety across the day.",
      "Protein powder is a convenience option, not a requirement.",
    ],
  },
  {
    slug: "carbohydrates",
    icon: "🍚",
    title: "Carbohydrates",
    summary: "Your body's most accessible fuel source for training.",
    description:
      "Carbohydrates are broken down into glucose, which fuels higher-intensity exercise. Minimally processed sources also bring fibre, vitamins and minerals along with the energy.",
    benefits: [
      "Provides readily available energy for workouts",
      "Fibre-rich sources support digestive health",
      "Helps replenish energy stores after exercise",
    ],
    examples: ["Oats", "Brown rice", "Potatoes and sweet potatoes", "Wholegrain bread and pasta", "Fruit", "Beans"],
    tips: [
      "Favour wholegrain and minimally processed options most of the time.",
      "Carbs before training can help you feel stronger during the session.",
      "You don't need to fear carbohydrates to lose weight — total intake matters more.",
    ],
  },
  {
    slug: "healthy-fats",
    icon: "🥑",
    title: "Healthy Fats",
    summary: "Essential for hormones, brain health and nutrient absorption.",
    description:
      "Fats are energy dense and essential. Unsaturated fats from foods like nuts, seeds, olive oil and oily fish are generally emphasised in dietary guidelines over heavily processed and saturated fat sources.",
    benefits: [
      "Helps your body absorb vitamins A, D, E and K",
      "Supports normal hormone production",
      "Adds flavour and satisfaction to meals",
    ],
    examples: ["Olive oil", "Avocado", "Almonds and walnuts", "Chia and flax seeds", "Salmon and sardines"],
    tips: [
      "Measure oils and nut butters — calories add up quickly.",
      "Include an oily fish source a couple of times a week if you eat fish.",
      "Nuts make a simple, portable snack.",
    ],
  },
  {
    slug: "fruits",
    icon: "🍎",
    title: "Fruits",
    summary: "Naturally sweet, hydrating and full of fibre and vitamins.",
    description:
      "Fruit provides vitamins, minerals, fibre and water in a convenient package. Variety matters: different colours tend to bring different nutrients.",
    benefits: ["Supports fibre intake", "Contributes to daily hydration", "Convenient alternative to sugary snacks"],
    examples: ["Berries", "Bananas", "Apples and pears", "Oranges", "Kiwi", "Frozen mixed fruit"],
    tips: [
      "Frozen fruit is just as useful as fresh and often cheaper.",
      "Whole fruit is generally more filling than juice.",
      "Pair fruit with protein or fat for a more satisfying snack.",
    ],
  },
  {
    slug: "vegetables",
    icon: "🥦",
    title: "Vegetables",
    summary: "High volume, low calorie, and packed with micronutrients.",
    description:
      "Vegetables add nutrients and bulk to meals for very few calories, which can make eating in a calorie deficit far more comfortable.",
    benefits: ["Adds volume to meals without many calories", "Broad range of vitamins and minerals", "Supports fibre and gut health"],
    examples: ["Broccoli", "Spinach and leafy greens", "Peppers", "Carrots", "Courgette", "Tomatoes"],
    tips: [
      "Roasting with a little oil and spice makes vegetables far more appealing.",
      "Keep bagged frozen vegetables on hand for busy days.",
      "Try to fill roughly half your plate with vegetables at main meals.",
    ],
  },
  {
    slug: "hydration",
    icon: "💧",
    title: "Hydration",
    summary: "Water affects energy, focus and how you feel while training.",
    description:
      "Even mild dehydration can make training feel harder. Needs vary with body size, climate and activity, so use thirst and urine colour as practical everyday cues.",
    benefits: ["Supports temperature regulation during exercise", "Helps maintain focus and energy", "Aids normal digestion"],
    examples: ["Plain water", "Sparkling water", "Herbal tea", "Water-rich fruit like watermelon", "Milk"],
    tips: [
      "Keep a bottle within arm's reach — visibility drives habit.",
      "Drink a glass with every meal as an easy anchor.",
      "Increase intake in hot weather and around longer workouts.",
    ],
  },
  {
    slug: "pre-workout",
    icon: "⚡",
    title: "Pre-Workout Nutrition",
    summary: "Fuel that helps you train with more energy and comfort.",
    description:
      "A meal with carbohydrates and some protein 1-3 hours before training suits most people. Closer to the session, smaller and lower-fibre snacks tend to sit better.",
    benefits: ["Can improve energy during the session", "Reduces the chance of feeling light-headed", "Helps you maintain intensity"],
    examples: ["Banana with peanut butter", "Oats with yoghurt", "Toast with honey", "Rice cakes", "A small smoothie"],
    tips: [
      "Experiment to find what your stomach tolerates.",
      "Very high fat or high fibre meals right before training can cause discomfort.",
      "Short easy sessions may not need any food beforehand.",
    ],
  },
  {
    slug: "post-workout",
    icon: "🥛",
    title: "Post-Workout Nutrition",
    summary: "Refuel and give your body what it needs to recover.",
    description:
      "After training, a meal containing protein and carbohydrates supports recovery. The old 30-minute 'anabolic window' idea is now considered much less strict — total daily intake matters more.",
    benefits: ["Supports muscle repair", "Replenishes energy stores", "Helps you feel recovered for the next session"],
    examples: ["Chicken with rice and vegetables", "Greek yoghurt with fruit", "Eggs on wholegrain toast", "Tofu stir fry", "Milk-based smoothie"],
    tips: [
      "Rehydrate as well as refuel.",
      "A normal balanced meal works fine — shakes are optional.",
      "Sleep is one of the most powerful recovery tools you have.",
    ],
  },
  {
    slug: "healthy-snacks",
    icon: "🥕",
    title: "Healthy Snacks",
    summary: "Bridge the gap between meals without derailing your goals.",
    description:
      "Snacks that combine protein or fat with fibre tend to keep you satisfied longer than refined carbohydrates alone. Portioning ahead of time helps.",
    benefits: ["Steadier energy between meals", "Can reduce overeating at dinner", "Extra chance to hit protein and fibre targets"],
    examples: ["Greek yoghurt with berries", "Apple with nut butter", "Hummus and carrot sticks", "Boiled eggs", "A small handful of nuts", "Cottage cheese"],
    tips: [
      "Pre-portion snacks instead of eating from the bag.",
      "Keep a default option ready so you're not deciding while hungry.",
      "If you're constantly hungry, your main meals may be too small.",
    ],
  },
];

export function getArticle(slug: string): NutritionArticle | undefined {
  return NUTRITION_ARTICLES.find((a) => a.slug === slug);
}
