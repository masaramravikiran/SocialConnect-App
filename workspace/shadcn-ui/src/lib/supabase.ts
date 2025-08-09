import { createClient } from '@supabase/supabase-js';

// Try to get environment variables, use fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Create client regardless of environment variables
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Flag to check if we're using real credentials or fallbacks
export const isSupabaseConfigured = !!(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          website: string | null;
          location: string | null;
          is_admin: boolean;
          is_active: boolean;
          last_login: string | null;
          created_at: string;
          updated_at: string;
          followers_count: number;
          following_count: number;
          posts_count: number;
          profile_visibility: 'public' | 'private' | 'followers_only';
        };
        Insert: {
          id: string;
          username: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          location?: string | null;
          is_admin?: boolean;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
          followers_count?: number;
          following_count?: number;
          posts_count?: number;
          profile_visibility?: 'public' | 'private' | 'followers_only';
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          location?: string | null;
          is_admin?: boolean;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
          followers_count?: number;
          following_count?: number;
          posts_count?: number;
          profile_visibility?: 'public' | 'private' | 'followers_only';
        };
      };
      posts: {
        Row: {
          id: string;
          content: string;
          author_id: string;
          created_at: string;
          updated_at: string;
          image_url: string | null;
          category: 'general' | 'announcement' | 'question';
          is_active: boolean;
          like_count: number;
          comment_count: number;
        };
        Insert: {
          id?: string;
          content: string;
          author_id: string;
          created_at?: string;
          updated_at?: string;
          image_url?: string | null;
          category?: 'general' | 'announcement' | 'question';
          is_active?: boolean;
          like_count?: number;
          comment_count?: number;
        };
        Update: {
          id?: string;
          content?: string;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
          image_url?: string | null;
          category?: 'general' | 'announcement' | 'question';
          is_active?: boolean;
          like_count?: number;
          comment_count?: number;
        };
      };
      comments: {
        Row: {
          id: string;
          content: string;
          author_id: string;
          post_id: string;
          created_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          content: string;
          author_id: string;
          post_id: string;
          created_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          content?: string;
          author_id?: string;
          post_id?: string;
          created_at?: string;
          is_active?: boolean;
        };
      };
      follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          follower_id?: string;
          following_id?: string;
          created_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          post_id?: string;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          recipient_id: string;
          sender_id: string;
          notification_type: 'follow' | 'like' | 'comment';
          post_id: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          recipient_id: string;
          sender_id: string;
          notification_type: 'follow' | 'like' | 'comment';
          post_id?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          recipient_id?: string;
          sender_id?: string;
          notification_type?: 'follow' | 'like' | 'comment';
          post_id?: string | null;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
  };
}