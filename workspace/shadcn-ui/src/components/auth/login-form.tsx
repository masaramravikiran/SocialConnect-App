import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginSchema } from '@/lib/validations';
import { useAuth } from '@/contexts/auth-context';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type FormData = z.infer<typeof loginSchema>;

type LocationState = {
  message?: string;
  from?: string;
};

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const message = state?.message;
  const from = state?.from || '/';

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: FormData) {
    try {
      setError(null);
      
      const { success, error } = await signIn(
        data.emailOrUsername, // We'll handle email or username server-side
        data.password
      );

      if (success) {
        navigate(from, { replace: true });
      } else {
        setError(error || 'Invalid login credentials');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Sign in to your account
        </p>
      </div>
      
      {message && (
        <Alert className="mb-6">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="emailOrUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com or johndoe" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="px-0" 
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/reset-password');
                    }}
                  >
                    Forgot password?
                  </Button>
                </div>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Button variant="link" className="p-0" onClick={() => navigate('/register')}>
          Create an account
        </Button>
      </div>
    </div>
  );
}