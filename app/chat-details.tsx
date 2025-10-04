
import { IconSymbol } from '@/components/IconSymbol';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { 
  getChatById, 
  getMessagesForChat, 
  markMessagesAsRead, 
  sendMessage,
  Message 
} from '@/data/messages';
import { currentUser } from '@/data/auth';
import { roster } from '@/data/roster';

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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 16,
  },
  homeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerAvatarText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageItem: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  myMessageBubble: {
    backgroundColor: colors.primary,
  },
  otherMessageBubble: {
    backgroundColor: colors.surface,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: colors.background,
  },
  otherMessageText: {
    color: colors.text,
  },
  messageSender: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    marginLeft: 4,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    marginHorizontal: 4,
  },
  myMessageTime: {
    color: colors.background,
    opacity: 0.7,
    textAlign: 'right',
  },
  otherMessageTime: {
    color: colors.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
  dateHeader: {
    alignSelf: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginVertical: 16,
  },
  dateHeaderText: {
    fontSize: 12,
    color: colors.textSecondary,
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

export default function ChatDetailsScreen() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  
  const chat = getChatById(chatId || '');
  
  useEffect(() => {
    if (chatId) {
      const chatMessages = getMessagesForChat(chatId);
      setMessages(chatMessages);
      markMessagesAsRead(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  if (!chat) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.emptyState}>
          <IconSymbol 
            name="exclamationmark.triangle" 
            size={64} 
            color={colors.textSecondary}
            style={styles.emptyStateIcon}
          />
          <Text style={styles.emptyStateTitle}>Chat not found</Text>
          <Text style={styles.emptyStateText}>
            This conversation may have been deleted or you don't have access to it.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const currentExplorer = roster.find(e => e.id === currentUser.explorerId);
      if (currentExplorer) {
        sendMessage(chatId || '', currentUser.explorerId || '', currentExplorer.name, messageText.trim());
        const updatedMessages = getMessagesForChat(chatId || '');
        setMessages(updatedMessages);
        setMessageText('');
      }
    }
  };

  const formatMessageTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateHeader = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const shouldShowDateHeader = (currentMessage: Message, previousMessage?: Message): boolean => {
    if (!previousMessage) return true;
    
    const currentDate = new Date(currentMessage.timestamp).toDateString();
    const previousDate = new Date(previousMessage.timestamp).toDateString();
    
    return currentDate !== previousDate;
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isMyMessage = (message: Message): boolean => {
    return message.senderId === currentUser.explorerId;
  };

  const shouldShowSender = (currentMessage: Message, previousMessage?: Message): boolean => {
    if (chat.type === 'individual') return false;
    if (!previousMessage) return true;
    return previousMessage.senderId !== currentMessage.senderId;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.push('/(tabs)/(home)')} style={styles.homeButton}>
            <IconSymbol name="house.fill" size={20} color={colors.text} />
          </Pressable>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </Pressable>
        </View>
        
        <View style={styles.headerInfo}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>
              {chat.type === 'general' ? '👥' : getInitials(chat.name)}
            </Text>
          </View>
          
          <View>
            <Text style={styles.headerTitle}>{chat.name}</Text>
            <Text style={styles.headerSubtitle}>
              {chat.type === 'general' 
                ? `${chat.participants.length} members`
                : 'Direct message'
              }
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol 
              name="message" 
              size={64} 
              color={colors.textSecondary}
              style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateTitle}>No messages yet</Text>
            <Text style={styles.emptyStateText}>
              Start the conversation by sending a message below.
            </Text>
          </View>
        ) : (
          <ScrollView 
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={{ paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message, index) => {
              const previousMessage = index > 0 ? messages[index - 1] : undefined;
              const showDateHeader = shouldShowDateHeader(message, previousMessage);
              const showSender = shouldShowSender(message, previousMessage);
              const isMine = isMyMessage(message);
              
              return (
                <View key={message.id}>
                  {showDateHeader && (
                    <View style={styles.dateHeader}>
                      <Text style={styles.dateHeaderText}>
                        {formatDateHeader(message.timestamp)}
                      </Text>
                    </View>
                  )}
                  
                  <View style={[
                    styles.messageItem,
                    isMine ? styles.myMessage : styles.otherMessage
                  ]}>
                    {showSender && !isMine && (
                      <Text style={styles.messageSender}>
                        {message.senderName}
                      </Text>
                    )}
                    
                    <View style={[
                      styles.messageBubble,
                      isMine ? styles.myMessageBubble : styles.otherMessageBubble
                    ]}>
                      <Text style={[
                        styles.messageText,
                        isMine ? styles.myMessageText : styles.otherMessageText
                      ]}>
                        {message.content}
                      </Text>
                    </View>
                    
                    <Text style={[
                      styles.messageTime,
                      isMine ? styles.myMessageTime : styles.otherMessageTime
                    ]}>
                      {formatMessageTime(message.timestamp)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={1000}
          />
          
          <Pressable
            style={[
              styles.sendButton,
              !messageText.trim() && styles.sendButtonDisabled
            ]}
            onPress={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <IconSymbol 
              name="paperplane.fill" 
              size={20} 
              color={colors.background} 
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
