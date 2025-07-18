"use client";
import React from "react";
import { UserButton, useUser, RedirectToSignIn } from '@clerk/nextjs';

export default function AccountPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <RedirectToSignIn />;

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Account Info</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><b>Name:</b> {user.fullName}</li>
        <li><b>Email:</b> {user.primaryEmailAddress?.emailAddress}</li>
        <li><b>Phone:</b> {user.primaryPhoneNumber?.phoneNumber || 'N/A'}</li>
      </ul>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
