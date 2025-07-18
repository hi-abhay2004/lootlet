import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md px-8 py-10">
        <SignIn
          routing="path"
          path="/components/login"
          signUpUrl="/components/signup"
          afterSignInUrl="/account"
          appearance={{
            elements: {
              card: 'shadow-none',
            },
          }}
          signInFields={[{ type: 'phone_number' }]}
          socialProviders={['google']}
        />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { rest: [] },
    { rest: ["sso-callback"] },
  ];
}
