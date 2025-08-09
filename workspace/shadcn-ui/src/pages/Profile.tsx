import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, MessageSquare, ThumbsUp, Share2, Camera, Edit, MapPin, Briefcase, Calendar } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for demo purposes - will be replaced with Supabase data
const MOCK_USER = {
  id: 'user1',
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  bio: 'Software developer passionate about creating useful applications.',
  avatarUrl: '',
  coverImageUrl: '',
  location: 'San Francisco, CA',
  occupation: 'Software Engineer',
  joinedDate: '2023-01-15',
  followers: 245,
  following: 178
};

const MOCK_POSTS = [
  {
    id: '1',
    content: 'Just launched my new project! Check it out and let me know what you think.',
    createdAt: new Date().toISOString(),
    likes: 12,
    comments: 5
  },
  {
    id: '2',
    content: 'Exploring new technologies for my upcoming project. Any recommendations for state management in React?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    likes: 8,
    comments: 15
  }
];

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // In a real implementation, we would fetch the user data based on userId
  // For now, we'll use the mock data
  const profileUser = MOCK_USER;
  const isCurrentUser = user?.id === userId;

  const handleFollowToggle = () => {
    setIsLoading(true);
    
    // In the future, this will use Supabase to follow/unfollow the user
    setTimeout(() => {
      setIsFollowing(!isFollowing);
      setIsLoading(false);
    }, 500);
  };
  
  return (
    <div className="container max-w-4xl py-6">
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-lg bg-muted md:h-64">
        {profileUser.coverImageUrl ? (
          <img 
            src={profileUser.coverImageUrl} 
            alt="Cover" 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
            <span className="text-muted-foreground">No cover image</span>
          </div>
        )}
        {isCurrentUser && (
          <Button 
            size="icon" 
            variant="secondary" 
            className="absolute bottom-4 right-4"
          >
            <Camera className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Profile Info */}
      <div className="relative px-4">
        <div className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-center sm:flex-row">
            {/* Avatar */}
            <div className="-mt-12 mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-muted sm:mb-0 sm:mr-4">
              <Avatar className="h-full w-full">
                <AvatarFallback className="text-3xl">
                  {profileUser.firstName.charAt(0)}
                </AvatarFallback>
                <AvatarImage src={profileUser.avatarUrl} />
              </Avatar>
              {isCurrentUser && (
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute bottom-0 right-0 h-8 w-8"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* User Info */}
            <div className="mb-4 text-center sm:mb-0 sm:text-left">
              <h1 className="text-2xl font-bold">{`${profileUser.firstName} ${profileUser.lastName}`}</h1>
              <p className="text-muted-foreground">@{profileUser.username}</p>
              <div className="mt-2 flex items-center justify-center space-x-4 text-sm sm:justify-start">
                <div>
                  <span className="font-semibold">{profileUser.followers}</span>
                  <span className="ml-1 text-muted-foreground">Followers</span>
                </div>
                <div>
                  <span className="font-semibold">{profileUser.following}</span>
                  <span className="ml-1 text-muted-foreground">Following</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-4 sm:mt-0">
            {isCurrentUser ? (
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleFollowToggle} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
                <Button variant="outline">Message</Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Bio and Details */}
        <div className="mt-6">
          {profileUser.bio && (
            <p className="mb-4">{profileUser.bio}</p>
          )}
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            {profileUser.location && (
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {profileUser.location}
              </div>
            )}
            {profileUser.occupation && (
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                {profileUser.occupation}
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Joined {format(new Date(profileUser.joinedDate), 'MMMM yyyy')}
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        {/* Posts Tab */}
        <TabsContent value="posts" className="mt-6 space-y-6">
          {MOCK_POSTS.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {profileUser.firstName.charAt(0)}
                    </AvatarFallback>
                    <AvatarImage src={profileUser.avatarUrl} />
                  </Avatar>
                  <div>
                    <p className="font-medium">{`${profileUser.firstName} ${profileUser.lastName}`}</p>
                    <p className="text-xs text-muted-foreground">
                      @{profileUser.username} • {format(new Date(post.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{post.content}</p>
              </CardContent>
              <CardFooter className="border-t p-3">
                <div className="flex gap-6">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ThumbsUp className="h-4 w-4" /> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageSquare className="h-4 w-4" /> {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        {/* Media Tab */}
        <TabsContent value="media" className="mt-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            <div className="aspect-square rounded-md bg-muted" />
            <div className="aspect-square rounded-md bg-muted" />
            <div className="aspect-square rounded-md bg-muted" />
            <div className="aspect-square rounded-md bg-muted" />
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            No media uploads yet.
          </div>
        </TabsContent>
        
        {/* About Tab */}
        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">About {profileUser.firstName}</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Bio</h3>
                <p className="text-sm text-muted-foreground">
                  {profileUser.bio || "No bio provided."}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-sm text-muted-foreground">
                  {profileUser.location || "Not specified"}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Occupation</h3>
                <p className="text-sm text-muted-foreground">
                  {profileUser.occupation || "Not specified"}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Joined</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(profileUser.joinedDate), 'MMMM d, yyyy')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}