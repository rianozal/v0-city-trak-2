// Dummy data to simulate database and API responses
export interface Restaurant {
  id: string
  name: string
  category: string
  subcategory: string
  rating: number
  reviewCount: number
  rank: number
  movement: "up" | "down" | "same"
  movementAmount: number
  image: string
  mediaGallery: {
    images: string[]
    videos?: string[]
  }
  address: string
  phone: string
  description: string
  amenities: string[]
  hours: string
  priceRange: string
  coordinates: { lat: number; lng: number }
  isClaimed: boolean
  specificItems: string[]
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  restaurantId: string
  rating: number
  text: string
  photos: string[]
  date: string
  helpfulVotes: number
  attributes: {
    food: number
    service: number
    ambiance: number
    value: number
  }
}

export interface User {
  id: string
  username: string
  name: string
  avatar: string
  trakPoints: number
  level: string
  reviewCount: number
  photoCount: number
  followers: number
  following: number
}

// Updated category structure with hierarchical data
export interface CategoryStructure {
  id: string
  name: string
  subcategories: SubCategory[]
  specificItems: SpecificItem[]
}

export interface SubCategory {
  id: string
  name: string
  type: "cuisine" | "vibe" | "venue" | "activity" | "shopping" | "wellness"
  items?: string[]
}

export interface SpecificItem {
  id: string
  name: string
  description: string
}

export const categoryStructure: CategoryStructure[] = [
  {
    id: "restaurants",
    name: "Restaurants",
    subcategories: [
      // By Cuisine
      {
        id: "south-indian",
        name: "South Indian",
        type: "cuisine",
        items: ["best-ghee-roast-dosa", "best-idli-vada", "best-filter-coffee"],
      },
      { id: "north-indian", name: "North Indian", type: "cuisine", items: ["best-biryani", "best-chaat"] },
      { id: "chettinad", name: "Chettinad", type: "cuisine", items: ["best-biryani"] },
      { id: "andhra-style", name: "Andhra Style", type: "cuisine", items: ["best-biryani"] },
      { id: "chinese", name: "Chinese", type: "cuisine", items: ["best-chaat"] },
      { id: "italian", name: "Italian", type: "cuisine", items: ["best-wood-fired-pizza", "best-pasta"] },
      { id: "japanese", name: "Japanese", type: "cuisine", items: ["best-wood-fired-pizza"] },
      { id: "continental", name: "Continental", type: "cuisine", items: ["best-pasta"] },
      { id: "street-food", name: "Street Food", type: "cuisine", items: ["best-chaat", "best-idli-vada"] },
      {
        id: "bakeries-desserts",
        name: "Bakeries & Desserts",
        type: "cuisine",
        items: ["best-cheesecake", "best-filter-coffee"],
      },
      // By Vibe/Occasion
      {
        id: "fine-dining",
        name: "Fine Dining",
        type: "vibe",
        items: ["best-wood-fired-pizza", "best-pasta", "best-cheesecake"],
      },
      { id: "casual-dining", name: "Casual Dining", type: "vibe", items: ["best-biryani", "best-chaat"] },
      { id: "rooftop", name: "Rooftop", type: "vibe", items: ["best-wood-fired-pizza", "best-cheesecake"] },
      { id: "cafes", name: "Cafes", type: "vibe", items: ["best-filter-coffee", "best-cheesecake"] },
      { id: "pure-veg", name: "Pure Veg", type: "vibe", items: ["best-ghee-roast-dosa", "best-idli-vada"] },
      { id: "family-friendly", name: "Family Friendly", type: "vibe", items: ["best-biryani", "best-pasta"] },
      { id: "pet-friendly", name: "Pet Friendly", type: "vibe", items: ["best-filter-coffee"] },
      { id: "late-night-eats", name: "Late Night Eats", type: "vibe", items: ["best-chaat", "best-biryani"] },
    ],
    specificItems: [
      { id: "best-biryani", name: "Best Biryani", description: "Ambur, Hyderabadi styles" },
      { id: "best-ghee-roast-dosa", name: "Best Ghee Roast Dosa", description: "Crispy and buttery perfection" },
      { id: "best-idli-vada", name: "Best Idli / Vada Combo", description: "Traditional breakfast combo" },
      { id: "best-filter-coffee", name: "Best Filter Coffee", description: "Authentic South Indian coffee" },
      { id: "best-chaat", name: "Best Chaat", description: "Street food favorites" },
      { id: "best-wood-fired-pizza", name: "Best Wood-Fired Pizza", description: "Authentic Italian style" },
      { id: "best-pasta", name: "Best Pasta", description: "Fresh and flavorful" },
      { id: "best-cheesecake", name: "Best Cheesecake", description: "Creamy dessert perfection" },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    subcategories: [
      { id: "movie-theaters", name: "Movie Theaters", type: "venue", items: ["best-dolby-atmos", "best-imax"] },
      { id: "live-music", name: "Live Music Venues", type: "venue", items: ["best-acoustics", "top-open-mic"] },
      {
        id: "theatres-arts",
        name: "Theatres & Performing Arts",
        type: "venue",
        items: ["best-acoustics", "most-instagrammable"],
      },
      { id: "comedy-clubs", name: "Comedy Clubs", type: "venue", items: ["top-open-mic"] },
      { id: "galleries-museums", name: "Art Galleries & Museums", type: "venue", items: ["most-instagrammable"] },
      { id: "gaming-vr", name: "Gaming Arcades & VR", type: "venue", items: ["most-immersive-vr"] },
    ],
    specificItems: [
      { id: "best-dolby-atmos", name: "Best Dolby Atmos Experience", description: "Immersive sound technology" },
      { id: "best-imax", name: "Best IMAX Screen", description: "Large format cinema experience" },
      { id: "best-acoustics", name: "Venue with Best Acoustics", description: "Perfect sound quality" },
      { id: "most-instagrammable", name: "Most Instagrammable Gallery", description: "Perfect for social media" },
      { id: "top-open-mic", name: "Top Stand-up Open Mic Night", description: "Comedy talent showcase" },
      { id: "most-immersive-vr", name: "Most Immersive VR Experience", description: "Virtual reality at its best" },
    ],
  },
  {
    id: "nightlife",
    name: "Nightlife",
    subcategories: [
      { id: "bars-pubs", name: "Bars & Pubs", type: "venue", items: ["best-craft-beer", "best-happy-hour"] },
      { id: "breweries", name: "Breweries", type: "venue", items: ["best-craft-beer"] },
      { id: "nightclubs", name: "Nightclubs", type: "venue", items: ["best-dj-venue", "best-ladies-night"] },
      { id: "rooftop-lounges", name: "Rooftop Lounges", type: "venue", items: ["best-espresso-martini"] },
      { id: "cocktail-bars", name: "Cocktail Bars", type: "venue", items: ["best-espresso-martini"] },
      { id: "sports-bars", name: "Sports Bars", type: "venue", items: ["best-sports-screening", "best-happy-hour"] },
    ],
    specificItems: [
      { id: "best-craft-beer", name: "Best Craft Beer Selection", description: "Variety of local and imported brews" },
      { id: "best-espresso-martini", name: "Best Espresso Martini", description: "Perfect coffee cocktail" },
      { id: "best-dj-venue", name: "Venue with the Best DJ", description: "Top music and atmosphere" },
      { id: "best-ladies-night", name: "Best Ladies' Night Deals", description: "Special offers and entertainment" },
      { id: "best-happy-hour", name: "Best Happy Hour", description: "Great deals and timing" },
      {
        id: "best-sports-screening",
        name: "Best Live Sports Screening Vibe",
        description: "Ultimate sports viewing experience",
      },
    ],
  },
  {
    id: "activities-sports",
    name: "Activities & Sports",
    subcategories: [
      { id: "bowling", name: "Bowling Alleys", type: "activity", items: ["best-go-karts"] },
      { id: "go-karting", name: "Go-Karting", type: "activity", items: ["best-go-karts"] },
      { id: "cricket-nets", name: "Cricket Nets/Turfs", type: "activity", items: ["best-football-turf"] },
      { id: "football-turfs", name: "Football Turfs", type: "activity", items: ["best-football-turf"] },
      { id: "swimming-pools", name: "Swimming Pools", type: "activity", items: ["cleanest-pool"] },
      { id: "adventure-parks", name: "Adventure Parks", type: "activity", items: ["longest-zipline"] },
      { id: "escape-rooms", name: "Escape Rooms", type: "activity", items: ["most-challenging-escape"] },
      { id: "paintball", name: "Paintball Arenas", type: "activity", items: ["longest-zipline"] },
    ],
    specificItems: [
      { id: "best-go-karts", name: "Best Maintained Go-Karts", description: "Well-maintained racing experience" },
      {
        id: "most-challenging-escape",
        name: "Most Challenging Escape Room",
        description: "Ultimate puzzle experience",
      },
      { id: "best-football-turf", name: "Best Floodlit Football Turf", description: "Perfect playing conditions" },
      { id: "cleanest-pool", name: "Cleanest Public Pool", description: "Hygiene and maintenance standards" },
      { id: "longest-zipline", name: "Longest Zipline", description: "Thrilling adventure experience" },
    ],
  },
  {
    id: "shopping",
    name: "Shopping",
    subcategories: [
      {
        id: "malls",
        name: "Shopping Malls",
        type: "shopping",
        items: ["best-electronics-deals", "top-international-brands"],
      },
      {
        id: "street-markets",
        name: "Street Markets",
        type: "shopping",
        items: ["best-bargaining", "best-handicrafts"],
      },
      {
        id: "boutiques",
        name: "High-Street Boutiques",
        type: "shopping",
        items: ["best-silk-sarees", "top-international-brands"],
      },
      {
        id: "department-stores",
        name: "Department Stores",
        type: "shopping",
        items: ["best-electronics-deals", "top-international-brands"],
      },
      {
        id: "specialty-stores",
        name: "Specialty Stores",
        type: "shopping",
        items: ["best-handicrafts", "best-silk-sarees"],
      },
    ],
    specificItems: [
      { id: "best-electronics-deals", name: "Best Deals on Electronics", description: "Value for money tech shopping" },
      { id: "best-silk-sarees", name: "Best Silk Saree Collection", description: "Traditional and designer options" },
      { id: "best-bargaining", name: "Best Place for Bargaining", description: "Street shopping experience" },
      {
        id: "top-international-brands",
        name: "Top Store for International Brands",
        description: "Global fashion and lifestyle",
      },
      { id: "best-handicrafts", name: "Best Handicrafts Store", description: "Local artisan products" },
    ],
  },
  {
    id: "relaxation",
    name: "Relaxation",
    subcategories: [
      { id: "parks", name: "Public Parks", type: "wellness", items: ["quietest-park", "best-sunset-view"] },
      { id: "beaches", name: "Beaches", type: "wellness", items: ["cleanest-beach", "best-sunset-view"] },
      {
        id: "nature-reserves",
        name: "Nature Reserves",
        type: "wellness",
        items: ["quietest-park", "best-sunset-view"],
      },
      { id: "lakes-waterfronts", name: "Lakes & Waterfronts", type: "wellness", items: ["best-sunset-view"] },
      { id: "spas-wellness", name: "Spas & Wellness Centers", type: "wellness", items: ["best-massage"] },
      { id: "meditation-yoga", name: "Meditation & Yoga Centers", type: "wellness", items: ["most-serene-yoga"] },
    ],
    specificItems: [
      { id: "quietest-park", name: "Quietest Park for Reading", description: "Peaceful environment for relaxation" },
      { id: "cleanest-beach", name: "Cleanest Beach Stretch", description: "Well-maintained coastal area" },
      { id: "best-sunset-view", name: "Best Sunset Viewpoint", description: "Perfect evening spot" },
      { id: "best-massage", name: "Best Deep Tissue Massage", description: "Professional therapeutic treatment" },
      { id: "most-serene-yoga", name: "Most Serene Yoga Class", description: "Peaceful mind-body experience" },
    ],
  },
]

export const categories = [
  "All",
  "Restaurants",
  "Entertainment",
  "Nightlife",
  "Activities & Sports",
  "Shopping",
  "Relaxation",
]

export const timeframes = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "all", label: "All Time" },
]

