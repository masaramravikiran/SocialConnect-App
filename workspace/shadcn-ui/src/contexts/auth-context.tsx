import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, username: string, firstName: string, lastName: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  signIn: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  updatePassword: (password: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        setSession(null);
        setUser(null);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setIsLoading(false);
    };

    setData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    session,
    isLoading,
    signUp: async (email: string, password: string, username: string, firstName: string, lastName: string) => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          // Create the user profile
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email,
              username,
              first_name: firstName,
              last_name: lastName,
              profile_visibility: 'public',
              is_admin: false,
              is_active: true,
              followers_count: 0,
              following_count: 0,
              posts_count: 0,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

          if (profileError) {
            return { success: false, error: profileError.message };
          }
        }

        return { success: true };
      } catch (error) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'An unknown error occurred' 
        };
      } finally {
        setIsLoading(false);
      }
    },

    signIn: async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          return { success: false, error: error.message };
        }

        // Update last login timestamp
        if (data.user) {
          await supabase
            .from('users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', data.user.id);
        }

        return { success: true };
      } catch (error) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'An unknown error occurred' 
        };
      } finally {
        setIsLoading(false);
      }
    },

    signOut: async () => {
      setIsLoading(true);
      try {
        await supabase.auth.signOut();
      } finally {
        setIsLoading(false);
      }
    },

    resetPassword: async (email: string) => {
      setIsLoading(true);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        
        if (error) {
          return { success: false, error: error.message };
        }
        
        return { success: true };
      } catch (error) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'An unknown error occurred' 
        };
      } finally {
        setIsLoading(false);
      }
    },

    updatePassword: async (password: string) => {
      setIsLoading(true);
      try {
        const { error } = await supabase.auth.updateUser({
          password,
        });
        
        if (error) {
          return { success: false, error: error.message };
        }
        
        return { success: true };
      } catch (error) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'An unknown error occurred' 
        };
      } finally {
        setIsLoading(false);
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};