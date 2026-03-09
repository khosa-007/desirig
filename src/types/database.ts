export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      businesses: {
        Row: {
          address: string | null
          business_status: string | null
          category_id: number
          city_id: number | null
          country: string | null
          created_at: string | null
          email: string | null
          fts: unknown
          google_place_id: string | null
          google_rating: number | null
          google_review_count: number | null
          hours: Json | null
          id: string
          is_desi_owned: boolean | null
          is_verified: boolean | null
          languages: string[] | null
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          postal_code: string | null
          province: string | null
          slug: string
          source: string | null
          tags: string[] | null
          tier: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          business_status?: string | null
          category_id: number
          city_id?: number | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          fts?: unknown
          google_place_id?: string | null
          google_rating?: number | null
          google_review_count?: number | null
          hours?: Json | null
          id?: string
          is_desi_owned?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          postal_code?: string | null
          province?: string | null
          slug: string
          source?: string | null
          tags?: string[] | null
          tier?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          business_status?: string | null
          category_id?: number
          city_id?: number | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          fts?: unknown
          google_place_id?: string | null
          google_rating?: number | null
          google_review_count?: number | null
          hours?: Json | null
          id?: string
          is_desi_owned?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          postal_code?: string | null
          province?: string | null
          slug?: string
          source?: string | null
          tags?: string[] | null
          tier?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "businesses_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: number
          is_trucking: boolean | null
          name: string
          parent_id: number | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: number
          is_trucking?: boolean | null
          name: string
          parent_id?: number | null
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: number
          is_trucking?: boolean | null
          name?: string
          parent_id?: number | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          country: string
          created_at: string | null
          id: number
          is_featured: boolean | null
          latitude: number | null
          listing_count: number | null
          longitude: number | null
          name: string
          population: number | null
          province: string
          province_name: string
          slug: string
        }
        Insert: {
          country?: string
          created_at?: string | null
          id?: number
          is_featured?: boolean | null
          latitude?: number | null
          listing_count?: number | null
          longitude?: number | null
          name: string
          population?: number | null
          province: string
          province_name: string
          slug: string
        }
        Update: {
          country?: string
          created_at?: string | null
          id?: number
          is_featured?: boolean | null
          latitude?: number | null
          listing_count?: number | null
          longitude?: number | null
          name?: string
          population?: number | null
          province?: string
          province_name?: string
          slug?: string
        }
        Relationships: []
      }
      fmcsa_carriers: {
        Row: {
          business_id: string | null
          carrier_operation: string | null
          company_officer_1: string | null
          company_officer_2: string | null
          created_at: string | null
          dba_name: string | null
          dot_number: string
          email: string | null
          fleetsize: string | null
          id: string
          is_desi_owned: boolean | null
          last_fmcsa_sync: string | null
          legal_name: string
          phone: string | null
          phy_city: string | null
          phy_country: string | null
          phy_state: string | null
          phy_street: string | null
          phy_zip: string | null
          power_units: number | null
          safety_rating: string | null
          safety_rating_date: string | null
          status_code: string | null
          total_drivers: number | null
        }
        Insert: {
          business_id?: string | null
          carrier_operation?: string | null
          company_officer_1?: string | null
          company_officer_2?: string | null
          created_at?: string | null
          dba_name?: string | null
          dot_number: string
          email?: string | null
          fleetsize?: string | null
          id?: string
          is_desi_owned?: boolean | null
          last_fmcsa_sync?: string | null
          legal_name: string
          phone?: string | null
          phy_city?: string | null
          phy_country?: string | null
          phy_state?: string | null
          phy_street?: string | null
          phy_zip?: string | null
          power_units?: number | null
          safety_rating?: string | null
          safety_rating_date?: string | null
          status_code?: string | null
          total_drivers?: number | null
        }
        Update: {
          business_id?: string | null
          carrier_operation?: string | null
          company_officer_1?: string | null
          company_officer_2?: string | null
          created_at?: string | null
          dba_name?: string | null
          dot_number?: string
          email?: string | null
          fleetsize?: string | null
          id?: string
          is_desi_owned?: boolean | null
          last_fmcsa_sync?: string | null
          legal_name?: string
          phone?: string | null
          phy_city?: string | null
          phy_country?: string | null
          phy_state?: string | null
          phy_street?: string | null
          phy_zip?: string | null
          power_units?: number | null
          safety_rating?: string | null
          safety_rating_date?: string | null
          status_code?: string | null
          total_drivers?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fmcsa_carriers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
