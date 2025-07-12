export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      charisma_progress: {
        Row: {
          completed_at: string | null
          completion_status: string | null
          created_at: string | null
          id: string
          lesson_name: string
          module_name: string
          notes: string | null
          score: number | null
          time_spent: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completion_status?: string | null
          created_at?: string | null
          id?: string
          lesson_name: string
          module_name: string
          notes?: string | null
          score?: number | null
          time_spent?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completion_status?: string | null
          created_at?: string | null
          id?: string
          lesson_name?: string
          module_name?: string
          notes?: string | null
          score?: number | null
          time_spent?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chats: {
        Row: {
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      fashion_chats: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      fashion_messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string
          id: string
          image_url: string | null
          role: string
        }
        Insert: {
          chat_id: string
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          role: string
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "fashion_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "fashion_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      grooming_routines: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          products: Json
          routine_type: string
          steps: string[]
          time_of_day: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          products?: Json
          routine_type: string
          steps?: string[]
          time_of_day: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          products?: Json
          routine_type?: string
          steps?: string[]
          time_of_day?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      habit_entries: {
        Row: {
          completed_at: string | null
          entry_date: string | null
          habit_id: string
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          entry_date?: string | null
          habit_id: string
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          entry_date?: string | null
          habit_id?: string
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_entries_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habit_tracking"
            referencedColumns: ["id"]
          },
        ]
      }
      habit_tracking: {
        Row: {
          created_at: string | null
          current_streak: number | null
          frequency_type: string | null
          habit_category: string
          habit_name: string
          id: string
          is_active: boolean | null
          longest_streak: number | null
          target_frequency: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          frequency_type?: string | null
          habit_category: string
          habit_name: string
          id?: string
          is_active?: boolean | null
          longest_streak?: number | null
          target_frequency?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          frequency_type?: string | null
          habit_category?: string
          habit_name?: string
          id?: string
          is_active?: boolean | null
          longest_streak?: number | null
          target_frequency?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_id: string | null
          content: string
          feedback: number | null
          id: number
          sender: string
          timestamp: string | null
        }
        Insert: {
          chat_id?: string | null
          content: string
          feedback?: number | null
          id?: number
          sender: string
          timestamp?: string | null
        }
        Update: {
          chat_id?: string | null
          content?: string
          feedback?: number | null
          id?: number
          sender?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      outfit_images: {
        Row: {
          chat_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string
        }
        Insert: {
          chat_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
        }
        Update: {
          chat_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "outfit_images_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      outfit_vault: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_favorite: boolean | null
          items: Json
          name: string
          style_category: string | null
          tags: string[] | null
          total_price: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean | null
          items?: Json
          name: string
          style_category?: string | null
          tags?: string[] | null
          total_price?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean | null
          items?: Json
          name?: string
          style_category?: string | null
          tags?: string[] | null
          total_price?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          cons: string[] | null
          created_at: string | null
          id: string
          product_category: string
          product_id: string
          product_name: string
          pros: string[] | null
          rating: number
          review_text: string | null
          skin_type_match: boolean | null
          updated_at: string | null
          user_id: string
          value_for_money: number | null
          would_recommend: boolean | null
        }
        Insert: {
          cons?: string[] | null
          created_at?: string | null
          id?: string
          product_category: string
          product_id: string
          product_name: string
          pros?: string[] | null
          rating: number
          review_text?: string | null
          skin_type_match?: boolean | null
          updated_at?: string | null
          user_id: string
          value_for_money?: number | null
          would_recommend?: boolean | null
        }
        Update: {
          cons?: string[] | null
          created_at?: string | null
          id?: string
          product_category?: string
          product_id?: string
          product_name?: string
          pros?: string[] | null
          rating?: number
          review_text?: string | null
          skin_type_match?: boolean | null
          updated_at?: string | null
          user_id?: string
          value_for_money?: number | null
          would_recommend?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          birthday: string | null
          created_at: string | null
          full_name: string | null
          gender: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birthday?: string | null
          created_at?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birthday?: string | null
          created_at?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      progress_entries: {
        Row: {
          confidence_rating: number | null
          created_at: string | null
          description: string | null
          entry_date: string | null
          entry_type: string
          id: string
          image_url: string | null
          mood: string | null
          occasion: string | null
          tags: string[] | null
          title: string
          user_id: string
          weather: string | null
        }
        Insert: {
          confidence_rating?: number | null
          created_at?: string | null
          description?: string | null
          entry_date?: string | null
          entry_type: string
          id?: string
          image_url?: string | null
          mood?: string | null
          occasion?: string | null
          tags?: string[] | null
          title: string
          user_id: string
          weather?: string | null
        }
        Update: {
          confidence_rating?: number | null
          created_at?: string | null
          description?: string | null
          entry_date?: string | null
          entry_type?: string
          id?: string
          image_url?: string | null
          mood?: string | null
          occasion?: string | null
          tags?: string[] | null
          title?: string
          user_id?: string
          weather?: string | null
        }
        Relationships: []
      }
      style_preferences: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          preference_level: number | null
          style_category: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          preference_level?: number | null
          style_category: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          preference_level?: number | null
          style_category?: string
          user_id?: string
        }
        Relationships: []
      }
      style_recommendations: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          description: string | null
          expires_at: string | null
          feedback_rating: number | null
          id: string
          is_saved: boolean | null
          is_viewed: boolean | null
          reasoning: string | null
          recommendation_type: string
          recommended_items: Json | null
          title: string
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          feedback_rating?: number | null
          id?: string
          is_saved?: boolean | null
          is_viewed?: boolean | null
          reasoning?: string | null
          recommendation_type: string
          recommended_items?: Json | null
          title: string
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          feedback_rating?: number | null
          id?: string
          is_saved?: boolean | null
          is_viewed?: boolean | null
          reasoning?: string | null
          recommendation_type?: string
          recommended_items?: Json | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          description: string | null
          icon: string | null
          id: string
          points: number | null
          progress_data: Json | null
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          description?: string | null
          icon?: string | null
          id?: string
          points?: number | null
          progress_data?: Json | null
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          description?: string | null
          icon?: string | null
          id?: string
          points?: number | null
          progress_data?: Json | null
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          birth_date: string | null
          body_type: string | null
          created_at: string | null
          full_name: string | null
          hair_texture: string | null
          height: number | null
          id: string
          location: string | null
          scalp_type: string | null
          skin_tone: string | null
          skin_type: string | null
          style_confidence_level: number | null
          updated_at: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          body_type?: string | null
          created_at?: string | null
          full_name?: string | null
          hair_texture?: string | null
          height?: number | null
          id?: string
          location?: string | null
          scalp_type?: string | null
          skin_tone?: string | null
          skin_type?: string | null
          style_confidence_level?: number | null
          updated_at?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          body_type?: string | null
          created_at?: string | null
          full_name?: string | null
          hair_texture?: string | null
          height?: number | null
          id?: string
          location?: string | null
          scalp_type?: string | null
          skin_tone?: string | null
          skin_type?: string | null
          style_confidence_level?: number | null
          updated_at?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      virtual_tryons: {
        Row: {
          confidence_rating: number | null
          created_at: string | null
          id: string
          notes: string | null
          outfit_id: string | null
          result_image_url: string | null
          session_data: Json | null
          user_id: string
          user_photo_url: string
        }
        Insert: {
          confidence_rating?: number | null
          created_at?: string | null
          id?: string
          notes?: string | null
          outfit_id?: string | null
          result_image_url?: string | null
          session_data?: Json | null
          user_id: string
          user_photo_url: string
        }
        Update: {
          confidence_rating?: number | null
          created_at?: string | null
          id?: string
          notes?: string | null
          outfit_id?: string | null
          result_image_url?: string | null
          session_data?: Json | null
          user_id?: string
          user_photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "virtual_tryons_outfit_id_fkey"
            columns: ["outfit_id"]
            isOneToOne: false
            referencedRelation: "outfit_vault"
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
  public: {
    Enums: {},
  },
} as const
