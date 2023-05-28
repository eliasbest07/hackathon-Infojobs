'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function AlwaysBaner() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 50);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isSticky ? 'fixed top-0 right-0 ' : ' fixed top-7 right-0 pt-20 mt-30'
      }  w-300 h-700 text-white py-2 px-4 mr-10 `}
    >
    <Image alt="banner right" width={326} height={507} className='banner-always' src={"/bannerAlways.png"} />
    </div>
  );
}