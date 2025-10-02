
import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  
  // Get upcoming events (next 3)
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const handleEventPress = (eventId: string) => {
    router.push(`/event-details?id=${eventId}`);
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => Alert.alert("Notifications", "No new notifications")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="bell.fill" color={colors.primary} size={20} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "DB Police Explorers",
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerRight: renderHeaderRight,
        }}
      />
      <SafeAreaView style={[commonStyles.wrapper]} edges={['bottom']}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <View style={styles.logoContainer}>
              <IconSymbol name="shield.fill" size={60} color={colors.primary} />
            </View>
            <Text style={styles.welcomeTitle}>Welcome, Explorer!</Text>
            <Text style={styles.welcomeSubtitle}>
              Daytona Beach Police Explorer Program
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <Pressable 
                style={[styles.quickActionCard, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/(tabs)/calendar')}
              >
                <IconSymbol name="calendar" size={24} color={colors.card} />
                <Text style={styles.quickActionText}>Calendar</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.quickActionCard, { backgroundColor: colors.secondary }]}
                onPress={() => router.push('/(tabs)/roster')}
              >
                <IconSymbol name="person.3.fill" size={24} color={colors.card} />
                <Text style={styles.quickActionText}>Roster</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.quickActionCard, { backgroundColor: colors.accent }]}
                onPress={() => Alert.alert("Google Drive", "Google Drive integration coming soon!")}
              >
                <IconSymbol name="folder.fill" size={24} color={colors.text} />
                <Text style={[styles.quickActionText, { color: colors.text }]}>Drive</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.quickActionCard, { backgroundColor: '#28a745' }]}
                onPress={() => router.push('/(tabs)/profile')}
              >
                <IconSymbol name="person.fill" size={24} color={colors.card} />
                <Text style={styles.quickActionText}>Profile</Text>
              </Pressable>
            </View>
          </View>

          {/* Upcoming Events */}
          <View style={styles.eventsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <Pressable onPress={() => router.push('/(tabs)/calendar')}>
                <Text style={styles.seeAllText}>See All</Text>
              </Pressable>
            </View>
            
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => handleEventPress(event.id)}
                />
              ))
            ) : (
              <View style={styles.noEventsContainer}>
                <IconSymbol name="calendar.badge.exclamationmark" size={40} color={colors.textSecondary} />
                <Text style={styles.noEventsText}>No upcoming events</Text>
              </View>
            )}
          </View>

          {/* Announcements */}
          <View style={styles.announcementsSection}>
            <Text style={styles.sectionTitle}>Recent Announcements</Text>
            <View style={commonStyles.card}>
              <View style={styles.announcementHeader}>
                <IconSymbol name="megaphone.fill" size={20} color={colors.primary} />
                <Text style={styles.announcementTitle}>New Training Schedule</Text>
              </View>
              <Text style={styles.announcementText}>
                Updated training schedules are now available. Please check the calendar for your assigned sessions.
              </Text>
              <Text style={styles.announcementDate}>Posted 2 days ago</Text>
            </View>
            
            <View style={commonStyles.card}>
              <View style={styles.announcementHeader}>
                <IconSymbol name="info.circle.fill" size={20} color={colors.accent} />
                <Text style={styles.announcementTitle}>Uniform Inspection</Text>
              </View>
              <Text style={styles.announcementText}>
                Monthly uniform inspection will be conducted at the next meeting. Ensure all items are clean and properly maintained.
              </Text>
              <Text style={styles.announcementDate}>Posted 1 week ago</Text>
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
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
    marginTop: 8,
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
  seeAllText: {
    fontSize: 16,
    color: colors.primary,
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
  },
  announcementsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  announcementText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
