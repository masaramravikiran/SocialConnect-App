# 📱 SocialConnect

A comprehensive **social media backend application** built with **Python Django REST Framework** or **Next.js**, enabling users to share posts, connect with others, and enjoy a personalised feed experience — complete with authentication, content creation, real-time notifications, and admin controls.

---

## 🚀 Features

### 👤 User Features
- **Authentication**: JWT-based login/register/logout with email verification
- **Profiles**: Bio, avatar, website, location, follower/following stats
- **Posts**: Text posts (max 280 chars) with single image upload
- **Social Interactions**: Follow/unfollow, like posts, and comment
- **Feed**: Personalised chronological feed from followed users
- **Notifications**: Real-time alerts via Supabase for follows, likes, and comments

### 🛠 Admin Features
- Manage users (view, deactivate, edit)
- Moderate content (view/delete posts)
- Access platform statistics

---

## 🏗 Technology Stack

| Component         | Tech Used |
|-------------------|-----------|
| Backend           | Django REST Framework / Next.js |
| Database          | PostgreSQL (Supabase) |
| Auth              | JWT (django-rest-framework-simplejwt) |
| File Storage      | Supabase Storage |
| Frontend          | React.js / Next.js with TypeScript |
| UI Framework      | Tailwind CSS + shadcn/ui |
| Real-time         | Supabase Realtime |
| Deployment        | Vercel / Netlify |

---

## 📡 API Overview

### 🔑 Authentication
- `POST /api/auth/register/` – Register new user
- `POST /api/auth/login/` – Login with email/username
- `POST /api/auth/logout/` – Logout (invalidate refresh token)
- `POST /api/auth/token/refresh/` – Refresh access token

### 👤 User Profiles
- `GET /api/users/{id}/` – Get profile
- `PUT /api/users/me/` – Update own profile
- `GET /api/users/` – List users (admin only)

### 📝 Posts
- `POST /api/posts/` – Create post
- `GET /api/posts/` – List posts (paginated)
- `PUT /api/posts/{id}/` – Edit own post
- `DELETE /api/posts/{id}/` – Delete own post

### 🤝 Social
- `POST /api/users/{id}/follow/` – Follow user
- `DELETE /api/users/{id}/follow/` – Unfollow user
- `POST /api/posts/{id}/like/` – Like post
- `DELETE /api/posts/{id}/like/` – Unlike post

### 🔔 Notifications
- Real-time updates via Supabase subscriptions
- Endpoints to get, read, and mark notifications

---

## 🛠 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/socialconnect.git
cd socialconnect
