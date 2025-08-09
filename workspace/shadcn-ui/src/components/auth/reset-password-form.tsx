import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { resetPasswordSchema } from '@/lib/validations';
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

type FormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: FormData) {
    try {
      setError(null);
      setIsSuccess(false);
      
      const { success, error } = await resetPassword(data.email);

      if (success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setError(error || 'Failed to send password reset email');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      
      {isSuccess && (
        <Alert className="mb-6">
          <AlertDescription>
            If an account exists with this email, you will receive a password reset link. Please check your inbox.
          </AlertDescription>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              'Send reset link'
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