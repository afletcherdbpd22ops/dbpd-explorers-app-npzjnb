
import { IconSymbol } from '@/components/IconSymbol';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { roster, Explorer } from '@/data/roster';
import { currentUser } from '@/data/auth';
import { individualChats } from '@/data/messages';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  explorerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  explorerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  explorerAvatarText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  explorerInfo: {
    flex: 1,
  },
  explorerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  explorerRank: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  explorerStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#FF9800',
  },
  statusProbationary: {
    backgroundColor: '#2196F3',
  },
  statusText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '500',
  },
  existingChatBadge: {
    backgroundColor: colors.textSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  existingChatText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default function NewChatScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter out current user and get available explorers
  const availableExplorers = roster.filter(explorer => 
    explorer.id !== currentUser.explorerId &&
    explorer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExplorerPress = (explorer: Explorer) => {
    console.log('Starting chat with:', explorer.name);
    
    // Check if chat already exists
    const existingChat = individualChats.find(chat => 
      chat.participants.includes(explorer.id) && 
      chat.participants.includes(currentUser.explorerId || '')
    );
    
    if (existingChat) {
      // Navigate to existing chat
      router.replace(`/chat-details?chatId=${existingChat.id}`);
    } else {
      // Create new chat
      const newChatId = `chat_${currentUser.explorerId}_${explorer.id}`;
      const newChat = {
        id: newChatId,
        type: 'individual' as const,
        name: explorer.name,
        participants: [currentUser.explorerId || '', explorer.id],
        lastActivity: new Date(),
        unreadCount: 0,
      };
      
      // Add to individual chats
      individualChats.push(newChat);
      
      // Navigate to new chat
      router.replace(`/chat-details?chatId=${newChatId}`);
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: Explorer['status']): any => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'inactive':
        return styles.statusInactive;
      case 'probationary':
        return styles.statusProbationary;
      default:
        return styles.statusActive;
    }
  };

  const hasExistingChat = (explorerId: string): boolean => {
    return individualChats.some(chat => 
      chat.participants.includes(explorerId) && 
      chat.participants.includes(currentUser.explorerId || '')
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>New Message</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search explorers..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Explorers List */}
      <ScrollView style={{ flex: 1 }}>
        {availableExplorers.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol 
              name="person.3" 
              size={64} 
              color={colors.textSecondary}
              style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateTitle}>No explorers found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery 
                ? 'Try adjusting your search terms'
                : 'No other explorers are available to message'
              }
            </Text>
          </View>
        ) : (
          availableExplorers.map((explorer) => (
            <Pressable
              key={explorer.id}
              style={styles.explorerItem}
              onPress={() => handleExplorerPress(explorer)}
            >
              <View style={styles.explorerAvatar}>
                <Text style={styles.explorerAvatarText}>
                  {getInitials(explorer.name)}
                </Text>
              </View>
              
              <View style={styles.explorerInfo}>
                <Text style={styles.explorerName}>{explorer.name}</Text>
                <Text style={styles.explorerRank}>{explorer.rank}</Text>
              </View>
              
              <View style={{ alignItems: 'flex-end' }}>
                <View style={[styles.explorerStatus, getStatusColor(explorer.status)]}>
                  <Text style={styles.statusText}>
                    {explorer.status.charAt(0).toUpperCase() + explorer.status.slice(1)}
                  </Text>
                </View>
                
                {hasExistingChat(explorer.id) && (
                  <View style={styles.existingChatBadge}>
                    <Text style={styles.existingChatText}>Chat exists</Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
