import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Search, Send } from 'lucide-react';
import { format } from 'date-fns';

// Schema for message form
const messageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty')
});

type MessageFormValues = z.infer<typeof messageSchema>;

// Mock data for demo purposes - will be replaced with Supabase data
const MOCK_CONVERSATIONS = [
  {
    id: 'conv1',
    user: {
      id: 'user1',
      firstName: 'Alex',
      lastName: 'Smith',
      username: 'alexsmith',
      avatarUrl: ''
    },
    lastMessage: {
      content: 'Hey, how are you doing?',
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
      isRead: false,
      isFromMe: false
    }
  },
  {
    id: 'conv2',
    user: {
      id: 'user2',
      firstName: 'Emma',
      lastName: 'Johnson',
      username: 'emmaj',
      avatarUrl: ''
    },
    lastMessage: {
      content: 'The project is looking great!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      isRead: true,
      isFromMe: true
    }
  },
  {
    id: 'conv3',
    user: {
      id: 'user3',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'mikebrown',
      avatarUrl: ''
    },
    lastMessage: {
      content: 'Let\'s meet tomorrow to discuss the details.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      isRead: true,
      isFromMe: false
    }
  }
];

const MOCK_MESSAGES = [
  {
    id: 'msg1',
    content: 'Hey, how are you doing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    senderId: 'user1',
    receiverId: 'currentUser'
  },
  {
    id: 'msg2',
    content: 'I\'m good, thanks! How about you?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 5).toISOString(), // 1h 55m ago
    senderId: 'currentUser',
    receiverId: 'user1'
  },
  {
    id: 'msg3',
    content: 'Doing well! Just working on that new project we talked about.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 + 1000 * 60 * 10).toISOString(), // 50m ago
    senderId: 'user1',
    receiverId: 'currentUser'
  },
  {
    id: 'msg4',
    content: 'That sounds great! I\'d love to hear more about it.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30m ago
    senderId: 'currentUser',
    receiverId: 'user1'
  },
  {
    id: 'msg5',
    content: 'Sure! I can share some details. It\'s a social platform that helps connect people with similar interests.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10m ago
    senderId: 'user1',
    receiverId: 'currentUser'
  }
];

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<string | null>('conv1');
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  
  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: ''
    }
  });
  
  const onSubmit = (values: MessageFormValues) => {
    if (!activeConversation) return;
    
    // Add the new message
    const newMessage = {
      id: `msg${messages.length + 1}`,
      content: values.message,
      timestamp: new Date().toISOString(),
      senderId: 'currentUser',
      receiverId: conversations.find(c => c.id === activeConversation)?.user.id || ''
    };
    
    setMessages([...messages, newMessage]);
    
    // Update the conversation with the last message
    setConversations(
      conversations.map(conversation => 
        conversation.id === activeConversation
          ? {
              ...conversation,
              lastMessage: {
                content: values.message,
                timestamp: new Date().toISOString(),
                isRead: false,
                isFromMe: true
              }
            }
          : conversation
      )
    );
    
    // Reset the form
    form.reset();
  };
  
  const activeUser = conversations.find(conv => conv.id === activeConversation)?.user;
  
  return (
    <div className="flex h-screen">
      {/* Conversations Sidebar */}
      <div className="hidden w-80 border-r border-border md:block">
        <div className="flex h-16 items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold">Messages</h2>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-2">
          <Input 
            placeholder="Search conversations..."
            className="mb-2"
          />
        </div>
        
        <ScrollArea className="h-[calc(100vh-7rem)]">
          <div className="space-y-1 p-2">
            {conversations.map((conversation) => (
              <div key={conversation.id}>
                <button
                  onClick={() => setActiveConversation(conversation.id)}
                  className={`w-full rounded-lg p-3 text-left transition-colors ${
                    activeConversation === conversation.id
                      ? 'bg-accent'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {conversation.user.firstName.charAt(0)}
                      </AvatarFallback>
                      <AvatarImage src={conversation.user.avatarUrl} />
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {conversation.user.firstName} {conversation.user.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(conversation.lastMessage.timestamp), 'h:mm a')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {conversation.lastMessage.isFromMe && <span className="text-xs text-muted-foreground">You: </span>}
                        <span className={`truncate text-sm ${
                          !conversation.lastMessage.isRead && !conversation.lastMessage.isFromMe
                            ? 'font-medium'
                            : 'text-muted-foreground'
                        }`}>
                          {conversation.lastMessage.content}
                        </span>
                        {!conversation.lastMessage.isRead && !conversation.lastMessage.isFromMe && (
                          <div className="ml-1 h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
                <Separator className="my-1" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {activeConversation ? (
          <>
            {/* Conversation Header */}
            <div className="flex h-16 items-center border-b border-border p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {activeUser?.firstName.charAt(0)}
                  </AvatarFallback>
                  <AvatarImage src={activeUser?.avatarUrl} />
                </Avatar>
                <div>
                  <h2 className="font-semibold">
                    {activeUser?.firstName} {activeUser?.lastName}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    @{activeUser?.username}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => {
                  const isFromMe = message.senderId === 'currentUser';
                  
                  return (
                    <div key={message.id} className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}>
                      <div className="flex items-end gap-2 max-w-[75%]">
                        {!isFromMe && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {activeUser?.firstName.charAt(0)}
                            </AvatarFallback>
                            <AvatarImage src={activeUser?.avatarUrl} />
                          </Avatar>
                        )}
                        <div>
                          <Card className={`px-3 py-2 ${isFromMe ? 'bg-primary text-primary-foreground' : ''}`}>
                            <p className="text-sm">{message.content}</p>
                          </Card>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {format(new Date(message.timestamp), 'h:mm a')}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="border-t border-border p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input 
                            placeholder="Type a message..." 
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">No conversation selected</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}