
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { Explorer, isSpecialRank, getRosterCardColor } from '@/data/roster';

interface RosterCardProps {
  explorer: Explorer;
  onPress: () => void;
}

export default function RosterCard({ explorer, onPress }: RosterCardProps) {
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

  const isSpecial = isSpecialRank(explorer.rank);
  const cardBackgroundColor = getRosterCardColor(explorer);

  // Calculate attendance percentages
  const weeklyAttendanceRate = explorer.totalWeeklyMeetings 
    ? Math.round((explorer.weeklyMeetingAttendance || 0) / explorer.totalWeeklyMeetings * 100)
    : 0;
  
  const detailAttendanceRate = explorer.totalDetailEvents 
    ? Math.round((explorer.detailEventAttendance || 0) / explorer.totalDetailEvents * 100)
    : 0;

  return (
    <Pressable 
      style={[
        styles.card, 
        { backgroundColor: cardBackgroundColor },
        isSpecial && styles.specialRankCard
      ]} 
      onPress={onPress}
    >
      {/* Special Rank Star */}
      {isSpecial && (
        <View style={styles.specialStar}>
          <IconSymbol name="star.fill" size={16} color="#FFD700" />
        </View>
      )}
      
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <IconSymbol 
            name={getRankIcon(explorer.rank)} 
            size={40} 
            color={getRankColor(explorer.rank)} 
          />
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, isSpecial && styles.specialName]}>
            {explorer.name}
          </Text>
          <Text style={[
            styles.rank, 
            isSpecial && styles.specialRank,
            { color: getRankColor(explorer.rank) }
          ]}>
            {explorer.rank}
          </Text>
          <Text style={styles.joinDate}>Joined: {explorer.joinDate}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(explorer.status) }]}>
          <Text style={styles.statusText}>{explorer.status.toUpperCase()}</Text>
        </View>
      </View>
      
      {/* Attendance Information */}
      <View style={styles.attendanceSection}>
        <Text style={styles.attendanceSectionTitle}>Attendance & Service</Text>
        
        <View style={styles.attendanceGrid}>
          <View style={styles.attendanceItem}>
            <IconSymbol name="calendar" size={16} color="#2E86AB" />
            <Text style={styles.attendanceLabel}>Weekly Meetings</Text>
            <Text style={styles.attendanceValue}>
              {explorer.weeklyMeetingAttendance || 0}/{explorer.totalWeeklyMeetings || 0} ({weeklyAttendanceRate}%)
            </Text>
          </View>
          
          <View style={styles.attendanceItem}>
            <IconSymbol name="shield.fill" size={16} color="#A23B72" />
            <Text style={styles.attendanceLabel}>Detail Events</Text>
            <Text style={styles.attendanceValue}>
              {explorer.detailEventAttendance || 0}/{explorer.totalDetailEvents || 0} ({detailAttendanceRate}%)
            </Text>
          </View>
          
          <View style={styles.attendanceItem}>
            <IconSymbol name="heart.fill" size={16} color="#F18F01" />
            <Text style={styles.attendanceLabel}>Community Service</Text>
            <Text style={styles.attendanceValue}>
              {explorer.communityServiceHours || 0} hours
            </Text>
          </View>
        </View>
      </View>

      {/* Certifications & Achievements */}
      {(explorer.certifications?.length || explorer.achievements?.length) && (
        <View style={styles.credentialsSection}>
          {explorer.certifications && explorer.certifications.length > 0 && (
            <View style={styles.credentialGroup}>
              <Text style={styles.credentialTitle}>Certifications</Text>
              <View style={styles.badgeContainer}>
                {explorer.certifications.slice(0, 3).map((cert, index) => (
                  <View key={index} style={styles.certificationBadge}>
                    <Text style={styles.badgeText}>{cert}</Text>
                  </View>
                ))}
                {explorer.certifications.length > 3 && (
                  <View style={styles.moreBadge}>
                    <Text style={styles.moreBadgeText}>+{explorer.certifications.length - 3}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          
          {explorer.achievements && explorer.achievements.length > 0 && (
            <View style={styles.credentialGroup}>
              <Text style={styles.credentialTitle}>Achievements</Text>
              <View style={styles.badgeContainer}>
                {explorer.achievements.slice(0, 2).map((achievement, index) => (
                  <View key={index} style={styles.achievementBadge}>
                    <IconSymbol name="trophy.fill" size={12} color="#FFD700" />
                    <Text style={styles.badgeText}>{achievement}</Text>
                  </View>
                ))}
                {explorer.achievements.length > 2 && (
                  <View style={styles.moreBadge}>
                    <Text style={styles.moreBadgeText}>+{explorer.achievements.length - 2}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      )}
      
      <View style={styles.contactInfo}>
        <Text style={styles.contact}>{explorer.email}</Text>
        <Text style={styles.contact}>{explorer.phone}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    position: 'relative',
  },
  specialRankCard: {
    borderWidth: 2,
    borderColor: '#FFD700',
    boxShadow: '0px 4px 12px rgba(255, 215, 0, 0.3)',
    elevation: 6,
  },
  specialStar: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  specialName: {
    fontWeight: '700',
    fontSize: 17,
  },
  rank: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  specialRank: {
    fontWeight: '700',
    fontSize: 15,
  },
  joinDate: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  attendanceSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  attendanceSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  attendanceGrid: {
    gap: 6,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  attendanceLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
  },
  attendanceValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  credentialsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  credentialGroup: {
    marginBottom: 8,
  },
  credentialTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  certificationBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  achievementBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  moreBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  moreBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 12,
  },
  contact: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
});
