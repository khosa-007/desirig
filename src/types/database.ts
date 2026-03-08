// Auto-generated types will go here after Supabase setup
// Run: npx supabase gen types typescript --local > src/types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Placeholder until Supabase is configured
export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: string;
          subcategory: string | null;
          description: string | null;
          phone: string | null;
          email: string | null;
          website: string | null;
          address: string | null;
          city: string;
          province: string;
          postal_code: string | null;
          latitude: number | null;
          longitude: number | null;
          languages: string[];
          tags: string[];
          hours: Json | null;
          is_verified: boolean;
          is_featured: boolean;
          tier: "free" | "basic" | "premium" | "featured";
          logo_url: string | null;
          cover_url: string | null;
          rating: number | null;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["businesses"]["Row"],
          "id" | "created_at" | "updated_at" | "review_count" | "rating"
        >;
        Update: Partial<
          Database["public"]["Tables"]["businesses"]["Insert"]
        >;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
