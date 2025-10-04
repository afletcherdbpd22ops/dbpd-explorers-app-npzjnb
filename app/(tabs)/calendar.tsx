
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import EventCard from '@/components/EventCard';
import TabAwareScrollView from '@/components/TabAwareScrollView';
import { events, Event } from '@/data/events';

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  // Create marked dates object for calendar
  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = {
      marked: true,
      dotColor: event.isRequired ? '#dc3545' : colors.accent,
      selectedColor: colors.primary,
    };
    return acc;
  }, {} as any);

  // Add selected date styling
  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: colors.primary,
    };
  }

  // Get events for selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(event => event.date === selectedDate)
    : [];

  // Filter events based on selected filter
  const filterEvents = (eventList: Event[]) => {
    if (selectedFilter === 'all') return eventList;
    return eventList.filter(event => event.type === selectedFilter);
  };

  // Get all upcoming events if no date selected
  const displayEvents = selectedDate 
    ? filterEvents(selectedDateEvents)
    : filterEvents(events.filter(event => new Date(event.date) >= new Date())
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));

  const handleEventPress = (eventId: string) => {
    router.push(`/event-details?id=${eventId}`);
  };

  const handleDatePress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'training': return 'graduationcap.fill';
      case 'meeting': return 'person.3.fill';
      case 'community': return 'heart.fill';
      case 'ceremony': return 'star.fill';
      default: return 'calendar';
    }
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'training': return colors.primary;
      case 'meeting': return colors.card;
      case 'community': return colors.accent;
      case 'ceremony': return '#dc3545';
      default: return colors.textSecondary;
    }
  };

  const getEventTypeCount = (type: string) => {
    if (type === 'all') return events.length;
    return events.filter(e => e.type === type).length;
  };

  const getUpcomingEventTypeCount = (type: string) => {
    const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
    if (type === 'all') return upcomingEvents.length;
    return upcomingEvents.filter(e => e.type === type).length;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Calendar & Events",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <SafeAreaView style={[commonStyles.wrapper]} edges={['bottom']}>
        <TabAwareScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Calendar */}
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDatePress}
              markedDates={markedDates}
              theme={{
                backgroundColor: colors.card,
                calendarBackground: colors.card,
                textSectionTitleColor: colors.text,
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: colors.text,
                todayTextColor: colors.primary,
                dayTextColor: colors.text,
                textDisabledColor: colors.textSecondary,
                dotColor: colors.accent,
                selectedDotColor: colors.text,
                arrowColor: colors.primary,
                monthTextColor: colors.text,
                indicatorColor: colors.primary,
                textDayFontWeight: '500',
                textMonthFontWeight: '600',
                textDayHeaderFontWeight: '600',
              }}
              style={styles.calendar}
            />
          </View>

          {/* Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
              <Text style={styles.legendText}>Optional Event</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#dc3545' }]} />
              <Text style={styles.legendText}>Required Event</Text>
            </View>
          </View>

          {/* Event Type Filters */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Filter Events</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
              <Pressable
                style={[
                  styles.filterChip,
                  selectedFilter === 'all' && styles.filterChipActive,
                  { backgroundColor: selectedFilter === 'all' ? colors.primary : colors.card }
                ]}
                onPress={() => setSelectedFilter('all')}
              >
                <IconSymbol name="calendar" size={16} color={selectedFilter === 'all' ? colors.text : colors.background} />
                <Text style={[
                  styles.filterChipText,
                  { color: selectedFilter === 'all' ? colors.text : colors.text }
                ]}>
                  All ({getUpcomingEventTypeCount('all')})
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.filterChip,
                  selectedFilter === 'training' && styles.filterChipActive,
                  { backgroundColor: selectedFilter === 'training' ? colors.primary : colors.card }
                ]}
                onPress={() => setSelectedFilter('training')}
              >
                <IconSymbol name="graduationcap.fill" size={16} color={selectedFilter === 'training' ? colors.text : colors.text} />
                <Text style={[
                  styles.filterChipText,
                  { color: selectedFilter === 'training' ? colors.text : colors.text }
                ]}>
                  Training ({getUpcomingEventTypeCount('training')})
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.filterChip,
                  selectedFilter === 'meeting' && styles.filterChipActive,
                  { backgroundColor: selectedFilter === 'meeting' ? colors.primary : colors.card }
                ]}
                onPress={() => setSelectedFilter('meeting')}
              >
                <IconSymbol name="person.3.fill" size={16} color={selectedFilter === 'meeting' ? colors.text : colors.text} />
                <Text style={[
                  styles.filterChipText,
                  { color: selectedFilter === 'meeting' ? colors.text : colors.text }
                ]}>
                  Meetings ({getUpcomingEventTypeCount('meeting')})
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.filterChip,
                  selectedFilter === 'community' && styles.filterChipActive,
                  { backgroundColor: selectedFilter === 'community' ? colors.primary : colors.card }
                ]}
                onPress={() => setSelectedFilter('community')}
              >
                <IconSymbol name="heart.fill" size={16} color={selectedFilter === 'community' ? colors.text : colors.text} />
                <Text style={[
                  styles.filterChipText,
                  { color: selectedFilter === 'community' ? colors.text : colors.text }
                ]}>
                  Community ({getUpcomingEventTypeCount('community')})
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.filterChip,
                  selectedFilter === 'ceremony' && styles.filterChipActive,
                  { backgroundColor: selectedFilter === 'ceremony' ? colors.primary : colors.card }
                ]}
                onPress={() => setSelectedFilter('ceremony')}
              >
                <IconSymbol name="star.fill" size={16} color={selectedFilter === 'ceremony' ? colors.text : colors.text} />
                <Text style={[
                  styles.filterChipText,
                  { color: selectedFilter === 'ceremony' ? colors.text : colors.text }
                ]}>
                  Ceremonies ({getUpcomingEventTypeCount('ceremony')})
                </Text>
              </Pressable>
            </TabAwareScrollView>
          </View>

          {/* Events List */}
          <View style={styles.eventsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedDate 
                  ? `Events on ${selectedDate}` 
                  : selectedFilter === 'all' 
                    ? 'Upcoming Events'
                    : `Upcoming ${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Events`
                }
              </Text>
              {selectedDate && (
                <Pressable onPress={() => setSelectedDate('')}>
                  <Text style={styles.clearText}>Show All</Text>
                </Pressable>
              )}
            </View>

            {displayEvents.length > 0 ? (
              displayEvents.map((event) => (
                <View key={event.id} style={styles.eventContainer}>
                  <EventCard
                    event={event}
                    onPress={() => handleEventPress(event.id)}
                  />
                  
                  {/* Enhanced Event Details Preview */}
                  <View style={styles.eventDetailsPreview}>
                    <View style={styles.eventMetaRow}>
                      <View style={styles.eventMetaItem}>
                        <IconSymbol name="clock" size={14} color={colors.textSecondary} />
                        <Text style={styles.eventMetaText}>
                          {event.time}{event.endTime ? ` - ${event.endTime}` : ''}
                        </Text>
                      </View>
                      
                      {event.maxParticipants && (
                        <View style={styles.eventMetaItem}>
                          <IconSymbol name="person.2" size={14} color={colors.textSecondary} />
                          <Text style={styles.eventMetaText}>
                            {event.currentParticipants || 0}/{event.maxParticipants}
                          </Text>
                        </View>
                      )}
                      
                      {event.isRequired && (
                        <View style={styles.requiredBadge}>
                          <Text style={styles.requiredBadgeText}>Required</Text>
                        </View>
                      )}
                    </View>

                    {event.instructor && (
                      <View style={styles.eventMetaRow}>
                        <View style={styles.eventMetaItem}>
                          <IconSymbol name="person.circle" size={14} color={colors.textSecondary} />
                          <Text style={styles.eventMetaText}>Instructor: {event.instructor}</Text>
                        </View>
                      </View>
                    )}

                    {event.certificationOffered && (
                      <View style={styles.certificationBadge}>
                        <IconSymbol name="rosette" size={14} color={colors.accent} />
                        <Text style={styles.certificationText}>{event.certificationOffered}</Text>
                      </View>
                    )}

                    {event.communityServiceHours && (
                      <View style={styles.serviceHoursBadge}>
                        <IconSymbol name="heart.fill" size={14} color="#10b981" />
                        <Text style={styles.serviceHoursText}>
                          {event.communityServiceHours} Service Hours
                        </Text>
                      </View>
                    )}

                    {event.rsvpRequired && event.rsvpDeadline && (
                      <View style={styles.rsvpNotice}>
                        <IconSymbol name="exclamationmark.triangle" size={14} color="#f59e0b" />
                        <Text style={styles.rsvpText}>
                          RSVP Required by {event.rsvpDeadline}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noEventsContainer}>
                <IconSymbol name="calendar.badge.exclamationmark" size={40} color={colors.textSecondary} />
                <Text style={styles.noEventsText}>
                  {selectedDate 
                    ? 'No events on this date' 
                    : selectedFilter === 'all'
                      ? 'No upcoming events'
                      : `No upcoming ${selectedFilter} events`
                  }
                </Text>
              </View>
            )}
          </View>

          {/* Event Statistics */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Event Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
                <IconSymbol name="calendar" size={24} color={colors.text} />
                <Text style={styles.statNumber}>{events.length}</Text>
                <Text style={styles.statLabel}>Total Events</Text>
              </View>
              
              <View style={[styles.statCard, { backgroundColor: '#dc3545' }]}>
                <IconSymbol name="exclamationmark.circle" size={24} color={colors.text} />
                <Text style={styles.statNumber}>
                  {events.filter(e => e.isRequired).length}
                </Text>
                <Text style={styles.statLabel}>Required</Text>
              </View>
              
              <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
                <IconSymbol name="heart.fill" size={24} color={colors.background} />
                <Text style={[styles.statNumber, { color: colors.background }]}>
                  {events.filter(e => e.communityServiceHours).reduce((sum, e) => sum + (e.communityServiceHours || 0), 0)}
                </Text>
                <Text style={[styles.statLabel, { color: colors.background }]}>Service Hours</Text>
              </View>
              
              <View style={[styles.statCard, { backgroundColor: '#10b981' }]}>
                <IconSymbol name="rosette" size={24} color={colors.text} />
                <Text style={styles.statNumber}>
                  {events.filter(e => e.certificationOffered).length}
                </Text>
                <Text style={styles.statLabel}>Certifications</Text>
              </View>
            </View>
          </View>
        </TabAwareScrollView>
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
  calendarContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    elevation: 3,
  },
  calendar: {
    borderRadius: 12,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterScrollView: {
    paddingHorizontal: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    gap: 6,
  },
  filterChipActive: {
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  eventsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  clearText: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: '500',
  },
  eventContainer: {
    marginBottom: 16,
  },
  eventDetailsPreview: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 8,
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  requiredBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  requiredBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.text,
  },
  certificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  certificationText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  serviceHoursBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  serviceHoursText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  rsvpNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  rsvpText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#92400e',
  },
  noEventsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noEventsText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
});
