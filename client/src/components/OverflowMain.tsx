'use client'
import React, { useEffect, useState } from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement>  {
  children: React.ReactNode;
}


const OverflowMain = ({children,...props}: Props) => {
  const [showScrollbar, setShowScrollbar] = useState(false);

  useEffect(() => {
    let scrollTimeout:NodeJS.Timeout;
    const hero = document.querySelector('.hero')
    console.log(hero)


    const handleScroll = () => {
      clearTimeout(scrollTimeout);

      // Show the scrollbar immediately when the user scrolls
      setShowScrollbar(true);

      // Delay hiding the scrollbar after the user stops scrolling
      scrollTimeout = setTimeout(() => {
        setShowScrollbar(false);
      }, 3000); // Adjust the delay duration as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <main
      className={`hero absolute inset-0 ${
        showScrollbar ? "overflow-auto" : "overflow-hidden"
      }`}
      {...props}
    >
      {children}
    </main>
  );
};

export default OverflowMain