export const dummyRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Murugan Idli Shop",
    category: "Restaurants",
    subcategory: "South Indian",
    rating: 4.6,
    reviewCount: 2847,
    rank: 1,
    movement: "up",
    movementAmount: 2,
    image: "/south-indian-restaurant.png",
    mediaGallery: {
      images: [
        "/south-indian-restaurant.png",
        "/south-indian-restaurant-interior.png",
        "/traditional-south-indian-kitchen.png",
        "/idli-dosa-counter.png",
        "/restaurant-exterior.png",
        "/banana-leaf-serving.png",
      ],
    },
    address: "T. Nagar, Chennai",
    phone: "+91 98765 43210",
    description: "Authentic South Indian breakfast and tiffin items served in a traditional setting.",
    amenities: ["Takeaway", "Family Friendly", "Vegetarian Options"],
    hours: "6:00 AM - 10:00 PM",
    priceRange: "₹₹",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    isClaimed: true,
    specificItems: ["best-idli-vada", "best-ghee-roast-dosa", "best-filter-coffee"],
  },
  {
    id: "2",
    name: "Dakshin",
    category: "Restaurants",
    subcategory: "Fine Dining",
    rating: 4.8,
    reviewCount: 1523,
    rank: 2,
    movement: "same",
    movementAmount: 0,
    image: "/elegant-fine-dining.png",
    mediaGallery: {
      images: [
        "/elegant-fine-dining.png",
        "/elegant-fine-dining.png",
        "/gourmet-south-indian-plating.png",
        "/upscale-restaurant-ambiance.png",
        "/chef-traditional-dishes.png",
      ],
    },
    address: "Chettinad, Chennai",
    phone: "+91 98765 43211",
    description: "Upscale South Indian cuisine with modern presentation and traditional flavors.",
    amenities: ["Fine Dining", "Air Conditioned", "Valet Parking", "Bar"],
    hours: "12:00 PM - 11:00 PM",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 13.0878, lng: 80.2785 },
    isClaimed: true,
    specificItems: ["best-chettinad-chicken", "best-traditional-thali"],
  },
  {
    id: "3",
    name: "Ponnusamy Hotel",
    category: "Restaurants",
    subcategory: "Chettinad",
    rating: 4.4,
    reviewCount: 3241,
    rank: 3,
    movement: "down",
    movementAmount: 1,
    image: "/biryani-restaurant.png",
    mediaGallery: {
      images: [
        "/biryani-restaurant.png",
        "/elegant-fine-dining.png",
        "/gourmet-south-indian-plating.png",
        "/upscale-restaurant-ambiance.png",
        "/chef-traditional-dishes.png",
      ],
    },
    address: "Egmore, Chennai",
    phone: "+91 98765 43212",
    description: "Famous for authentic Chettinad cuisine and flavorful biryanis.",
    amenities: ["Takeaway", "Dine-in", "Spicy Food", "Non-Veg"],
    hours: "11:00 AM - 11:00 PM",
    priceRange: "₹₹",
    coordinates: { lat: 13.0732, lng: 80.2609 },
    isClaimed: false,
    specificItems: ["best-biryani", "best-chaat"],
  },
  {
    id: "4",
    name: "Phoenix MarketCity",
    category: "Entertainment",
    subcategory: "Movie Theaters",
    rating: 4.3,
    reviewCount: 892,
    rank: 4,
    movement: "up",
    movementAmount: 3,
    image: "/modern-multiplex.png",
    mediaGallery: {
      images: [
        "/modern-multiplex.png",
        "/south-indian-restaurant-interior.png",
        "/traditional-south-indian-kitchen.png",
        "/idli-dosa-counter.png",
        "/restaurant-exterior.png",
        "/banana-leaf-serving.png",
      ],
    },
    address: "Velachery, Chennai",
    phone: "+91 98765 43213",
    description: "Premium multiplex with latest technology and comfortable seating.",
    amenities: ["IMAX", "Dolby Atmos", "Food Court", "Parking"],
    hours: "9:00 AM - 12:00 AM",
    priceRange: "₹₹₹",
    coordinates: { lat: 12.9756, lng: 80.2207 },
    isClaimed: false,
    specificItems: [],
  },
  {
    id: "5",
    name: "Thalappakatti Restaurant",
    category: "Restaurants",
    subcategory: "Biryani",
    rating: 4.5,
    reviewCount: 4156,
    rank: 5,
    movement: "up",
    movementAmount: 1,
    image: "/biryani-restaurant.png",
    mediaGallery: {
      images: [
        "/biryani-restaurant.png",
        "/elegant-fine-dining.png",
        "/gourmet-south-indian-plating.png",
        "/upscale-restaurant-ambiance.png",
        "/chef-traditional-dishes.png",
      ],
    },
    address: "Anna Nagar, Chennai",
    phone: "+91 98765 43214",
    description: "Legendary biryani house known for authentic Dindigul-style biryani.",
    amenities: ["Takeaway", "Home Delivery", "Family Friendly", "Non-Vegetarian"],
    hours: "11:00 AM - 11:00 PM",
    priceRange: "₹₹",
    coordinates: { lat: 13.085, lng: 80.2101 },
    isClaimed: true,
    specificItems: [],
  },
  {
    id: "6",
    name: "Hard Rock Cafe",
    category: "Nightlife",
    subcategory: "Bars & Pubs",
    rating: 4.2,
    reviewCount: 1876,
    rank: 6,
    movement: "up",
    movementAmount: 2,
    image: "/rock-bar-memorabilia-stage.png",
    mediaGallery: {
      images: [
        "/rock-bar-memorabilia-stage.png",
        "/south-indian-restaurant-interior.png",
        "/traditional-south-indian-kitchen.png",
        "/idli-dosa-counter.png",
        "/restaurant-exterior.png",
        "/banana-leaf-serving.png",
      ],
    },
    address: "Express Avenue Mall, Royapettah",
    phone: "+91 98765 43215",
    description: "Iconic rock-themed restaurant and bar with live music and memorabilia.",
    amenities: ["Live Music", "Bar", "International Cuisine", "Late Night"],
    hours: "12:00 PM - 1:00 AM",
    priceRange: "₹₹₹",
    coordinates: { lat: 13.0569, lng: 80.257 },
    isClaimed: true,
    specificItems: [],
  },
  {
    id: "7",
    name: "Smaaash",
    category: "Activities & Sports",
    subcategory: "Gaming Arcades & VR",
    rating: 4.4,
    reviewCount: 1234,
    rank: 7,
    movement: "same",
    movementAmount: 0,
    image: "/modern-gaming-arcade.png",
    mediaGallery: {
      images: [
        "/modern-gaming-arcade.png",
        "/south-indian-restaurant-interior.png",
        "/traditional-south-indian-kitchen.png",
        "/idli-dosa-counter.png",
        "/restaurant-exterior.png",
        "/banana-leaf-serving.png",
      ],
    },
    address: "Express Avenue Mall, Royapettah",
    phone: "+91 98765 43216",
    description: "Ultimate gaming and sports entertainment destination with VR experiences.",
    amenities: ["VR Gaming", "Sports Simulators", "Bowling", "Food & Beverages"],
    hours: "11:00 AM - 11:00 PM",
    priceRange: "₹₹₹",
    coordinates: { lat: 13.0569, lng: 80.257 },
    isClaimed: false,
    specificItems: [],
  },
  {
    id: "8",
    name: "Express Avenue Mall",
    category: "Shopping",
    subcategory: "Shopping Malls",
    rating: 4.1,
    reviewCount: 3456,
    rank: 8,
    movement: "down",
    movementAmount: 1,
    image: "/modern-shopping-mall.png",
    mediaGallery: {
      images: [
        "/modern-shopping-mall.png",
        "/south-indian-restaurant-interior.png",
        "/traditional-south-indian-kitchen.png",
        "/idli-dosa-counter.png",
        "/restaurant-exterior.png",
        "/banana-leaf-serving.png",
      ],
    },
    address: "Royapettah, Chennai",
    phone: "+91 98765 43217",
    description: "Premier shopping destination with international brands and entertainment.",
    amenities: ["International Brands", "Food Court", "Cinema", "Parking"],
    hours: "10:00 AM - 10:00 PM",
    priceRange: "₹₹₹",
    coordinates: { lat: 13.0569, lng: 80.257 },
    isClaimed: true,
    specificItems: [],
  },
  {
    id: "9",
    name: "Elliot's Beach",
    category: "Relaxation",
    subcategory: "Beaches",
    rating: 4.0,
    reviewCount: 2134,
    rank: 9,
    movement: "up",
    movementAmount: 1,
    image: "/sunset-beach-palms.png",
    mediaGallery: {
      images: [
        "/sunset-beach-palms.png",
        "/south-indian-restaurant-interior.png",
        "/traditional-south-indian-kitchen.png",
        "/idli-dosa-counter.png",
        "/restaurant-exterior.png",
        "/banana-leaf-serving.png",
      ],
    },
    address: "Besant Nagar, Chennai",
    phone: "N/A",
    description: "Clean and well-maintained beach perfect for evening walks and relaxation.",
    amenities: ["Clean Beach", "Food Stalls", "Parking", "Evening Walks"],
    hours: "24 Hours",
    priceRange: "Free",
    coordinates: { lat: 13.0067, lng: 80.2669 },
    isClaimed: false,
    specificItems: [],
  },
  {
    id: "10",
    name: "Lulu Mall",
    category: "Shopping",
    subcategory: "Shopping Malls",
    rating: 4.3,
    reviewCount: 2876,
    rank: 10,
    movement: "up",
    movementAmount: 3,
    image: "/modern-mall-interior.png",
    mediaGallery: {
      images: [
        "/modern-mall-interior.png",
        "/south-indian-restaurant-interior.png",
        "/traditional-south-indian-kitchen.png",
        "/idli-dosa-counter.png",
        "/restaurant-exterior.png",
        "/banana-leaf-serving.png",
      ],
    },
    address: "Pallavaram, Chennai",
    phone: "+91 98765 43218",
    description: "Largest shopping mall in South India with diverse retail and entertainment options.",
    amenities: ["Hypermarket", "Food Court", "Entertainment Zone", "Ample Parking"],
    hours: "10:00 AM - 10:00 PM",
    priceRange: "₹₹",
    coordinates: { lat: 12.9675, lng: 80.1471 },
    isClaimed: true,
    specificItems: [],
  },
  {
    id: "11",
    name: "Cafe Mocha",
    category: "Restaurants",
    subcategory: "Cafes",
    rating: 4.2,
    reviewCount: 1876,
    rank: 11,
    movement: "up",
    movementAmount: 3,
    image: "/modern-cafe.png",
    mediaGallery: {
      images: [
        "/modern-cafe.png",
        "/south-indian-restaurant-interior.png",
        "/traditional-south-indian-kitchen.png",
        "/idli-dosa-counter.png",
        "/restaurant-exterior.png",
        "/banana-leaf-serving.png",
      ],
    },
    address: "Nungambakkam, Chennai",
    phone: "+91 98765 43213",
    description: "Cozy cafe with great coffee and continental dishes.",
    amenities: ["WiFi", "Air Conditioned", "Pet Friendly", "Outdoor Seating"],
    hours: "8:00 AM - 11:00 PM",
    priceRange: "₹₹",
    coordinates: { lat: 13.0569, lng: 80.2378 },
    isClaimed: true,
    specificItems: ["best-filter-coffee", "best-cheesecake", "best-pasta"],
  },
  {
    id: "12",
    name: "Buhari Hotel",
    category: "Restaurants",
    subcategory: "North Indian",
    rating: 4.3,
    reviewCount: 2156,
    rank: 12,
    movement: "up",
    movementAmount: 1,
    image: "/north-indian-restaurant.png",
    mediaGallery: {
      images: [
        "/north-indian-restaurant.png",
        "/south-indian-restaurant-interior.png",
        "/traditional-south-indian-kitchen.png",
        "/idli-dosa-counter.png",
        "/restaurant-exterior.png",
        "/banana-leaf-serving.png",
      ],
    },
    address: "Anna Salai, Chennai",
    phone: "+91 98765 43214",
    description: "Historic restaurant known for biryanis and North Indian cuisine.",
    amenities: ["Family Friendly", "Takeaway", "Parking", "AC"],
    hours: "11:30 AM - 11:00 PM",
    priceRange: "₹₹",
    coordinates: { lat: 13.0475, lng: 80.2532 },
    isClaimed: true,
    specificItems: ["best-biryani", "best-wood-fired-pizza"],
  },
  {
    id: "13",
    name: "Sangeetha Restaurant",
    category: "Restaurants",
    subcategory: "Pure Veg",
    rating: 4.1,
    reviewCount: 1987,
    rank: 13,
    movement: "down",
    movementAmount: 2,
    image: "/vegetarian-restaurant.png",
    mediaGallery: {
      images: [
        "/vegetarian-restaurant.png",
        "/south-indian-restaurant-interior.png",
        "/traditional-south-indian-kitchen.png",
        "/idli-dosa-counter.png",
        "/restaurant-exterior.png",
        "/banana-leaf-serving.png",
      ],
    },
    address: "T. Nagar, Chennai",
    phone: "+91 98765 43215",
    description: "Popular vegetarian restaurant chain with South Indian specialties.",
    amenities: ["Pure Veg", "Family Friendly", "Takeaway", "Budget Friendly"],
    hours: "6:30 AM - 10:30 PM",
    priceRange: "₹",
    coordinates: { lat: 13.0418, lng: 80.2341 },
    isClaimed: true,
    specificItems: ["best-ghee-roast-dosa", "best-idli-vada", "best-chaat"],
  },
  // Bangalore restaurants
  {
    id: "blr-1",
    name: "MTR",
    category: "Restaurants",
    subcategory: "South Indian",
    rating: 4.5,
    reviewCount: 3421,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/south-indian-restaurant.png",
    mediaGallery: {
      images: ["/south-indian-restaurant.png", "/traditional-south-indian-kitchen.png", "/idli-dosa-counter.png"],
    },
    address: "Lalbagh Road, Bangalore",
    phone: "+91 80 2222 0022",
    description: "Legendary South Indian restaurant serving authentic Karnataka cuisine since 1924.",
    amenities: ["Takeaway", "Family Friendly", "Vegetarian Only"],
    hours: "6:30 AM - 11:00 AM, 3:00 PM - 8:30 PM",
    priceRange: "₹₹",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    isClaimed: true,
    specificItems: ["best-idli-vada", "best-ghee-roast-dosa", "best-filter-coffee"],
  },
  {
    id: "blr-2",
    name: "Toit",
    category: "Restaurants",
    subcategory: "Casual Dining",
    rating: 4.3,
    reviewCount: 2156,
    rank: 2,
    movement: "up",
    movementAmount: 1,
    image: "/modern-multiplex.png",
    mediaGallery: {
      images: ["/modern-multiplex.png", "/rock-bar-memorabilia-stage.png"],
    },
    address: "Indiranagar, Bangalore",
    phone: "+91 80 4112 8888",
    description: "Popular microbrewery with craft beers and continental cuisine.",
    amenities: ["Brewery", "Live Music", "Outdoor Seating"],
    hours: "12:00 PM - 1:00 AM",
    priceRange: "₹₹₹",
    coordinates: { lat: 12.9784, lng: 77.6408 },
    isClaimed: true,
    specificItems: ["best-craft-beer", "best-pizza"],
  },
  {
    id: "blr-3",
    name: "Koshy's",
    category: "Restaurants",
    subcategory: "Continental",
    rating: 4.1,
    reviewCount: 1876,
    rank: 3,
    movement: "down",
    movementAmount: 1,
    image: "/elegant-fine-dining.png",
    mediaGallery: {
      images: ["/elegant-fine-dining.png", "/upscale-restaurant-ambiance.png"],
    },
    address: "St. Mark's Road, Bangalore",
    phone: "+91 80 2221 3793",
    description: "Historic restaurant serving continental and Indian cuisine since 1940.",
    amenities: ["Historic", "Continental Food", "Family Friendly"],
    hours: "8:00 AM - 11:00 PM",
    priceRange: "₹₹",
    coordinates: { lat: 12.9716, lng: 77.6033 },
    isClaimed: false,
    specificItems: ["best-english-breakfast", "best-mutton-chops"],
  },
  {
    id: "blr-4",
    name: "PVR Forum Mall",
    category: "Entertainment",
    subcategory: "Multiplex",
    rating: 4.2,
    reviewCount: 2341,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/modern-multiplex.png",
    mediaGallery: {
      images: ["/modern-multiplex.png", "/modern-gaming-arcade.png"],
    },
    address: "Hosur Road, Koramangala, Bangalore",
    phone: "+91 80 4224 4224",
    description: "Premium multiplex with latest movies and IMAX experience.",
    amenities: ["IMAX", "Dolby Atmos", "Food Court"],
    hours: "9:00 AM - 12:00 AM",
    priceRange: "₹₹₹",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    isClaimed: true,
    specificItems: ["best-imax-experience", "best-movie-snacks"],
  },
  {
    id: "blr-5",
    name: "Wonderla",
    category: "Entertainment",
    subcategory: "Amusement Park",
    rating: 4.4,
    reviewCount: 5678,
    rank: 2,
    movement: "up",
    movementAmount: 2,
    image: "/modern-gaming-arcade.png",
    mediaGallery: {
      images: ["/modern-gaming-arcade.png", "/modern-multiplex.png"],
    },
    address: "Mysore Road, Bidadi, Bangalore",
    phone: "+91 80 2749 9999",
    description: "Thrilling amusement park with water rides and adventure activities.",
    amenities: ["Water Rides", "Adventure Sports", "Family Entertainment"],
    hours: "11:00 AM - 6:00 PM",
    priceRange: "₹₹₹",
    coordinates: { lat: 12.7953, lng: 77.391 },
    isClaimed: true,
    specificItems: ["best-water-slides", "best-roller-coaster"],
  },
  {
    id: "blr-6",
    name: "UB City Mall",
    category: "Shopping",
    subcategory: "Luxury Mall",
    rating: 4.3,
    reviewCount: 3456,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/modern-shopping-mall.png",
    mediaGallery: {
      images: ["/modern-shopping-mall.png", "/elegant-fine-dining.png"],
    },
    address: "Vittal Mallya Road, Bangalore",
    phone: "+91 80 4017 4017",
    description: "Luxury shopping destination with premium brands and fine dining.",
    amenities: ["Luxury Brands", "Fine Dining", "Valet Parking"],
    hours: "10:00 AM - 10:00 PM",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    isClaimed: true,
    specificItems: ["best-luxury-shopping", "best-designer-stores"],
  },

  {
    id: "dxb-1",
    name: "Pierchic",
    category: "Restaurants",
    subcategory: "Fine Dining",
    rating: 4.9,
    reviewCount: 1543,
    rank: 1,
    movement: "up",
    movementAmount: 1,
    image: "/elegant-fine-dining.png",
    mediaGallery: {
      images: ["/elegant-fine-dining.png", "/upscale-restaurant-ambiance.png"],
    },
    address: "Al Qasr, Madinat Jumeirah, Dubai",
    phone: "+971 4 366 6730",
    description: "Overwater fine dining restaurant with stunning views and exceptional seafood.",
    amenities: ["Fine Dining", "Sea View", "Valet Parking"],
    hours: "7:00 PM - 11:00 PM",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 25.1321, lng: 55.1851 },
    isClaimed: true,
    specificItems: ["best-seafood", "best-romantic-dinner"],
  },
  {
    id: "dxb-2",
    name: "Al Hadheerah",
    category: "Restaurants",
    subcategory: "Middle Eastern",
    rating: 4.7,
    reviewCount: 2234,
    rank: 2,
    movement: "same",
    movementAmount: 0,
    image: "/biryani-restaurant.png",
    mediaGallery: {
      images: ["/biryani-restaurant.png", "/south-indian-restaurant.png"],
    },
    address: "Al Sahra Desert Resort, Dubai",
    phone: "+971 4 832 9900",
    description: "Desert dining experience with traditional Emirati cuisine and entertainment.",
    amenities: ["Desert Experience", "Cultural Show", "Traditional Cuisine"],
    hours: "7:30 PM - 11:30 PM",
    priceRange: "₹₹₹",
    coordinates: { lat: 25.0657, lng: 55.2708 },
    isClaimed: true,
    specificItems: ["best-emirati-cuisine", "best-desert-experience"],
  },
  {
    id: "dxb-3",
    name: "Zuma Dubai",
    category: "Restaurants",
    subcategory: "Japanese",
    rating: 4.6,
    reviewCount: 1876,
    rank: 3,
    movement: "up",
    movementAmount: 2,
    image: "/elegant-fine-dining.png",
    mediaGallery: {
      images: ["/elegant-fine-dining.png", "/gourmet-south-indian-plating.png"],
    },
    address: "Gate Village, DIFC, Dubai",
    phone: "+971 4 425 5660",
    description: "Contemporary Japanese cuisine in a sophisticated setting.",
    amenities: ["Japanese Cuisine", "Sake Bar", "City Views"],
    hours: "6:00 PM - 2:00 AM",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 25.2138, lng: 55.2796 },
    isClaimed: true,
    specificItems: ["best-sushi", "best-sake-selection"],
  },
  {
    id: "dxb-4",
    name: "Dubai Mall Aquarium",
    category: "Entertainment",
    subcategory: "Aquarium",
    rating: 4.5,
    reviewCount: 8765,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/modern-multiplex.png",
    mediaGallery: {
      images: ["/modern-multiplex.png", "/modern-gaming-arcade.png"],
    },
    address: "Dubai Mall, Downtown Dubai",
    phone: "+971 4 448 5200",
    description: "One of the world's largest suspended aquariums with diverse marine life.",
    amenities: ["Aquarium Tunnel", "Underwater Zoo", "Shark Dive"],
    hours: "10:00 AM - 12:00 AM",
    priceRange: "₹₹₹",
    coordinates: { lat: 25.1972, lng: 55.2796 },
    isClaimed: true,
    specificItems: ["best-aquarium-experience", "best-shark-encounter"],
  },
  {
    id: "dxb-5",
    name: "IMG Worlds of Adventure",
    category: "Entertainment",
    subcategory: "Theme Park",
    rating: 4.3,
    reviewCount: 4321,
    rank: 2,
    movement: "up",
    movementAmount: 1,
    image: "/modern-gaming-arcade.png",
    mediaGallery: {
      images: ["/modern-gaming-arcade.png", "/modern-multiplex.png"],
    },
    address: "City of Arabia, Dubailand, Dubai",
    phone: "+971 4 403 8888",
    description: "World's largest indoor theme park with Marvel and Cartoon Network zones.",
    amenities: ["Indoor Theme Park", "Marvel Zone", "Cartoon Network Zone"],
    hours: "12:00 PM - 10:00 PM",
    priceRange: "₹₹₹",
    coordinates: { lat: 25.0657, lng: 55.2708 },
    isClaimed: true,
    specificItems: ["best-indoor-rides", "best-marvel-experience"],
  },
  {
    id: "dxb-6",
    name: "White Dubai",
    category: "Nightlife",
    subcategory: "Nightclub",
    rating: 4.4,
    reviewCount: 2876,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/rock-bar-memorabilia-stage.png",
    mediaGallery: {
      images: ["/rock-bar-memorabilia-stage.png", "/modern-multiplex.png"],
    },
    address: "Meydan Racecourse, Dubai",
    phone: "+971 4 381 0001",
    description: "Exclusive rooftop nightclub with world-class DJs and stunning city views.",
    amenities: ["Rooftop Club", "International DJs", "VIP Tables"],
    hours: "11:00 PM - 4:00 AM",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 25.1657, lng: 55.3708 },
    isClaimed: true,
    specificItems: ["best-rooftop-party", "best-dj-nights"],
  },
  {
    id: "dxb-7",
    name: "Mall of the Emirates",
    category: "Shopping",
    subcategory: "Shopping Mall",
    rating: 4.6,
    reviewCount: 9876,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/modern-shopping-mall.png",
    mediaGallery: {
      images: ["/modern-shopping-mall.png", "/elegant-fine-dining.png"],
    },
    address: "Sheikh Zayed Road, Dubai",
    phone: "+971 4 409 9000",
    description: "Premier shopping destination with Ski Dubai and luxury brands.",
    amenities: ["Ski Dubai", "Luxury Brands", "Food Court"],
    hours: "10:00 AM - 12:00 AM",
    priceRange: "₹₹₹",
    coordinates: { lat: 25.1186, lng: 55.2003 },
    isClaimed: true,
    specificItems: ["best-indoor-skiing", "best-luxury-shopping"],
  },

  {
    id: "mct-1",
    name: "The Beach Restaurant",
    category: "Restaurants",
    subcategory: "Seafood",
    rating: 4.4,
    reviewCount: 987,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/elegant-fine-dining.png",
    mediaGallery: {
      images: ["/elegant-fine-dining.png", "/upscale-restaurant-ambiance.png"],
    },
    address: "The Chedi Muscat, Al Ghubra, Muscat",
    phone: "+968 2452 4400",
    description: "Beachfront dining with fresh seafood and Arabian Gulf views.",
    amenities: ["Beachfront", "Fresh Seafood", "Ocean Views"],
    hours: "7:00 PM - 11:00 PM",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 23.5859, lng: 58.4059 },
    isClaimed: true,
    specificItems: ["best-seafood", "best-ocean-view"],
  },
  {
    id: "mct-2",
    name: "Bait Al Luban",
    category: "Restaurants",
    subcategory: "Middle Eastern",
    rating: 4.2,
    reviewCount: 1234,
    rank: 2,
    movement: "up",
    movementAmount: 1,
    image: "/biryani-restaurant.png",
    mediaGallery: {
      images: ["/biryani-restaurant.png", "/south-indian-restaurant.png"],
    },
    address: "Mutrah Corniche, Muscat",
    phone: "+968 2471 4444",
    description: "Traditional Omani restaurant with authentic local cuisine and harbor views.",
    amenities: ["Traditional Omani", "Harbor Views", "Cultural Experience"],
    hours: "12:00 PM - 3:00 PM, 7:00 PM - 11:00 PM",
    priceRange: "₹₹₹",
    coordinates: { lat: 23.6345, lng: 58.5926 },
    isClaimed: true,
    specificItems: ["best-omani-cuisine", "best-traditional-dishes"],
  },
  {
    id: "mct-3",
    name: "Tuscany",
    category: "Restaurants",
    subcategory: "Italian",
    rating: 4.3,
    reviewCount: 876,
    rank: 3,
    movement: "down",
    movementAmount: 1,
    image: "/elegant-fine-dining.png",
    mediaGallery: {
      images: ["/elegant-fine-dining.png", "/gourmet-south-indian-plating.png"],
    },
    address: "Hyatt Regency, Shatti Al Qurm, Muscat",
    phone: "+968 2464 1234",
    description: "Elegant Italian restaurant with authentic cuisine and wine selection.",
    amenities: ["Italian Cuisine", "Wine Cellar", "Elegant Ambiance"],
    hours: "7:00 PM - 11:30 PM",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 23.6105, lng: 58.4897 },
    isClaimed: false,
    specificItems: ["best-italian-pasta", "best-wine-selection"],
  },
  {
    id: "mct-4",
    name: "Royal Opera House Muscat",
    category: "Entertainment",
    subcategory: "Opera House",
    rating: 4.8,
    reviewCount: 1543,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/modern-multiplex.png",
    mediaGallery: {
      images: ["/modern-multiplex.png", "/elegant-fine-dining.png"],
    },
    address: "Shatti Al Qurm, Muscat",
    phone: "+968 2440 3300",
    description: "Premier cultural venue hosting world-class opera, ballet, and concerts.",
    amenities: ["Opera Performances", "Concert Hall", "Cultural Events"],
    hours: "Box Office: 9:00 AM - 6:00 PM",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 23.6105, lng: 58.4897 },
    isClaimed: true,
    specificItems: ["best-opera-experience", "best-cultural-shows"],
  },
  {
    id: "mct-5",
    name: "Dolphin Watching Tours",
    category: "Activities & Sports",
    subcategory: "Water Sports",
    rating: 4.5,
    reviewCount: 2341,
    rank: 1,
    movement: "up",
    movementAmount: 1,
    image: "/modern-gaming-arcade.png",
    mediaGallery: {
      images: ["/modern-gaming-arcade.png", "/modern-multiplex.png"],
    },
    address: "Marina Bandar Al Rowdha, Muscat",
    phone: "+968 2469 2222",
    description: "Exciting boat tours to spot dolphins and enjoy the beautiful Omani coastline.",
    amenities: ["Dolphin Watching", "Boat Tours", "Snorkeling"],
    hours: "6:00 AM - 6:00 PM",
    priceRange: "₹₹₹",
    coordinates: { lat: 23.6345, lng: 58.5926 },
    isClaimed: true,
    specificItems: ["best-dolphin-tours", "best-boat-experience"],
  },

  {
    id: "nyc-1",
    name: "Le Bernardin",
    category: "Restaurants",
    subcategory: "Fine Dining",
    rating: 4.8,
    reviewCount: 3456,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/elegant-fine-dining.png",
    mediaGallery: {
      images: ["/elegant-fine-dining.png", "/upscale-restaurant-ambiance.png", "/gourmet-south-indian-plating.png"],
    },
    address: "155 West 51st Street, New York",
    phone: "+1 212 554 1515",
    description: "Michelin three-star French seafood restaurant with impeccable service.",
    amenities: ["Michelin Star", "Fine Dining", "Wine Pairing"],
    hours: "5:15 PM - 10:30 PM",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    isClaimed: true,
    specificItems: ["best-french-cuisine", "best-seafood"],
  },
  {
    id: "nyc-2",
    name: "Joe's Pizza",
    category: "Restaurants",
    subcategory: "Street Food",
    rating: 4.3,
    reviewCount: 8765,
    rank: 2,
    movement: "up",
    movementAmount: 1,
    image: "/biryani-restaurant.png",
    mediaGallery: {
      images: ["/biryani-restaurant.png", "/south-indian-restaurant.png"],
    },
    address: "7 Carmine Street, New York",
    phone: "+1 212 366 1182",
    description: "Iconic NYC pizza joint serving authentic New York-style slices since 1975.",
    amenities: ["Quick Service", "Takeaway", "Classic NY Pizza"],
    hours: "10:00 AM - 4:00 AM",
    priceRange: "₹",
    coordinates: { lat: 40.7308, lng: -74.0023 },
    isClaimed: true,
    specificItems: ["best-ny-pizza", "best-street-food"],
  },
  {
    id: "nyc-3",
    name: "Katz's Delicatessen",
    category: "Restaurants",
    subcategory: "Deli",
    rating: 4.4,
    reviewCount: 12345,
    rank: 3,
    movement: "same",
    movementAmount: 0,
    image: "/south-indian-restaurant.png",
    mediaGallery: {
      images: ["/south-indian-restaurant.png", "/traditional-south-indian-kitchen.png"],
    },
    address: "205 East Houston Street, New York",
    phone: "+1 212 254 2246",
    description: "Historic Jewish deli famous for pastrami sandwiches since 1888.",
    amenities: ["Historic Deli", "Famous Pastrami", "Traditional Recipes"],
    hours: "8:00 AM - 10:45 PM",
    priceRange: "₹₹",
    coordinates: { lat: 40.7223, lng: -73.9872 },
    isClaimed: true,
    specificItems: ["best-pastrami-sandwich", "best-deli-experience"],
  },
  {
    id: "nyc-4",
    name: "Broadway Theatre District",
    category: "Entertainment",
    subcategory: "Theatre",
    rating: 4.9,
    reviewCount: 15678,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/modern-multiplex.png",
    mediaGallery: {
      images: ["/modern-multiplex.png", "/elegant-fine-dining.png"],
    },
    address: "Times Square, New York",
    phone: "+1 212 239 6200",
    description: "World-famous theatre district featuring the best Broadway shows.",
    amenities: ["Broadway Shows", "World-Class Theatre", "Historic Venues"],
    hours: "Show times vary",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 40.759, lng: -73.9845 },
    isClaimed: true,
    specificItems: ["best-broadway-shows", "best-theatre-experience"],
  },
  {
    id: "nyc-5",
    name: "Museum of Modern Art",
    category: "Entertainment",
    subcategory: "Museum",
    rating: 4.6,
    reviewCount: 9876,
    rank: 2,
    movement: "up",
    movementAmount: 1,
    image: "/modern-multiplex.png",
    mediaGallery: {
      images: ["/modern-multiplex.png", "/elegant-fine-dining.png"],
    },
    address: "11 West 53rd Street, New York",
    phone: "+1 212 708 9400",
    description: "World-renowned museum featuring modern and contemporary art masterpieces.",
    amenities: ["Modern Art", "Masterpiece Collection", "Educational Programs"],
    hours: "10:30 AM - 5:30 PM",
    priceRange: "₹₹₹",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    isClaimed: true,
    specificItems: ["best-modern-art", "best-art-collection"],
  },
  {
    id: "nyc-6",
    name: "1 OAK",
    category: "Nightlife",
    subcategory: "Nightclub",
    rating: 4.2,
    reviewCount: 3456,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/rock-bar-memorabilia-stage.png",
    mediaGallery: {
      images: ["/rock-bar-memorabilia-stage.png", "/modern-multiplex.png"],
    },
    address: "453 West 17th Street, New York",
    phone: "+1 212 255 0980",
    description: "Exclusive nightclub in the Meatpacking District with celebrity clientele.",
    amenities: ["Exclusive Club", "Celebrity Spot", "Premium Bottles"],
    hours: "10:00 PM - 4:00 AM",
    priceRange: "₹₹₹₹",
    coordinates: { lat: 40.742, lng: -74.0063 },
    isClaimed: true,
    specificItems: ["best-exclusive-nightlife", "best-celebrity-spot"],
  },
  {
    id: "nyc-7",
    name: "Fifth Avenue Shopping",
    category: "Shopping",
    subcategory: "Luxury Shopping",
    rating: 4.7,
    reviewCount: 8765,
    rank: 1,
    movement: "same",
    movementAmount: 0,
    image: "/modern-shopping-mall.png",
    mediaGallery: {
      images: ["/modern-shopping-mall.png", "/elegant-fine-dining.png"],
    },
    address: "Fifth Avenue, New York",
    phone: "+1 212 753 4000",
    description: "World-famous luxury shopping street with flagship stores and designer boutiques.",
    amenities: ["Luxury Brands", "Flagship Stores", "Designer Boutiques"],
    hours: "10:00 AM - 9:00 PM",
    priceRange: "₹₹₹",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    isClaimed: true,
    specificItems: ["best-luxury-shopping", "best-flagship-stores"],
  },
]

