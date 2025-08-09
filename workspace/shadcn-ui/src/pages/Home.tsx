import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { postSchema } from '@/lib/validations';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Loader2, MessageSquare, Heart, Share2, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';

type PostFormData = z.infer<typeof postSchema>;

// Mock data for demo purposes - will be replaced with Supabase data
const MOCK_POSTS = [
  {
    id: '1',
    content: 'Just launched my new project! Check it out and let me know what you think.',
    user: {
      id: 'user1',
      username: 'techcreator',
      firstName: 'Alex',
      lastName: 'Johnson',
      avatarUrl: ''
    },
    createdAt: new Date().toISOString(),
    likes: 12,
    comments: 5
  },
  {
    id: '2',
    content: 'Beautiful day for hiking! The views from the mountain were spectacular.',
    user: {
      id: 'user2',
      username: 'natureexplorer',
      firstName: 'Emma',
      lastName: 'Wilson',
      avatarUrl: ''
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    likes: 25,
    comments: 8
  }
];

export default function HomePage() {
  const { user } = useAuth();
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [posts, setPosts] = useState(MOCK_POSTS);
  
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: '',
      category: 'general'
    }
  });

  const onSubmit = async (data: PostFormData) => {
    setIsCreatingPost(true);
    try {
      // In the future, this will use Supabase to create the post
      // For now, we'll just simulate adding a new post
      const newPost = {
        id: `temp-${Date.now()}`,
        content: data.content,
        user: {
          id: user?.id || 'unknown',
          username: 'currentuser',
          firstName: 'You',
          lastName: '',
          avatarUrl: ''
        },
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0
      };
      
      setPosts([newPost, ...posts]);
      form.reset();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsCreatingPost(false);
    }
  };

  return (
    <div className="container max-w-3xl py-6">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      
      {/* Create Post Form */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
              <AvatarImage src="" />
            </Avatar>
            <div>
              <p className="font-medium">What's on your mind?</p>
            </div>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Share your thoughts..."
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                {/* Future functionality: upload image, mention users, etc. */}
              </div>
              <Button type="submit" disabled={isCreatingPost}>
                {isCreatingPost ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Posting...
                  </>
                ) : (
                  'Post'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>
                    {post.user.firstName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                  <AvatarImage src={post.user.avatarUrl} />
                </Avatar>
                <div>
                  <p className="font-medium">{`${post.user.firstName} ${post.user.lastName}`}</p>
                  <p className="text-xs text-muted-foreground">
                    @{post.user.username} • {format(new Date(post.createdAt), 'MMM d, yyyy')}
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
      </div>
    </div>
  );
}