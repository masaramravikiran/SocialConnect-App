import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Mock data for demo purposes - will be replaced with Supabase data
const TRENDING_TOPICS = [
  { id: '1', name: 'Technology', count: 2543 },
  { id: '2', name: 'Sports', count: 1829 },
  { id: '3', name: 'Art', count: 1245 },
  { id: '4', name: 'Music', count: 876 },
  { id: '5', name: 'Travel', count: 562 },
];

const SUGGESTED_USERS = [
  {
    id: 'user1',
    username: 'techguru',
    firstName: 'Alex',
    lastName: 'Smith',
    avatarUrl: '',
    followers: 5234,
    bio: 'Tech enthusiast and software developer'
  },
  {
    id: 'user2',
    username: 'artlover',
    firstName: 'Emma',
    lastName: 'Johnson',
    avatarUrl: '',
    followers: 3451,
    bio: 'Digital artist and designer'
  },
  {
    id: 'user3',
    username: 'traveler',
    firstName: 'Michael',
    lastName: 'Brown',
    avatarUrl: '',
    followers: 2876,
    bio: 'Travel blogger and photographer'
  }
];

export default function ExplorePage() {
  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Explore</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for people, topics, or keywords" 
            className="pl-9 w-full max-w-lg"
          />
        </div>
      </div>
      
      <Tabs defaultValue="trending">
        <TabsList className="mb-6">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="forYou">For You</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Trending Topics</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {TRENDING_TOPICS.map((topic) => (
                      <div key={topic.id} className="flex items-center justify-between">
                        <div>
                          <span className="text-primary font-medium">#{topic.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{topic.count} posts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-full md:col-span-2">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-lg font-medium">
                      The Explore page will show trending content, personalized recommendations,
                      and suggested connections based on your interests and activity.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      This page will be fully implemented when connected to the Supabase backend.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="forYou">
          <Card>
            <CardContent className="p-6">
              <p className="text-lg font-medium">
                Your personalized feed will appear here based on your interests and connections.
              </p>
              <p className="mt-2 text-muted-foreground">
                This feature will be fully implemented when connected to the Supabase backend.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="people">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SUGGESTED_USERS.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {user.firstName.charAt(0)}
                      </AvatarFallback>
                      <AvatarImage src={user.avatarUrl} />
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{`${user.firstName} ${user.lastName}`}</h3>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                      <p className="mt-2 text-sm">{user.bio}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {user.followers.toLocaleString()} followers
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}