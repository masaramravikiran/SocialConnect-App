import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Heart, MessageSquare, UserPlus, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

// Mock data for demo purposes - will be replaced with Supabase data
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'follow',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    actor: {
      id: 'user1',
      username: 'techguru',
      firstName: 'Alex',
      lastName: 'Smith',
      avatarUrl: ''
    },
    message: 'started following you'
  },
  {
    id: '2',
    type: 'like',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    actor: {
      id: 'user2',
      username: 'artlover',
      firstName: 'Emma',
      lastName: 'Johnson',
      avatarUrl: ''
    },
    message: 'liked your post',
    contentPreview: 'Just launched my new project! Check it out...'
  },
  {
    id: '3',
    type: 'comment',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    actor: {
      id: 'user3',
      username: 'traveler',
      firstName: 'Michael',
      lastName: 'Brown',
      avatarUrl: ''
    },
    message: 'commented on your post',
    contentPreview: 'This looks amazing! Can\'t wait to see more.'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  
  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true
      }))
    );
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'follow':
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container max-w-2xl py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-colors ${notification.read ? '' : 'bg-primary-50 border-l-4 border-l-primary'}`}
            >
              <CardContent className="p-4 flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Avatar>
                    <AvatarFallback>
                      {notification.actor.firstName.charAt(0)}
                    </AvatarFallback>
                    <AvatarImage src={notification.actor.avatarUrl} />
                  </Avatar>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="font-medium">{`${notification.actor.firstName} ${notification.actor.lastName}`}</span>
                    <span className="text-muted-foreground">{notification.message}</span>
                    {!notification.read && <Badge variant="outline" className="ml-2">New</Badge>}
                  </div>
                  
                  {notification.contentPreview && (
                    <p className="text-sm text-muted-foreground">
                      "{notification.contentPreview}"
                    </p>
                  )}
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <time dateTime={notification.createdAt} title={format(new Date(notification.createdAt), 'PPp')}>
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </time>
                  </div>
                </div>
                <div className="flex-shrink-0 self-start">
                  {getNotificationIcon(notification.type)}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
            <h2 className="mt-4 text-xl font-medium">No notifications</h2>
            <p className="text-sm text-muted-foreground">
              You're all caught up! You'll see new notifications here when they arrive.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}