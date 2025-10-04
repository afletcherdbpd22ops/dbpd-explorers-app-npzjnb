
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { currentUser } from '@/data/auth';
import { roster } from '@/data/roster';

export default function TabLayout() {
  // Get current user's rank to determine tab visibility
  const currentExplorer = currentUser.explorerId ? roster.find(e => e.id === currentUser.explorerId) : null;
  const userRank = currentExplorer?.rank || '';
  
  // Check if user can view applications (advisors and Explorer Major only)
  const canViewApplications = userRank.toLowerCase().includes('advisor') || userRank.toLowerCase().includes('major');

  // Use Stack navigation without tab bar for full screen experience
  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
