
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';

const CORRECT_PASSWORD = '1234'; // 4-character password

export default function PasswordScreen() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePasswordChange = (text: string) => {
    // Only allow 4 characters
    if (text.length <= 4) {
      setPassword(text);
      
      // Auto-submit when 4 characters are entered
      if (text.length === 4) {
        handleSubmit(text);
      }
    }
  };

  const handleSubmit = async (passwordToCheck?: string) => {
    const passwordValue = passwordToCheck || password;
    
    if (passwordValue.length !== 4) {
      Alert.alert('Invalid Password', 'Password must be exactly 4 characters long.');
      return;
    }

    setIsLoading(true);

    // Simulate a brief loading delay for better UX
    setTimeout(() => {
      if (passwordValue === CORRECT_PASSWORD) {
        // Store authentication state (in a real app, use secure storage)
        global.isAuthenticated = true;
        router.replace('/(tabs)');
      } else {
        Alert.alert('Access Denied', 'Incorrect password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  const renderPasswordDots = () => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.passwordDot,
            i < password.length ? styles.passwordDotFilled : styles.passwordDotEmpty,
          ]}
        />
      );
    }
    return dots;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/final_quest_240x240.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Daytona Beach Police Explorer</Text>
          <Text style={styles.subtitle}>Enter 4-digit passcode to continue</Text>

          {/* Password Dots */}
          <View style={styles.passwordContainer}>
            {renderPasswordDots()}
          </View>

          {/* Hidden Input */}
          <TextInput
            style={styles.hiddenInput}
            value={password}
            onChangeText={handlePasswordChange}
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
            autoFocus
            placeholder=""
          />

          {/* Keypad */}
          <View style={styles.keypad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <Pressable
                key={number}
                style={({ pressed }) => [
                  styles.keypadButton,
                  pressed && styles.keypadButtonPressed,
                ]}
                onPress={() => handlePasswordChange(password + number.toString())}
                disabled={isLoading || password.length >= 4}
              >
                <Text style={styles.keypadButtonText}>{number}</Text>
              </Pressable>
            ))}
            
            {/* Empty space */}
            <View style={styles.keypadButton} />
            
            {/* Zero */}
            <Pressable
              style={({ pressed }) => [
                styles.keypadButton,
                pressed && styles.keypadButtonPressed,
              ]}
              onPress={() => handlePasswordChange(password + '0')}
              disabled={isLoading || password.length >= 4}
            >
              <Text style={styles.keypadButtonText}>0</Text>
            </Pressable>
            
            {/* Backspace */}
            <Pressable
              style={({ pressed }) => [
                styles.keypadButton,
                pressed && styles.keypadButtonPressed,
              ]}
              onPress={() => setPassword(password.slice(0, -1))}
              disabled={isLoading || password.length === 0}
            >
              <IconSymbol name="delete.left" size={24} color={colors.text} />
            </Pressable>
          </View>

          {/* Loading indicator */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Authenticating...</Text>
            </View>
          )}

          {/* Emergency Contact */}
          <View style={styles.emergencyContainer}>
            <Text style={styles.emergencyText}>
              For emergency access, contact your advisor
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.7,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 15,
  },
  passwordDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.text,
  },
  passwordDotEmpty: {
    backgroundColor: 'transparent',
  },
  passwordDotFilled: {
    backgroundColor: colors.text,
  },
  hiddenInput: {
    position: 'absolute',
    left: -1000,
    opacity: 0,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 240,
    marginBottom: 30,
  },
  keypadButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  keypadButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transform: [{ scale: 0.95 }],
  },
  keypadButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  loadingContainer: {
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    opacity: 0.7,
  },
  emergencyContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  emergencyText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    opacity: 0.6,
  },
});
