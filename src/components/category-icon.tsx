import {
  Truck,
  Wrench,
  Fuel,
  GraduationCap,
  ShieldCheck,
  Shield,
  FlaskConical,
  Stethoscope,
  Circle,
  Anchor,
  Cog,
  Droplets,
  Droplet,
  Activity,
  Scale,
  Store,
  ParkingCircle,
  Package,
  Banknote,
  FileText,
  Paintbrush,
  Settings,
  Gavel,
  MapPin,
  Tablet,
  ClipboardCheck,
  Clipboard,
  Radio,
  CreditCard,
  Calculator,
  Users,
  UserPlus,
  BedDouble,
  Briefcase,
  Flag,
  Flame,
  UtensilsCrossed,
  Car,
  ShoppingCart,
  Landmark,
  Cake,
  Shirt,
  Gem,
  Beef,
  PartyPopper,
  Building,
  Tv,
  ChefHat,
  DollarSign,
  Home,
  Receipt,
  Send,
  Plane,
  Hospital,
  Smile,
  Pill,
  Eye,
  Dumbbell,
  Scissors,
  Smartphone,
  TreePine,
  Box,
  Warehouse,
  ShoppingBag,
  HardHat,
  UserSearch,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  truck: Truck,
  wrench: Wrench,
  fuel: Fuel,
  "graduation-cap": GraduationCap,
  "shield-check": ShieldCheck,
  shield: Shield,
  "flask-conical": FlaskConical,
  stethoscope: Stethoscope,
  circle: Circle,
  anchor: Anchor,
  cog: Cog,
  droplets: Droplets,
  droplet: Droplet,
  activity: Activity,
  scale: Scale,
  store: Store,
  "parking-circle": ParkingCircle,
  package: Package,
  banknote: Banknote,
  "file-text": FileText,
  "paint-bucket": Paintbrush,
  settings: Settings,
  gavel: Gavel,
  "map-pin": MapPin,
  tablet: Tablet,
  "clipboard-check": ClipboardCheck,
  clipboard: Clipboard,
  radio: Radio,
  "credit-card": CreditCard,
  calculator: Calculator,
  users: Users,
  "user-plus": UserPlus,
  bed: BedDouble,
  briefcase: Briefcase,
  flag: Flag,
  flame: Flame,
  utensils: UtensilsCrossed,
  car: Car,
  "shopping-cart": ShoppingCart,
  landmark: Landmark,
  cake: Cake,
  shirt: Shirt,
  gem: Gem,
  beef: Beef,
  "party-popper": PartyPopper,
  building: Building,
  tv: Tv,
  "chef-hat": ChefHat,
  "dollar-sign": DollarSign,
  home: Home,
  receipt: Receipt,
  send: Send,
  plane: Plane,
  hospital: Hospital,
  smile: Smile,
  pill: Pill,
  eye: Eye,
  dumbbell: Dumbbell,
  scissors: Scissors,
  smartphone: Smartphone,
  "tree-pine": TreePine,
  box: Box,
  warehouse: Warehouse,
  "shopping-bag": ShoppingBag,
  "hard-hat": HardHat,
  "user-search": UserSearch,
  "layout-grid": LayoutGrid,
  "file-badge": FileText,
};

export function CategoryIcon({
  icon,
  size = 24,
  className = "",
}: {
  icon: string | null | undefined;
  size?: number;
  className?: string;
}) {
  const IconComponent = ICON_MAP[icon ?? ""] ?? Truck;
  return <IconComponent size={size} className={className} />;
}

/** Slugs that are inherently South Asian / Desi categories */
const DESI_SLUGS = new Set([
  "dhaba-restaurant",
  "restaurant",
  "indian-grocery",
  "gurdwara",
  "indian-sweets",
  "indian-clothing",
  "indian-jewellery",
  "halal-meat",
  "punjabi-media",
  "banquet-hall",
  "catering",
  "community-hall",
  "immigration-consultant",
  "immigration-lawyer",
  "money-transfer",
  "travel-agency",
]);

export function isDesiCategory(slug: string): boolean {
  return DESI_SLUGS.has(slug);
}

/** "Desi Certified" badge — shows on desi-specific categories */
export function DesiBadge({ compact = false }: { compact?: boolean } = {}) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-orange-500/20 px-1.5 py-0.5 text-[10px] font-bold leading-none text-orange-400">
        <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-orange-400"><circle cx="5" cy="5" r="4" /><path d="M3.5 5l1 1 2-2.5" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ਦੇਸੀ
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-[11px] font-bold leading-none text-orange-400 ring-1 ring-orange-500/30">
      <svg viewBox="0 0 10 10" className="h-3 w-3 fill-orange-400"><circle cx="5" cy="5" r="4" /><path d="M3.5 5l1 1 2-2.5" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      Desi Certified
    </span>
  );
}
