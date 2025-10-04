
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#1e3a8a',       // Deep Blue Background
  text: '#ffffff',             // White text for contrast
  textSecondary: '#cbd5e1',    // Light gray for secondary text
  primary: '#3b82f6',          // Bright Blue
  secondary: '#6c757d',        // Gray
  accent: '#fbbf24',           // Golden Yellow
  card: '#1e40af',             // Slightly lighter blue for cards
  highlight: '#2563eb',        // Blue highlight
  cardLight: '#ffffff',        // White cards for better contrast
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  // Additional text styles to ensure all text is white
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.text,
    opacity: 0.8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.highlight,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});
