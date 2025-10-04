
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { currentUser } from '@/data/auth';
import React, { useState } from 'react';

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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  homeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  backButton: {
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
  formCard: {
    backgroundColor: colors.cardLight,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  requiredLabel: {
    color: '#dc2626',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeInput: {
    flex: 0.48,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  helpText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 5,
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: colors.secondary,
  },
  submitButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    marginTop: 5,
  },
});

interface FormData {
  eventName: string;
  organization: string;
  date: string;
  hoursServed: string;
  description: string;
  location: string;
  supervisorName: string;
  supervisorContact: string;
  hasDocumentation: boolean;
}

export default function AddCommunityServiceScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    eventName: '',
    organization: '',
    date: '',
    hoursServed: '',
    description: '',
    location: '',
    supervisorName: '',
    supervisorContact: '',
    hasDocumentation: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.eventName.trim()) {
      newErrors.eventName = 'Event name is required';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    } else {
      // Basic date validation (YYYY-MM-DD format)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.date)) {
        newErrors.date = 'Please use YYYY-MM-DD format';
      }
    }

    if (!formData.hoursServed.trim()) {
      newErrors.hoursServed = 'Hours served is required';
    } else {
      const hours = parseFloat(formData.hoursServed);
      if (isNaN(hours) || hours <= 0 || hours > 24) {
        newErrors.hoursServed = 'Please enter a valid number of hours (1-24)';
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.supervisorName.trim()) {
      newErrors.supervisorName = 'Supervisor name is required';
    }

    if (!formData.supervisorContact.trim()) {
      newErrors.supervisorContact = 'Supervisor contact is required';
    } else {
      // Basic email or phone validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      if (!emailRegex.test(formData.supervisorContact) && !phoneRegex.test(formData.supervisorContact.replace(/[\s\-()]/g, ''))) {
        newErrors.supervisorContact = 'Please enter a valid email or phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please correct the errors in the form before submitting.');
      return;
    }

    Alert.alert(
      'Submit Community Service Record',
      'Your community service record will be submitted for review. You will be notified once it has been approved.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Submit', 
          onPress: () => {
            // Here you would typically save the record to your data store
            console.log('Submitting community service record:', formData);
            
            Alert.alert(
              'Success!', 
              'Your community service record has been submitted for review.',
              [{ text: 'OK', onPress: () => router.back() }]
            );
          }
        }
      ]
    );
  };

  const isFormValid = () => {
    return formData.eventName.trim() && 
           formData.organization.trim() && 
           formData.date.trim() && 
           formData.hoursServed.trim() && 
           formData.description.trim() && 
           formData.location.trim() && 
           formData.supervisorName.trim() && 
           formData.supervisorContact.trim();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.push('/(tabs)/(home)')} style={styles.homeButton}>
            <IconSymbol name="house.fill" size={20} color={colors.text} />
          </Pressable>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={20} color={colors.text} />
          </Pressable>
        </View>
        <Text style={styles.headerTitle}>Add Service Record</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Service Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, !formData.eventName && styles.requiredLabel]}>
              Event/Activity Name *
            </Text>
            <TextInput
              style={styles.input}
              value={formData.eventName}
              onChangeText={(text) => updateFormData('eventName', text)}
              placeholder="e.g., Beach Cleanup, Food Bank Volunteer"
              placeholderTextColor="#9ca3af"
            />
            {errors.eventName && <Text style={styles.errorText}>{errors.eventName}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, !formData.organization && styles.requiredLabel]}>
              Organization *
            </Text>
            <TextInput
              style={styles.input}
              value={formData.organization}
              onChangeText={(text) => updateFormData('organization', text)}
              placeholder="e.g., Halifax Urban Ministries, Boys & Girls Club"
              placeholderTextColor="#9ca3af"
            />
            {errors.organization && <Text style={styles.errorText}>{errors.organization}</Text>}
          </View>

          <View style={styles.dateTimeContainer}>
            <View style={[styles.inputGroup, styles.dateTimeInput]}>
              <Text style={[styles.label, !formData.date && styles.requiredLabel]}>
                Date *
              </Text>
              <TextInput
                style={styles.input}
                value={formData.date}
                onChangeText={(text) => updateFormData('date', text)}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9ca3af"
              />
              {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
            </View>

            <View style={[styles.inputGroup, styles.dateTimeInput]}>
              <Text style={[styles.label, !formData.hoursServed && styles.requiredLabel]}>
                Hours Served *
              </Text>
              <TextInput
                style={styles.input}
                value={formData.hoursServed}
                onChangeText={(text) => updateFormData('hoursServed', text)}
                placeholder="e.g., 4.5"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
              {errors.hoursServed && <Text style={styles.errorText}>{errors.hoursServed}</Text>}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, !formData.location && styles.requiredLabel]}>
              Location *
            </Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => updateFormData('location', text)}
              placeholder="e.g., Daytona Beach Main Street Pier"
              placeholderTextColor="#9ca3af"
            />
            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, !formData.description && styles.requiredLabel]}>
              Description *
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => updateFormData('description', text)}
              placeholder="Describe what you did during this community service activity..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
            />
            <Text style={styles.helpText}>
              Minimum 20 characters. Be specific about your contributions.
            </Text>
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Supervisor Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, !formData.supervisorName && styles.requiredLabel]}>
              Supervisor Name *
            </Text>
            <TextInput
              style={styles.input}
              value={formData.supervisorName}
              onChangeText={(text) => updateFormData('supervisorName', text)}
              placeholder="e.g., Jennifer Martinez"
              placeholderTextColor="#9ca3af"
            />
            {errors.supervisorName && <Text style={styles.errorText}>{errors.supervisorName}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, !formData.supervisorContact && styles.requiredLabel]}>
              Supervisor Contact *
            </Text>
            <TextInput
              style={styles.input}
              value={formData.supervisorContact}
              onChangeText={(text) => updateFormData('supervisorContact', text)}
              placeholder="Email or phone number"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
            />
            <Text style={styles.helpText}>
              Email address or phone number for verification purposes.
            </Text>
            {errors.supervisorContact && <Text style={styles.errorText}>{errors.supervisorContact}</Text>}
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              I have documentation (photos, certificates, etc.)
            </Text>
            <Switch
              value={formData.hasDocumentation}
              onValueChange={(value) => updateFormData('hasDocumentation', value)}
              trackColor={{ false: '#d1d5db', true: colors.primary }}
              thumbColor={formData.hasDocumentation ? colors.text : '#f3f4f6'}
            />
          </View>
          
          {formData.hasDocumentation && (
            <Text style={styles.helpText}>
              Documentation can be submitted separately or brought to your next meeting.
            </Text>
          )}
        </View>

        <Pressable
          style={[
            styles.submitButton,
            !isFormValid() && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Text style={styles.submitButtonText}>Submit for Review</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
