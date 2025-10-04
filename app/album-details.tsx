
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
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { getAlbumById, likePhoto, unlikePhoto } from '@/data/photos';
import { currentUser } from '@/data/auth';
import { roster } from '@/data/roster';

const { width: screenWidth } = Dimensions.get('window');
const photoWidth = (screenWidth - 60) / 2; // 2 columns with margins

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
  moreButton: {
    padding: 5,
  },
  albumHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  albumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  albumDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 15,
  },
  albumMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  albumMetaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  albumMetaText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 5,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  photoCard: {
    width: photoWidth,
    marginBottom: 15,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: photoWidth,
  },
  photoInfo: {
    padding: 10,
  },
  photoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
  },
  photoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photoUploader: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  photoLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoLikesText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateIcon: {
    marginBottom: 15,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
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

export default function AlbumDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const album = getAlbumById(id || '');

  if (!album) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.errorContainer}>
          <IconSymbol name="photo.stack" size={60} color={colors.textSecondary} style={styles.errorIcon} />
          <Text style={styles.errorTitle}>Album Not Found</Text>
          <Text style={styles.errorText}>
            The album you're looking for could not be found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const getUploaderName = (uploaderId: string): string => {
    const explorer = roster.find(e => e.id === uploaderId);
    return explorer ? explorer.name : 'Unknown';
  };

  const handlePhotoPress = (photoId: string) => {
    router.push(`/photo-details?id=${photoId}`);
  };

  const handleLikePhoto = (photoId: string) => {
    const photo = album.photos.find(p => p.id === photoId);
    if (photo && currentUser.explorerId) {
      if (photo.likedBy.includes(currentUser.explorerId)) {
        unlikePhoto(photoId, currentUser.explorerId);
      } else {
        likePhoto(photoId, currentUser.explorerId);
      }
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
        <Text style={styles.headerTitle} numberOfLines={1}>Album</Text>
        <Pressable
          style={styles.moreButton}
          onPress={() => Alert.alert('Album Options', 'Album management features coming soon!')}
        >
          <IconSymbol name="ellipsis" size={24} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.albumHeader}>
          <Text style={styles.albumTitle}>{album.title}</Text>
          <Text style={styles.albumDescription}>{album.description}</Text>
          <View style={styles.albumMeta}>
            <View style={styles.albumMetaLeft}>
              <View style={styles.albumMetaItem}>
                <IconSymbol name="photo" size={16} color={colors.textSecondary} />
                <Text style={styles.albumMetaText}>{album.photos.length} photos</Text>
              </View>
              <View style={styles.albumMetaItem}>
                <IconSymbol name="person" size={16} color={colors.textSecondary} />
                <Text style={styles.albumMetaText}>{getUploaderName(album.createdBy)}</Text>
              </View>
            </View>
          </View>
        </View>

        {album.photos.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="photo" size={60} color={colors.textSecondary} style={styles.emptyStateIcon} />
            <Text style={styles.emptyStateTitle}>No Photos</Text>
            <Text style={styles.emptyStateText}>
              This album doesn't contain any photos yet.
            </Text>
          </View>
        ) : (
          <View style={styles.photosGrid}>
            {album.photos.map((photo) => (
              <Pressable
                key={photo.id}
                style={styles.photoCard}
                onPress={() => handlePhotoPress(photo.id)}
              >
                <Image source={{ uri: photo.imageUrl }} style={styles.photoImage} />
                <View style={styles.photoInfo}>
                  <Text style={styles.photoTitle} numberOfLines={2}>{photo.title}</Text>
                  <View style={styles.photoMeta}>
                    <Text style={styles.photoUploader} numberOfLines={1}>
                      {getUploaderName(photo.uploadedBy)}
                    </Text>
                    <Pressable
                      style={styles.photoLikes}
                      onPress={() => handleLikePhoto(photo.id)}
                    >
                      <IconSymbol
                        name={photo.likedBy.includes(currentUser.explorerId || '') ? 'heart.fill' : 'heart'}
                        size={14}
                        color={photo.likedBy.includes(currentUser.explorerId || '') ? '#FF4444' : colors.textSecondary}
                      />
                      <Text style={styles.photoLikesText}>{photo.likes}</Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
