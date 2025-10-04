
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { BlurView } from 'expo-blur';
import { useTheme } from '@react-navigation/native';
import { colors } from '@/styles/commonStyles';
import { getUnreadMessageCount } from '@/data/messages';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

const { height: screenHeight } = Dimensions.get('window');

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerHeight?: number;
  borderRadius?: number;
  leftMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerHeight = Math.min(screenHeight - 200, Math.max(tabs.length * 70, 400)), // Dynamic height based on tab count
  borderRadius = 25,
  leftMargin = 20
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const animatedValue = useSharedValue(0);
  const unreadCount = getUnreadMessageCount();

  // Improved active tab detection with better path matching
  const activeTabIndex = React.useMemo(() => {
    // Find the best matching tab based on the current pathname
    let bestMatch = -1;
    let bestMatchScore = 0;

    tabs.forEach((tab, index) => {
      let score = 0;

      // Exact route match gets highest score
      if (pathname === tab.route) {
        score = 100;
      }
      // Check if pathname starts with tab route (for nested routes)
      else if (pathname.startsWith(tab.route)) {
        score = 80;
      }
      // Check if pathname contains the tab name
      else if (pathname.includes(tab.name)) {
        score = 60;
      }
      // Check for partial matches in the route
      else if (tab.route.includes('/(tabs)/') && pathname.includes(tab.route.split('/(tabs)/')[1])) {
        score = 40;
      }

      if (score > bestMatchScore) {
        bestMatchScore = score;
        bestMatch = index;
      }
    });

    // Default to first tab if no match found
    return bestMatch >= 0 ? bestMatch : 0;
  }, [pathname, tabs]);

  React.useEffect(() => {
    if (activeTabIndex >= 0) {
      animatedValue.value = withSpring(activeTabIndex, {
        damping: 20,
        stiffness: 120,
        mass: 1,
      });
    }
  }, [activeTabIndex, animatedValue]);

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  const indicatorStyle = useAnimatedStyle(() => {
    const tabHeight = (containerHeight - 16) / tabs.length; // Account for container padding (8px on each side)
    return {
      transform: [
        {
          translateY: interpolate(
            animatedValue.value,
            [0, tabs.length - 1],
            [0, tabHeight * (tabs.length - 1)]
          ),
        },
      ],
    };
  });

  // Dynamic styles with solid blue theme (no transparency)
  const dynamicStyles = {
    blurContainer: {
      ...styles.blurContainer,
      ...Platform.select({
        ios: {
          backgroundColor: '#1e40af', // Solid blue background
        },
        android: {
          backgroundColor: '#1e40af', // Solid blue background
          elevation: 8,
        },
        web: {
          backgroundColor: '#1e40af', // Solid blue background
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      }),
    },
    background: {
      ...styles.background,
      backgroundColor: '#1e40af', // Solid blue background
    },
    indicator: {
      ...styles.indicator,
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly transparent white overlay for active indicator
      height: `${(100 / tabs.length) - 3}%`, // Dynamic height based on number of tabs
    },
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left']}>
      <View style={[
        styles.container,
        {
          height: containerHeight,
          marginLeft: leftMargin
        }
      ]}>
        <View
          style={[dynamicStyles.blurContainer, { borderRadius }]}
        >
          <View style={dynamicStyles.background} />
          <Animated.View style={[dynamicStyles.indicator, indicatorStyle]} />
          <View style={styles.tabsContainer}>
            {tabs.map((tab, index) => {
              const isActive = activeTabIndex === index;
              const isMessagesTab = tab.name === 'messages';
              const showBadge = isMessagesTab && unreadCount > 0;

              return (
                <TouchableOpacity
                  key={tab.name}
                  style={styles.tab}
                  onPress={() => handleTabPress(tab.route)}
                  activeOpacity={0.7}
                >
                  <View style={styles.tabContent}>
                    <View style={styles.iconContainer}>
                      <IconSymbol
                        name={tab.icon}
                        size={24}
                        color={isActive ? '#ffffff' : '#d1d5db'}
                      />
                      {showBadge && (
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.tabLabel,
                        { color: '#d1d5db' },
                        isActive && { color: '#ffffff', fontWeight: '600' },
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    justifyContent: 'center', // Center the content vertically
  },
  container: {
    width: 80, // Fixed width for vertical tab bar
    alignSelf: 'flex-start',
    // height and marginLeft handled dynamically via props
  },
  blurContainer: {
    overflow: 'hidden',
    flex: 1,
    // borderRadius and other styling applied dynamically
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    // Dynamic styling applied in component
  },
  indicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    borderRadius: 17,
    height: `${(100 / 2) - 3}%`, // Default for 2 tabs, will be overridden by dynamic styles
    // Dynamic styling applied in component
  },
  tabsContainer: {
    flexDirection: 'column', // Changed from row to column for vertical layout
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    width: '100%',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4, // Increased gap for vertical layout
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabLabel: {
    fontSize: 9, // Slightly smaller for vertical layout
    fontWeight: '500',
    textAlign: 'center',
    // Dynamic styling applied in component
  },
});