export const getRestaurantsByCity = (city: string): Restaurant[] => {
  const cityPrefixes: { [key: string]: string } = {
    "Chennai, India": "",
    "Bangalore, India": "blr-",
    "Dubai, UAE": "dxb-",
    "Muscat, Oman": "mct-",
    "New York, USA": "nyc-",
  }

  const prefix = cityPrefixes[city]
  if (prefix === undefined) return []

  if (prefix === "") {
    // Chennai restaurants (no prefix)
    return dummyRestaurants.filter((r) => !r.id.includes("-"))
  }

  return dummyRestaurants.filter((r) => r.id.startsWith(prefix))
}

export interface Trail {
  id: string
  title: string
  description: string
  creator: {
    id: string
    name: string
    username: string
    avatar: string
  }
  coverImage: string
  stats: {
    stops: number
    distance: string
    duration: string
  }
  rating: number
  reviewCount: number
  difficulty: "Easy" | "Moderate" | "Challenging"
  category: string
  tags: string[]
  createdAt: string
  viewCount: number
  likeCount: number
}

export const dummyTrails: Trail[] = [
  {
    id: "1",
    title: "Best South Indian Trail",
    description: "A curated journey through Chennai's most authentic South Indian eateries",
    creator: {
      id: "2",
      name: "Priya Kumar",
      username: "chennaifoodie",
      avatar: "/indian-woman-profile.png",
    },
    coverImage: "/south-indian-thali.png",
    stats: {
      stops: 7,
      distance: "2.5 km",
      duration: "3 hours",
    },
    rating: 4.8,
    reviewCount: 1250,
    difficulty: "Easy",
    category: "Food Trail",
    tags: ["South Indian", "Traditional", "Breakfast", "Vegetarian"],
    createdAt: "2 weeks ago",
    viewCount: 2300,
    likeCount: 156,
  },
  {
    id: "2",
    title: "Chennai Street Food Adventure",
    description: "Explore the vibrant street food scene from Marina Beach to T. Nagar",
    creator: {
      id: "3",
      name: "Arjun Menon",
      username: "foodie_chennai",
      avatar: "/indian-man-profile.png",
    },
    coverImage: "/chennai-street-food.png",
    stats: {
      stops: 5,
      distance: "4.2 km",
      duration: "2.5 hours",
    },
    rating: 4.6,
    reviewCount: 892,
    difficulty: "Moderate",
    category: "Street Food",
    tags: ["Street Food", "Spicy", "Local", "Evening"],
    createdAt: "1 week ago",
    viewCount: 1800,
    likeCount: 134,
  },
  {
    id: "3",
    title: "Heritage Food Walk",
    description: "Discover century-old eateries and traditional recipes in Old Chennai",
    creator: {
      id: "4",
      name: "Kavya Sharma",
      username: "kavya_foodie",
      avatar: "/indian-food-blogger.png",
    },
    coverImage: "/traditional-south-indian-kitchen.png",
    stats: {
      stops: 6,
      distance: "3.1 km",
      duration: "4 hours",
    },
    rating: 4.9,
    reviewCount: 567,
    difficulty: "Easy",
    category: "Heritage",
    tags: ["Heritage", "Traditional", "History", "Cultural"],
    createdAt: "3 days ago",
    viewCount: 1200,
    likeCount: 89,
  },
  {
    id: "4",
    title: "Modern Fusion Trail",
    description: "Contemporary restaurants blending traditional flavors with modern techniques",
    creator: {
      id: "5",
      name: "Rajesh Patel",
      username: "modernfoodie",
      avatar: "/indian-man-profile.png",
    },
    coverImage: "/modern-coffee-shop.png",
    stats: {
      stops: 4,
      distance: "5.8 km",
      duration: "3.5 hours",
    },
    rating: 4.4,
    reviewCount: 423,
    difficulty: "Moderate",
    category: "Fusion",
    tags: ["Modern", "Fusion", "Innovative", "Upscale"],
    createdAt: "5 days ago",
    viewCount: 980,
    likeCount: 67,
  },
  {
    id: "5",
    title: "Dessert Lover's Paradise",
    description: "Sweet treats and traditional desserts across Chennai's best spots",
    creator: {
      id: "6",
      name: "Meera Nair",
      username: "sweettoothmeera",
      avatar: "/indian-woman-profile.png",
    },
    coverImage: "/traditional-biryani-restaurant.png",
    stats: {
      stops: 8,
      distance: "6.2 km",
      duration: "4.5 hours",
    },
    rating: 4.7,
    reviewCount: 734,
    difficulty: "Challenging",
    category: "Desserts",
    tags: ["Desserts", "Sweet", "Traditional", "Indulgent"],
    createdAt: "1 day ago",
    viewCount: 650,
    likeCount: 45,
  },
]

