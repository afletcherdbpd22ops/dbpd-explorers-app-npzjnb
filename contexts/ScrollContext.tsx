
import React, { createContext, useContext, ReactNode } from 'react';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';

interface ScrollContextType {
  tabBarVisible: any; // Reanimated shared value
  hideTabBar: () => void;
  showTabBar: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const tabBarVisible = useSharedValue(1); // 1 = visible, 0 = hidden

  const hideTabBar = () => {
    tabBarVisible.value = withTiming(0, { 
      duration: 250,
      easing: Easing.out(Easing.cubic)
    });
  };

  const showTabBar = () => {
    tabBarVisible.value = withTiming(1, { 
      duration: 300,
      easing: Easing.out(Easing.cubic)
    });
  };

  return (
    <ScrollContext.Provider value={{ 
      tabBarVisible, 
      hideTabBar, 
      showTabBar 
    }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
