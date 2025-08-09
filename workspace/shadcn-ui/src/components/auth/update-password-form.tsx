import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { updatePasswordSchema } from '@/lib/validations';
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

type FormData = z.infer<typeof updatePasswordSchema>;

export function UpdatePasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: FormData) {
    try {
      setError(null);
      
      const { success, error } = await updatePassword(data.password);

      if (success) {
        navigate('/login', { 
          state: { message: 'Password updated successfully. Please sign in with your new password.' } 
        });
      } else {
        setError(error || 'Failed to update password');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Set new password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Create a new password for your account
        </p>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
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
                Updating password...
              </>
            ) : (
              'Update password'
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        Remember your password?{" "}
        <Button variant="link" className="p-0" onClick={() => navigate('/login')}>
          Back to login
        </Button>
      </div>
    </div>
  );
}