export const dummyReviews: Review[] = [
  {
    id: "1",
    userId: "1",
    userName: "Priya Sharma",
    userAvatar: "/indian-woman-profile.png",
    restaurantId: "1",
    rating: 5,
    text: "Best idli and sambar in Chennai! The coconut chutney is absolutely divine. Been coming here for years and the quality never disappoints.",
    photos: ["/idli-sambar-plate.png"],
    date: "2024-01-15",
    helpfulVotes: 23,
    attributes: { food: 5, service: 4, ambiance: 4, value: 5 },
  },
  {
    id: "2",
    userId: "2",
    userName: "Rajesh Kumar",
    userAvatar: "/indian-man-profile.png",
    restaurantId: "1",
    rating: 4,
    text: "Great traditional breakfast spot. Can get crowded during peak hours but worth the wait.",
    photos: [],
    date: "2024-01-12",
    helpfulVotes: 15,
    attributes: { food: 5, service: 3, ambiance: 3, value: 4 },
  },
]

export const dummyUser: User = {
  id: "1",
  username: "foodie_chennai",
  name: "Arjun Menon",
  avatar: "/young-indian-man-smiling.png",
  trakPoints: 2450,
  level: "Local Scout Level 3",
  reviewCount: 47,
  photoCount: 156,
  followers: 234,
  following: 89,
}

