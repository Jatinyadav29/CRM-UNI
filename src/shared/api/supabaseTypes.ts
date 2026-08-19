export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      universities: {
        Row: {
          id: string;
          name: string;
          code: string;
          slug: string;
          country: string;
          city: string;
          logo_url: string;
          hero_image_url: string;
          tier: string;
          status: string;
          global_ranking: number;
          acceptance_rate: number;
          total_student_body: number;
          international_student_percentage: number;
          annual_contract_value_usd: number;
          active_leads_count: number;
          contact_name: string;
          contact_email: string;
          contact_phone: string;
          contact_role: string;
          programs: Json;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          slug: string;
          country: string;
          city: string;
          logo_url?: string;
          hero_image_url?: string;
          tier?: string;
          status?: string;
          global_ranking?: number;
          acceptance_rate?: number;
          total_student_body?: number;
          international_student_percentage?: number;
          annual_contract_value_usd?: number;
          active_leads_count?: number;
          contact_name?: string;
          contact_email?: string;
          contact_phone?: string;
          contact_role?: string;
          programs?: Json;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          slug?: string;
          country?: string;
          city?: string;
          logo_url?: string;
          hero_image_url?: string;
          tier?: string;
          status?: string;
          global_ranking?: number;
          acceptance_rate?: number;
          total_student_body?: number;
          international_student_percentage?: number;
          annual_contract_value_usd?: number;
          active_leads_count?: number;
          contact_name?: string;
          contact_email?: string;
          contact_phone?: string;
          contact_role?: string;
          programs?: Json;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      deals: {
        Row: {
          id: string;
          university_id: string;
          university_name: string;
          university_logo: string;
          title: string;
          stage: string;
          deal_value_usd: number;
          expected_close_date: string;
          probability_percentage: number;
          priority: string;
          assigned_rep_id: string;
          assigned_rep_name: string;
          assigned_rep_avatar: string;
          assigned_rep_email: string;
          notes_count: number;
          last_activity_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          university_id?: string;
          university_name?: string;
          university_logo?: string;
          title: string;
          stage: string;
          deal_value_usd?: number;
          expected_close_date?: string;
          probability_percentage?: number;
          priority?: string;
          assigned_rep_id?: string;
          assigned_rep_name?: string;
          assigned_rep_avatar?: string;
          assigned_rep_email?: string;
          notes_count?: number;
          last_activity_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          university_id?: string;
          university_name?: string;
          university_logo?: string;
          title?: string;
          stage?: string;
          deal_value_usd?: number;
          expected_close_date?: string;
          probability_percentage?: number;
          priority?: string;
          assigned_rep_id?: string;
          assigned_rep_name?: string;
          assigned_rep_avatar?: string;
          assigned_rep_email?: string;
          notes_count?: number;
          last_activity_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
