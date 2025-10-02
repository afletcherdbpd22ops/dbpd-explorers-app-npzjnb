
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function ProfileScreen() {
  // Mock user data - in a real app this would come from authentication
  const userProfile = {
    name: "Alex Johnson",
    rank: "Senior Explorer",
    badgeNumber: "E-2024-015",
    joinDate: "August 15, 2022",
    email: "alex.johnson@email.com",
    phone: "(386) 555-0123",
    emergencyContact: "Sarah Johnson (Mother)",
    emergencyPhone: "(386) 555-0124",
    status: "Active",
    completedTraining: 12,
    totalHours: 156,
    commendations: 3,
  };

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!");
  };

  const handleEmergencyContact = () => {
    Alert.alert("Emergency Contact", `Calling ${userProfile.emergencyContact} at ${userProfile.emergencyPhone}`);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => console.log("Logout pressed") }
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "My Profile",
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerRight: () => (
            <Pressable onPress={handleEditProfile} style={styles.headerButton}>
              <IconSymbol name="pencil" size={20} color={colors.primary} />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView style={[commonStyles.wrapper]} edges={['bottom']}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
              <View style={[styles.statusBadge, { backgroundColor: '#28a745' }]}>
                <Text style={styles.statusText}>ACTIVE</Text>
              </View>
            </View>
            <Text style={styles.name}>{userProfile.name}</Text>
            <Text style={styles.rank}>{userProfile.rank}</Text>
            <Text style={styles.badgeNumber}>Badge #{userProfile.badgeNumber}</Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <IconSymbol name="graduationcap.fill" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>{userProfile.completedTraining}</Text>
              <Text style={styles.statLabel}>Training Completed</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="clock.fill" size={24} color={colors.accent} />
              <Text style={styles.statNumber}>{userProfile.totalHours}</Text>
              <Text style={styles.statLabel}>Service Hours</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="star.fill" size={24} color="#ffd700" />
              <Text style={styles.statNumber}>{userProfile.commendations}</Text>
              <Text style={styles.statLabel}>Commendations</Text>
            </View>
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <IconSymbol name="envelope.fill" size={20} color={colors.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{userProfile.email}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <IconSymbol name="phone.fill" size={20} color={colors.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{userProfile.phone}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <IconSymbol name="calendar" size={20} color={colors.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Join Date</Text>
                  <Text style={styles.infoValue}>{userProfile.joinDate}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Emergency Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
            
            <Pressable style={styles.emergencyCard} onPress={handleEmergencyContact}>
              <View style={styles.emergencyHeader}>
                <IconSymbol name="exclamationmark.triangle.fill" size={24} color="#dc3545" />
                <Text style={styles.emergencyTitle}>Emergency Contact</Text>
              </View>
              <Text style={styles.emergencyContact}>{userProfile.emergencyContact}</Text>
              <Text style={styles.emergencyPhone}>{userProfile.emergencyPhone}</Text>
              <View style={styles.callButton}>
                <IconSymbol name="phone.fill" size={16} color={colors.card} />
                <Text style={styles.callButtonText}>Call Now</Text>
              </View>
            </Pressable>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <View style={styles.actionsGrid}>
              <Pressable style={styles.actionCard} onPress={() => Alert.alert("Documents", "Document access coming soon!")}>
                <IconSymbol name="doc.fill" size={24} color={colors.primary} />
                <Text style={styles.actionText}>Documents</Text>
              </Pressable>
              
              <Pressable style={styles.actionCard} onPress={() => Alert.alert("Certifications", "Certification tracking coming soon!")}>
                <IconSymbol name="checkmark.seal.fill" size={24} color="#28a745" />
                <Text style={styles.actionText}>Certifications</Text>
              </Pressable>
              
              <Pressable style={styles.actionCard} onPress={() => Alert.alert("Settings", "Settings coming soon!")}>
                <IconSymbol name="gear.circle.fill" size={24} color={colors.secondary} />
                <Text style={styles.actionText}>Settings</Text>
              </Pressable>
              
              <Pressable style={styles.actionCard} onPress={handleLogout}>
                <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color="#dc3545" />
                <Text style={[styles.actionText, { color: '#dc3545' }]}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 100, // Space for floating tab bar
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.background,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.card,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  rank: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  badgeNumber: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
  },
  emergencyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#dc3545',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
    marginLeft: 8,
  },
  emergencyContact: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 4,
  },
  emergencyPhone: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 12,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
    marginLeft: 8,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginTop: 8,
  },
  headerButton: {
    padding: 6,
  },
});
