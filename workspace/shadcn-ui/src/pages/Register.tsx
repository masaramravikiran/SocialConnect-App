import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center">SocialConnect</h2>
          <p className="text-sm text-muted-foreground mt-2">Join our community today</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}