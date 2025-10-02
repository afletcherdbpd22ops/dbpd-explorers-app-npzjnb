
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { Event } from '@/data/events';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'training':
        return 'graduationcap.fill';
      case 'meeting':
        return 'person.3.fill';
      case 'community':
        return 'heart.fill';
      case 'ceremony':
        return 'star.fill';
      default:
        return 'calendar';
    }
  };

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'training':
        return colors.primary;
      case 'meeting':
        return colors.secondary;
      case 'community':
        return colors.accent;
      case 'ceremony':
        return '#dc3545';
      default:
        return colors.primary;
    }
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: getEventColor(event.type) }]}>
          <IconSymbol 
            name={getEventIcon(event.type)} 
            size={20} 
            color={colors.card} 
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.date}>{event.date} at {event.time}</Text>
        </View>
        {event.isRequired && (
          <View style={styles.requiredBadge}>
            <Text style={styles.requiredText}>Required</Text>
          </View>
        )}
      </View>
      <Text style={styles.location}>{event.location}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {event.description}
      </Text>
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
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  requiredBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  requiredText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.card,
  },
  location: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
