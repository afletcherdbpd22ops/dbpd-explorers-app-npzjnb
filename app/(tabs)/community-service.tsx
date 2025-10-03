
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { currentUser } from '@/data/auth';
import { 
  communityServiceRecords, 
  upcomingCommunityServiceEvents,
  CommunityServiceRecord,
  CommunityServiceEvent,
  getTotalCommunityServiceHours,
  getPendingCommunityServiceHours,
  getCommunityServiceRecordsByExplorer,
  getAvailableCommunityServiceEvents,
  isExplorerRegisteredForEvent
} from '@/data/communityService';
import { roster } from '@/data/roster';
import React, { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statCard: {
    backgroundColor: colors.cardLight,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.text,
    fontWeight: '600',
    marginLeft: 5,
  },
  recordCard: {
    backgroundColor: colors.cardLight,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  approvedCard: {
    borderLeftColor: '#10b981',
  },
  pendingCard: {
    borderLeftColor: '#f59e0b',
  },
  rejectedCard: {
    borderLeftColor: '#ef4444',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  hoursText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },
  recordOrganization: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 4,
  },
  recordDate: {
    fontSize: 12,
    color: colors.secondary,
    marginBottom: 8,
  },
  recordDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  approvedBadge: {
    backgroundColor: '#d1fae5',
  },
  pendingBadge: {
    backgroundColor: '#fef3c7',
  },
  rejectedBadge: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  approvedText: {
    color: '#065f46',
  },
  pendingText: {
    color: '#92400e',
  },
  rejectedText: {
    color: '#991b1b',
  },
  eventCard: {
    backgroundColor: colors.cardLight,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  eventOrganization: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 4,
  },
  eventDateTime: {
    fontSize: 12,
    color: colors.secondary,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 10,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsInfo: {
    fontSize: 12,
    color: colors.secondary,
  },
  registerButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  registeredButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  registerButtonText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateIcon: {
    marginBottom: 15,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  inactiveFilter: {
    backgroundColor: 'transparent',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeFilterText: {
    color: colors.text,
  },
  inactiveFilterText: {
    color: colors.primary,
  },
});

export default function CommunityServiceScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'records' | 'events'>('records');
  const [recordFilter, setRecordFilter] = useState<'all' | 'approved' | 'pending'>('all');

  const userRecords = getCommunityServiceRecordsByExplorer(currentUser.id);
  const totalHours = getTotalCommunityServiceHours(currentUser.id);
  const pendingHours = getPendingCommunityServiceHours(currentUser.id);
  const availableEvents = getAvailableCommunityServiceEvents();

  const filteredRecords = userRecords.filter(record => {
    if (recordFilter === 'all') return true;
    return record.status === recordFilter;
  });

  const handleAddRecord = () => {
    router.push('/add-community-service');
  };

  const handleRecordPress = (recordId: string) => {
    router.push(`/community-service-details?id=${recordId}&type=record`);
  };

  const handleEventPress = (eventId: string) => {
    router.push(`/community-service-details?id=${eventId}&type=event`);
  };

  const handleRegisterForEvent = (eventId: string) => {
    const event = upcomingCommunityServiceEvents.find(e => e.id === eventId);
    if (!event) return;

    const isRegistered = isExplorerRegisteredForEvent(currentUser.id, eventId);
    
    if (isRegistered) {
      Alert.alert(
        'Already Registered',
        `You are already registered for "${event.title}".`,
        [{ text: 'OK' }]
      );
      return;
    }

    if (event.maxParticipants && event.currentParticipants.length >= event.maxParticipants) {
      Alert.alert(
        'Event Full',
        `"${event.title}" is currently full. You can join the waitlist.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Join Waitlist', onPress: () => console.log('Join waitlist for event:', eventId) }
        ]
      );
      return;
    }

    Alert.alert(
      'Register for Event',
      `Would you like to register for "${event.title}" on ${event.date}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Register', onPress: () => {
          // Add user to event participants
          event.currentParticipants.push(currentUser.id);
          Alert.alert('Success', 'You have been registered for this event!');
        }}
      ]
    );
  };

  const getStatusIcon = (status: CommunityServiceRecord['status']) => {
    switch (status) {
      case 'approved':
        return 'checkmark.circle.fill';
      case 'pending':
        return 'clock.fill';
      case 'rejected':
        return 'xmark.circle.fill';
      default:
        return 'questionmark.circle.fill';
    }
  };

  const renderRecord = (record: CommunityServiceRecord) => (
    <Pressable 
      key={record.id} 
      style={[
        styles.recordCard,
        record.status === 'approved' && styles.approvedCard,
        record.status === 'pending' && styles.pendingCard,
        record.status === 'rejected' && styles.rejectedCard,
      ]}
      onPress={() => handleRecordPress(record.id)}
    >
      <View style={styles.recordHeader}>
        <Text style={styles.recordTitle}>{record.eventName}</Text>
        <View style={styles.hoursContainer}>
          <IconSymbol name="clock.fill" size={12} color={colors.text} />
          <Text style={styles.hoursText}>{record.hoursServed}h</Text>
        </View>
      </View>
      
      <Text style={styles.recordOrganization}>{record.organization}</Text>
      <Text style={styles.recordDate}>{new Date(record.date).toLocaleDateString()}</Text>
      <Text style={styles.recordDescription} numberOfLines={2}>
        {record.description}
      </Text>
      
      <View style={styles.statusContainer}>
        <View style={[
          styles.statusBadge,
          record.status === 'approved' && styles.approvedBadge,
          record.status === 'pending' && styles.pendingBadge,
          record.status === 'rejected' && styles.rejectedBadge,
        ]}>
          <IconSymbol 
            name={getStatusIcon(record.status)} 
            size={12} 
            color={
              record.status === 'approved' ? '#065f46' :
              record.status === 'pending' ? '#92400e' : '#991b1b'
            } 
          />
          <Text style={[
            styles.statusText,
            record.status === 'approved' && styles.approvedText,
            record.status === 'pending' && styles.pendingText,
            record.status === 'rejected' && styles.rejectedText,
          ]}>
            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
          </Text>
        </View>
        
        {record.location && (
          <Text style={styles.recordDate} numberOfLines={1}>
            {record.location}
          </Text>
        )}
      </View>
    </Pressable>
  );

  const renderEvent = (event: CommunityServiceEvent) => {
    const isRegistered = isExplorerRegisteredForEvent(currentUser.id, event.id);
    
    return (
      <Pressable 
        key={event.id} 
        style={styles.eventCard}
        onPress={() => handleEventPress(event.id)}
      >
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <View style={styles.hoursContainer}>
            <IconSymbol name="clock.fill" size={12} color={colors.text} />
            <Text style={styles.hoursText}>{event.hoursOffered}h</Text>
          </View>
        </View>
        
        <Text style={styles.eventOrganization}>{event.organization}</Text>
        <Text style={styles.eventDateTime}>
          {new Date(event.date).toLocaleDateString()} • {event.startTime} - {event.endTime}
        </Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {event.description}
        </Text>
        
        <View style={styles.eventFooter}>
          <Text style={styles.participantsInfo}>
            {event.currentParticipants.length}
            {event.maxParticipants ? `/${event.maxParticipants}` : ''} registered
          </Text>
          
          <Pressable
            style={isRegistered ? styles.registeredButton : styles.registerButton}
            onPress={(e) => {
              e.stopPropagation();
              handleRegisterForEvent(event.id);
            }}
          >
            <Text style={styles.registerButtonText}>
              {isRegistered ? 'Registered' : 'Register'}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Community Service',
          headerShown: false,
        }} 
      />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Service</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalHours}</Text>
            <Text style={styles.statLabel}>Approved Hours</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pendingHours}</Text>
            <Text style={styles.statLabel}>Pending Hours</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userRecords.length}</Text>
            <Text style={styles.statLabel}>Total Records</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tab Navigation */}
        <View style={styles.filterContainer}>
          <Pressable
            style={[
              styles.filterButton,
              activeTab === 'records' ? styles.activeFilter : styles.inactiveFilter
            ]}
            onPress={() => setActiveTab('records')}
          >
            <Text style={[
              styles.filterText,
              activeTab === 'records' ? styles.activeFilterText : styles.inactiveFilterText
            ]}>
              My Records
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.filterButton,
              activeTab === 'events' ? styles.activeFilter : styles.inactiveFilter
            ]}
            onPress={() => setActiveTab('events')}
          >
            <Text style={[
              styles.filterText,
              activeTab === 'events' ? styles.activeFilterText : styles.inactiveFilterText
            ]}>
              Available Events
            </Text>
          </Pressable>
        </View>

        {activeTab === 'records' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Service Records</Text>
              <Pressable style={styles.addButton} onPress={handleAddRecord}>
                <IconSymbol name="plus" size={16} color={colors.text} />
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>

            {/* Record Filters */}
            <View style={styles.filterContainer}>
              <Pressable
                style={[
                  styles.filterButton,
                  recordFilter === 'all' ? styles.activeFilter : styles.inactiveFilter
                ]}
                onPress={() => setRecordFilter('all')}
              >
                <Text style={[
                  styles.filterText,
                  recordFilter === 'all' ? styles.activeFilterText : styles.inactiveFilterText
                ]}>
                  All
                </Text>
              </Pressable>
              
              <Pressable
                style={[
                  styles.filterButton,
                  recordFilter === 'approved' ? styles.activeFilter : styles.inactiveFilter
                ]}
                onPress={() => setRecordFilter('approved')}
              >
                <Text style={[
                  styles.filterText,
                  recordFilter === 'approved' ? styles.activeFilterText : styles.inactiveFilterText
                ]}>
                  Approved
                </Text>
              </Pressable>
              
              <Pressable
                style={[
                  styles.filterButton,
                  recordFilter === 'pending' ? styles.activeFilter : styles.inactiveFilter
                ]}
                onPress={() => setRecordFilter('pending')}
              >
                <Text style={[
                  styles.filterText,
                  recordFilter === 'pending' ? styles.activeFilterText : styles.inactiveFilterText
                ]}>
                  Pending
                </Text>
              </Pressable>
            </View>

            {filteredRecords.length > 0 ? (
              filteredRecords.map(renderRecord)
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol 
                  name="heart.fill" 
                  size={48} 
                  color={colors.textSecondary} 
                  style={styles.emptyStateIcon}
                />
                <Text style={styles.emptyStateTitle}>No Service Records</Text>
                <Text style={styles.emptyStateText}>
                  {recordFilter === 'all' 
                    ? 'Start logging your community service hours to track your impact!'
                    : `No ${recordFilter} records found. Try a different filter.`
                  }
                </Text>
              </View>
            )}
          </>
        )}

        {activeTab === 'events' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
            </View>

            {availableEvents.length > 0 ? (
              availableEvents.map(renderEvent)
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol 
                  name="calendar" 
                  size={48} 
                  color={colors.textSecondary} 
                  style={styles.emptyStateIcon}
                />
                <Text style={styles.emptyStateTitle}>No Upcoming Events</Text>
                <Text style={styles.emptyStateText}>
                  Check back later for new community service opportunities!
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
