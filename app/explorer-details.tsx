
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { roster, Explorer, isSpecialRank, getRosterCardColor } from '@/data/roster';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function ExplorerDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const explorer = roster.find(e => e.id === id);
  
  if (!explorer) {
    return (
      <SafeAreaView style={commonStyles.wrapper}>
        <View style={styles.errorContainer}>
          <IconSymbol name="person.badge.minus" size={60} color={colors.textSecondary} />
          <Text style={styles.errorText}>Explorer not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
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
    const lowerRank = rank.toLowerCase();
    if (lowerRank.includes('major')) return 'star.square.fill';
    if (lowerRank.includes('captain')) return 'star.fill';
    if (lowerRank.includes('lieutenant')) return 'shield.fill';
    if (lowerRank.includes('officer')) return 'person.badge.fill';
    if (lowerRank.includes('sgt') || lowerRank.includes('sergeant')) return 'chevron.up.square.fill';
    if (lowerRank.includes('advisor')) return 'graduationcap.fill';
    if (lowerRank.includes('senior')) return 'chevron.up.circle.fill';
    return 'person.circle.fill';
  };

  const getRankColor = (rank: string) => {
    if (isSpecialRank(rank)) {
      const lowerRank = rank.toLowerCase();
      if (lowerRank.includes('major')) return '#FFD700'; // Gold
      if (lowerRank.includes('captain')) return '#FF6B35'; // Orange-red
      if (lowerRank.includes('lieutenant')) return '#4A90E2'; // Blue
      if (lowerRank.includes('officer')) return '#50C878'; // Emerald green
      if (lowerRank.includes('sgt') || lowerRank.includes('sergeant')) return '#9B59B6'; // Purple
      if (lowerRank.includes('advisor')) return '#E74C3C'; // Red
      return '#FFD700'; // Default gold for special ranks
    }
    return colors.primary;
  };

  const handleCall = (phone: string) => {
    const phoneNumber = phone.replace(/[^\d]/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Contact',
      `Call ${explorer.emergencyContact}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => {
            const phoneNumber = explorer.emergencyPhone.replace(/[^\d]/g, '');
            Linking.openURL(`tel:${phoneNumber}`);
          }
        }
      ]
    );
  };

  const isSpecial = isSpecialRank(explorer.rank);
  const cardColor = getRosterCardColor(explorer);

  // Calculate attendance percentages
  const weeklyAttendanceRate = explorer.totalWeeklyMeetings 
    ? Math.round((explorer.weeklyMeetingAttendance || 0) / explorer.totalWeeklyMeetings * 100)
    : 0;
  
  const detailAttendanceRate = explorer.totalDetailEvents 
    ? Math.round((explorer.detailEventAttendance || 0) / explorer.totalDetailEvents * 100)
    : 0;

  return (
    <>
      <Stack.Screen
        options={{
          title: explorer.name,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <View style={styles.headerLeftContainer}>
              <Pressable onPress={() => router.push('/(tabs)/(home)')} style={styles.homeHeaderButton}>
                <IconSymbol name="house.fill" size={20} color={colors.text} />
              </Pressable>
              <Pressable onPress={() => router.back()} style={styles.headerBackButton}>
                <IconSymbol name="chevron.left" size={20} color={colors.text} />
              </Pressable>
            </View>
          ),
        }}
      />
      <SafeAreaView style={commonStyles.wrapper} edges={['bottom']}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={[styles.profileHeader, { backgroundColor: cardColor }, isSpecial && styles.specialProfileHeader]}>
            {isSpecial && (
              <View style={styles.specialBadge}>
                <IconSymbol name="star.fill" size={16} color="#FFD700" />
                <Text style={styles.specialBadgeText}>SPECIAL RANK</Text>
              </View>
            )}
            
            <View style={styles.avatarContainer}>
              <IconSymbol 
                name={getRankIcon(explorer.rank)} 
                size={80} 
                color={getRankColor(explorer.rank)} 
              />
            </View>
            
            <Text style={[styles.name, isSpecial && styles.specialName]}>
              {explorer.name}
            </Text>
            
            <Text style={[
              styles.rank, 
              isSpecial && styles.specialRankText,
              { color: getRankColor(explorer.rank) }
            ]}>
              {explorer.rank}
            </Text>
            
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(explorer.status) }]}>
              <Text style={styles.statusText}>{explorer.status.toUpperCase()}</Text>
            </View>
          </View>

          {/* Attendance & Service Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attendance & Service Record</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <IconSymbol name="calendar" size={24} color="#2E86AB" />
                <Text style={styles.statNumber}>{weeklyAttendanceRate}%</Text>
                <Text style={styles.statLabel}>Weekly Meetings</Text>
                <Text style={styles.statDetail}>
                  {explorer.weeklyMeetingAttendance || 0}/{explorer.totalWeeklyMeetings || 0}
                </Text>
              </View>
              
              <View style={styles.statCard}>
                <IconSymbol name="shield.fill" size={24} color="#A23B72" />
                <Text style={styles.statNumber}>{detailAttendanceRate}%</Text>
                <Text style={styles.statLabel}>Detail Events</Text>
                <Text style={styles.statDetail}>
                  {explorer.detailEventAttendance || 0}/{explorer.totalDetailEvents || 0}
                </Text>
              </View>
              
              <View style={styles.statCard}>
                <IconSymbol name="heart.fill" size={24} color="#F18F01" />
                <Text style={styles.statNumber}>{explorer.communityServiceHours || 0}</Text>
                <Text style={styles.statLabel}>Community Service</Text>
                <Text style={styles.statDetail}>Hours Completed</Text>
              </View>
            </View>
          </View>

          {/* Certifications */}
          {explorer.certifications && explorer.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              <View style={styles.badgeGrid}>
                {explorer.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationBadge}>
                    <IconSymbol name="checkmark.seal.fill" size={16} color="#28a745" />
                    <Text style={styles.badgeText}>{cert}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Achievements */}
          {explorer.achievements && explorer.achievements.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              <View style={styles.achievementsList}>
                {explorer.achievements.map((achievement, index) => (
                  <View key={index} style={styles.achievementItem}>
                    <IconSymbol name="trophy.fill" size={20} color="#FFD700" />
                    <Text style={styles.achievementText}>{achievement}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <Pressable style={styles.contactItem} onPress={() => handleEmail(explorer.email)}>
              <IconSymbol name="envelope.fill" size={24} color={colors.primary} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{explorer.email}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </Pressable>
            
            <Pressable style={styles.contactItem} onPress={() => handleCall(explorer.phone)}>
              <IconSymbol name="phone.fill" size={24} color={colors.primary} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{explorer.phone}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* Service Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Service Information</Text>
            
            <View style={styles.infoItem}>
              <IconSymbol name="calendar" size={24} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Join Date</Text>
                <Text style={styles.infoValue}>{explorer.joinDate}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <IconSymbol name="person.badge.fill" size={24} color={getRankColor(explorer.rank)} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Current Rank</Text>
                <Text style={[styles.infoValue, { color: getRankColor(explorer.rank), fontWeight: isSpecial ? '700' : '600' }]}>
                  {explorer.rank}
                </Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <IconSymbol 
                name={explorer.status === 'active' ? 'checkmark.circle.fill' : 
                      explorer.status === 'probationary' ? 'clock.fill' : 'xmark.circle.fill'} 
                size={24} 
                color={getStatusColor(explorer.status)} 
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Status</Text>
                <Text style={[styles.infoValue, { color: getStatusColor(explorer.status) }]}>
                  {explorer.status.charAt(0).toUpperCase() + explorer.status.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          {/* Emergency Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
            
            <Pressable style={styles.emergencyContact} onPress={handleEmergencyCall}>
              <IconSymbol name="exclamationmark.triangle.fill" size={24} color="#E74C3C" />
              <View style={styles.emergencyInfo}>
                <Text style={styles.emergencyName}>{explorer.emergencyContact}</Text>
                <Text style={styles.emergencyPhone}>{explorer.emergencyPhone}</Text>
              </View>
              <IconSymbol name="phone.fill" size={20} color="#E74C3C" />
            </Pressable>
          </View>

          {/* Special Rank Information */}
          {isSpecial && (
            <View style={styles.specialSection}>
              <Text style={styles.sectionTitle}>Special Rank Information</Text>
              <View style={styles.specialInfo}>
                <IconSymbol name="star.fill" size={32} color="#FFD700" />
                <View style={styles.specialInfoContent}>
                  <Text style={styles.specialInfoTitle}>Command Authority</Text>
                  <Text style={styles.specialInfoText}>
                    This member holds a special rank with command authority and additional responsibilities within the Daytona Beach Police Explorer program.
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Actions */}
          <View style={styles.actionsSection}>
            <Pressable style={styles.actionButton} onPress={() => handleCall(explorer.phone)}>
              <IconSymbol name="phone.fill" size={20} color={colors.card} />
              <Text style={styles.actionButtonText}>Call</Text>
            </Pressable>
            
            <Pressable style={styles.actionButton} onPress={() => handleEmail(explorer.email)}>
              <IconSymbol name="envelope.fill" size={20} color={colors.card} />
              <Text style={styles.actionButtonText}>Email</Text>
            </Pressable>
            
            <Pressable style={styles.emergencyButton} onPress={handleEmergencyCall}>
              <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.card} />
              <Text style={styles.actionButtonText}>Emergency</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  homeHeaderButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  headerBackButton: {
    padding: 6,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 20,
    position: 'relative',
  },
  specialProfileHeader: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  specialBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  specialBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  specialName: {
    fontSize: 26,
    fontWeight: '800',
  },
  rank: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  specialRankText: {
    fontSize: 20,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.card,
  },
  section: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  specialSection: {
    backgroundColor: '#FFFEF7',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#FFD700',
    boxShadow: '0px 4px 12px rgba(255, 215, 0, 0.3)',
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardLight,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 4,
    textAlign: 'center',
  },
  statDetail: {
    fontSize: 10,
    color: colors.secondary,
    marginTop: 2,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  certificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.background,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardLight,
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.background,
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  emergencyContact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  emergencyInfo: {
    flex: 1,
    marginLeft: 16,
  },
  emergencyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E74C3C',
    marginBottom: 2,
  },
  emergencyPhone: {
    fontSize: 14,
    color: '#C53030',
  },
  specialInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  specialInfoContent: {
    flex: 1,
  },
  specialInfoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B8860B',
    marginBottom: 8,
  },
  specialInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  actionsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  emergencyButton: {
    flex: 1,
    backgroundColor: '#E74C3C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
