
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Linking } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { memberApplications, NewMemberApplication } from '@/data/applications';
import { currentUser } from '@/data/auth';

export default function ApplicationDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const application = memberApplications.find(app => app.id === id);

  if (!application) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Application Not Found",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          }}
        />
        <SafeAreaView style={[commonStyles.wrapper]}>
          <View style={styles.notFoundContainer}>
            <IconSymbol name="exclamationmark.triangle" size={60} color={colors.textSecondary} />
            <Text style={styles.notFoundTitle}>Application Not Found</Text>
            <Text style={styles.notFoundText}>
              The requested application could not be found.
            </Text>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </>
    );
  }

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

  const handleCall = (phone: string) => {
    const phoneUrl = `tel:${phone}`;
    Linking.canOpenURL(phoneUrl).then(supported => {
      if (supported) {
        Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    });
  };

  const handleEmail = (email: string) => {
    const emailUrl = `mailto:${email}`;
    Linking.canOpenURL(emailUrl).then(supported => {
      if (supported) {
        Linking.openURL(emailUrl);
      } else {
        Alert.alert('Error', 'Email is not supported on this device');
      }
    });
  };

  const handleApprove = () => {
    if (!currentUser.permissions.canApproveApplications) {
      Alert.alert('Permission Denied', 'You do not have permission to approve applications.');
      return;
    }

    Alert.alert(
      'Approve Application',
      `Are you sure you want to approve ${application.firstName} ${application.lastName}'s application?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Approve', style: 'default', onPress: () => {
          console.log('Approved application:', application.id);
          Alert.alert('Success', 'Application approved successfully!');
        }}
      ]
    );
  };

  const handleReject = () => {
    if (!currentUser.permissions.canApproveApplications) {
      Alert.alert('Permission Denied', 'You do not have permission to reject applications.');
      return;
    }

    Alert.alert(
      'Reject Application',
      `Are you sure you want to reject ${application.firstName} ${application.lastName}'s application?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reject', style: 'destructive', onPress: () => {
          console.log('Rejected application:', application.id);
          Alert.alert('Success', 'Application rejected.');
        }}
      ]
    );
  };

  const handleScheduleInterview = () => {
    if (!currentUser.permissions.canApproveApplications) {
      Alert.alert('Permission Denied', 'You do not have permission to schedule interviews.');
      return;
    }

    Alert.alert('Schedule Interview', 'Interview scheduling feature coming soon!');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `${application.firstName} ${application.lastName}`,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerRight: () => (
            currentUser.permissions.canApproveApplications && application.status === 'pending' && (
              <View style={styles.headerActions}>
                <Pressable onPress={handleApprove} style={[styles.headerButton, styles.approveHeaderButton]}>
                  <IconSymbol name="checkmark" size={16} color={colors.text} />
                </Pressable>
                <Pressable onPress={handleReject} style={[styles.headerButton, styles.rejectHeaderButton]}>
                  <IconSymbol name="xmark" size={16} color={colors.text} />
                </Pressable>
              </View>
            )
          ),
        }}
      />
      <SafeAreaView style={[commonStyles.wrapper]} edges={['bottom']}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Status */}
          <View style={styles.header}>
            <View style={styles.applicantInfo}>
              <Text style={styles.applicantName}>
                {application.firstName} {application.lastName}
              </Text>
              <Text style={styles.applicantEmail}>{application.email}</Text>
              <Text style={styles.submittedDate}>
                Submitted: {new Date(application.submittedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>
            
            <View style={[styles.statusBadge, {
              backgroundColor: getStatusColor(application.status)
            }]}>
              <IconSymbol 
                name={getStatusIcon(application.status)} 
                size={20} 
                color={colors.text} 
              />
              <Text style={styles.statusText}>
                {application.status.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Review Information */}
          {application.reviewedBy && (
            <View style={styles.reviewSection}>
              <Text style={styles.sectionTitle}>Review Information</Text>
              <View style={styles.reviewCard}>
                <View style={styles.reviewItem}>
                  <IconSymbol name="person.fill" size={16} color={colors.primary} />
                  <Text style={styles.reviewLabel}>Reviewed by:</Text>
                  <Text style={styles.reviewValue}>{application.reviewedBy}</Text>
                </View>
                
                {application.reviewedDate && (
                  <View style={styles.reviewItem}>
                    <IconSymbol name="calendar" size={16} color={colors.primary} />
                    <Text style={styles.reviewLabel}>Review date:</Text>
                    <Text style={styles.reviewValue}>
                      {new Date(application.reviewedDate).toLocaleDateString()}
                    </Text>
                  </View>
                )}
                
                {application.notes && (
                  <View style={styles.reviewItem}>
                    <IconSymbol name="note.text" size={16} color={colors.primary} />
                    <Text style={styles.reviewLabel}>Notes:</Text>
                    <Text style={styles.reviewValue}>{application.notes}</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.card}>
              <Pressable style={styles.contactItem} onPress={() => handleCall(application.phone)}>
                <IconSymbol name="phone.fill" size={20} color={colors.primary} />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>{application.phone}</Text>
                </View>
                <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
              </Pressable>
              
              <Pressable style={styles.contactItem} onPress={() => handleEmail(application.email)}>
                <IconSymbol name="envelope.fill" size={20} color={colors.primary} />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>{application.email}</Text>
                </View>
                <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
              </Pressable>
              
              <View style={styles.contactItem}>
                <IconSymbol name="location.fill" size={20} color={colors.primary} />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Address</Text>
                  <Text style={styles.contactValue}>
                    {application.address}, {application.city}, {application.state} {application.zipCode}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Emergency Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
            <View style={styles.card}>
              <Pressable 
                style={styles.contactItem} 
                onPress={() => handleCall(application.emergencyContactPhone)}
              >
                <IconSymbol name="person.fill.badge.plus" size={20} color="#dc3545" />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>
                    {application.emergencyContactName} ({application.emergencyContactRelation})
                  </Text>
                  <Text style={styles.contactValue}>{application.emergencyContactPhone}</Text>
                </View>
                <IconSymbol name="phone.fill" size={16} color="#dc3545" />
              </Pressable>
            </View>
          </View>

          {/* School Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>School Information</Text>
            <View style={styles.card}>
              <View style={styles.infoRow}>
                <IconSymbol name="building.2.fill" size={20} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>School</Text>
                  <Text style={styles.infoValue}>{application.schoolName}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <IconSymbol name="graduationcap.fill" size={20} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Grade Level</Text>
                  <Text style={styles.infoValue}>{application.gradeLevel}</Text>
                </View>
              </View>
              
              {application.gpa && (
                <View style={styles.infoRow}>
                  <IconSymbol name="star.fill" size={20} color={colors.accent} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>GPA</Text>
                    <Text style={styles.infoValue}>{application.gpa}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Application Responses */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Application Responses</Text>
            
            <View style={styles.card}>
              <Text style={styles.questionTitle}>Why do you want to join the Explorer program?</Text>
              <Text style={styles.answerText}>{application.whyJoin}</Text>
            </View>
            
            {application.priorExperience && (
              <View style={styles.card}>
                <Text style={styles.questionTitle}>Prior Experience</Text>
                <Text style={styles.answerText}>{application.priorExperience}</Text>
              </View>
            )}
          </View>

          {/* Availability & Requirements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Availability & Requirements</Text>
            <View style={styles.card}>
              <View style={styles.availabilitySection}>
                <Text style={styles.availabilityTitle}>Available Hours:</Text>
                {application.availableHours.map((hour, index) => (
                  <View key={index} style={styles.availabilityItem}>
                    <IconSymbol name="checkmark.circle.fill" size={16} color="#28a745" />
                    <Text style={styles.availabilityText}>{hour}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.requirementsSection}>
                <View style={styles.requirementItem}>
                  <IconSymbol 
                    name={application.hasTransportation ? "checkmark.circle.fill" : "xmark.circle.fill"} 
                    size={16} 
                    color={application.hasTransportation ? "#28a745" : "#dc3545"} 
                  />
                  <Text style={styles.requirementText}>Has Transportation</Text>
                </View>
                
                <View style={styles.requirementItem}>
                  <IconSymbol 
                    name={application.parentConsent ? "checkmark.circle.fill" : "xmark.circle.fill"} 
                    size={16} 
                    color={application.parentConsent ? "#28a745" : "#dc3545"} 
                  />
                  <Text style={styles.requirementText}>Parent Consent</Text>
                </View>
                
                <View style={styles.requirementItem}>
                  <IconSymbol 
                    name={application.backgroundCheck ? "checkmark.circle.fill" : "xmark.circle.fill"} 
                    size={16} 
                    color={application.backgroundCheck ? "#28a745" : "#dc3545"} 
                  />
                  <Text style={styles.requirementText}>Background Check Consent</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          {currentUser.permissions.canApproveApplications && application.status === 'pending' && (
            <View style={styles.actionsSection}>
              <Text style={styles.sectionTitle}>Actions</Text>
              <View style={styles.actionsContainer}>
                <Pressable style={styles.approveButton} onPress={handleApprove}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color={colors.text} />
                  <Text style={styles.actionButtonText}>Approve Application</Text>
                </Pressable>
                
                <Pressable style={styles.interviewButton} onPress={handleScheduleInterview}>
                  <IconSymbol name="calendar.badge.clock" size={20} color={colors.text} />
                  <Text style={styles.actionButtonText}>Schedule Interview</Text>
                </Pressable>
                
                <Pressable style={styles.rejectButton} onPress={handleReject}>
                  <IconSymbol name="xmark.circle.fill" size={20} color={colors.text} />
                  <Text style={styles.actionButtonText}>Reject Application</Text>
                </Pressable>
              </View>
            </View>
          )}
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveHeaderButton: {
    backgroundColor: '#28a745',
  },
  rejectHeaderButton: {
    backgroundColor: '#dc3545',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  applicantEmail: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 4,
  },
  submittedDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.cardLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  reviewSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  reviewCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  reviewLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.background,
  },
  reviewValue: {
    fontSize: 14,
    color: colors.background,
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.background,
  },
  contactValue: {
    fontSize: 16,
    color: colors.secondary,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.background,
  },
  infoValue: {
    fontSize: 16,
    color: colors.secondary,
    marginTop: 2,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
    color: colors.secondary,
    lineHeight: 20,
  },
  availabilitySection: {
    marginBottom: 16,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    marginBottom: 8,
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  availabilityText: {
    fontSize: 14,
    color: colors.secondary,
  },
  requirementsSection: {
    gap: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: 14,
    color: colors.secondary,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionsContainer: {
    gap: 12,
  },
  approveButton: {
    backgroundColor: '#28a745',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  interviewButton: {
    backgroundColor: '#17a2b8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  rejectButton: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
