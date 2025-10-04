
import React from 'react';
import { Redirect } from 'expo-router';
import { currentUser } from '@/data/auth';
import { roster } from '@/data/roster';
import ApplicationsScreen from '../applications';

export default function TabApplicationsScreen() {
  // Get current user's rank to determine access
  const currentExplorer = currentUser.explorerId ? roster.find(e => e.id === currentUser.explorerId) : null;
  const userRank = currentExplorer?.rank || '';
  
  // Check if user can view applications (advisors and Explorer Major only)
  const canViewApplications = userRank.toLowerCase().includes('advisor') || userRank.toLowerCase().includes('major');

  // Redirect if user doesn't have permission
  if (!canViewApplications) {
    return <Redirect href="/(tabs)/(home)/" />;
  }

  // Render the applications screen
  return <ApplicationsScreen />;
}
