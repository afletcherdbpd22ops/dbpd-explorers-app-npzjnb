
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { events, Event } from '@/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <SafeAreaView style={[commonStyles.wrapper]}>
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={60} color={colors.textSecondary} />
          <Text style={styles.errorText}>Event not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'training': return 'graduationcap.fill';
      case 'meeting': return 'person.3.fill';
      case 'community': return 'heart.fill';
      case 'ceremony': return 'star.fill';
      default: return 'calendar';
    }
  };

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'training': return colors.primary;
      case 'meeting': return colors.card;
      case 'community': return colors.accent;
      case 'ceremony': return '#dc3545';
      default: return colors.textSecondary;
    }
  };

  const handleRSVP = () => {
    if (event.rsvpRequired) {
      Alert.alert(
        'RSVP Confirmation',
        `Would you like to RSVP for "${event.title}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'RSVP', 
            onPress: () => {
              console.log(`RSVP confirmed for event: ${event.id}`);
              Alert.alert('RSVP Confirmed', 'Your RSVP has been recorded. You will receive a confirmation email shortly.');
            }
          }
        ]
      );
    } else {
      Alert.alert('RSVP Not Required', 'This event does not require an RSVP. Just show up at the scheduled time!');
    }
  };

  const handleAddToCalendar = () => {
    Alert.alert(
      'Add to Calendar',
      'This would add the event to your device calendar.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add', onPress: () => console.log('Adding to calendar:', event.id) }
      ]
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Share Event',
      'This would share the event details with others.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Sharing event:', event.id) }
      ]
    );
  };

  const handleContactPerson = () => {
    if (event.contactPhone) {
      Alert.alert(
        'Contact',
        `Call ${event.contactPerson} at ${event.contactPhone}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Call', onPress: () => console.log('Calling:', event.contactPhone) }
        ]
      );
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Event Details",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <IconSymbol name="chevron.left" size={20} color={colors.text} />
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
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: getEventColor(event.type) }]}>
              <IconSymbol name={getEventIcon(event.type)} size={32} color={colors.text} />
            </View>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.badgeContainer}>
              {event.isRequired && (
                <View style={styles.requiredBadge}>
                  <Text style={styles.requiredBadgeText}>Required</Text>
                </View>
              )}
              <View style={[styles.typeBadge, { backgroundColor: getEventColor(event.type) }]}>
                <Text style={styles.typeBadgeText}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Info */}
          <View style={styles.quickInfoContainer}>
            <View style={styles.quickInfoItem}>
              <IconSymbol name="calendar" size={20} color={colors.primary} />
              <Text style={styles.quickInfoText}>{event.date}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <IconSymbol name="clock" size={20} color={colors.primary} />
              <Text style={styles.quickInfoText}>
                {event.time}{event.endTime ? ` - ${event.endTime}` : ''}
              </Text>
            </View>
            <View style={styles.quickInfoItem}>
              <IconSymbol name="location" size={20} color={colors.primary} />
              <Text style={styles.quickInfoText}>{event.location}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <Pressable style={styles.actionButton} onPress={handleRSVP}>
              <IconSymbol name="person.badge.plus" size={20} color={colors.text} />
              <Text style={styles.actionButtonText}>RSVP</Text>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={handleAddToCalendar}>
              <IconSymbol name="calendar.badge.plus" size={20} color={colors.text} />
              <Text style={styles.actionButtonText}>Add to Calendar</Text>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={handleShare}>
              <IconSymbol name="square.and.arrow.up" size={20} color={colors.text} />
              <Text style={styles.actionButtonText}>Share</Text>
            </Pressable>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {event.detailedDescription || event.description}
            </Text>
          </View>

          {/* Event Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Details</Text>
            
            {event.address && (
              <View style={styles.detailRow}>
                <IconSymbol name="location.fill" size={16} color={colors.textSecondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Full Address</Text>
                  <Text style={styles.detailValue}>{event.address}</Text>
                </View>
              </View>
            )}

            {event.instructor && (
              <View style={styles.detailRow}>
                <IconSymbol name="person.circle.fill" size={16} color={colors.textSecondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Instructor</Text>
                  <Text style={styles.detailValue}>{event.instructor}</Text>
                </View>
              </View>
            )}

            {event.contactPerson && (
              <Pressable style={styles.detailRow} onPress={handleContactPerson}>
                <IconSymbol name="phone.fill" size={16} color={colors.textSecondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Contact Person</Text>
                  <Text style={[styles.detailValue, { color: colors.primary }]}>
                    {event.contactPerson}
                    {event.contactPhone && ` - ${event.contactPhone}`}
                  </Text>
                </View>
              </Pressable>
            )}

            {event.maxParticipants && (
              <View style={styles.detailRow}>
                <IconSymbol name="person.2.fill" size={16} color={colors.textSecondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Capacity</Text>
                  <Text style={styles.detailValue}>
                    {event.currentParticipants || 0} / {event.maxParticipants} participants
                  </Text>
                </View>
              </View>
            )}

            {event.dresscode && (
              <View style={styles.detailRow}>
                <IconSymbol name="tshirt.fill" size={16} color={colors.textSecondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Dress Code</Text>
                  <Text style={styles.detailValue}>{event.dresscode}</Text>
                </View>
              </View>
            )}

            {event.rsvpRequired && event.rsvpDeadline && (
              <View style={styles.detailRow}>
                <IconSymbol name="exclamationmark.triangle.fill" size={16} color="#f59e0b" />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>RSVP Deadline</Text>
                  <Text style={[styles.detailValue, { color: '#f59e0b' }]}>{event.rsvpDeadline}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Requirements */}
          {event.requirements && event.requirements.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requirements</Text>
              {event.requirements.map((requirement, index) => (
                <View key={index} style={styles.listItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
                  <Text style={styles.listItemText}>{requirement}</Text>
                </View>
              ))}
            </View>
          )}

          {/* What to Bring */}
          {event.whatToBring && event.whatToBring.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What to Bring</Text>
              {event.whatToBring.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <IconSymbol name="bag.fill" size={16} color={colors.accent} />
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Prerequisites */}
          {event.prerequisites && event.prerequisites.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prerequisites</Text>
              {event.prerequisites.map((prerequisite, index) => (
                <View key={index} style={styles.listItem}>
                  <IconSymbol name="graduationcap.fill" size={16} color="#6f42c1" />
                  <Text style={styles.listItemText}>{prerequisite}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Special Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            
            {event.certificationOffered && (
              <View style={styles.highlightCard}>
                <IconSymbol name="rosette" size={24} color={colors.accent} />
                <View style={styles.highlightContent}>
                  <Text style={styles.highlightTitle}>Certification Offered</Text>
                  <Text style={styles.highlightText}>{event.certificationOffered}</Text>
                </View>
              </View>
            )}

            {event.communityServiceHours && (
              <View style={styles.highlightCard}>
                <IconSymbol name="heart.fill" size={24} color="#10b981" />
                <View style={styles.highlightContent}>
                  <Text style={styles.highlightTitle}>Community Service Hours</Text>
                  <Text style={styles.highlightText}>
                    {event.communityServiceHours} hours will be credited
                  </Text>
                </View>
              </View>
            )}

            {event.notes && (
              <View style={styles.notesCard}>
                <IconSymbol name="info.circle.fill" size={20} color={colors.primary} />
                <Text style={styles.notesText}>{event.notes}</Text>
              </View>
            )}
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
    paddingBottom: 40,
  },
  headerButton: {
    padding: 6,
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
    color: colors.text,
    fontWeight: '600',
  },
  header: {
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
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  requiredBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  requiredBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  quickInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  quickInfoText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  listItemText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
  },
  highlightContent: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 14,
    color: colors.secondary,
  },
  notesCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.cardLight,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  notesText: {
    fontSize: 14,
    color: colors.background,
    flex: 1,
    lineHeight: 20,
  },
});
