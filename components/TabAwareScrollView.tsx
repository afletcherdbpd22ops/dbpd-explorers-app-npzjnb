
import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useScroll } from '@/contexts/ScrollContext';

interface TabAwareScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
}

export default function TabAwareScrollView({ 
  children, 
  onScroll,
  ...props 
}: TabAwareScrollViewProps) {
  const { hideTabBar, showTabBar } = useScroll();
  const lastScrollY = useRef(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollDelta = currentScrollY - lastScrollY.current;
    
    // Only hide/show if scrolled more than 15 pixels to avoid jitter
    if (Math.abs(scrollDelta) > 15) {
      if (scrollDelta > 0 && currentScrollY > 100) {
        // Scrolling down and past threshold - hide tab bar
        hideTabBar();
      } else if (scrollDelta < 0 || currentScrollY <= 50) {
        // Scrolling up or near top - show tab bar
        showTabBar();
      }
      
      lastScrollY.current = currentScrollY;
    }

    // Set scrolling state
    setIsScrolling(true);
    
    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Show tab bar after scrolling stops (reduced timeout for better UX)
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
      showTabBar();
    }, 800);

    // Call original onScroll if provided
    if (onScroll) {
      onScroll(event);
    }
  };

  return (
    <ScrollView
      {...props}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {children}
    </ScrollView>
  );
}
