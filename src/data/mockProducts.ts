import { Product } from "@/types";

export const mockProducts: Product[] = [
  // --- SOFAS ---
  {
    id: "prod-1",
    slug: "verona-3-seater-sofa",
    name: "Verona 3-Seater Sofa",
    category: "Sofas",
    tagline: "Sculptural silhouette upholstered in textured oat bouclé.",
    description: "The Verona 3-Seater Sofa balances architectural restraint with cocooning comfort. Hand-crafted with an FSC-certified solid oak inner frame, high-resilience memory foam core, and upholstered in premium European textured bouclé.",
    price: 74999,
    oldPrice: 89999,
    rating: 4.9,
    reviewCount: 42,
    mainImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "White Oak",
    secondaryMaterial: "Textured Bouclé & Feather Down",
    colors: [
      { name: "Oat Bouclé", hex: "#EBE6DD" },
      { name: "Warm Taupe", hex: "#9E9085" },
      { name: "Charcoal Chenille", hex: "#32302E" }
    ],
    dimensions: { widthCm: 220, depthCm: 96, heightCm: 78, weightKg: 64 },
    stock: 8,
    sku: "VEL-SOF-001",
    isFeatured: true,
    isBestSeller: true,
    warrantyYears: 10,
    assemblyRequired: false,
  },
  {
    id: "prod-2",
    slug: "lucia-curved-sectional-sofa",
    name: "Lucia Curved Sectional Sofa",
    category: "Sofas",
    tagline: "Organic curving profile designed for modern open-plan living.",
    description: "Flowing contours and generous proportion define the Lucia Sectional. Wrapped in soft Belgian linen over a reinforced kiln-dried American walnut base.",
    price: 114999,
    oldPrice: 129999,
    rating: 4.8,
    reviewCount: 29,
    mainImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "American Walnut",
    secondaryMaterial: "Belgian Natural Linen",
    colors: [
      { name: "Linen Sand", hex: "#E8E2D5" },
      { name: "Olive Velvet", hex: "#5C6048" }
    ],
    dimensions: { widthCm: 285, depthCm: 160, heightCm: 80, weightKg: 88 },
    stock: 5,
    sku: "VEL-SOF-002",
    isFeatured: true,
    isNewArrival: true,
    warrantyYears: 10,
    assemblyRequired: true,
  },
  {
    id: "prod-3",
    slug: "nordic-minimalist-daybed",
    name: "Nordic Minimalist Daybed",
    category: "Sofas",
    tagline: "Clean lines meet natural saddle leather bolster cushion.",
    description: "Inspired by mid-century Danish daybeds, featuring solid teak tapered legs and a tufted natural wool cushion secured by burnished brass hardware.",
    price: 49999,
    rating: 4.7,
    reviewCount: 18,
    mainImage: "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "Solid Teak",
    secondaryMaterial: "Top-grain Saddle Leather Straps",
    colors: [
      { name: "Natural Ash", hex: "#D6C7B2" },
      { name: "Cognac Tan", hex: "#9E5B32" }
    ],
    dimensions: { widthCm: 195, depthCm: 85, heightCm: 45, weightKg: 38 },
    stock: 12,
    sku: "VEL-SOF-003",
    warrantyYears: 5,
    assemblyRequired: false,
  },
  {
    id: "prod-4",
    slug: "palermo-velvet-loveseat",
    name: "Palermo Velvet Loveseat",
    category: "Sofas",
    tagline: "Compact elegance for refined urban suites.",
    description: "Tailored deep channel tufting and tapered brass ferrules on solid smoked oak legs create an undeniable aura of luxury.",
    price: 52999,
    oldPrice: 59999,
    rating: 4.9,
    reviewCount: 31,
    mainImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "White Oak",
    secondaryMaterial: "Italian Matte Velvet",
    colors: [
      { name: "Forest Moss", hex: "#2E473B" },
      { name: "Warm Amber", hex: "#C59358" }
    ],
    dimensions: { widthCm: 165, depthCm: 88, heightCm: 76, weightKg: 42 },
    stock: 7,
    sku: "VEL-SOF-004",
    isBestSeller: true,
    warrantyYears: 5,
    assemblyRequired: false,
  },

  // --- CHAIRS ---
  {
    id: "prod-5",
    slug: "oslo-lounge-chair",
    name: "Oslo Lounge Chair",
    category: "Chairs",
    tagline: "Sculptural wooden cantilever with ergonomic tilt.",
    description: "The Oslo Lounge Chair represents the pinnacle of wood craftsmanship. Carved from solid American walnut with seamless mortise-and-tenon joinery and fitted with full-grain aniline leather cushions.",
    price: 28500,
    oldPrice: 32000,
    rating: 4.9,
    reviewCount: 56,
    mainImage: "https://images.unsplash.com/photo-1580481077195-c3a821a5060f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1580481077195-c3a821a5060f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "American Walnut",
    secondaryMaterial: "Aniline Top-Grain Leather",
    colors: [
      { name: "Cognac Brown", hex: "#7E4826" },
      { name: "Espresso Black", hex: "#1F1A17" },
      { name: "Bone White", hex: "#EBE6DD" }
    ],
    dimensions: { widthCm: 74, depthCm: 82, heightCm: 78, weightKg: 19 },
    stock: 14,
    sku: "VEL-CHA-001",
    isFeatured: true,
    isBestSeller: true,
    warrantyYears: 8,
    assemblyRequired: false,
  },
  {
    id: "prod-6",
    slug: "kyoto-cane-accent-chair",
    name: "Kyoto Cane Accent Chair",
    category: "Chairs",
    tagline: "Hand-woven rattan webbing framed in natural teak.",
    description: "Honoring Japanese joinery traditions, the Kyoto chair marries breezy woven cane backrests with substantial teak armrests for timeless transitional spaces.",
    price: 22999,
    rating: 4.7,
    reviewCount: 24,
    mainImage: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "Solid Teak",
    secondaryMaterial: "Hand-woven Natural Rattan",
    colors: [
      { name: "Natural Honey", hex: "#C89D66" },
      { name: "Ebonized Oak", hex: "#2A2521" }
    ],
    dimensions: { widthCm: 68, depthCm: 75, heightCm: 82, weightKg: 14 },
    stock: 9,
    sku: "VEL-CHA-002",
    isNewArrival: true,
    warrantyYears: 5,
    assemblyRequired: false,
  },
  {
    id: "prod-7",
    slug: "sorrento-boucle-armchair",
    name: "Sorrento Bouclé Armchair",
    category: "Chairs",
    tagline: "Plush organic curves resting on a low oak plinth.",
    description: "A reading chair designed to envelop you. The Sorrento features cocooning arms and textured heavyweight bouclé resting on an oil-rubbed white oak turntable base.",
    price: 34999,
    oldPrice: 39999,
    rating: 4.8,
    reviewCount: 38,
    mainImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "White Oak",
    secondaryMaterial: "High-grade Wool Bouclé",
    colors: [
      { name: "Cloud White", hex: "#F3EFEA" },
      { name: "Pebble Grey", hex: "#949089" }
    ],
    dimensions: { widthCm: 86, depthCm: 86, heightCm: 76, weightKg: 28 },
    stock: 11,
    sku: "VEL-CHA-003",
    isBestSeller: true,
    warrantyYears: 5,
    assemblyRequired: false,
  },
  {
    id: "prod-8",
    slug: "artisan-spindle-back-chair",
    name: "Artisan Spindle-Back Chair",
    category: "Chairs",
    tagline: "Solid ash wood dining or study statement chair.",
    description: "Precision-turned vertical spindles provide flexible back support while the gently dished solid wood seat delivers surprising all-day comfort.",
    price: 16999,
    rating: 4.6,
    reviewCount: 19,
    mainImage: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "Natural Ash",
    colors: [
      { name: "Blonde Ash", hex: "#DEC8A5" },
      { name: "Smoked Walnut", hex: "#4C382A" }
    ],
    dimensions: { widthCm: 54, depthCm: 56, heightCm: 86, weightKg: 8 },
    stock: 18,
    sku: "VEL-CHA-004",
    warrantyYears: 5,
    assemblyRequired: false,
  },

  // --- TABLES ---
  {
    id: "prod-9",
    slug: "haven-oak-coffee-table",
    name: "Haven Oak Coffee Table",
    category: "Tables",
    tagline: "Monolithic curved pedestal in quarter-sawn white oak.",
    description: "An understated centerpiece celebrating grain continuity. The Haven Coffee Table features softened waterfall edges and a hidden recessed plinth that makes it appear to hover gently above the rug.",
    price: 24999,
    oldPrice: 28999,
    rating: 4.9,
    reviewCount: 63,
    mainImage: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "White Oak",
    colors: [
      { name: "Natural Matte Oak", hex: "#CEB592" },
      { name: "Dark Walnut Stain", hex: "#422B1E" }
    ],
    dimensions: { widthCm: 120, depthCm: 70, heightCm: 40, weightKg: 34 },
    stock: 15,
    sku: "VEL-TAB-001",
    isFeatured: true,
    isBestSeller: true,
    warrantyYears: 8,
    assemblyRequired: false,
  },
  {
    id: "prod-10",
    slug: "solstice-nesting-side-tables",
    name: "Solstice Nesting Side Tables",
    category: "Tables",
    tagline: "Pair of tiered organic drum tables with fluted timber skirts.",
    description: "Designed to tuck together or flank your sofa separately. The Solstice nesting duo pairs natural honed travertine tops with ribbed solid oak pedestals.",
    price: 18999,
    rating: 4.8,
    reviewCount: 34,
    mainImage: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "White Oak",
    secondaryMaterial: "Honed Italian Travertine Marble",
    colors: [
      { name: "Oak & Cream Travertine", hex: "#D6C7B2" }
    ],
    dimensions: { widthCm: 55, depthCm: 55, heightCm: 52, weightKg: 26 },
    stock: 12,
    sku: "VEL-TAB-002",
    isNewArrival: true,
    warrantyYears: 5,
    assemblyRequired: false,
  },
  {
    id: "prod-11",
    slug: "arcadia-executive-desk",
    name: "Arcadia Executive Writing Desk",
    category: "Tables",
    tagline: "Integrated cable management and brass drawer pulls.",
    description: "Crafted for focused creativity, the Arcadia desk offers 3 soft-closing dovetail drawers, a hidden power channel, and smooth bullnose perimeter edging.",
    price: 46999,
    oldPrice: 52999,
    rating: 4.8,
    reviewCount: 22,
    mainImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "American Walnut",
    secondaryMaterial: "Solid Antiqued Brass",
    colors: [
      { name: "Rich Walnut", hex: "#4A3225" }
    ],
    dimensions: { widthCm: 150, depthCm: 70, heightCm: 76, weightKg: 52 },
    stock: 6,
    sku: "VEL-TAB-003",
    warrantyYears: 7,
    assemblyRequired: true,
  },
  {
    id: "prod-12",
    slug: "monolith-console-table",
    name: "Monolith Entryway Console Table",
    category: "Tables",
    tagline: "Architectural entryway statement with chamfered pillar legs.",
    description: "Slim depth and sculptural presence make this console ideal for grand foyers or behind floating living room sectionals.",
    price: 29999,
    rating: 4.7,
    reviewCount: 15,
    mainImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "Solid Teak",
    colors: [
      { name: "Weathered Teak", hex: "#8F775B" },
      { name: "Charcoal Ash", hex: "#2C2927" }
    ],
    dimensions: { widthCm: 140, depthCm: 38, heightCm: 82, weightKg: 31 },
    stock: 8,
    sku: "VEL-TAB-004",
    warrantyYears: 5,
    assemblyRequired: true,
  },

  // --- BEDS ---
  {
    id: "prod-13",
    slug: "aria-platform-bed-frame",
    name: "Aria King Platform Bed Frame",
    category: "Beds",
    tagline: "Low Japanese platform with integrated cantilevered nightstands.",
    description: "Experience serene sleep architecture. The Aria Platform Bed features an expansive solid teak headboard with continuous book-matched grain, a silent slat foundation, and optional integrated nightstand shelves.",
    price: 68999,
    oldPrice: 79999,
    rating: 4.9,
    reviewCount: 47,
    mainImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "Solid Teak",
    secondaryMaterial: "Brushed Brass Accents",
    colors: [
      { name: "Warm Plantation Teak", hex: "#946237" },
      { name: "Muted Oak", hex: "#C7B299" }
    ],
    dimensions: { widthCm: 215, depthCm: 225, heightCm: 90, weightKg: 95 },
    stock: 5,
    sku: "VEL-BED-001",
    isFeatured: true,
    isBestSeller: true,
    warrantyYears: 12,
    assemblyRequired: true,
  },
  {
    id: "prod-14",
    slug: "kyoto-upholstered-bed",
    name: "Kyoto Upholstered Bed",
    category: "Beds",
    tagline: "Cushioned linen headboard encased in solid walnut border.",
    description: "Combines the warmth of fine furniture with the softness of bespoke upholstery. The angled headboard is perfect for nighttime reading.",
    price: 59999,
    rating: 4.8,
    reviewCount: 33,
    mainImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "American Walnut",
    secondaryMaterial: "Heavyweight Oatmeal Linen",
    colors: [
      { name: "Oatmeal Linen & Walnut", hex: "#DFD4C2" }
    ],
    dimensions: { widthCm: 195, depthCm: 220, heightCm: 105, weightKg: 82 },
    stock: 7,
    sku: "VEL-BED-002",
    isNewArrival: true,
    warrantyYears: 10,
    assemblyRequired: true,
  },
  {
    id: "prod-15",
    slug: "osaka-tatami-minimalist-bed",
    name: "Osaka Tatami Minimalist Bed",
    category: "Beds",
    tagline: "Grounding silhouette celebrating simplicity and peaceful rest.",
    description: "Built without metal fasteners, using traditional mortise-and-tenon wood locks. Sits slightly elevated to promote natural air circulation.",
    price: 49999,
    rating: 4.7,
    reviewCount: 16,
    mainImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "Natural Ash",
    colors: [
      { name: "Natural Nordic Ash", hex: "#E0CFB5" }
    ],
    dimensions: { widthCm: 190, depthCm: 215, heightCm: 35, weightKg: 70 },
    stock: 8,
    sku: "VEL-BED-003",
    warrantyYears: 8,
    assemblyRequired: true,
  },

  // --- DINING ---
  {
    id: "prod-16",
    slug: "milan-8-seater-dining-table",
    name: "Milan 8-Seater Dining Table",
    category: "Dining",
    tagline: "Solid 45mm thick timber top with hand-beveled edges.",
    description: "Crafted for enduring gatherings, the Milan Dining Table features planks hand-selected for striking grain balance. Supported by two sculptural pillared wood trestles.",
    price: 79999,
    oldPrice: 94999,
    rating: 4.9,
    reviewCount: 51,
    mainImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "Solid Teak",
    colors: [
      { name: "Golden Honey Teak", hex: "#9E6838" },
      { name: "Smoked Espresso", hex: "#2F231B" }
    ],
    dimensions: { widthCm: 240, depthCm: 100, heightCm: 76, weightKg: 88 },
    stock: 6,
    sku: "VEL-DIN-001",
    isFeatured: true,
    isBestSeller: true,
    warrantyYears: 15,
    assemblyRequired: true,
  },
  {
    id: "prod-17",
    slug: "florence-curved-dining-chair",
    name: "Florence Curved Dining Chair",
    category: "Dining",
    tagline: "Steam-bent timber backrest with seamless joinery (Set of 2).",
    description: "Comfortable through three-course meals. Handcrafted steam-bent oak wrapped around an organic upholstered seat pan.",
    price: 24999,
    rating: 4.8,
    reviewCount: 39,
    mainImage: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "White Oak",
    secondaryMaterial: "Stain-Resistant Performance Fabric",
    colors: [
      { name: "Natural Oak / Cream", hex: "#D4C1A8" },
      { name: "Black Oak / Charcoal", hex: "#262322" }
    ],
    dimensions: { widthCm: 56, depthCm: 54, heightCm: 79, weightKg: 14 },
    stock: 20,
    sku: "VEL-DIN-002",
    warrantyYears: 5,
    assemblyRequired: false,
  },
  {
    id: "prod-18",
    slug: "tuscany-solid-dining-bench",
    name: "Tuscany Solid Wood Dining Bench",
    category: "Dining",
    tagline: "Matching companion bench with subtle chamfered legs.",
    description: "Versatile seating for family and dinner guests. Pairs seamlessly with the Milan or any farmhouse dining table.",
    price: 21999,
    rating: 4.7,
    reviewCount: 14,
    mainImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "Solid Teak",
    colors: [
      { name: "Golden Teak", hex: "#9E6838" }
    ],
    dimensions: { widthCm: 180, depthCm: 40, heightCm: 46, weightKg: 24 },
    stock: 10,
    sku: "VEL-DIN-003",
    warrantyYears: 10,
    assemblyRequired: true,
  },

  // --- STORAGE ---
  {
    id: "prod-19",
    slug: "valencia-fluted-sideboard",
    name: "Valencia Fluted Oak Sideboard",
    category: "Storage",
    tagline: "Tactile tambour sliding doors concealing spacious adjustable storage.",
    description: "A showpiece of woodcraft. The Valencia Credenza features individual solid oak slats that slide effortlessly along curved tracks. Features soft-close internal drawers and cable cutouts.",
    price: 58999,
    oldPrice: 66999,
    rating: 4.9,
    reviewCount: 35,
    mainImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "White Oak",
    secondaryMaterial: "Solid Cast Brass Handles",
    colors: [
      { name: "Natural Matte Oak", hex: "#CEB592" },
      { name: "Smoked Walnut", hex: "#443024" }
    ],
    dimensions: { widthCm: 180, depthCm: 48, heightCm: 78, weightKg: 68 },
    stock: 7,
    sku: "VEL-STO-001",
    isFeatured: true,
    isBestSeller: true,
    warrantyYears: 8,
    assemblyRequired: false,
  },
  {
    id: "prod-20",
    slug: "geneva-media-console",
    name: "Geneva 75-inch TV Media Console",
    category: "Storage",
    tagline: "Acoustic woven cane front allowing remote IR pass-through.",
    description: "Hide tech components gracefully. The Geneva console keeps audiovisual equipment well ventilated behind natural rattan cane panels while showing off solid walnut carpentry.",
    price: 44999,
    rating: 4.8,
    reviewCount: 27,
    mainImage: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "American Walnut",
    secondaryMaterial: "Natural Rattan Cane Mesh",
    colors: [
      { name: "American Walnut & Cane", hex: "#523626" }
    ],
    dimensions: { widthCm: 190, depthCm: 45, heightCm: 56, weightKg: 50 },
    stock: 9,
    sku: "VEL-STO-002",
    isNewArrival: true,
    warrantyYears: 7,
    assemblyRequired: false,
  },
  {
    id: "prod-21",
    slug: "artisan-tall-bookshelf",
    name: "Artisan Solid Wood Bookshelf",
    category: "Storage",
    tagline: "Five generous open tiers supported by round dowel pillars.",
    description: "Display ceramics, art monographs, and books with architectural elegance. Hand-sanded solid ash finished with eco-certified plant waxes.",
    price: 38999,
    rating: 4.7,
    reviewCount: 19,
    mainImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "Natural Ash",
    colors: [
      { name: "Light Honey Ash", hex: "#DAC19E" }
    ],
    dimensions: { widthCm: 110, depthCm: 36, heightCm: 190, weightKg: 46 },
    stock: 6,
    sku: "VEL-STO-003",
    warrantyYears: 5,
    assemblyRequired: true,
  },

  // --- LIGHTING ---
  {
    id: "prod-22",
    slug: "lumina-arc-floor-lamp",
    name: "Lumina Brass Arc Floor Lamp",
    category: "Lighting",
    tagline: "Solid travertine stone base and brushed hand-spun brass dome.",
    description: "Graceful cantilever that casts warm, indirect ambient lighting over lounge arrangements. Solid 22kg travertine weighted base guarantees safety.",
    price: 19999,
    oldPrice: 23999,
    rating: 4.9,
    reviewCount: 44,
    mainImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "White Oak",
    secondaryMaterial: "Brushed Brass & Travertine",
    colors: [
      { name: "Champagne Brass", hex: "#D6BF87" }
    ],
    dimensions: { widthCm: 160, depthCm: 45, heightCm: 210, weightKg: 28 },
    stock: 12,
    sku: "VEL-LGT-001",
    isFeatured: true,
    isBestSeller: true,
    warrantyYears: 3,
    assemblyRequired: true,
  },
  {
    id: "prod-23",
    slug: "solaris-ribbed-glass-pendant",
    name: "Solaris Ribbed Amber Pendant",
    category: "Lighting",
    tagline: "Mouth-blown fluted optic glass with walnut mounting canopy.",
    description: "Creates mesmerizing warm refraction over dining tables or kitchen islands. Dimmable warm LED fixture included.",
    price: 12999,
    rating: 4.8,
    reviewCount: 26,
    mainImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "American Walnut",
    secondaryMaterial: "Mouth-blown Optical Glass",
    colors: [
      { name: "Warm Amber", hex: "#B88349" },
      { name: "Smoked Grey", hex: "#5C5957" }
    ],
    dimensions: { widthCm: 32, depthCm: 32, heightCm: 42, weightKg: 4 },
    stock: 16,
    sku: "VEL-LGT-002",
    warrantyYears: 3,
    assemblyRequired: true,
  },

  // --- DECOR ---
  {
    id: "prod-24",
    slug: "terra-monolithic-arch-mirror",
    name: "Terra Floor-Length Arch Mirror",
    category: "Decor",
    tagline: "Solid steam-curved oak framing copper-free HD glass.",
    description: "Leaning or wall-mounted, the Terra arch mirror expands room perspective and invites natural light deep into your living space.",
    price: 21999,
    oldPrice: 25999,
    rating: 4.9,
    reviewCount: 58,
    mainImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "White Oak",
    secondaryMaterial: "Distortion-Free 5mm Float Mirror",
    colors: [
      { name: "Natural Waxed Oak", hex: "#CEB592" },
      { name: "Ebonized Black", hex: "#1F1D1B" }
    ],
    dimensions: { widthCm: 90, depthCm: 5, heightCm: 195, weightKg: 24 },
    stock: 14,
    sku: "VEL-DEC-001",
    isBestSeller: true,
    warrantyYears: 5,
    assemblyRequired: false,
  },
  {
    id: "prod-25",
    slug: "atlas-hand-knotted-wool-rug",
    name: "Atlas Hand-Knotted Wool Rug (8x10)",
    category: "Decor",
    tagline: "100% New Zealand un-dyed organic wool with subtle relief carvings.",
    description: "Indescribably soft underfoot. Hand-knotted by generational artisans with geometric high-low cut pile patterns inspired by desert landscapes.",
    price: 36999,
    rating: 4.8,
    reviewCount: 31,
    mainImage: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80"
    ],
    material: "Solid Teak",
    secondaryMaterial: "100% Un-dyed New Zealand Virgin Wool",
    colors: [
      { name: "Ivory & Sand", hex: "#F3EFE7" },
      { name: "Muted Terracotta", hex: "#B87258" }
    ],
    dimensions: { widthCm: 300, depthCm: 240, heightCm: 2, weightKg: 21 },
    stock: 10,
    sku: "VEL-DEC-002",
    isNewArrival: true,
    warrantyYears: 5,
    assemblyRequired: false,
  },
];
