
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { Explorer } from '@/data/roster';

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
    if (rank.includes('Captain')) return 'star.fill';
    if (rank.includes('Senior')) return 'chevron.up.circle.fill';
    return 'person.circle.fill';
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <IconSymbol 
            name={getRankIcon(explorer.rank)} 
            size={40} 
            color={colors.primary} 
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{explorer.name}</Text>
          <Text style={styles.rank}>{explorer.rank}</Text>
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
    color: colors.text,
    marginBottom: 2,
  },
  rank: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
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