export const leaderboard: User[] = [
  dummyUser,
  {
    id: "2",
    username: "chennai_eats",
    name: "Meera Krishnan",
    avatar: "/indian-food-blogger.png",
    trakPoints: 3120,
    level: "City Explorer Level 4",
    reviewCount: 78,
    photoCount: 245,
    followers: 456,
    following: 123,
  },
  {
    id: "3",
    username: "spice_hunter",
    name: "Vikram Patel",
    avatar: "/indian-man-chef.png",
    trakPoints: 2890,
    level: "Taste Maker Level 3",
    reviewCount: 65,
    photoCount: 198,
    followers: 378,
    following: 156,
  },
]

export interface ItemSearchResult {
  id: string
  name: string
  description: string
  rating: number
  reviewCount: number
  image: string
  place: {
    id: string
    name: string
    rating: number
    reviewCount: number
    priceRange: string
    address: string
  }
  reviewSnippet: string
}

export const dummyItemResults: ItemSearchResult[] = [
  {
    id: "ghee-roast-dosa-murugan",
    name: "Ghee Roast Dosa",
    description: "Crispy and buttery perfection",
    rating: 4.8,
    reviewCount: 1247,
    image: "/ghee-roast-dosa.png",
    place: {
      id: "1",
      name: "Murugan Idli Shop",
      rating: 4.6,
      reviewCount: 2847,
      priceRange: "₹₹",
      address: "T. Nagar, Chennai",
    },
    reviewSnippet: "Crispy, flavorful, and served with amazing chutney. The ghee adds the perfect richness!",
  },
  {
    id: "biryani-paradise",
    name: "Chicken Biryani",
    description: "Ambur style aromatic biryani",
    rating: 4.7,
    reviewCount: 892,
    image: "/chicken-biryani-raita-pickle.png",
    place: {
      id: "2",
      name: "Dakshin",
      rating: 4.8,
      reviewCount: 1523,
      priceRange: "₹₹₹₹",
      address: "Adyar, Chennai",
    },
    reviewSnippet: "Perfectly spiced biryani with tender chicken. The saffron aroma is incredible!",
  },
  {
    id: "filter-coffee-saravana",
    name: "Filter Coffee",
    description: "Authentic South Indian coffee",
    rating: 4.9,
    reviewCount: 567,
    image: "/placeholder-nljbq.png",
    place: {
      id: "3",
      name: "Saravana Bhavan",
      rating: 4.5,
      reviewCount: 3421,
      priceRange: "₹₹",
      address: "Anna Nagar, Chennai",
    },
    reviewSnippet: "The most authentic filter coffee in the city. Strong, aromatic, and perfectly balanced!",
  },
]

