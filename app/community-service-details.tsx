
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { colors, commonStyles } from '@/styles/commonStyles';
import { 
  communityServiceRecords, 
  upcomingCommunityServiceEvents,
  CommunityServiceRecord,
  CommunityServiceEvent 
} from '@/data/communityService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  backButton: {
    marginRight: 15,
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.secondary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  detailCard: {
    backgroundColor: colors.cardLight,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  organization: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 10,
    width: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginTop: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  approvedStatus: {
    backgroundColor: '#d1fae5',
  },
  pendingStatus: {
    backgroundColor: '#fef3c7',
  },
  rejectedStatus: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  actionButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  supervisorSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
  },
  supervisorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 10,
  },
  requirementsSection: {
    marginTop: 15,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  requirement: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
    paddingLeft: 10,
  },
  participantsSection: {
    marginTop: 15,
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  participantsText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default function CommunityServiceDetailsScreen() {
  const router = useRouter();
  const { id, type } = useLocalSearchParams<{ id: string; type: 'record' | 'event' }>();

  const record = type === 'record' ? communityServiceRecords.find(r => r.id === id) : null;
  const event = type === 'event' ? upcomingCommunityServiceEvents.find(e => e.id === id) : null;

  if (!record && !event) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={20} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Not Found</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.infoText}>The requested item could not be found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleContactSupervisor = (contact: string) => {
    if (contact.includes('@')) {
      Alert.alert(
        'Contact Supervisor',
        `Send email to ${contact}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Send Email', onPress: () => console.log('Open email app') }
        ]
      );
    } else {
      Alert.alert(
        'Contact Supervisor',
        `Call ${contact}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Call', onPress: () => console.log('Open phone app') }
        ]
      );
    }
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
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.detailCard}>
        <Text style={styles.title}>{record.eventName}</Text>
        <Text style={styles.organization}>{record.organization}</Text>
        
        <View style={styles.infoRow}>
          <IconSymbol name="calendar" size={20} color={colors.secondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>{new Date(record.date).toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <IconSymbol name="clock.fill" size={20} color={colors.secondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>{record.hoursServed} hours served</Text>
        </View>
        
        <View style={styles.infoRow}>
          <IconSymbol name="location.fill" size={20} color={colors.secondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>{record.location}</Text>
        </View>
        
        <Text style={styles.description}>{record.description}</Text>
        
        <View style={[
          styles.statusContainer,
          record.status === 'approved' && styles.approvedStatus,
          record.status === 'pending' && styles.pendingStatus,
          record.status === 'rejected' && styles.rejectedStatus,
        ]}>
          <IconSymbol 
            name={getStatusIcon(record.status)} 
            size={20} 
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
        
        {record.approvedBy && record.approvedDate && (
          <View style={styles.infoRow}>
            <IconSymbol name="person.fill" size={20} color={colors.secondary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Approved by {record.approvedBy} on {new Date(record.approvedDate).toLocaleDateString()}
            </Text>
          </View>
        )}
        
        {record.notes && (
          <View style={styles.infoRow}>
            <IconSymbol name="note.text" size={20} color={colors.secondary} style={styles.infoIcon} />
            <Text style={styles.infoText}>{record.notes}</Text>
          </View>
        )}
      </View>
      
      {(record.supervisorName || record.supervisorContact) && (
        <View style={styles.supervisorSection}>
          <Text style={styles.supervisorTitle}>Supervisor Information</Text>
          {record.supervisorName && (
            <View style={styles.infoRow}>
              <IconSymbol name="person.fill" size={16} color={colors.secondary} style={styles.infoIcon} />
              <Text style={styles.infoText}>{record.supervisorName}</Text>
            </View>
          )}
          {record.supervisorContact && (
            <Pressable onPress={() => handleContactSupervisor(record.supervisorContact!)}>
              <View style={styles.infoRow}>
                <IconSymbol 
                  name={record.supervisorContact!.includes('@') ? 'envelope.fill' : 'phone.fill'} 
                  size={16} 
                  color={colors.primary} 
                  style={styles.infoIcon} 
                />
                <Text style={[styles.infoText, { color: colors.primary }]}>
                  {record.supervisorContact}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      )}
    </ScrollView>
  );

  const renderEvent = (event: CommunityServiceEvent) => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.detailCard}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.organization}>{event.organization}</Text>
        
        <View style={styles.infoRow}>
          <IconSymbol name="calendar" size={20} color={colors.secondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>{new Date(event.date).toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <IconSymbol name="clock.fill" size={20} color={colors.secondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>{event.startTime} - {event.endTime} ({event.hoursOffered} hours)</Text>
        </View>
        
        <View style={styles.infoRow}>
          <IconSymbol name="location.fill" size={20} color={colors.secondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
        
        <Text style={styles.description}>{event.description}</Text>
        
        {event.requirements && event.requirements.length > 0 && (
          <View style={styles.requirementsSection}>
            <Text style={styles.requirementsTitle}>Requirements:</Text>
            {event.requirements.map((requirement, index) => (
              <Text key={index} style={styles.requirement}>• {requirement}</Text>
            ))}
          </View>
        )}
        
        <View style={styles.participantsSection}>
          <Text style={styles.participantsTitle}>Participants</Text>
          <Text style={styles.participantsText}>
            {event.currentParticipants.length}
            {event.maxParticipants ? `/${event.maxParticipants}` : ''} registered
          </Text>
        </View>
      </View>
      
      <View style={styles.supervisorSection}>
        <Text style={styles.supervisorTitle}>Event Supervisor</Text>
        <View style={styles.infoRow}>
          <IconSymbol name="person.fill" size={16} color={colors.secondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>{event.supervisorName}</Text>
        </View>
        <Pressable onPress={() => handleContactSupervisor(event.supervisorContact)}>
          <View style={styles.infoRow}>
            <IconSymbol 
              name={event.supervisorContact.includes('@') ? 'envelope.fill' : 'phone.fill'} 
              size={16} 
              color={colors.primary} 
              style={styles.infoIcon} 
            />
            <Text style={[styles.infoText, { color: colors.primary }]}>
              {event.supervisorContact}
            </Text>
          </View>
        </Pressable>
      </View>
      
      <Pressable style={styles.actionButton} onPress={() => {
        Alert.alert(
          'Register for Event',
          `Register for "${event.title}"?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Register', onPress: () => {
              Alert.alert('Success', 'You have been registered for this event!');
              router.back();
            }}
          ]
        );
      }}>
        <Text style={styles.actionButtonText}>Register for Event</Text>
      </Pressable>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={20} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>
          {record ? 'Service Record' : 'Service Event'}
        </Text>
      </View>
      
      {record && renderRecord(record)}
      {event && renderEvent(event)}
    </SafeAreaView>
  );
}
