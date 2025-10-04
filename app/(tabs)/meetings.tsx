
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import TabAwareScrollView from '@/components/TabAwareScrollView';
import { weeklyMeetings, MeetingAttendance } from '@/data/meetings';
import { roster } from '@/data/roster';
import { currentUser } from '@/data/auth';

export default function MeetingsScreen() {
  const router = useRouter();
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);

  // Sort meetings by date (most recent first)
  const sortedMeetings = [...weeklyMeetings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getAttendanceStats = (meetingId: string) => {
    const meeting = weeklyMeetings.find(m => m.id === meetingId);
    if (!meeting) return { present: 0, absent: 0, excused: 0, total: 0 };

    const present = meeting.attendanceRecords.filter(r => r.status === 'present').length;
    const absent = meeting.attendanceRecords.filter(r => r.status === 'absent').length;
    const excused = meeting.attendanceRecords.filter(r => r.status === 'excused').length;
    const total = meeting.attendanceRecords.length;

    return { present, absent, excused, total };
  };

  const getExplorerName = (explorerId: string) => {
    const explorer = roster.find(e => e.id === explorerId);
    return explorer ? explorer.name : 'Unknown Explorer';
  };

  const getStatusColor = (status: MeetingAttendance['status']) => {
    switch (status) {
      case 'present': return '#28a745';
      case 'absent': return '#dc3545';
      case 'excused': return '#ffc107';
      default: return colors.secondary;
    }
  };

  const getStatusIcon = (status: MeetingAttendance['status']) => {
    switch (status) {
      case 'present': return 'checkmark.circle.fill';
      case 'absent': return 'xmark.circle.fill';
      case 'excused': return 'exclamationmark.triangle.fill';
      default: return 'questionmark.circle.fill';
    }
  };

  const handleAddMeeting = () => {
    if (currentUser.permissions.canEditCalendar) {
      Alert.alert('Add Meeting', 'Meeting creation feature coming soon!');
    } else {
      Alert.alert('Permission Denied', 'You do not have permission to add meetings.');
    }
  };

  const handleEditAttendance = (meetingId: string) => {
    if (currentUser.permissions.canEditRoster) {
      Alert.alert('Edit Attendance', 'Attendance editing feature coming soon!');
    } else {
      Alert.alert('Permission Denied', 'You do not have permission to edit attendance.');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Weekly Meetings",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerRight: () => (
            currentUser.permissions.canEditCalendar && (
              <Pressable onPress={handleAddMeeting} style={styles.headerButton}>
                <IconSymbol name="plus" size={20} color={colors.accent} />
              </Pressable>
            )
          ),
        }}
      />
      <SafeAreaView style={[commonStyles.wrapper]} edges={['bottom']}>
        <TabAwareScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Overview Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <IconSymbol name="calendar" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>{weeklyMeetings.length}</Text>
              <Text style={styles.statLabel}>Total Meetings</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="person.3.fill" size={24} color="#28a745" />
              <Text style={styles.statNumber}>
                {Math.round(
                  weeklyMeetings.reduce((acc, meeting) => {
                    const stats = getAttendanceStats(meeting.id);
                    return acc + (stats.present / stats.total * 100);
                  }, 0) / weeklyMeetings.length
                )}%
              </Text>
              <Text style={styles.statLabel}>Avg Attendance</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="clock.fill" size={24} color={colors.accent} />
              <Text style={styles.statNumber}>
                {weeklyMeetings.filter(m => new Date(m.date) >= new Date()).length}
              </Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
          </View>

          {/* Meetings List */}
          <View style={styles.meetingsSection}>
            <Text style={styles.sectionTitle}>Meeting History</Text>
            
            {sortedMeetings.map((meeting) => {
              const stats = getAttendanceStats(meeting.id);
              const isExpanded = selectedMeeting === meeting.id;
              const attendanceRate = Math.round((stats.present / stats.total) * 100);
              
              return (
                <View key={meeting.id} style={styles.meetingCard}>
                  <Pressable
                    style={styles.meetingHeader}
                    onPress={() => setSelectedMeeting(isExpanded ? null : meeting.id)}
                  >
                    <View style={styles.meetingInfo}>
                      <Text style={styles.meetingDate}>
                        {new Date(meeting.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                      <Text style={styles.meetingTopic}>{meeting.topic}</Text>
                      <Text style={styles.meetingLocation}>{meeting.location}</Text>
                    </View>
                    
                    <View style={styles.attendancePreview}>
                      <View style={[styles.attendanceRate, {
                        backgroundColor: attendanceRate >= 90 ? '#28a745' : 
                                       attendanceRate >= 75 ? '#ffc107' : '#dc3545'
                      }]}>
                        <Text style={styles.attendanceRateText}>{attendanceRate}%</Text>
                      </View>
                      <Text style={styles.attendanceCount}>
                        {stats.present}/{stats.total}
                      </Text>
                      <IconSymbol 
                        name={isExpanded ? "chevron.up" : "chevron.down"} 
                        size={16} 
                        color={colors.textSecondary} 
                      />
                    </View>
                  </Pressable>

                  {isExpanded && (
                    <View style={styles.attendanceDetails}>
                      <View style={styles.attendanceHeader}>
                        <Text style={styles.attendanceTitle}>Attendance Details</Text>
                        {currentUser.permissions.canEditRoster && (
                          <Pressable 
                            onPress={() => handleEditAttendance(meeting.id)}
                            style={styles.editButton}
                          >
                            <IconSymbol name="pencil" size={16} color={colors.primary} />
                            <Text style={styles.editButtonText}>Edit</Text>
                          </Pressable>
                        )}
                      </View>
                      
                      <View style={styles.attendanceGrid}>
                        {meeting.attendanceRecords.map((record) => (
                          <View key={record.id} style={styles.attendanceItem}>
                            <IconSymbol 
                              name={getStatusIcon(record.status)} 
                              size={20} 
                              color={getStatusColor(record.status)} 
                            />
                            <View style={styles.attendanceItemInfo}>
                              <Text style={styles.attendanceItemName}>
                                {getExplorerName(record.explorerId)}
                              </Text>
                              <Text style={[styles.attendanceItemStatus, {
                                color: getStatusColor(record.status)
                              }]}>
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </Text>
                              {record.notes && (
                                <Text style={styles.attendanceItemNotes}>
                                  {record.notes}
                                </Text>
                              )}
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Attendance Summary by Explorer */}
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>Individual Attendance Summary</Text>
            
            {roster
              .filter(explorer => explorer.status === 'active' || explorer.status === 'probationary')
              .map((explorer) => {
                const explorerAttendance = weeklyMeetings.flatMap(meeting => 
                  meeting.attendanceRecords.filter(record => record.explorerId === explorer.id)
                );
                
                const totalMeetings = explorerAttendance.length;
                const presentCount = explorerAttendance.filter(r => r.status === 'present').length;
                const attendanceRate = totalMeetings > 0 ? Math.round((presentCount / totalMeetings) * 100) : 0;
                
                return (
                  <View key={explorer.id} style={styles.summaryCard}>
                    <View style={styles.summaryInfo}>
                      <Text style={styles.summaryName}>{explorer.name}</Text>
                      <Text style={styles.summaryRank}>{explorer.rank}</Text>
                      <Text style={styles.summaryStats}>
                        {presentCount}/{totalMeetings} meetings attended
                      </Text>
                    </View>
                    
                    <View style={styles.summaryRate}>
                      <View style={[styles.attendanceRate, {
                        backgroundColor: attendanceRate >= 90 ? '#28a745' : 
                                       attendanceRate >= 75 ? '#ffc107' : '#dc3545'
                      }]}>
                        <Text style={styles.attendanceRateText}>{attendanceRate}%</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            }
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
    paddingBottom: 100,
  },
  headerButton: {
    padding: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardLight,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 4,
    textAlign: 'center',
  },
  meetingsSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  meetingCard: {
    backgroundColor: colors.cardLight,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  meetingHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  meetingInfo: {
    flex: 1,
  },
  meetingDate: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    marginBottom: 4,
  },
  meetingTopic: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 2,
  },
  meetingLocation: {
    fontSize: 12,
    color: colors.secondary,
  },
  attendancePreview: {
    alignItems: 'center',
    gap: 4,
  },
  attendanceRate: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  attendanceRateText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  attendanceCount: {
    fontSize: 12,
    color: colors.secondary,
  },
  attendanceDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
    padding: 16,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  attendanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  attendanceGrid: {
    gap: 8,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.highlight,
    borderRadius: 8,
  },
  attendanceItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  attendanceItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.background,
  },
  attendanceItemStatus: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  attendanceItemNotes: {
    fontSize: 12,
    color: colors.secondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  summarySection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
  summaryRank: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
  summaryStats: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 4,
  },
  summaryRate: {
    alignItems: 'center',
  },
});
