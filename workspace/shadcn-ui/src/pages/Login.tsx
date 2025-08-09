import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center">SocialConnect</h2>
          <p className="text-sm text-muted-foreground mt-2">Welcome back</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}