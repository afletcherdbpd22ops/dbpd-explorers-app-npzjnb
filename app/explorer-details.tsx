
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Linking } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { roster, Explorer } from '@/data/roster';

export default function ExplorerDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const explorer = roster.find(e => e.id === id);

  if (!explorer) {
    return (
      <>
        <Stack.Screen options={{ title: "Explorer Not Found" }} />
        <SafeAreaView style={[commonStyles.wrapper]}>
          <View style={styles.errorContainer}>
            <IconSymbol name="person.badge.minus" size={60} color={colors.textSecondary} />
            <Text style={styles.errorText}>Explorer not found</Text>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </>
    );
  }

  const getStatusColor = (status: Explorer['status']) => {
    switch (status) {
      case 'active':
        return '#28a745';
      case 'probationary':
        return colors.accent;
      case 'inactive':
        return colors.secondary;
      default:
        return colors.secondary;
    }
  };

  const getRankIcon = (rank: string) => {
    if (rank.includes('Captain')) return 'star.fill';
    if (rank.includes('Senior')) return 'chevron.up.circle.fill';
    return 'person.circle.fill';
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      "Emergency Contact",
      `Call ${explorer.emergencyContact}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => handleCall(explorer.emergencyPhone) }
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Explorer Details",
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
        }}
      />
      <SafeAreaView style={[commonStyles.wrapper]} edges={['bottom']}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Explorer Header */}
          <View style={styles.explorerHeader}>
            <View style={styles.avatarContainer}>
              <IconSymbol 
                name={getRankIcon(explorer.rank)} 
                size={80} 
                color={colors.primary} 
              />
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(explorer.status) }]}>
                <Text style={styles.statusText}>{explorer.status.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.explorerName}>{explorer.name}</Text>
            <Text style={styles.explorerRank}>{explorer.rank}</Text>
            <Text style={styles.joinDate}>Joined: {explorer.joinDate}</Text>
          </View>

          {/* Contact Information */}
          <View style={styles.contactCard}>
            <Text style={styles.cardTitle}>Contact Information</Text>
            
            <Pressable style={styles.contactRow} onPress={() => handleEmail(explorer.email)}>
              <IconSymbol name="envelope.fill" size={20} color={colors.primary} />
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{explorer.email}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </Pressable>

            <Pressable style={styles.contactRow} onPress={() => handleCall(explorer.phone)}>
              <IconSymbol name="phone.fill" size={20} color={colors.primary} />
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{explorer.phone}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* Emergency Contact */}
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <IconSymbol name="exclamationmark.triangle.fill" size={24} color="#dc3545" />
              <Text style={styles.emergencyTitle}>Emergency Contact</Text>
            </View>
            
            <View style={styles.emergencyInfo}>
              <Text style={styles.emergencyContact}>{explorer.emergencyContact}</Text>
              <Text style={styles.emergencyPhone}>{explorer.emergencyPhone}</Text>
            </View>
            
            <Pressable style={styles.emergencyCallButton} onPress={handleEmergencyCall}>
              <IconSymbol name="phone.fill" size={16} color={colors.card} />
              <Text style={styles.emergencyCallText}>Call Emergency Contact</Text>
            </Pressable>
          </View>

          {/* Explorer Stats */}
          <View style={styles.statsCard}>
            <Text style={styles.cardTitle}>Explorer Statistics</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <IconSymbol name="calendar" size={24} color={colors.primary} />
                <Text style={styles.statValue}>
                  {Math.floor((new Date().getTime() - new Date(explorer.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 30))}
                </Text>
                <Text style={styles.statLabel}>Months Active</Text>
              </View>
              
              <View style={styles.statItem}>
                <IconSymbol name="graduationcap.fill" size={24} color={colors.accent} />
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Training Completed</Text>
              </View>
              
              <View style={styles.statItem}>
                <IconSymbol name="clock.fill" size={24} color={colors.secondary} />
                <Text style={styles.statValue}>124</Text>
                <Text style={styles.statLabel}>Service Hours</Text>
              </View>
              
              <View style={styles.statItem}>
                <IconSymbol name="star.fill" size={24} color="#ffd700" />
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Commendations</Text>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.activityCard}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name="graduationcap.fill" size={16} color={colors.card} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Completed First Aid Training</Text>
                <Text style={styles.activityDate}>2 days ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="person.3.fill" size={16} color={colors.card} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Attended Monthly Meeting</Text>
                <Text style={styles.activityDate}>1 week ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: colors.accent }]}>
                <IconSymbol name="heart.fill" size={16} color={colors.text} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Volunteered at Community Event</Text>
                <Text style={styles.activityDate}>2 weeks ago</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsCard}>
            <Text style={styles.cardTitle}>Quick Actions</Text>
            
            <View style={styles.actionsGrid}>
              <Pressable style={styles.actionButton} onPress={() => Alert.alert("Send Message", "Messaging feature coming soon!")}>
                <IconSymbol name="message.fill" size={20} color={colors.primary} />
                <Text style={styles.actionText}>Message</Text>
              </Pressable>
              
              <Pressable style={styles.actionButton} onPress={() => Alert.alert("View Schedule", "Schedule viewing coming soon!")}>
                <IconSymbol name="calendar" size={20} color={colors.secondary} />
                <Text style={styles.actionText}>Schedule</Text>
              </Pressable>
              
              <Pressable style={styles.actionButton} onPress={() => Alert.alert("View Reports", "Reports feature coming soon!")}>
                <IconSymbol name="doc.text" size={20} color={colors.accent} />
                <Text style={styles.actionText}>Reports</Text>
              </Pressable>
              
              <Pressable style={styles.actionButton} onPress={() => Alert.alert("More Options", "Additional options coming soon!")}>
                <IconSymbol name="ellipsis.circle" size={20} color={colors.textSecondary} />
                <Text style={styles.actionText}>More</Text>
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
    paddingBottom: 32,
  },
  explorerHeader: {
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
    bottom: -5,
    right: -5,
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
  explorerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  explorerRank: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  contactContent: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  emergencyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
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
  emergencyInfo: {
    marginBottom: 16,
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
  },
  emergencyCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emergencyCallText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
    marginLeft: 8,
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
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
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  actionsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: colors.highlight,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});
