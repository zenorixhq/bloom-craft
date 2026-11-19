import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bloomProducts = [
  // 1. Curated Gift Hampers
  {
    id: "prod-botanical-hamper",
    slug: "artisanal-botanical-gift-hamper",
    title: "The Artisanal Botanical Gift Hamper",
    shortDescription: "Hand-bound linen journal, brass rollerball pen, scented soy candle, and wax seal kit in a pinewood keepsake box.",
    description: "Our signature luxury hamper thoughtfully curated for celebrations, birthdays, and cherished milestones. Includes an A5 olive linen journal, a solid brass rollerball pen, a hand-poured wild fig & cedar soy candle, a botanical wax seal kit with 100 metallic beads, and a handwritten personalized message card presented in a handcrafted pine wood slide box with raw cotton ribbon.",
    price: 2499,
    salePrice: 2199,
    category: "gift-hampers",
    tags: JSON.stringify(["Gift Hamper", "Celebration", "Bestseller", "Botanical", "Luxury"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    stockCount: 14,
    featured: true,
    isBestSeller: true,
    isNewArrival: false,
    specsJson: JSON.stringify({
      "Contents": "A5 Linen Journal, Brass Pen, Soy Candle (120g), Wax Seal Kit, Keepsake Box",
      "Box Material": "Natural Pinewood with sliding lid",
      "Packaging": "Linen ribbon with dried botanical sprig and wax seal",
      "Occasion": "Birthdays, Anniversaries, Corporate, Wedding Gifting"
    })
  },
  {
    id: "prod-vintage-scribe-hamper",
    slug: "vintage-scribe-calligraphy-hamper",
    title: "The Vintage Scribe Calligraphy Gift Set",
    shortDescription: "Walnut wood dip pen, 5 calligraphy nibs, iron gall ink vial, brass wax seal, and deckle-edge cotton papers.",
    description: "An authentic scribe's dream. Hand-turned walnut calligraphy dip pen with 5 vintage steel nibs, a 30ml glass inkwell bottle of archival black ink, solid brass botanical seal stamp, 3 metallic sealing wax sticks, a brass melting spoon, and 12 sheets of handmade deckle edge cotton paper enclosed in a velvet-lined archival keepsake case.",
    price: 2999,
    salePrice: 2699,
    category: "gift-hampers",
    tags: JSON.stringify(["Calligraphy", "Vintage", "Gift Set", "Wax Seal", "Handmade"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.9,
    reviewCount: 24,
    inStock: true,
    stockCount: 8,
    featured: true,
    isBestSeller: true,
    specsJson: JSON.stringify({
      "Included": "Dip Pen, 5 Nibs, 30ml Ink, Brass Stamp, 3 Wax Sticks, Melting Spoon, 12 Deckle Sheets",
      "Box": "Forest green velvet-lined rigid case with gold foil accents",
      "Paper": "100% Cotton Rag handmade 250gsm"
    })
  },
  {
    id: "prod-celebration-deluxe-box",
    slug: "celebration-blooms-deluxe-hamper",
    title: "Celebration Blooms Deluxe Gift Hamper",
    shortDescription: "Gilded notebook, organic rose herbal infusion, raw wildflower honey with brass dipper, and scented candle.",
    description: "A sensorial gifting experience designed to pamper and celebrate. Features a foil-embossed hardcover journal, a glass jar of organic Kashmir rose herbal tea, raw single-origin wildflower honey with a brass honeycomb dipper, an artisanal amber glass soy candle, and a handcrafted deckle edge greeting card personalized with your custom message.",
    price: 3499,
    salePrice: 2999,
    category: "gift-hampers",
    tags: JSON.stringify(["Luxury Hamper", "Celebration", "Herbal Tea", "Honey", "Keepsake"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 5.0,
    reviewCount: 42,
    inStock: true,
    stockCount: 10,
    featured: true,
    specsJson: JSON.stringify({
      "Dimensions": "30 cm x 24 cm x 12 cm",
      "Box": "Handcrafted rigid matte box with magnetic closure and moss lining",
      "Dietary": "100% Vegetarian & Pure Organic Ingredients"
    })
  },
  {
    id: "prod-cozy-desk-sanctuary",
    slug: "cozy-desk-sanctuary-gift-set",
    title: "Cozy Desk Sanctuary Gift Set",
    shortDescription: "Solid walnut pen tray, brass bookmark clip, weekly desk planner, and cedarwood room spray.",
    description: "Transform any workspace into a serene, inspiring sanctuary. Includes a solid American walnut pen tray with hand-rubbed oil finish, a 60-sheet undated landscape weekly desk pad, a heavy solid brass bookmark clip, and a 50ml glass spray bottle of cedarwood and bergamot workspace mist.",
    price: 1899,
    salePrice: 1699,
    category: "gift-hampers",
    tags: JSON.stringify(["Desk Decor", "Gift Box", "Productivity", "Walnut Wood"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1507842229451-79b1be886a05?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.8,
    reviewCount: 19,
    inStock: true,
    stockCount: 15,
    specsJson: JSON.stringify({
      "Wood": "Sustainably sourced natural American walnut",
      "Planner": "100gsm fountain-pen safe paper (60 tear-off sheets)",
      "Mist": "Pure essential oils (50ml)"
    })
  },

  // 2. Journals & Notebooks
  {
    id: "prod-leather-journal",
    slug: "handcrafted-full-grain-leather-journal",
    title: "Handcrafted Full-Grain Leather Journal",
    shortDescription: "240 pages of 120gsm archival paper with hand-stitched saddle binding and wrap-around tie.",
    description: "A journal meant to age gracefully through decades of reflection, sketches, and notes. Crafted from supple full-grain pull-up leather that develops a rich natural patina with every touch. Features 240 blank deckled pages of acid-free 120gsm paper hand-bound with traditional Coptic stitch that lies completely flat on any surface.",
    price: 1299,
    salePrice: 1099,
    category: "journals-planners",
    tags: JSON.stringify(["Leather Journal", "Handcrafted", "Archival", "Lay-flat", "Bestseller"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 5.0,
    reviewCount: 65,
    inStock: true,
    stockCount: 22,
    featured: true,
    isBestSeller: true,
    specsJson: JSON.stringify({
      "Dimensions": "A5 (15 x 21 cm)",
      "Pages": "240 pages (120 sheets) 120gsm unlined ivory paper",
      "Leather": "100% Full-grain buff leather",
      "Binding": "Hand-stitched Coptic lay-flat binding"
    })
  },
  {
    id: "prod-botanical-linen-notebook",
    slug: "botanical-linen-hardcover-notebook",
    title: "Botanical Linen Hardcover Notebook",
    shortDescription: "Premium 140gsm fountain-pen friendly pages with gold foil botanical cover and ribbon marker.",
    description: "Wrapped in tactile woven bookcloth linen in deep forest sage, adorned with delicate gold foil pressed botanical florals. Contains 192 numbered pages of ultra-smooth 140gsm bleed-resistant paper suitable for fountain pens, brush pens, and light watercolors. Includes dual ribbon markers and an expandable back pocket.",
    price: 799,
    salePrice: 699,
    category: "journals-planners",
    tags: JSON.stringify(["Linen Notebook", "Botanical", "Fountain Pen Friendly", "Gold Foil"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.9,
    reviewCount: 48,
    inStock: true,
    stockCount: 30,
    isNewArrival: true,
    specsJson: JSON.stringify({
      "Dimensions": "A5 (14.8 x 21 cm)",
      "Paper": "140gsm archival ivory dot-grid or ruled paper",
      "Features": "Gilded edges, double ribbon bookmarks, back document envelope"
    })
  },
  {
    id: "prod-daily-undated-planner",
    slug: "minimalist-undated-daily-planner",
    title: "Minimalist Undated Daily Planner",
    shortDescription: "365 days of structured productivity layouts, priority matrix, and weekly habit reviews.",
    description: "Start anytime without wasted days. Our undated daily planner is engineered for mindful productivity with dedicated sections for daily priority focus, hourly time blocks, gratitude reflection, and end-of-week reviews. Smyth sewn binding allows the book to open 180 degrees completely flat.",
    price: 899,
    salePrice: 799,
    category: "journals-planners",
    tags: JSON.stringify(["Daily Planner", "Undated", "Productivity", "Mindfulness"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    stockCount: 18,
    specsJson: JSON.stringify({
      "Pages": "384 pages (Full 12-month undated planning)",
      "Paper": "100gsm smooth feather-proof bamboo paper",
      "Cover": "Vegan leather soft-touch hardcover with elastic band"
    })
  },
  {
    id: "prod-cotton-deckle-journal",
    slug: "deckle-edge-cotton-watercolor-journal",
    title: "Deckle Edge Cotton Watercolor Journal",
    shortDescription: "100% recycled cotton handmade paper with raw deckled edges, 300gsm cold-pressed texture.",
    description: "Crafted by master artisans using traditional wooden deckle frames. Each page features naturally feathered deckled edges with a tactile cold-pressed texture that accepts watercolors, gouache, inks, and calligraphy without buckling. Bound with exposed raw linen thread.",
    price: 1199,
    salePrice: 999,
    category: "journals-planners",
    tags: JSON.stringify(["Cotton Paper", "Deckle Edge", "Watercolor", "Handmade Paper"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 5.0,
    reviewCount: 27,
    inStock: true,
    stockCount: 12,
    specsJson: JSON.stringify({
      "Weight": "300gsm 100% Cotton Rag paper",
      "Leaves": "60 pages (30 leaves) double-sided",
      "Surface": "Cold-pressed natural grain texture"
    })
  },

  // 3. Wax Seals & Calligraphy
  {
    id: "prod-botanical-wax-stamp",
    slug: "botanical-brass-wax-seal-stamp",
    title: "Botanical Brass Wax Seal Stamp",
    shortDescription: "Solid brass stamp head with turned walnut handle for crisp, royal envelope seals.",
    description: "Add an unmistakable touch of old-world romance to your wedding stationery, letters, and gift hampers. Made with a heavy solid CNC-carved brass stamp head that delivers sharp, detailed impressions with zero sticking. Screws effortlessly onto a hand-turned dark walnut wood handle.",
    price: 599,
    salePrice: 499,
    category: "wax-seals-calligraphy",
    tags: JSON.stringify(["Wax Seal", "Brass Stamp", "Botanical", "Stationery", "Bestseller"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 5.0,
    reviewCount: 53,
    inStock: true,
    stockCount: 35,
    featured: true,
    isBestSeller: true,
    specsJson: JSON.stringify({
      "Stamp Diameter": "25 mm / 30 mm",
      "Material": "Solid precision-carved brass head & turned walnut wood handle",
      "Compatibility": "Universal M8 threaded connection for interchangeable heads"
    })
  },
  {
    id: "prod-wax-beads-jar",
    slug: "artisanal-sealing-wax-beads-jar",
    title: "Artisanal Sealing Wax Beads Gift Jar",
    shortDescription: "150 octagonal wax beads in antique gold, sage green, and pearl white inside a vintage corked vial.",
    description: "Formulated with flexible, high-adhesion resin wax that melts smoothly without smoke or brittleness. Finished seals will flex through postal sorting without cracking or breaking. 3 to 4 beads create one perfect 25mm seal. Packed in a reusable vintage glass jar with genuine cork stopper.",
    price: 449,
    category: "wax-seals-calligraphy",
    tags: JSON.stringify(["Wax Beads", "Metallic Wax", "Sealing Wax", "Gold & Sage"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    stockCount: 40,
    specsJson: JSON.stringify({
      "Count": "Approx. 150 octagonal beads (enough for ~45 seals)",
      "Colors": "Antique Roman Gold, Sage Olive, Champagne Pearl",
      "Features": "Smokeless melt, flexible postal-safe formula"
    })
  },
  {
    id: "prod-calligraphy-quill-set",
    slug: "vintage-feather-quill-calligraphy-set",
    title: "Vintage Feather Quill & Inkwell Set",
    shortDescription: "Natural feather quill pen with 5 interchangeable calligraphy nibs and 15ml black ink.",
    description: "Experience the timeless poetry of quill writing. Features a hand-selected natural quill feather with an engraved vintage alloy barrel, 5 stainless steel calligraphy nibs ranging from extra-fine script to wide Gothic italic, and a 15ml bottle of deep carbon black ink with a carved antique desk stand.",
    price: 1149,
    salePrice: 949,
    category: "wax-seals-calligraphy",
    tags: JSON.stringify(["Quill Pen", "Calligraphy", "Vintage Desk", "Gift"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.8,
    reviewCount: 22,
    inStock: true,
    stockCount: 16,
    specsJson: JSON.stringify({
      "Contents": "1 Feather Quill Pen, 5 Stainless Calligraphy Nibs, 15ml Black Ink Bottle, 1 Pen Stand",
      "Box": "Vintage book-style gift box with magnetic closure"
    })
  },

  // 4. Desk Accessories
  {
    id: "prod-walnut-pen-stand",
    slug: "solid-walnut-pen-stand-organizer",
    title: "Solid Walnut Wood Pen Stand & Organizer",
    shortDescription: "Carved natural American walnut block with brass slots for fountain pens and stationery tools.",
    description: "Machined from a single block of sustainably harvested American black walnut and hand-finished with organic beeswax. Features 4 angled pen slots lined with velvet felt to protect precious fountain pen barrels, alongside a carved brass catchall channel for paperclips and wax seals.",
    price: 899,
    salePrice: 799,
    category: "desk-accessories",
    tags: JSON.stringify(["Walnut Wood", "Pen Stand", "Desk Organizer", "Minimalist"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1507842229451-79b1be886a05?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    stockCount: 20,
    isNewArrival: true,
    specsJson: JSON.stringify({
      "Dimensions": "22 cm x 6.5 cm x 3.5 cm",
      "Wood": "100% Solid Black Walnut (Zero veneer)",
      "Finish": "Hand-rubbed natural oil & organic wax"
    })
  },
  {
    id: "prod-brass-ruler-bookmark",
    slug: "vintage-solid-brass-ruler-bookmark-set",
    title: "Vintage Solid Brass Ruler & Bookmark Clips",
    shortDescription: "Heavy solid brass etched 15cm ruler with matching wire bookmark clips in an artisan tin.",
    description: "Cut from heavy 2mm solid brass plate that will never bend, warp, or crack. Laser-etched with millimeter and inch precision markings that never wear off. Comes with a set of 4 geometric solid brass bookmark clips presented in a matte slide-top tin.",
    price: 499,
    category: "desk-accessories",
    tags: JSON.stringify(["Solid Brass", "Ruler", "Bookmark", "Desk Tool"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507842229451-79b1be886a05?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    stockCount: 25,
    specsJson: JSON.stringify({
      "Material": "100% Pure Raw Solid Brass",
      "Length": "15 cm (6 inches)",
      "Set": "1 Ruler + 4 Brass Wire Page Clips"
    })
  },
  {
    id: "prod-leather-desk-pad",
    slug: "handcrafted-leather-desk-mat",
    title: "Handcrafted Full-Grain Leather Desk Mat",
    shortDescription: "Water-resistant oiled leather desk pad with burnished edges and non-slip suede backing.",
    description: "The ultimate centerpiece for a refined writing workspace. Crafted from 2.5mm thick full-grain harness leather that provides the ideal cushioning for pen writing and typing. Suede backing prevents slipping, while burnished edges ensure heirloom longevity.",
    price: 1799,
    salePrice: 1499,
    category: "desk-accessories",
    tags: JSON.stringify(["Desk Mat", "Leather", "Workspace", "Luxury"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1507842229451-79b1be886a05?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 5.0,
    reviewCount: 18,
    inStock: true,
    stockCount: 10,
    specsJson: JSON.stringify({
      "Dimensions": "75 cm x 40 cm (Standard Large Desk)",
      "Material": "Vegetable-tanned full-grain cowhide",
      "Care": "Wipes clean with damp cloth, condition yearly"
    })
  },

  // 5. Greeting Cards & Envelopes
  {
    id: "prod-deckle-botanical-cards",
    slug: "handmade-deckle-edge-botanical-cards",
    title: "Handmade Deckle Edge Botanical Note Cards (Box of 10)",
    shortDescription: "100% cotton deckle cards with real pressed floral petals and matching wax-ready envelopes.",
    description: "Each card is formed individually using century-old cotton rag papermaking techniques embedded with wild pressed cornflower and larkspur petals. The set contains 10 blank folded cards and 10 self-matching deckle-edge envelopes housed in a craft paper keepsake box with twine wrapping.",
    price: 699,
    salePrice: 599,
    category: "cards-envelopes",
    tags: JSON.stringify(["Greeting Cards", "Deckle Edge", "Pressed Flowers", "Handmade"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 5.0,
    reviewCount: 44,
    inStock: true,
    stockCount: 30,
    featured: true,
    specsJson: JSON.stringify({
      "Quantity": "10 Folded Cards + 10 Matching Envelopes",
      "Paper": "250gsm Cotton Rag with real dried floral inclusions",
      "Card Size": "A6 folded (10.5 x 14.8 cm)"
    })
  },
  {
    id: "prod-gold-foil-celebration-cards",
    slug: "celebration-gold-foil-letterpress-cards",
    title: "Celebration Gold Foil Letterpress Cards (Pack of 6)",
    shortDescription: "Deeply debossed gold foil letterpress typography on ultra-thick 400gsm cotton board.",
    description: "Letterpress printed using traditional Heidelberg vintage press machines. Thick 400gsm cotton paper creates a deeply tactile dimensional impression with shining warm gold foil. Blank inside for your personal wishes. Packaged with forest green Euro-flap envelopes.",
    price: 499,
    category: "cards-envelopes",
    tags: JSON.stringify(["Letterpress", "Gold Foil", "Celebration", "Luxury Cards"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.9,
    reviewCount: 28,
    inStock: true,
    stockCount: 24,
    specsJson: JSON.stringify({
      "Quantity": "6 Cards with 6 Forest Green Envelopes",
      "Paper": "400gsm French Cotton Board",
      "Printing": "True deep relief metallic hot foil stamping"
    })
  },

  // 6. Gifting Keepsakes
  {
    id: "prod-botanical-soy-candle",
    slug: "hand-poured-botanical-amber-soy-candle",
    title: "Hand-Poured Botanical Amber Soy Candle",
    shortDescription: "Wild fig, oakmoss & cedarwood essential oils in an amber glass jar with natural wood wick.",
    description: "Crafted in small batches with 100% natural soy wax, lead-free crackling wooden wicks, and pure botanical essential oil blends. Clean, non-toxic burn for over 45 hours, filling your sanctuary with soothing notes of sun-warmed fig, earthy cedarwood, and calming bergamot.",
    price: 699,
    salePrice: 599,
    category: "gifting-keepsakes",
    tags: JSON.stringify(["Soy Candle", "Botanical", "Wood Wick", "Handmade", "Home Fragrance"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 5.0,
    reviewCount: 52,
    inStock: true,
    stockCount: 28,
    featured: true,
    isBestSeller: true,
    specsJson: JSON.stringify({
      "Weight": "200g (Approx. 45 hours burn time)",
      "Wax": "100% Non-GMO Soy Wax, phthalate-free fragrance oils",
      "Container": "Heavy amber apothecary jar with black screw top"
    })
  },
  {
    id: "prod-brass-floral-bookmark",
    slug: "engraved-solid-brass-floral-bookmark",
    title: "Engraved Solid Brass Floral Bookmark",
    shortDescription: "Intricate etched botanical filigree brass bookmark with hand-spun olive silk tassel.",
    description: "A cherished companion for avid readers, journalers, and dreamers. Photo-chemically etched with intricate botanical leaf patterns from a solid sheet of pure gold-toned brass, finished with a hand-twisted olive green pure silk tassel.",
    price: 399,
    category: "gifting-keepsakes",
    tags: JSON.stringify(["Brass Bookmark", "Botanical", "Reader Gift", "Silk Tassel"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507842229451-79b1be886a05?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.9,
    reviewCount: 39,
    inStock: true,
    stockCount: 45,
    specsJson: JSON.stringify({
      "Dimensions": "11.5 cm x 3 cm",
      "Material": "Solid 0.8mm brass with clear protective lacquer to prevent tarnish",
      "Packaging": "Sturdy kraft paper sleeve with gold foil seal"
    })
  },
  {
    id: "prod-velvet-ribbon-wrapping-set",
    slug: "botanical-gift-wrap-velvet-ribbon-set",
    title: "Handmade Botanical Gift Wrap & Velvet Ribbon Set",
    shortDescription: "5 sheets of hand-printed botanical wrapping paper with 5 meters of olive green velvet ribbon.",
    description: "Elevate your gifts with artisanal wrapping materials. Contains 5 large sheets (50 x 70 cm) of heavy 100gsm recycled paper hand-screenprinted with botanical fern motifs, paired with 5 meters of luxurious single-face Swiss velvet ribbon in muted olive and 5 deckle-edge gift tags.",
    price: 499,
    category: "gifting-keepsakes",
    tags: JSON.stringify(["Gift Wrap", "Velvet Ribbon", "Eco Friendly", "Gift Packaging"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
    ]),
    rating: 4.8,
    reviewCount: 21,
    inStock: true,
    stockCount: 30,
    specsJson: JSON.stringify({
      "Sheets": "5 sheets (50 x 70 cm each)",
      "Ribbon": "5 meters of 16mm wide premium velvet ribbon",
      "Tags": "5 handmade cotton deckle gift tags with twine"
    })
  }
];

async function seed() {
  console.log("Seeding Bloom Craft database...");
  
  // Clear existing products in isolated bloomcraft schema
  await prisma.product.deleteMany({});
  console.log("Cleared existing products.");

  for (const product of bloomProducts) {
    await prisma.product.create({
      data: product,
    });
    console.log(`Created product: ${product.title}`);
  }

  console.log(`Successfully seeded ${bloomProducts.length} Bloom Craft products!`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
