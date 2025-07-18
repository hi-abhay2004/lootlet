import { ForgotPassword } from '@clerk/nextjs';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md px-8 py-10">
        <ForgotPassword
          routing="path"
          path="/components/login/forgot-password"
          signInUrl="/components/login"
          appearance={{
            elements: {
              card: 'shadow-none',
            },
          }}
        />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [];
}
