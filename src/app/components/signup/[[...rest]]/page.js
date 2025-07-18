import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md px-8 py-10">
        <SignUp
          routing="path"
          path="/components/signup"
          signInUrl="/components/login"
          afterSignUpUrl="/account"
          appearance={{
            elements: {
              card: 'shadow-none',
            },
          }}
          signUpFields={[{ type: 'phone_number' }]}
          socialProviders={['google']}
        />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { rest: [] },
    { rest: ['sso-callback'] },
    { rest: ['continue'] },
  ];
}
