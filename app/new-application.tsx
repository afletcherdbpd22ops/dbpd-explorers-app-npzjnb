
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function NewApplicationScreen() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: 'FL',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    schoolName: '',
    gradeLevel: '',
    gpa: '',
    whyJoin: '',
    priorExperience: '',
    hasTransportation: false,
    parentConsent: false,
    backgroundCheck: false,
  });

  const [availableHours, setAvailableHours] = useState({
    weekdayEvenings: false,
    weekends: false,
    summerFullTime: false,
  });

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateAvailableHours = (field: string, value: boolean) => {
    setAvailableHours(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'dateOfBirth',
      'address', 'city', 'zipCode', 'emergencyContactName', 
      'emergencyContactPhone', 'emergencyContactRelation',
      'schoolName', 'gradeLevel', 'whyJoin'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        Alert.alert('Missing Information', `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
        return false;
      }
    }

    if (!formData.parentConsent) {
      Alert.alert('Parent Consent Required', 'Parent/guardian consent is required to submit this application.');
      return false;
    }

    if (!formData.backgroundCheck) {
      Alert.alert('Background Check Required', 'You must agree to the background check to submit this application.');
      return false;
    }

    const selectedHours = Object.values(availableHours).some(Boolean);
    if (!selectedHours) {
      Alert.alert('Availability Required', 'Please select at least one time period when you are available.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const availableHoursArray = Object.entries(availableHours)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => {
        switch (key) {
          case 'weekdayEvenings': return 'Weekday Evenings';
          case 'weekends': return 'Weekends';
          case 'summerFullTime': return 'Summer Full-time';
          default: return key;
        }
      });

    const applicationData = {
      ...formData,
      availableHours: availableHoursArray,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
    };

    console.log('Submitting application:', applicationData);
    
    Alert.alert(
      'Application Submitted',
      'Thank you for your interest in the Daytona Beach Police Explorer program! Your application has been submitted and will be reviewed by our advisors. You will be contacted within 5-7 business days.',
      [
        { text: 'OK', onPress: () => router.back() }
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "New Member Application",
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
          {/* Header */}
          <View style={styles.header}>
            <IconSymbol name="person.badge.plus" size={60} color={colors.accent} />
            <Text style={styles.headerTitle}>Join the Explorer Program</Text>
            <Text style={styles.headerSubtitle}>
              Complete this application to begin your journey with the Daytona Beach Police Explorers
            </Text>
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>First Name *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.firstName}
                  onChangeText={(value) => updateFormData('firstName', value)}
                  placeholder="Enter first name"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Last Name *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.lastName}
                  onChangeText={(value) => updateFormData('lastName', value)}
                  placeholder="Enter last name"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                placeholder="Enter email address"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.phone}
                  onChangeText={(value) => updateFormData('phone', value)}
                  placeholder="(386) 555-0123"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="phone-pad"
                />
              </View>
              
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Date of Birth *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.dateOfBirth}
                  onChangeText={(value) => updateFormData('dateOfBirth', value)}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address *</Text>
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(value) => updateFormData('address', value)}
                placeholder="Enter street address"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 2, marginRight: 8 }]}>
                <Text style={styles.label}>City *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.city}
                  onChangeText={(value) => updateFormData('city', value)}
                  placeholder="Daytona Beach"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              
              <View style={[styles.inputContainer, { flex: 1, marginHorizontal: 4 }]}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.input}
                  value={formData.state}
                  onChangeText={(value) => updateFormData('state', value)}
                  placeholder="FL"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>ZIP Code *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.zipCode}
                  onChangeText={(value) => updateFormData('zipCode', value)}
                  placeholder="32114"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Emergency Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Emergency Contact Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.emergencyContactName}
                onChangeText={(value) => updateFormData('emergencyContactName', value)}
                placeholder="Parent/Guardian name"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Emergency Contact Phone *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.emergencyContactPhone}
                  onChangeText={(value) => updateFormData('emergencyContactPhone', value)}
                  placeholder="(386) 555-0123"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="phone-pad"
                />
              </View>
              
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Relationship *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.emergencyContactRelation}
                  onChangeText={(value) => updateFormData('emergencyContactRelation', value)}
                  placeholder="Mother, Father, etc."
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>
          </View>

          {/* School Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>School Information</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>School Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.schoolName}
                onChangeText={(value) => updateFormData('schoolName', value)}
                placeholder="Enter school name"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Grade Level *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.gradeLevel}
                  onChangeText={(value) => updateFormData('gradeLevel', value)}
                  placeholder="9th, 10th, 11th, 12th"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>GPA (Optional)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.gpa}
                  onChangeText={(value) => updateFormData('gpa', value)}
                  placeholder="3.5"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </View>

          {/* Application Questions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Application Questions</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Why do you want to join the Explorer program? *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.whyJoin}
                onChangeText={(value) => updateFormData('whyJoin', value)}
                placeholder="Describe your interest in law enforcement and community service..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Prior Experience (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.priorExperience}
                onChangeText={(value) => updateFormData('priorExperience', value)}
                placeholder="Any volunteer work, leadership roles, or relevant experience..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Availability */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Availability *</Text>
            <Text style={styles.sectionSubtitle}>Select all times when you are available:</Text>
            
            <View style={styles.checkboxContainer}>
              <Pressable
                style={styles.checkboxRow}
                onPress={() => updateAvailableHours('weekdayEvenings', !availableHours.weekdayEvenings)}
              >
                <View style={[styles.checkbox, availableHours.weekdayEvenings && styles.checkboxChecked]}>
                  {availableHours.weekdayEvenings && (
                    <IconSymbol name="checkmark" size={16} color={colors.text} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Weekday Evenings (6:00 PM - 9:00 PM)</Text>
              </Pressable>

              <Pressable
                style={styles.checkboxRow}
                onPress={() => updateAvailableHours('weekends', !availableHours.weekends)}
              >
                <View style={[styles.checkbox, availableHours.weekends && styles.checkboxChecked]}>
                  {availableHours.weekends && (
                    <IconSymbol name="checkmark" size={16} color={colors.text} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Weekends (Various Times)</Text>
              </Pressable>

              <Pressable
                style={styles.checkboxRow}
                onPress={() => updateAvailableHours('summerFullTime', !availableHours.summerFullTime)}
              >
                <View style={[styles.checkbox, availableHours.summerFullTime && styles.checkboxChecked]}>
                  {availableHours.summerFullTime && (
                    <IconSymbol name="checkmark" size={16} color={colors.text} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Summer Full-time</Text>
              </Pressable>
            </View>
          </View>

          {/* Agreements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Required Agreements</Text>
            
            <View style={styles.switchContainer}>
              <View style={styles.switchRow}>
                <Switch
                  value={formData.hasTransportation}
                  onValueChange={(value) => updateFormData('hasTransportation', value)}
                  trackColor={{ false: colors.secondary, true: colors.primary }}
                  thumbColor={colors.cardLight}
                />
                <Text style={styles.switchLabel}>I have reliable transportation to events</Text>
              </View>

              <View style={styles.switchRow}>
                <Switch
                  value={formData.parentConsent}
                  onValueChange={(value) => updateFormData('parentConsent', value)}
                  trackColor={{ false: colors.secondary, true: colors.primary }}
                  thumbColor={colors.cardLight}
                />
                <Text style={styles.switchLabel}>Parent/Guardian consent obtained *</Text>
              </View>

              <View style={styles.switchRow}>
                <Switch
                  value={formData.backgroundCheck}
                  onValueChange={(value) => updateFormData('backgroundCheck', value)}
                  trackColor={{ false: colors.secondary, true: colors.primary }}
                  thumbColor={colors.cardLight}
                />
                <Text style={styles.switchLabel}>I agree to background check *</Text>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.submitContainer}>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <IconSymbol name="paperplane.fill" size={20} color={colors.text} />
              <Text style={styles.submitButtonText}>Submit Application</Text>
            </Pressable>
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
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.cardLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.background,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  checkboxContainer: {
    gap: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  switchContainer: {
    gap: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  submitContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    elevation: 6,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});
