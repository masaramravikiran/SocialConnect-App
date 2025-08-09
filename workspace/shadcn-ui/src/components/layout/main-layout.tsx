import { useAuth } from '@/contexts/auth-context';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, Users, Bell, User, LogOut, Settings, MessageSquare, Search } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar - Navigation */}
      <div className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        <div className="p-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold text-primary">SocialConnect</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-5 w-5" />
              Home
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="ghost" className="w-full justify-start">
              <Search className="mr-2 h-5 w-5" />
              Explore
            </Button>
          </Link>
          <Link to="/connections">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-5 w-5" />
              Connections
            </Button>
          </Link>
          <Link to="/messages">
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-5 w-5" />
              Messages
            </Button>
          </Link>
          <Link to="/notifications">
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </Button>
          </Link>
          <Link to={`/profile/${user?.id}`}>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-5 w-5" />
              Profile
            </Button>
          </Link>
        </nav>
        <div className="mt-auto p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                  <AvatarImage src="" />
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{user?.email?.split('@')[0]}</span>
                  <span className="text-xs text-muted-foreground">View profile</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate(`/profile/${user?.id}`)}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex flex-col flex-1">
        <header className="border-b border-border bg-card p-4 md:hidden">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-semibold">
              <span className="text-lg font-bold text-primary">SocialConnect</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                      <AvatarImage src="" />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate(`/profile/${user?.id}`)}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Mobile Navigation */}
        <div className="border-t border-border bg-card p-2 md:hidden">
          <div className="grid grid-cols-5 gap-2">
            <Link to="/">
              <Button variant="ghost" size="icon" className="w-full">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="ghost" size="icon" className="w-full">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/connections">
              <Button variant="ghost" size="icon" className="w-full">
                <Users className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="w-full">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </Link>
            <Link to={`/profile/${user?.id}`}>
              <Button variant="ghost" size="icon" className="w-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}