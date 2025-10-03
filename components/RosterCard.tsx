
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { Explorer, isSpecialRank } from '@/data/roster';

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

  return (
    <Pressable 
      style={[
        styles.card, 
        isSpecial && styles.specialRankCard
      ]} 
      onPress={onPress}
    >
      {isSpecial && (
        <View style={styles.specialBadge}>
          <IconSymbol name="star.fill" size={12} color="#FFD700" />
          <Text style={styles.specialBadgeText}>SPECIAL RANK</Text>
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
      
      <View style={styles.contactInfo}>
        <Text style={styles.contact}>{explorer.email}</Text>
        <Text style={styles.contact}>{explorer.phone}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  specialRankCard: {
    borderWidth: 2,
    borderColor: '#FFD700',
    boxShadow: '0px 4px 12px rgba(255, 215, 0, 0.3)',
    elevation: 6,
    backgroundColor: '#FFFEF7', // Slightly golden tint
  },
  specialBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  specialBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8, // Add space for special badge
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
    color: colors.text,
    marginBottom: 2,
  },
  specialName: {
    fontWeight: '700',
    fontSize: 17,
  },
  rank: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  specialRank: {
    fontWeight: '700',
    fontSize: 15,
  },
  joinDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.card,
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
    paddingTop: 12,
  },
  contact: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
});
