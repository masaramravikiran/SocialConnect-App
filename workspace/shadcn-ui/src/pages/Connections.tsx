import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, UserPlus, Users, Check, X, Loader2 } from 'lucide-react';

// Mock data for demo purposes - will be replaced with Supabase data
const MOCK_FOLLOWERS = [
  {
    id: 'user1',
    username: 'techguru',
    firstName: 'Alex',
    lastName: 'Smith',
    avatarUrl: '',
    bio: 'Tech enthusiast and software developer',
    isFollowing: true
  },
  {
    id: 'user2',
    username: 'artlover',
    firstName: 'Emma',
    lastName: 'Johnson',
    avatarUrl: '',
    bio: 'Digital artist and designer',
    isFollowing: false
  },
  {
    id: 'user3',
    username: 'traveler',
    firstName: 'Michael',
    lastName: 'Brown',
    avatarUrl: '',
    bio: 'Travel blogger and photographer',
    isFollowing: true
  }
];

const MOCK_FOLLOWING = [
  {
    id: 'user1',
    username: 'techguru',
    firstName: 'Alex',
    lastName: 'Smith',
    avatarUrl: '',
    bio: 'Tech enthusiast and software developer'
  },
  {
    id: 'user3',
    username: 'traveler',
    firstName: 'Michael',
    lastName: 'Brown',
    avatarUrl: '',
    bio: 'Travel blogger and photographer'
  },
  {
    id: 'user4',
    username: 'musicfan',
    firstName: 'Sarah',
    lastName: 'Wilson',
    avatarUrl: '',
    bio: 'Music lover and concert enthusiast'
  }
];

const MOCK_SUGGESTIONS = [
  {
    id: 'user5',
    username: 'fitnessguru',
    firstName: 'David',
    lastName: 'Clark',
    avatarUrl: '',
    bio: 'Fitness trainer and nutrition expert',
    mutualConnections: 3
  },
  {
    id: 'user6',
    username: 'bookworm',
    firstName: 'Jessica',
    lastName: 'Taylor',
    avatarUrl: '',
    bio: 'Book reviewer and literature enthusiast',
    mutualConnections: 2
  },
  {
    id: 'user7',
    username: 'chefmaster',
    firstName: 'Robert',
    lastName: 'Anderson',
    avatarUrl: '',
    bio: 'Chef and food blogger',
    mutualConnections: 1
  }
];

const MOCK_REQUESTS = [
  {
    id: 'user8',
    username: 'photographer',
    firstName: 'Lisa',
    lastName: 'Martin',
    avatarUrl: '',
    bio: 'Photographer capturing life\'s moments',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  },
  {
    id: 'user9',
    username: 'gamer',
    firstName: 'Kevin',
    lastName: 'White',
    avatarUrl: '',
    bio: 'Gaming enthusiast and streamer',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  }
];

