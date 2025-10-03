
import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Alert, Image } from "react-native";
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
      <IconSymbol name="bell.fill" color={colors.text} size={20} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "DB Police Explorers",
          headerStyle: {
            backgroundColor: colors.background,
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
          {/* Logo and Welcome Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              {/* Logo placeholder - you can replace this with an actual logo image */}
              <View style={styles.logoPlaceholder}>
                <IconSymbol name="shield.fill" size={80} color={colors.accent} />
                <Text style={styles.logoText}>LOGO</Text>
              </View>
            </View>
            <Text style={styles.welcomeTitle}>Daytona Beach</Text>
            <Text style={styles.welcomeTitle}>Police Explorers</Text>
            <Text style={styles.welcomeSubtitle}>
              Excellence • Service • Community
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
                <IconSymbol name="calendar" size={24} color={colors.text} />
                <Text style={styles.quickActionText}>Calendar</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.quickActionCard, { backgroundColor: colors.card }]}
                onPress={() => router.push('/(tabs)/roster')}
              >
                <IconSymbol name="person.3.fill" size={24} color={colors.text} />
                <Text style={styles.quickActionText}>Roster</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.quickActionCard, { backgroundColor: '#17a2b8' }]}
                onPress={() => router.push('/(tabs)/meetings')}
              >
                <IconSymbol name="person.2.fill" size={24} color={colors.text} />
                <Text style={styles.quickActionText}>Meetings</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.quickActionCard, { backgroundColor: '#6f42c1' }]}
                onPress={() => router.push('/applications')}
              >
                <IconSymbol name="doc.text.fill" size={24} color={colors.text} />
                <Text style={styles.quickActionText}>Applications</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.quickActionCard, { backgroundColor: colors.accent }]}
                onPress={() => Alert.alert("Google Drive", "This will open the Daytona Beach Police Explorer Google Drive with shared documents, training materials, and resources.", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Open Drive", onPress: () => console.log("Opening Google Drive - would redirect to actual Google Drive link") }
                ])}
              >
                <IconSymbol name="folder.fill" size={24} color={colors.background} />
                <Text style={[styles.quickActionText, { color: colors.background }]}>Google Drive</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.quickActionCard, { backgroundColor: '#10b981' }]}
                onPress={() => router.push('/new-application')}
              >
                <IconSymbol name="person.badge.plus" size={24} color={colors.text} />
                <Text style={styles.quickActionText}>Apply</Text>
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

          {/* Program Information */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Program Information</Text>
            
            <View style={commonStyles.card}>
              <View style={styles.infoHeader}>
                <IconSymbol name="info.circle.fill" size={20} color={colors.primary} />
                <Text style={styles.infoTitle}>About the Explorer Program</Text>
              </View>
              <Text style={styles.infoText}>
                The Daytona Beach Police Explorer program provides young adults with hands-on experience in law enforcement, 
                community service opportunities, and leadership development. Explorers participate in training, community events, 
                and support police operations.
              </Text>
            </View>
            
            <View style={commonStyles.card}>
              <View style={styles.infoHeader}>
                <IconSymbol name="person.3.fill" size={20} color={colors.accent} />
                <Text style={styles.infoTitle}>Ranking Structure</Text>
              </View>
              <Text style={styles.infoText}>
                • Explorer Major - Highest ranking Explorer{'\n'}
                • Explorer Captain - Senior leadership role{'\n'}
                • Explorer Lieutenant - Leadership position{'\n'}
                • Explorer Sergeant - Supervisory role{'\n'}
                • Explorer Corporal - Junior leadership{'\n'}
                • Explorer - Entry level position{'\n'}
                • Advisors - Police officers who supervise the program
              </Text>
            </View>
            
            <View style={commonStyles.card}>
              <View style={styles.infoHeader}>
                <IconSymbol name="envelope.fill" size={20} color="#28a745" />
                <Text style={styles.infoTitle}>Email-Based Access</Text>
              </View>
              <Text style={styles.infoText}>
                This application uses simple email-based sign-in for easy access. No passwords or complex authentication required. 
                Just enter your email address to access your Explorer profile and program information.
              </Text>
            </View>
          </View>

          {/* Recent Announcements */}
          <View style={styles.announcementsSection}>
            <Text style={styles.sectionTitle}>Recent Announcements</Text>
            <View style={commonStyles.card}>
              <View style={styles.announcementHeader}>
                <IconSymbol name="megaphone.fill" size={20} color={colors.primary} />
                <Text style={styles.announcementTitle}>New Web Application Features</Text>
              </View>
              <Text style={styles.announcementText}>
                The Explorer program now has a comprehensive web application! Access meeting attendance, 
                view member applications, track community service hours, and manage your profile all in one place.
              </Text>
              <Text style={styles.announcementDate}>Posted today</Text>
            </View>
            
            <View style={commonStyles.card}>
              <View style={styles.announcementHeader}>
                <IconSymbol name="calendar.badge.plus" size={20} color={colors.accent} />
                <Text style={styles.announcementTitle}>Weekly Meeting Tracking</Text>
              </View>
              <Text style={styles.announcementText}>
                Attendance tracking is now digital! Check the Meetings tab to view your attendance record 
                and see upcoming meeting topics and locations.
              </Text>
              <Text style={styles.announcementDate}>Posted 2 days ago</Text>
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
  logoSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.cardLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    elevation: 6,
  },
  logoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.accent,
    marginTop: 4,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 32,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
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
    aspectRatio: 1.2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
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
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.background,
    lineHeight: 20,
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
    color: colors.background,
    marginLeft: 8,
  },
  announcementText: {
    fontSize: 14,
    color: colors.background,
    lineHeight: 20,
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 12,
    color: colors.secondary,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
