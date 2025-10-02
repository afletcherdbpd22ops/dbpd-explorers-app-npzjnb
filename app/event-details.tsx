
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { events, Event } from '@/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <>
        <Stack.Screen options={{ title: "Event Not Found" }} />
        <SafeAreaView style={[commonStyles.wrapper]}>
          <View style={styles.errorContainer}>
            <IconSymbol name="exclamationmark.triangle" size={60} color={colors.textSecondary} />
            <Text style={styles.errorText}>Event not found</Text>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </>
    );
  }

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

  const handleRSVP = () => {
    Alert.alert(
      "RSVP",
      `Would you like to RSVP for "${event.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes, I'll attend", onPress: () => Alert.alert("RSVP Confirmed", "You have been registered for this event.") },
        { text: "No, I can't attend", style: "destructive", onPress: () => Alert.alert("RSVP Declined", "You have been marked as unable to attend.") }
      ]
    );
  };

  const handleAddToCalendar = () => {
    Alert.alert("Add to Calendar", "Calendar integration coming soon!");
  };

  const handleShare = () => {
    Alert.alert("Share Event", "Event sharing coming soon!");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Event Details",
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerRight: () => (
            <Pressable onPress={handleShare} style={styles.headerButton}>
              <IconSymbol name="square.and.arrow.up" size={20} color={colors.primary} />
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
          {/* Event Header */}
          <View style={styles.eventHeader}>
            <View style={[styles.iconContainer, { backgroundColor: getEventColor(event.type) }]}>
              <IconSymbol 
                name={getEventIcon(event.type)} 
                size={40} 
                color={colors.card} 
              />
            </View>
            <Text style={styles.eventTitle}>{event.title}</Text>
            {event.isRequired && (
              <View style={styles.requiredBadge}>
                <IconSymbol name="exclamationmark.circle.fill" size={16} color={colors.card} />
                <Text style={styles.requiredText}>Required Attendance</Text>
              </View>
            )}
          </View>

          {/* Event Details */}
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <IconSymbol name="calendar" size={20} color={colors.textSecondary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{event.date}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <IconSymbol name="clock" size={20} color={colors.textSecondary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>{event.time}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <IconSymbol name="location" size={20} color={colors.textSecondary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{event.location}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <IconSymbol name="tag" size={20} color={colors.textSecondary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={[styles.detailValue, { color: getEventColor(event.type) }]}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{event.description}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <Pressable 
              style={[styles.actionButton, styles.primaryButton]} 
              onPress={handleRSVP}
            >
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.card} />
              <Text style={styles.primaryButtonText}>RSVP</Text>
            </Pressable>

            <Pressable 
              style={[styles.actionButton, styles.secondaryButton]} 
              onPress={handleAddToCalendar}
            >
              <IconSymbol name="calendar.badge.plus" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Add to Calendar</Text>
            </Pressable>
          </View>

          {/* Additional Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Important Information</Text>
            <View style={styles.infoItem}>
              <IconSymbol name="info.circle" size={16} color={colors.primary} />
              <Text style={styles.infoText}>
                Please arrive 15 minutes early for all training sessions
              </Text>
            </View>
            <View style={styles.infoItem}>
              <IconSymbol name="person.badge.shield.checkmark" size={16} color={colors.primary} />
              <Text style={styles.infoText}>
                Proper uniform required for all official events
              </Text>
            </View>
            <View style={styles.infoItem}>
              <IconSymbol name="phone" size={16} color={colors.primary} />
              <Text style={styles.infoText}>
                Contact your supervisor if you cannot attend required events
              </Text>
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
  eventHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  requiredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  requiredText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.card,
    marginLeft: 4,
  },
  detailsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  detailContent: {
    flex: 1,
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  descriptionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
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
  headerButton: {
    padding: 6,
  },
});