export default function ConnectionsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [followers, setFollowers] = useState(MOCK_FOLLOWERS);
  const [following, setFollowing] = useState(MOCK_FOLLOWING);
  const [suggestions, setSuggestions] = useState(MOCK_SUGGESTIONS);
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  
  const toggleFollowUser = (userId: string, isCurrentlyFollowing: boolean) => {
    setLoadingStates(prev => ({ ...prev, [userId]: true }));
    
    // In the future, this will use Supabase to follow/unfollow the user
    setTimeout(() => {
      if (isCurrentlyFollowing) {
        setFollowing(following.filter(user => user.id !== userId));
        setFollowers(
          followers.map(follower =>
            follower.id === userId 
              ? { ...follower, isFollowing: false } 
              : follower
          )
        );
      } else {
        const userToFollow = [...followers, ...suggestions]
          .find(user => user.id === userId);
          
        if (userToFollow) {
          setFollowing([...following, {
            id: userToFollow.id,
            username: userToFollow.username,
            firstName: userToFollow.firstName,
            lastName: userToFollow.lastName,
            avatarUrl: userToFollow.avatarUrl,
            bio: userToFollow.bio
          }]);
          
          setFollowers(
            followers.map(follower =>
              follower.id === userId 
                ? { ...follower, isFollowing: true } 
                : follower
            )
          );
          
          setSuggestions(suggestions.filter(suggestion => suggestion.id !== userId));
        }
      }
      
      setLoadingStates(prev => ({ ...prev, [userId]: false }));
    }, 500);
  };
  
  const handleFollowRequestResponse = (userId: string, accept: boolean) => {
    setLoadingStates(prev => ({ ...prev, [userId]: true }));
    
    // In the future, this will use Supabase to accept/reject the follow request
    setTimeout(() => {
      const requestUser = requests.find(req => req.id === userId);
      
      if (requestUser && accept) {
        setFollowers([...followers, {
          id: requestUser.id,
          username: requestUser.username,
          firstName: requestUser.firstName,
          lastName: requestUser.lastName,
          avatarUrl: requestUser.avatarUrl,
          bio: requestUser.bio,
          isFollowing: false
        }]);
      }
      
      setRequests(requests.filter(req => req.id !== userId));
      setLoadingStates(prev => ({ ...prev, [userId]: false }));
    }, 500);
  };
  
  // Define types for our connection objects
  type BaseConnection = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    bio: string;
  };

  type FollowerConnection = BaseConnection & {
    isFollowing: boolean;
  };

  type SuggestionConnection = BaseConnection & {
    mutualConnections: number;
  };

  type RequestConnection = BaseConnection & {
    requestedAt: string;
  };

  type ConnectionType = FollowerConnection | BaseConnection | SuggestionConnection | RequestConnection;

  const renderConnectionCard = (connection: ConnectionType, type: 'follower' | 'following' | 'suggestion' | 'request') => {
    const isFollowing = type === 'follower' ? connection.isFollowing : true;
    const isLoading = loadingStates[connection.id] || false;
    
    return (
      <Card key={connection.id} className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {connection.firstName.charAt(0)}
                </AvatarFallback>
                <AvatarImage src={connection.avatarUrl} />
              </Avatar>
              <div>
                <h3 className="font-medium">
                  {connection.firstName} {connection.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">@{connection.username}</p>
                {connection.bio && (
                  <p className="mt-1 text-sm">{connection.bio}</p>
                )}
                {type === 'suggestion' && connection.mutualConnections > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {connection.mutualConnections} mutual connection{connection.mutualConnections !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
            {type === 'request' ? (
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  disabled={isLoading}
                  onClick={() => handleFollowRequestResponse(connection.id, false)}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  disabled={isLoading}
                  onClick={() => handleFollowRequestResponse(connection.id, true)}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                </Button>
              </div>
            ) : (
              <Button
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                className={isFollowing ? "gap-1" : ""}
                disabled={isLoading}
                onClick={() => toggleFollowUser(connection.id, isFollowing)}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isFollowing ? (
                  <>
                    <Check className="h-4 w-4" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-1 h-4 w-4" />
                    Follow
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Connections</h1>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search connections..." 
            className="pl-9 w-full max-w-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="followers" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="followers" className="relative">
            Followers
            <Badge variant="secondary" className="ml-2">{followers.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="following">
            Following
            <Badge variant="secondary" className="ml-2">{following.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="suggestions">
            Suggestions
            <Badge variant="secondary" className="ml-2">{suggestions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="requests" className="relative">
            Requests
            <Badge variant="secondary" className="ml-2">{requests.length}</Badge>
            {requests.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {requests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="followers">
          {followers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {followers.map(follower => renderConnectionCard(follower, 'follower'))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h2 className="mt-4 text-xl font-medium">No followers yet</h2>
              <p className="text-sm text-muted-foreground">
                When people follow you, they'll appear here.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="following">
          {following.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {following.map(follow => renderConnectionCard(follow, 'following'))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h2 className="mt-4 text-xl font-medium">Not following anyone</h2>
              <p className="text-sm text-muted-foreground">
                When you follow people, they'll appear here.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="suggestions">
          {suggestions.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {suggestions.map(suggestion => renderConnectionCard(suggestion, 'suggestion'))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h2 className="mt-4 text-xl font-medium">No suggestions available</h2>
              <p className="text-sm text-muted-foreground">
                Check back later for new connection suggestions.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="requests">
          {requests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {requests.map(request => renderConnectionCard(request, 'request'))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h2 className="mt-4 text-xl font-medium">No pending requests</h2>
              <p className="text-sm text-muted-foreground">
                When people request to follow you, they'll appear here.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}