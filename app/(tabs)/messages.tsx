
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import TabAwareScrollView from '@/components/TabAwareScrollView';
import React, { useState } from 'react';
import { colors, commonStyles } from '@/styles/commonStyles';
import { 
  getAllChats, 
  getUnreadMessageCount, 
  Chat, 
  generalChat,
  individualChats 
} from '@/data/messages';
import { roster } from '@/data/roster';
import { currentUser } from '@/data/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  chatAvatarText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  chatLastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  chatUnreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  chatUnreadText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  newChatButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default function MessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const allChats = getAllChats();
  const unreadCount = getUnreadMessageCount();
  
  const filteredChats = allChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatPress = (chatId: string) => {
    console.log('Opening chat:', chatId);
    router.push(`/chat-details?chatId=${chatId}`);
  };

  const handleNewChat = () => {
    console.log('Creating new chat');
    router.push('/new-chat');
  };

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 1) {
      return 'Just now';
    } else if (hours < 24) {
      return `${Math.floor(hours)}h ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
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

  const renderChatItem = (chat: Chat) => (
    <Pressable
      key={chat.id}
      style={styles.chatItem}
      onPress={() => handleChatPress(chat.id)}
    >
      <View style={styles.chatAvatar}>
        <Text style={styles.chatAvatarText}>
          {chat.type === 'general' ? '👥' : getInitials(chat.name)}
        </Text>
      </View>
      
      <View style={styles.chatContent}>
        <Text style={styles.chatName}>{chat.name}</Text>
        <Text style={styles.chatLastMessage} numberOfLines={1}>
          {chat.lastMessage?.content || 'No messages yet'}
        </Text>
      </View>
      
      <View style={styles.chatMeta}>
        <Text style={styles.chatTime}>
          {formatTime(chat.lastActivity)}
        </Text>
        {chat.unreadCount > 0 && (
          <View style={styles.chatUnreadBadge}>
            <Text style={styles.chatUnreadText}>
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <TabAwareScrollView style={{ flex: 1 }}>
        {filteredChats.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol 
              name="message.circle" 
              size={64} 
              color={colors.textSecondary}
              style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateTitle}>No conversations found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery 
                ? 'Try adjusting your search terms'
                : 'Start a conversation with your fellow explorers'
              }
            </Text>
          </View>
        ) : (
          <>
            {/* General Chat Section */}
            {filteredChats.some(chat => chat.type === 'general') && (
              <>
                <View style={styles.sectionHeader}>
                  <IconSymbol name="person.3.fill" size={20} color={colors.primary} />
                  <Text style={styles.sectionTitle}>General</Text>
                </View>
                {filteredChats
                  .filter(chat => chat.type === 'general')
                  .map(renderChatItem)
                }
              </>
            )}

            {/* Individual Chats Section */}
            {filteredChats.some(chat => chat.type === 'individual') && (
              <>
                <View style={styles.sectionHeader}>
                  <IconSymbol name="person.2.fill" size={20} color={colors.primary} />
                  <Text style={styles.sectionTitle}>Direct Messages</Text>
                </View>
                {filteredChats
                  .filter(chat => chat.type === 'individual')
                  .map(renderChatItem)
                }
              </>
            )}
          </>
        )}
      </TabAwareScrollView>

      {/* New Chat Button */}
      <Pressable style={styles.newChatButton} onPress={handleNewChat}>
        <IconSymbol name="plus" size={24} color={colors.background} />
      </Pressable>
    </SafeAreaView>
  );
}
