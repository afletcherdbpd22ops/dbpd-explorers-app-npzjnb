
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import EventCard from '@/components/EventCard';
import { events, Event } from '@/data/events';

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  
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

  // Get all upcoming events if no date selected
  const displayEvents = selectedDate 
    ? selectedDateEvents 
    : events.filter(event => new Date(event.date) >= new Date())
             .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleEventPress = (eventId: string) => {
    router.push(`/event-details?id=${eventId}`);
  };

  const handleDatePress = (day: any) => {
    setSelectedDate(day.dateString);
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
        <ScrollView 
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
                backgroundColor: colors.cardLight,
                calendarBackground: colors.cardLight,
                textSectionTitleColor: colors.background,
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: colors.text,
                todayTextColor: colors.primary,
                dayTextColor: colors.background,
                textDisabledColor: colors.secondary,
                dotColor: colors.accent,
                selectedDotColor: colors.text,
                arrowColor: colors.primary,
                monthTextColor: colors.background,
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

          {/* Events List */}
          <View style={styles.eventsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedDate 
                  ? `Events on ${selectedDate}` 
                  : 'Upcoming Events'
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
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => handleEventPress(event.id)}
                />
              ))
            ) : (
              <View style={styles.noEventsContainer}>
                <IconSymbol name="calendar.badge.exclamationmark" size={40} color={colors.textSecondary} />
                <Text style={styles.noEventsText}>
                  {selectedDate ? 'No events on this date' : 'No upcoming events'}
                </Text>
              </View>
            )}
          </View>

          {/* Event Types Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Event Types</Text>
            <View style={styles.filterGrid}>
              <View style={[styles.filterCard, { backgroundColor: colors.primary }]}>
                <IconSymbol name="graduationcap.fill" size={24} color={colors.text} />
                <Text style={styles.filterText}>Training</Text>
                <Text style={styles.filterCount}>
                  {events.filter(e => e.type === 'training').length}
                </Text>
              </View>
              
              <View style={[styles.filterCard, { backgroundColor: colors.card }]}>
                <IconSymbol name="person.3.fill" size={24} color={colors.text} />
                <Text style={styles.filterText}>Meetings</Text>
                <Text style={styles.filterCount}>
                  {events.filter(e => e.type === 'meeting').length}
                </Text>
              </View>
              
              <View style={[styles.filterCard, { backgroundColor: colors.accent }]}>
                <IconSymbol name="heart.fill" size={24} color={colors.background} />
                <Text style={[styles.filterText, { color: colors.background }]}>Community</Text>
                <Text style={[styles.filterCount, { color: colors.background }]}>
                  {events.filter(e => e.type === 'community').length}
                </Text>
              </View>
              
              <View style={[styles.filterCard, { backgroundColor: '#dc3545' }]}>
                <IconSymbol name="star.fill" size={24} color={colors.text} />
                <Text style={styles.filterText}>Ceremonies</Text>
                <Text style={styles.filterCount}>
                  {events.filter(e => e.type === 'ceremony').length}
                </Text>
              </View>
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
  filterSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  filterCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
});
