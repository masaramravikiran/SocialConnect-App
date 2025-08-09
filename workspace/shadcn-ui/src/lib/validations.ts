import * as z from 'zod';

// Authentication form schemas
export const registerSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(30, { message: 'Username cannot exceed 30 characters.' })
    .regex(/^[a-zA-Z0-9_]+$/, { 
      message: 'Username can only contain letters, numbers, and underscores.' 
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z
    .string(),
  firstName: z
    .string()
    .min(1, { message: 'First name is required.' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required.' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: 'Email or username is required.' }),
  password: z
    .string()
    .min(1, { message: 'Password is required.' }),
});

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z
    .string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Profile form schemas
export const profileSchema = z.object({
  bio: z
    .string()
    .max(160, { message: 'Bio cannot exceed 160 characters.' })
    .optional(),
  website: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .nullable(),
  location: z
    .string()
    .max(100, { message: 'Location cannot exceed 100 characters.' })
    .optional()
    .nullable(),
  profileVisibility: z.enum(['public', 'private', 'followers_only']),
});

// Post form schemas
export const postSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Content is required.' })
    .max(280, { message: 'Content cannot exceed 280 characters.' }),
  category: z.enum(['general', 'announcement', 'question']),
  image: z.any().optional(),
});

// Comment form schemas
export const commentSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Comment is required.' })
    .max(200, { message: 'Comment cannot exceed 200 characters.' }),
});