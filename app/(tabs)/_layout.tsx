
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';
import { currentUser } from '@/data/auth';
import { roster } from '@/data/roster';

export default function TabLayout() {
  // Get current user's rank to determine tab visibility
  const currentExplorer = currentUser.explorerId ? roster.find(e => e.id === currentUser.explorerId) : null;
  const userRank = currentExplorer?.rank || '';
  
  // Check if user can view applications (advisors and Explorer Major only)
  const canViewApplications = userRank.toLowerCase().includes('advisor') || userRank.toLowerCase().includes('major');

  // Define the base tabs configuration
  const baseTabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'calendar',
      route: '/(tabs)/calendar',
      icon: 'calendar',
      label: 'Calendar',
    },
    {
      name: 'roster',
      route: '/(tabs)/roster',
      icon: 'person.3.fill',
      label: 'Roster',
    },
    {
      name: 'photos',
      route: '/(tabs)/photos',
      icon: 'photo.stack',
      label: 'Photos',
    },
    {
      name: 'messages',
      route: '/(tabs)/messages',
      icon: 'message.fill',
      label: 'Messages',
    },
    {
      name: 'community-service',
      route: '/(tabs)/community-service',
      icon: 'heart.fill',
      label: 'Service',
    },
    {
      name: 'meetings',
      route: '/(tabs)/meetings',
      icon: 'person.2.fill',
      label: 'Meetings',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profile',
    },
  ];

  // Add applications tab for advisors and Explorer Major
  const tabs: TabBarItem[] = canViewApplications 
    ? [
        ...baseTabs.slice(0, 4), // Home, Calendar, Roster, Photos
        {
          name: 'applications',
          route: '/(tabs)/applications',
          icon: 'doc.text',
          label: 'Applications',
        },
        ...baseTabs.slice(4), // Messages, Service, Meetings, Profile
      ]
    : baseTabs;

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Home</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="calendar">
          <Icon sf="calendar" drawable="ic_calendar" />
          <Label>Calendar</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="roster">
          <Icon sf="person.3.fill" drawable="ic_roster" />
          <Label>Roster</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="photos">
          <Icon sf="photo.stack" drawable="ic_photos" />
          <Label>Photos</Label>
        </NativeTabs.Trigger>
        {canViewApplications && (
          <NativeTabs.Trigger name="applications">
            <Icon sf="doc.text" drawable="ic_applications" />
            <Label>Applications</Label>
          </NativeTabs.Trigger>
        )}
        <NativeTabs.Trigger name="messages">
          <Icon sf="message.fill" drawable="ic_messages" />
          <Label>Messages</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="community-service">
          <Icon sf="heart.fill" drawable="ic_community_service" />
          <Label>Service</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="meetings">
          <Icon sf="person.2.fill" drawable="ic_meetings" />
          <Label>Meetings</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar and content padding
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'none', // Remove fade animation to prevent black screen flash
          }}
        >
          <Stack.Screen name="(home)" />
          <Stack.Screen name="calendar" />
          <Stack.Screen name="roster" />
          <Stack.Screen name="photos" />
          <Stack.Screen name="applications" />
          <Stack.Screen name="messages" />
          <Stack.Screen name="community-service" />
          <Stack.Screen name="meetings" />
          <Stack.Screen name="profile" />
        </Stack>
      </View>
      <FloatingTabBar tabs={tabs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 120, // Add left margin to account for vertical tab bar (80px width + 40px margin)
  },
});