export interface Creator {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  followers: number
  reviewCount: number
  isFollowing: boolean
  tasteAffinityScore?: number
  recentPhotos: string[]
  city: string
}

export const dummyCreators: Creator[] = [
  {
    id: "creator-1",
    name: "Priya Kumar",
    username: "chennaifoodie",
    avatar: "/indian-food-blogger.png",
    bio: "Exploring South Indian cuisine, one dosa at a time. 🥞✨",
    followers: 1200,
    reviewCount: 150,
    isFollowing: false,
    tasteAffinityScore: 85,
    recentPhotos: [
      "/ghee-roast-dosa.png",
      "/chicken-biryani-raita-pickle.png",
      "/south-indian-thali.png",
      "/filter-coffee.png",
    ],
    city: "Chennai, India",
  },
  {
    id: "creator-2",
    name: "Arjun Mehta",
    username: "bangalorebites",
    avatar: "/indian-food-reviewer.png",
    bio: "Street food enthusiast & restaurant critic. Always hunting for hidden gems! 🍛",
    followers: 2800,
    reviewCount: 320,
    isFollowing: true,
    tasteAffinityScore: 92,
    recentPhotos: ["/vibrant-street-food.png", "/masala-dosa.png", "/vada-pav.png", "/pani-puri.png"],
    city: "Bangalore, India",
  },
  {
    id: "creator-3",
    name: "Sarah Johnson",
    username: "nycfoodscene",
    avatar: "/american-woman-food-blogger.png",
    bio: "NYC food scene explorer. From fine dining to food trucks! 🗽🍕",
    followers: 5600,
    reviewCount: 480,
    isFollowing: false,
    tasteAffinityScore: 78,
    recentPhotos: [
      "/new-york-pizza.png",
      "/placeholder-u2fv5.png",
      "/fine-dining-experience.png",
      "/vibrant-food-truck.png",
    ],
    city: "New York, USA",
  },
  {
    id: "creator-4",
    name: "Ahmed Al-Rashid",
    username: "dubaieats",
    avatar: "/middle-eastern-food-critic.png",
    bio: "Luxury dining & authentic Middle Eastern flavors. Taste the world in Dubai! 🌍✨",
    followers: 3400,
    reviewCount: 210,
    isFollowing: false,
    tasteAffinityScore: 88,
    recentPhotos: [
      "/arabic-mezze.png",
      "/delicious-shawarma.png",
      "/luxury-restaurant.png",
      "/middle-eastern-dessert.png",
    ],
    city: "Dubai, UAE",
  },
  {
    id: "creator-5",
    name: "Lisa Chen",
    username: "foodieadventures",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Travel food blogger. Discovering authentic flavors across Asia! ✈️🍜",
    followers: 4200,
    reviewCount: 380,
    isFollowing: true,
    tasteAffinityScore: 88,
    recentPhotos: [
      "/placeholder.svg?height=64&width=64",
      "/placeholder.svg?height=64&width=64",
      "/placeholder.svg?height=64&width=64",
      "/placeholder.svg?height=64&width=64",
    ],
    city: "Chennai, India",
  },
]

export function getCreatorsByCity(cityName: string): Creator[] {
  return dummyCreators.filter((creator) => creator.city.toLowerCase().includes(cityName.toLowerCase()))
}
