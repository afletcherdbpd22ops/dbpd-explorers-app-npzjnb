
import { roster } from "@/data/roster";
import { currentUser, signOut } from "@/data/auth";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...commonStyles.shadow,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  rank: {
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  infoIcon: {
    marginRight: 15,
    width: 24,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...commonStyles.shadow,
  },
  actionButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    transform: [{ scale: 0.98 }],
  },
  actionIcon: {
    marginRight: 15,
    width: 24,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    flex: 1,
  },
  actionChevron: {
    opacity: 0.5,
  },
  signOutButton: {
    backgroundColor: '#ff3b30',
  },
  signOutText: {
    color: 'white',
  },
});

export default function ProfileScreen() {
  const router = useRouter();
  
  // Get current explorer data
  const currentExplorer = currentUser.explorerId ? roster.find(e => e.id === currentUser.explorerId) : null;

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing functionality coming soon!');
  };

  const handleEmergencyContact = () => {
    if (currentExplorer?.emergencyContact) {
      Alert.alert(
        'Emergency Contact',
        `${currentExplorer.emergencyContact.name}\n${currentExplorer.emergencyContact.phone}`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Call', 
            onPress: () => {
              // In a real app, use Linking.openURL(`tel:${phone}`)
              Alert.alert('Call', `Calling ${currentExplorer.emergencyContact.phone}`);
            }
          },
        ]
      );
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            signOut();
            router.replace('/password');
          }
        },
      ]
    );
  };

  if (!currentExplorer) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'Profile', headerShown: false }} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.infoLabel}>Explorer profile not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Profile', headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(currentExplorer.name)}</Text>
            </View>
            <Text style={styles.name}>{currentExplorer.name}</Text>
            <Text style={styles.rank}>{currentExplorer.rank}</Text>
          </View>

          {/* Contact Information */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <View style={styles.infoRow}>
              <IconSymbol name="envelope.fill" size={20} color={colors.text} style={styles.infoIcon} />
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{currentExplorer.email}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <IconSymbol name="phone.fill" size={20} color={colors.text} style={styles.infoIcon} />
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{currentExplorer.phone}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <IconSymbol name="calendar" size={20} color={colors.text} style={styles.infoIcon} />
              <Text style={styles.infoLabel}>Join Date</Text>
              <Text style={styles.infoValue}>{currentExplorer.joinDate}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.text} style={styles.infoIcon} />
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{currentExplorer.status}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
          onPress={handleEditProfile}
        >
          <IconSymbol name="person.crop.circle" size={24} color={colors.text} style={styles.actionIcon} />
          <Text style={styles.actionText}>Edit Profile</Text>
          <IconSymbol name="chevron.right" size={16} color={colors.text} style={styles.actionChevron} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
          onPress={handleEmergencyContact}
        >
          <IconSymbol name="phone.circle.fill" size={24} color={colors.text} style={styles.actionIcon} />
          <Text style={styles.actionText}>Emergency Contact</Text>
          <IconSymbol name="chevron.right" size={16} color={colors.text} style={styles.actionChevron} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.signOutButton,
            pressed && styles.actionButtonPressed,
          ]}
          onPress={handleSignOut}
        >
          <IconSymbol name="power" size={24} color="white" style={styles.actionIcon} />
          <Text style={[styles.actionText, styles.signOutText]}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
