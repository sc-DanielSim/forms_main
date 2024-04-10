import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize {
  const isClient = typeof window === 'object';

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    };
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return; // No need to track window size on the server
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    // Add a listener to the window resize event
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty array ensures that this effect only runs on mount and unmount

  return windowSize;
}

export default useWindowSize;
