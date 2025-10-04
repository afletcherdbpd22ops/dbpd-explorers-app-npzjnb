
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { memberApplications, NewMemberApplication } from '@/data/applications';
import { currentUser } from '@/data/auth';

export default function ApplicationsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'interview_scheduled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user has permission to view applications
  if (!currentUser.permissions.canViewApplications) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Applications",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          }}
        />
        <SafeAreaView style={[commonStyles.wrapper]} edges={['bottom']}>
          <View style={styles.noPermissionContainer}>
            <IconSymbol name="lock.fill" size={60} color={colors.textSecondary} />
            <Text style={styles.noPermissionTitle}>Access Restricted</Text>
            <Text style={styles.noPermissionText}>
              You do not have permission to view member applications. 
              Only Majors, Captains, and Advisors can access this section.
            </Text>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </>
    );
  }

  // Filter applications
  const filteredApplications = memberApplications.filter(app => {
    const matchesSearch = app.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || app.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: NewMemberApplication['status']) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'approved': return '#28a745';
      case 'rejected': return '#dc3545';
      case 'interview_scheduled': return '#17a2b8';
      default: return colors.secondary;
    }
  };

  const getStatusIcon = (status: NewMemberApplication['status']) => {
    switch (status) {
      case 'pending': return 'clock.fill';
      case 'approved': return 'checkmark.circle.fill';
      case 'rejected': return 'xmark.circle.fill';
      case 'interview_scheduled': return 'calendar.badge.clock';
      default: return 'questionmark.circle.fill';
    }
  };

  const getStatusCount = (status: NewMemberApplication['status']) => {
    return memberApplications.filter(app => app.status === status).length;
  };

  const handleApplicationPress = (applicationId: string) => {
    router.push(`/application-details?id=${applicationId}`);
  };

  const handleApproveApplication = (applicationId: string) => {
    if (currentUser.permissions.canApproveApplications) {
      Alert.alert(
        'Approve Application',
        'Are you sure you want to approve this application?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Approve', style: 'default', onPress: () => {
            console.log('Approved application:', applicationId);
            Alert.alert('Success', 'Application approved successfully!');
          }}
        ]
      );
    } else {
      Alert.alert('Permission Denied', 'You do not have permission to approve applications.');
    }
  };

  const handleRejectApplication = (applicationId: string) => {
    if (currentUser.permissions.canApproveApplications) {
      Alert.alert(
        'Reject Application',
        'Are you sure you want to reject this application?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Reject', style: 'destructive', onPress: () => {
            console.log('Rejected application:', applicationId);
            Alert.alert('Success', 'Application rejected.');
          }}
        ]
      );
    } else {
      Alert.alert('Permission Denied', 'You do not have permission to reject applications.');
    }
  };

  const filterButtons = [
    { key: 'all', label: 'All', count: memberApplications.length },
    { key: 'pending', label: 'Pending', count: getStatusCount('pending') },
    { key: 'interview_scheduled', label: 'Interview', count: getStatusCount('interview_scheduled') },
    { key: 'approved', label: 'Approved', count: getStatusCount('approved') },
    { key: 'rejected', label: 'Rejected', count: getStatusCount('rejected') },
  ] as const;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Member Applications",
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
          {/* Stats Overview */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <IconSymbol name="doc.text.fill" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>{memberApplications.length}</Text>
              <Text style={styles.statLabel}>Total Applications</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#FFF3CD', borderColor: '#ffc107' }]}>
              <IconSymbol name="clock.fill" size={24} color="#856404" />
              <Text style={[styles.statNumber, { color: '#856404' }]}>
                {getStatusCount('pending')}
              </Text>
              <Text style={[styles.statLabel, { color: '#856404' }]}>Pending Review</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#D4EDDA', borderColor: '#28a745' }]}>
              <IconSymbol name="checkmark.circle.fill" size={24} color="#155724" />
              <Text style={[styles.statNumber, { color: '#155724' }]}>
                {getStatusCount('approved')}
              </Text>
              <Text style={[styles.statLabel, { color: '#155724' }]}>Approved</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search applications..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
                </Pressable>
              )}
            </View>
          </View>

          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScrollContent}
            >
              {filterButtons.map((filter) => (
                <Pressable
                  key={filter.key}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter.key && styles.filterButtonActive
                  ]}
                  onPress={() => setSelectedFilter(filter.key)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    selectedFilter === filter.key && styles.filterButtonTextActive
                  ]}>
                    {filter.label} ({filter.count})
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Applications List */}
          <View style={styles.applicationsSection}>
            <Text style={styles.sectionTitle}>
              {filteredApplications.length} Application{filteredApplications.length !== 1 ? 's' : ''}
              {searchQuery && ` matching "${searchQuery}"`}
            </Text>

            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <View key={application.id} style={styles.applicationCard}>
                  <Pressable
                    style={styles.applicationHeader}
                    onPress={() => handleApplicationPress(application.id)}
                  >
                    <View style={styles.applicationInfo}>
                      <Text style={styles.applicantName}>
                        {application.firstName} {application.lastName}
                      </Text>
                      <Text style={styles.applicantEmail}>{application.email}</Text>
                      <Text style={styles.applicantSchool}>
                        {application.schoolName} - Grade {application.gradeLevel}
                      </Text>
                      <Text style={styles.submittedDate}>
                        Submitted: {new Date(application.submittedDate).toLocaleDateString()}
                      </Text>
                    </View>
                    
                    <View style={styles.statusContainer}>
                      <View style={[styles.statusBadge, {
                        backgroundColor: getStatusColor(application.status)
                      }]}>
                        <IconSymbol 
                          name={getStatusIcon(application.status)} 
                          size={16} 
                          color={colors.text} 
                        />
                        <Text style={styles.statusText}>
                          {application.status.replace('_', ' ').toUpperCase()}
                        </Text>
                      </View>
                      <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
                    </View>
                  </Pressable>

                  {/* Quick Actions for pending applications */}
                  {application.status === 'pending' && currentUser.permissions.canApproveApplications && (
                    <View style={styles.quickActions}>
                      <Pressable
                        style={[styles.actionButton, styles.approveButton]}
                        onPress={() => handleApproveApplication(application.id)}
                      >
                        <IconSymbol name="checkmark" size={16} color={colors.text} />
                        <Text style={styles.actionButtonText}>Approve</Text>
                      </Pressable>
                      
                      <Pressable
                        style={[styles.actionButton, styles.rejectButton]}
                        onPress={() => handleRejectApplication(application.id)}
                      >
                        <IconSymbol name="xmark" size={16} color={colors.text} />
                        <Text style={styles.actionButtonText}>Reject</Text>
                      </Pressable>
                      
                      <Pressable
                        style={[styles.actionButton, styles.interviewButton]}
                        onPress={() => Alert.alert('Schedule Interview', 'Interview scheduling feature coming soon!')}
                      >
                        <IconSymbol name="calendar" size={16} color={colors.text} />
                        <Text style={styles.actionButtonText}>Interview</Text>
                      </Pressable>
                    </View>
                  )}

                  {/* Application Preview */}
                  <View style={styles.applicationPreview}>
                    <Text style={styles.previewTitle}>Why they want to join:</Text>
                    <Text style={styles.previewText} numberOfLines={3}>
                      {application.whyJoin}
                    </Text>
                    
                    <View style={styles.previewDetails}>
                      <View style={styles.previewItem}>
                        <IconSymbol name="phone.fill" size={14} color={colors.primary} />
                        <Text style={styles.previewItemText}>{application.phone}</Text>
                      </View>
                      
                      <View style={styles.previewItem}>
                        <IconSymbol name="location.fill" size={14} color={colors.primary} />
                        <Text style={styles.previewItemText}>
                          {application.city}, {application.state}
                        </Text>
                      </View>
                      
                      {application.gpa && (
                        <View style={styles.previewItem}>
                          <IconSymbol name="graduationcap.fill" size={14} color={colors.primary} />
                          <Text style={styles.previewItemText}>GPA: {application.gpa}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <IconSymbol name="doc.text.magnifyingglass" size={40} color={colors.textSecondary} />
                <Text style={styles.noResultsText}>
                  {searchQuery 
                    ? `No applications found matching "${searchQuery}"`
                    : selectedFilter === 'all'
                    ? 'No applications found'
                    : `No ${selectedFilter.replace('_', ' ')} applications found`
                  }
                </Text>
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
  noPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noPermissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  noPermissionText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
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
    color: colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterButtonTextActive: {
    color: colors.text,
  },
  applicationsSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  applicationCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  applicationHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  applicationInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  applicantEmail: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  applicantSchool: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 2,
  },
  submittedDate: {
    fontSize: 12,
    color: colors.text,
  },
  statusContainer: {
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.text,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  approveButton: {
    backgroundColor: '#28a745',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
  },
  interviewButton: {
    backgroundColor: '#17a2b8',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  applicationPreview: {
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
    padding: 16,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  previewDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  previewItemText: {
    fontSize: 12,
    color: colors.text,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
});
