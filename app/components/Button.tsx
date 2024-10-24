'use client';
import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  children: string;
  user: User;
}

const Button = ({ children, user }: Props) => {
  const saveUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/userRoutes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    });

    if (response.ok) {
      // Optionally handle redirection or state update
      window.location.reload(); // Reload to see updated users
    } else {
      console.log('API Base URL:', process.env.NEXT_PUBLIC_URL);
      console.error('Error saving user:', await response.text());
    }
  };

  return (
    <button className='btn btn-primary' onClick={saveUser}>
      {children}
    </button>
  );
};

export default Button;