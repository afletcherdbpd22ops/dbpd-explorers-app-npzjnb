
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { currentUser } from "@/data/auth";
import { roster } from "@/data/roster";

export default function ProfileScreen() {
  const router = useRouter();
  
  // Get current user's explorer profile
  const userProfile = currentUser.explorerId 
    ? roster.find(explorer => explorer.id === currentUser.explorerId)
    : null;

  if (!userProfile) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Profile",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerLeft: () => (
              <Pressable onPress={() => router.push('/(tabs)/(home)')} style={styles.homeHeaderButton}>
                <IconSymbol name="house.fill" size={20} color={colors.text} />
              </Pressable>
            ),
          }}
        />
        <SafeAreaView style={[commonStyles.wrapper]} edges={['bottom']}>
          <View style={styles.noProfileContainer}>
            <IconSymbol name="person.circle" size={80} color={colors.textSecondary} />
            <Text style={styles.noProfileTitle}>Profile Not Found</Text>
            <Text style={styles.noProfileText}>
              Your profile information could not be loaded. Please contact an advisor.
            </Text>
            <Pressable 
              style={styles.signInButton}
              onPress={() => Alert.alert("Sign In", "Email-based sign in feature coming soon!")}
            >
              <IconSymbol name="envelope.fill" size={20} color={colors.text} />
              <Text style={styles.signInButtonText}>Sign In with Email</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </>
    );
  }

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!");
  };

  const handleEmergencyContact = () => {
    Alert.alert(
      "Emergency Contact", 
      `Calling ${userProfile.emergencyContact} at ${userProfile.emergencyPhone}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => console.log("Calling emergency contact") }
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", style: "destructive", onPress: () => console.log("Sign out pressed") }
      ]
    );
  };

  const attendanceRate = userProfile.totalMeetings && userProfile.totalMeetings > 0 
    ? Math.round((userProfile.meetingsAttended! / userProfile.totalMeetings) * 100)
    : 0;

  return (
    <>
      <Stack.Screen
        options={{
          title: "My Profile",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.push('/(tabs)/(home)')} style={styles.homeHeaderButton}>
              <IconSymbol name="house.fill" size={20} color={colors.text} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={handleEditProfile} style={styles.headerButton}>
              <IconSymbol name="pencil" size={20} color={colors.accent} />
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
              <View style={styles.avatarCircle}>
                <IconSymbol name="person.circle.fill" size={80} color={colors.accent} />
              </View>
              <View style={[styles.statusBadge, { 
                backgroundColor: userProfile.status === 'active' ? '#28a745' : 
                               userProfile.status === 'probationary' ? '#ffc107' : '#dc3545'
              }]}>
                <Text style={styles.statusText}>
                  {userProfile.status.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.name}>{userProfile.name}</Text>
            <Text style={[styles.rank, {
              color: userProfile.isSpecialRank ? colors.accent : colors.textSecondary
            }]}>
              {userProfile.rank}
            </Text>
            <Text style={styles.joinDate}>
              Member since {new Date(userProfile.joinDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <IconSymbol name="clock.fill" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>{userProfile.communityServiceHours || 0}</Text>
              <Text style={styles.statLabel}>Service Hours</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="calendar.badge.checkmark" size={24} color={colors.accent} />
              <Text style={styles.statNumber}>{userProfile.detailsAttended || 0}</Text>
              <Text style={styles.statLabel}>Details Attended</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="person.2.fill" size={24} color="#28a745" />
              <Text style={styles.statNumber}>{attendanceRate}%</Text>
              <Text style={styles.statLabel}>Meeting Attendance</Text>
            </View>
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <IconSymbol name="envelope.fill" size={20} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{userProfile.email}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <IconSymbol name="phone.fill" size={20} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{userProfile.phone}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <IconSymbol name="calendar" size={20} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Join Date</Text>
                  <Text style={styles.infoValue}>
                    {new Date(userProfile.joinDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Certifications */}
          {userProfile.certifications && userProfile.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              <View style={styles.certificationsContainer}>
                {userProfile.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationBadge}>
                    <IconSymbol name="checkmark.seal.fill" size={16} color="#28a745" />
                    <Text style={styles.certificationText}>{cert}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Permissions */}
          {userProfile.isSpecialRank && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Permissions</Text>
              <View style={styles.permissionsCard}>
                <View style={styles.permissionItem}>
                  <IconSymbol 
                    name={userProfile.canEditCalendar ? "checkmark.circle.fill" : "xmark.circle.fill"} 
                    size={20} 
                    color={userProfile.canEditCalendar ? "#28a745" : "#dc3545"} 
                  />
                  <Text style={styles.permissionText}>Edit Calendar & Events</Text>
                </View>
                
                <View style={styles.permissionItem}>
                  <IconSymbol 
                    name={userProfile.canEditRoster ? "checkmark.circle.fill" : "xmark.circle.fill"} 
                    size={20} 
                    color={userProfile.canEditRoster ? "#28a745" : "#dc3545"} 
                  />
                  <Text style={styles.permissionText}>Edit Roster & Attendance</Text>
                </View>
                
                <View style={styles.permissionItem}>
                  <IconSymbol 
                    name={currentUser.permissions.canViewApplications ? "checkmark.circle.fill" : "xmark.circle.fill"} 
                    size={20} 
                    color={currentUser.permissions.canViewApplications ? "#28a745" : "#dc3545"} 
                  />
                  <Text style={styles.permissionText}>View Applications</Text>
                </View>
                
                {userProfile.isAdvisor && (
                  <View style={styles.permissionItem}>
                    <IconSymbol name="checkmark.circle.fill" size={20} color="#28a745" />
                    <Text style={styles.permissionText}>Full Administrator Access</Text>
                  </View>
                )}
              </View>
            </View>
          )}

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
                <IconSymbol name="phone.fill" size={16} color={colors.text} />
                <Text style={styles.callButtonText}>Call Now</Text>
              </View>
            </Pressable>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <View style={styles.actionsGrid}>
              <Pressable 
                style={styles.actionCard} 
                onPress={() => Alert.alert("Documents", "Document access coming soon!")}
              >
                <IconSymbol name="doc.fill" size={24} color={colors.primary} />
                <Text style={styles.actionText}>Documents</Text>
              </Pressable>
              
              <Pressable 
                style={styles.actionCard} 
                onPress={() => Alert.alert("Settings", "Settings coming soon!")}
              >
                <IconSymbol name="gear.circle.fill" size={24} color={colors.secondary} />
                <Text style={styles.actionText}>Settings</Text>
              </Pressable>
              
              <Pressable 
                style={styles.actionCard} 
                onPress={() => Alert.alert("Help", "Help & support coming soon!")}
              >
                <IconSymbol name="questionmark.circle.fill" size={24} color="#17a2b8" />
                <Text style={styles.actionText}>Help</Text>
              </Pressable>
              
              <Pressable 
                style={styles.actionCard} 
                onPress={handleSignOut}
              >
                <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color="#dc3545" />
                <Text style={[styles.actionText, { color: '#dc3545' }]}>Sign Out</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  homeHeaderButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  noProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noProfileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  noProfileText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  signInButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  headerButton: {
    padding: 6,
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
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    elevation: 6,
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
    color: colors.text,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  rank: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  joinDate: {
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
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
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
    color: colors.text,
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
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
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
    color: colors.text,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  certificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4EDDA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  certificationText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#155724',
  },
  permissionsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    elevation: 3,
    gap: 12,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  permissionText: {
    fontSize: 14,
    color: colors.text,
  },
  emergencyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#dc3545',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
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
    color: colors.text,
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
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginTop: 8,
  },
});
