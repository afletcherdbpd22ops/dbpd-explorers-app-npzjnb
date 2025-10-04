
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { colors } from '@/styles/commonStyles';
import { currentUser } from '@/data/auth';
import { roster } from '@/data/roster';
import { getUnreadMessageCount } from '@/data/messages';

export default function TabLayout() {
  // Get current user's rank to determine tab visibility
  const currentExplorer = currentUser.explorerId ? roster.find(e => e.id === currentUser.explorerId) : null;
  const userRank = currentExplorer?.rank || '';
  
  // Check if user can view applications (advisors and Explorer Major only)
  const canViewApplications = userRank.toLowerCase().includes('advisor') || userRank.toLowerCase().includes('major');
  
  const unreadCount = getUnreadMessageCount();

  return (
    <NativeTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          height: Platform.OS === 'ios' ? 90 : 70,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <NativeTabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="house.fill" color={color} size={size} />
          ),
        }}
      />
      
      <NativeTabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
      />
      
      <NativeTabs.Screen
        name="roster"
        options={{
          title: 'Roster',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person.3.fill" color={color} size={size} />
          ),
        }}
      />
      
      <NativeTabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Icon name="message.fill" color={color} size={size} />
          ),
          tabBarBadge: unreadCount > 0 ? (unreadCount > 99 ? '99+' : unreadCount.toString()) : undefined,
        }}
      />
      
      <NativeTabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person.fill" color={color} size={size} />
          ),
        }}
      />
      
      {/* Hidden tabs that are accessible via navigation but not shown in tab bar */}
      <NativeTabs.Screen
        name="photos"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      
      <NativeTabs.Screen
        name="community-service"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      
      <NativeTabs.Screen
        name="meetings"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      
      {canViewApplications && (
        <NativeTabs.Screen
          name="applications"
          options={{
            href: null, // Hide from tab bar
          }}
        />
      )}
    </NativeTabs>
  );
}
