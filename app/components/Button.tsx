'use client';
import React from 'react'

interface Props {
  children: string
  color?: string
}

const Button = ({children, color}: Props) => {
  const handleClick = () => {
    console.log('Clicked');
  };

  return (
    <div>
      <button className={'btn btn-'+color} onClick={handleClick}>{children}</button>
    </div>
  )
}

export default Button;