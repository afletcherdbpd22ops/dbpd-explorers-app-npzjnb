
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { photos, photoAlbums, Photo, PhotoAlbum, likePhoto, unlikePhoto } from '@/data/photos';
import { currentUser } from '@/data/auth';
import { roster } from '@/data/roster';

const { width: screenWidth } = Dimensions.get('window');
const photoWidth = (screenWidth - 60) / 2; // 2 columns with margins

const styles = StyleSheet.create({
  homeHeaderButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  inactiveTab: {
    backgroundColor: colors.cardBackground,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.text,
  },
  inactiveTabText: {
    color: colors.textSecondary,
  },
  albumsContainer: {
    paddingHorizontal: 20,
  },
  albumCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  albumCover: {
    width: '100%',
    height: 150,
  },
  albumInfo: {
    padding: 15,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  albumDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  albumStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  albumStatText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 5,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
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
});

export default function PhotosScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'albums' | 'photos'>('albums');

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAlbums = photoAlbums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUploaderName = (uploaderId: string): string => {
    const explorer = roster.find(e => e.id === uploaderId);
    return explorer ? explorer.name : 'Unknown';
  };

  const handlePhotoPress = (photoId: string) => {
    router.push(`/photo-details?id=${photoId}`);
  };

  const handleAlbumPress = (albumId: string) => {
    router.push(`/album-details?id=${albumId}`);
  };

  const handleLikePhoto = (photoId: string) => {
    const photo = photos.find(p => p.id === photoId);
    if (photo && currentUser.explorerId) {
      if (photo.likedBy.includes(currentUser.explorerId)) {
        unlikePhoto(photoId, currentUser.explorerId);
      } else {
        likePhoto(photoId, currentUser.explorerId);
      }
    }
  };

  const renderAlbums = () => {
    if (filteredAlbums.length === 0) {
      return (
        <View style={styles.emptyState}>
          <IconSymbol name="photo.stack" size={60} color={colors.textSecondary} style={styles.emptyStateIcon} />
          <Text style={styles.emptyStateTitle}>No Albums Found</Text>
          <Text style={styles.emptyStateText}>
            {searchQuery ? 'Try adjusting your search terms.' : 'Photo albums will appear here when they are created.'}
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.albumsContainer} showsVerticalScrollIndicator={false}>
        {filteredAlbums.map((album) => (
          <Pressable
            key={album.id}
            style={styles.albumCard}
            onPress={() => handleAlbumPress(album.id)}
          >
            <Image source={{ uri: album.coverPhoto }} style={styles.albumCover} />
            <View style={styles.albumInfo}>
              <Text style={styles.albumTitle}>{album.title}</Text>
              <Text style={styles.albumDescription}>{album.description}</Text>
              <View style={styles.albumStats}>
                <View style={styles.albumStat}>
                  <IconSymbol name="photo" size={14} color={colors.textSecondary} />
                  <Text style={styles.albumStatText}>{album.photos.length} photos</Text>
                </View>
                <View style={styles.albumStat}>
                  <IconSymbol name="person" size={14} color={colors.textSecondary} />
                  <Text style={styles.albumStatText}>{getUploaderName(album.createdBy)}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    );
  };

  const renderPhotos = () => {
    if (filteredPhotos.length === 0) {
      return (
        <View style={styles.emptyState}>
          <IconSymbol name="photo" size={60} color={colors.textSecondary} style={styles.emptyStateIcon} />
          <Text style={styles.emptyStateTitle}>No Photos Found</Text>
          <Text style={styles.emptyStateText}>
            {searchQuery ? 'Try adjusting your search terms.' : 'Photos will appear here when they are uploaded.'}
          </Text>
        </View>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.photosGrid}>
          {filteredPhotos.map((photo) => (
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
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: 'Photo Album',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.push('/(tabs)/(home)')} style={styles.homeHeaderButton}>
              <IconSymbol name="house.fill" size={20} color={colors.text} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => Alert.alert('Upload Photo', 'Photo upload feature coming soon!')}>
              <IconSymbol name="plus" size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      


      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search photos and albums..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'albums' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('albums')}
        >
          <Text style={[styles.tabText, activeTab === 'albums' ? styles.activeTabText : styles.inactiveTabText]}>
            Albums
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'photos' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('photos')}
        >
          <Text style={[styles.tabText, activeTab === 'photos' ? styles.activeTabText : styles.inactiveTabText]}>
            All Photos
          </Text>
        </Pressable>
      </View>

      {activeTab === 'albums' ? renderAlbums() : renderPhotos()}
    </SafeAreaView>
  );
}
