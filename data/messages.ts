
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  isRead: boolean;
  chatId: string;
}

export interface Chat {
  id: string;
  type: 'general' | 'individual';
  name: string;
  participants: string[]; // Explorer IDs
  lastMessage?: Message;
  lastActivity: Date;
  unreadCount: number;
  avatar?: string;
}

// General chat for all explorers
export const generalChat: Chat = {
  id: 'general',
  type: 'general',
  name: 'All Explorers',
  participants: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], // All explorer IDs
  lastActivity: new Date('2024-01-15T14:30:00'),
  unreadCount: 3,
};

// Individual chats
export const individualChats: Chat[] = [
  {
    id: 'chat_1_2',
    type: 'individual',
    name: 'Michael Chen',
    participants: ['1', '2'], // Sarah Johnson and Michael Chen
    lastActivity: new Date('2024-01-15T16:45:00'),
    unreadCount: 1,
  },
  {
    id: 'chat_1_3',
    type: 'individual',
    name: 'Emily Rodriguez',
    participants: ['1', '3'], // Sarah Johnson and Emily Rodriguez
    lastActivity: new Date('2024-01-15T12:20:00'),
    unreadCount: 0,
  },
  {
    id: 'chat_1_4',
    type: 'individual',
    name: 'Officer James Wilson',
    participants: ['1', '4'], // Sarah Johnson and Officer Wilson
    lastActivity: new Date('2024-01-14T18:30:00'),
    unreadCount: 2,
  },
];

// Sample messages for general chat
export const generalMessages: Message[] = [
  {
    id: 'msg_1',
    senderId: '4',
    senderName: 'Officer James Wilson',
    content: 'Good morning everyone! Don\'t forget about tonight\'s training session at 7 PM.',
    timestamp: new Date('2024-01-15T08:30:00'),
    type: 'text',
    isRead: true,
    chatId: 'general',
  },
  {
    id: 'msg_2',
    senderId: '1',
    senderName: 'Sarah Johnson',
    content: 'Thanks for the reminder! I\'ll be there.',
    timestamp: new Date('2024-01-15T08:35:00'),
    type: 'text',
    isRead: true,
    chatId: 'general',
  },
  {
    id: 'msg_3',
    senderId: '3',
    senderName: 'Emily Rodriguez',
    content: 'Can someone bring extra traffic cones for the training?',
    timestamp: new Date('2024-01-15T09:15:00'),
    type: 'text',
    isRead: true,
    chatId: 'general',
  },
  {
    id: 'msg_4',
    senderId: '2',
    senderName: 'Michael Chen',
    content: 'I can bring some from the storage room.',
    timestamp: new Date('2024-01-15T09:20:00'),
    type: 'text',
    isRead: false,
    chatId: 'general',
  },
  {
    id: 'msg_5',
    senderId: '5',
    senderName: 'Ashley Thompson',
    content: 'Great! See everyone tonight.',
    timestamp: new Date('2024-01-15T14:30:00'),
    type: 'text',
    isRead: false,
    chatId: 'general',
  },
];

// Sample messages for individual chats
export const individualMessages: Message[] = [
  // Chat between Sarah Johnson (1) and Michael Chen (2)
  {
    id: 'msg_i1',
    senderId: '2',
    senderName: 'Michael Chen',
    content: 'Hey Sarah, can you review the training schedule for next week?',
    timestamp: new Date('2024-01-15T16:45:00'),
    type: 'text',
    isRead: false,
    chatId: 'chat_1_2',
  },
  {
    id: 'msg_i2',
    senderId: '1',
    senderName: 'Sarah Johnson',
    content: 'Sure! I\'ll take a look and get back to you.',
    timestamp: new Date('2024-01-15T16:30:00'),
    type: 'text',
    isRead: true,
    chatId: 'chat_1_2',
  },
  
  // Chat between Sarah Johnson (1) and Emily Rodriguez (3)
  {
    id: 'msg_i3',
    senderId: '1',
    senderName: 'Sarah Johnson',
    content: 'Emily, great job on the community service event yesterday!',
    timestamp: new Date('2024-01-15T12:20:00'),
    type: 'text',
    isRead: true,
    chatId: 'chat_1_3',
  },
  {
    id: 'msg_i4',
    senderId: '3',
    senderName: 'Emily Rodriguez',
    content: 'Thank you! The team did amazing work.',
    timestamp: new Date('2024-01-15T12:15:00'),
    type: 'text',
    isRead: true,
    chatId: 'chat_1_3',
  },
  
  // Chat between Sarah Johnson (1) and Officer Wilson (4)
  {
    id: 'msg_i5',
    senderId: '4',
    senderName: 'Officer James Wilson',
    content: 'Sarah, please prepare the monthly report for the department.',
    timestamp: new Date('2024-01-14T18:30:00'),
    type: 'text',
    isRead: false,
    chatId: 'chat_1_4',
  },
  {
    id: 'msg_i6',
    senderId: '4',
    senderName: 'Officer James Wilson',
    content: 'Include the attendance statistics and community service hours.',
    timestamp: new Date('2024-01-14T18:32:00'),
    type: 'text',
    isRead: false,
    chatId: 'chat_1_4',
  },
];

// Helper functions
export const getMessagesForChat = (chatId: string): Message[] => {
  if (chatId === 'general') {
    return generalMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
  return individualMessages
    .filter(msg => msg.chatId === chatId)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

export const getAllChats = (): Chat[] => {
  const allChats = [generalChat, ...individualChats];
  return allChats.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
};

export const getChatById = (chatId: string): Chat | undefined => {
  if (chatId === 'general') return generalChat;
  return individualChats.find(chat => chat.id === chatId);
};

export const getUnreadMessageCount = (): number => {
  const generalUnread = generalMessages.filter(msg => !msg.isRead).length;
  const individualUnread = individualMessages.filter(msg => !msg.isRead).length;
  return generalUnread + individualUnread;
};

export const markMessagesAsRead = (chatId: string): void => {
  if (chatId === 'general') {
    generalMessages.forEach(msg => {
      if (msg.chatId === chatId) {
        msg.isRead = true;
      }
    });
    generalChat.unreadCount = 0;
  } else {
    individualMessages.forEach(msg => {
      if (msg.chatId === chatId) {
        msg.isRead = true;
      }
    });
    const chat = individualChats.find(c => c.id === chatId);
    if (chat) {
      chat.unreadCount = 0;
    }
  }
};

export const sendMessage = (chatId: string, senderId: string, senderName: string, content: string): void => {
  const newMessage: Message = {
    id: `msg_${Date.now()}`,
    senderId,
    senderName,
    content,
    timestamp: new Date(),
    type: 'text',
    isRead: false,
    chatId,
  };

  if (chatId === 'general') {
    generalMessages.push(newMessage);
    generalChat.lastMessage = newMessage;
    generalChat.lastActivity = new Date();
  } else {
    individualMessages.push(newMessage);
    const chat = individualChats.find(c => c.id === chatId);
    if (chat) {
      chat.lastMessage = newMessage;
      chat.lastActivity = new Date();
    }
  }
};
