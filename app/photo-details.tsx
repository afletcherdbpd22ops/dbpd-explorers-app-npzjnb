
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Alert,
  Share,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { getPhotoById, likePhoto, unlikePhoto } from '@/data/photos';
import { currentUser } from '@/data/auth';
import { roster } from '@/data/roster';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  shareButton: {
    padding: 5,
  },
  imageContainer: {
    width: screenWidth,
    height: screenWidth,
    backgroundColor: colors.cardBackground,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  metaContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 10,
    flex: 1,
  },
  metaValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
  },
  likedButton: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  likedText: {
    color: '#FF4444',
  },
  tagsContainer: {
    marginBottom: 20,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorIcon: {
    marginBottom: 15,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default function PhotoDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const photo = getPhotoById(id || '');

  React.useEffect(() => {
    if (photo && currentUser.explorerId) {
      setIsLiked(photo.likedBy.includes(currentUser.explorerId));
    }
  }, [photo, currentUser.explorerId]);

  if (!photo) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.errorContainer}>
          <IconSymbol name="photo" size={60} color={colors.textSecondary} style={styles.errorIcon} />
          <Text style={styles.errorTitle}>Photo Not Found</Text>
          <Text style={styles.errorText}>
            The photo you're looking for could not be found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const getUploaderName = (uploaderId: string): string => {
    const explorer = roster.find(e => e.id === uploaderId);
    return explorer ? explorer.name : 'Unknown';
  };

  const handleLike = () => {
    if (!currentUser.explorerId) return;

    if (isLiked) {
      unlikePhoto(photo.id, currentUser.explorerId);
      setIsLiked(false);
    } else {
      likePhoto(photo.id, currentUser.explorerId);
      setIsLiked(true);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this photo from Daytona Beach Police Explorers: ${photo.title}`,
        url: photo.imageUrl,
      });
    } catch (error) {
      console.log('Error sharing photo:', error);
      Alert.alert('Error', 'Unable to share photo at this time.');
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>Photo Details</Text>
        <Pressable style={styles.shareButton} onPress={handleShare}>
          <IconSymbol name="square.and.arrow.up" size={24} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: photo.imageUrl }} style={styles.image} resizeMode="cover" />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{photo.title}</Text>
          <Text style={styles.description}>{photo.description}</Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaRow}>
              <IconSymbol name="person" size={16} color={colors.textSecondary} />
              <Text style={styles.metaLabel}>Uploaded by</Text>
              <Text style={styles.metaValue}>{getUploaderName(photo.uploadedBy)}</Text>
            </View>
            <View style={styles.metaRow}>
              <IconSymbol name="calendar" size={16} color={colors.textSecondary} />
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>{formatDate(photo.uploadedDate)}</Text>
            </View>
            {photo.event && (
              <View style={styles.metaRow}>
                <IconSymbol name="star" size={16} color={colors.textSecondary} />
                <Text style={styles.metaLabel}>Event</Text>
                <Text style={styles.metaValue}>{photo.event}</Text>
              </View>
            )}
            <View style={[styles.metaRow, { marginBottom: 0 }]}>
              <IconSymbol name="heart" size={16} color={colors.textSecondary} />
              <Text style={styles.metaLabel}>Likes</Text>
              <Text style={styles.metaValue}>{photo.likes}</Text>
            </View>
          </View>

          {photo.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={styles.tagsTitle}>Tags</Text>
              <View style={styles.tagsRow}>
                {photo.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <Pressable
          style={[styles.actionButton, isLiked && styles.likedButton]}
          onPress={handleLike}
        >
          <IconSymbol
            name={isLiked ? 'heart.fill' : 'heart'}
            size={20}
            color={isLiked ? '#FF4444' : colors.text}
          />
          <Text style={[styles.actionText, isLiked && styles.likedText]}>
            {isLiked ? 'Liked' : 'Like'}
          </Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleShare}>
          <IconSymbol name="square.and.arrow.up" size={20} color={colors.text} />
          <Text style={styles.actionText}>Share</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => Alert.alert('Download', 'Photo download feature coming soon!')}
        >
          <IconSymbol name="arrow.down.to.line" size={20} color={colors.text} />
          <Text style={styles.actionText}>Download</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
