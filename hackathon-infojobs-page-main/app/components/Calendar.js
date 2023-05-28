import React, { useEffect, useState } from 'react';

const Calendar = ({ src, alt, onClick }) => {
    const styles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1,
    };
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

    return <button onClick={onClick}>
      <img  className={`super ${isSticky ? 'fixed top-0 left-10 ' : ' fixed top-0 left-10 pt-20 mt-30' } `} src={src} alt={alt}  />
    </button> 
    ;
  };
  
  export default Calendar;