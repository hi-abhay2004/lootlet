import React from 'react'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const register_auth = () => {
  const handleRegister = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        handleRegister(email, password);
      }}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default register_auth

// API route for Firebase registration
import { NextResponse } from 'next/server';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function POST(request) {
  const { email, password } = await request.json();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return NextResponse.json({ user: userCredential.user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}