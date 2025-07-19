// This page is intentionally left blank because Clerk does not provide a ForgotPassword component.
// You can implement your own forgot password flow here if needed, or redirect to the main login page.
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md px-8 py-10 text-center">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <p className="text-gray-600">Password reset is not available. Please contact support or return to <a href="/components/login" className="text-blue-600 underline">Login</a>.</p>
      </div>
    </div>
  );
}

// No static params needed for this page, but must return at least one for static export
export function generateStaticParams() {
  return [{ rest: [] }]; // This allows the root /components/login/forgot-password route to be statically generated
}
