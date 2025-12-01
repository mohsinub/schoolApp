# Authentication Setup Guide

## Overview
The application uses MongoDB for user authentication with bcrypt password hashing for security.

## Prerequisites
- MongoDB Atlas cluster with `next-school` database
- `MONGODB_URI` environment variable configured

## Setup Instructions

### 1. Seed Test Users
Once your MongoDB is configured and the app is running, seed the users collection by making a POST request:

```bash
# Local development
curl -X POST http://localhost:3000/api/auth/seed

# Production (Vercel)
curl -X POST https://your-vercel-domain.vercel.app/api/auth/seed
```

Or access via browser:
```
http://localhost:3000/api/auth/seed
```

### 2. Test Users Created
After seeding, two test users will be available:

#### Admin User
- **Email**: admin@school.com
- **Password**: admin
- **Role**: admin
- **Access**: Can view all students and classes

#### Teacher User
- **Email**: teacher@school.com
- **Password**: teacher
- **Role**: teacher
- **Classes**: KG1, KG2, Grade 1, Grade 2
- **Access**: Can only view their assigned classes

### 3. MongoDB Users Collection Schema

```javascript
{
  _id: ObjectId,
  email: String,           // Unique email address
  passwordHash: String,    // Bcrypt hashed password
  name: String,           // Display name
  role: String,           // "admin" or "teacher"
  teacherClasses: Array,  // Classes assigned to teacher (empty for admin)
  createdAt: Date,        // Account creation date
}
```

## API Endpoints

### Login
**POST** `/api/auth/login`

Request:
```json
{
  "email": "admin@school.com",
  "password": "admin"
}
```

Success Response (200):
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "admin@school.com",
    "name": "Admin User",
    "role": "admin",
    "teacherClasses": []
  }
}
```

Error Response (401):
```json
{
  "error": "Invalid email or password"
}
```

### Seed Users (Development Only)
**POST** `/api/auth/seed`

Creates admin and teacher test users with hashed passwords.

## Security Notes
- Passwords are hashed using bcrypt with 10 salt rounds
- Password hashes are never returned to the client
- Session stored in browser localStorage
- All protected routes redirect to /login if not authenticated
- Teachers can only access their assigned classes

## Adding New Users
To add new users to the database:

1. Connect to MongoDB Atlas
2. Navigate to `next-school` database → `users` collection
3. Insert a new document with:
   ```javascript
   {
     email: "newuser@school.com",
     passwordHash: "bcrypt_hashed_password_here",
     name: "New User Name",
     role: "teacher",
     teacherClasses: ["Grade 1", "Grade 2"],
     createdAt: new Date()
   }
   ```

**Note**: Use bcrypt to hash the password before inserting it into the database.

## Troubleshooting

### "Users already exist" message when seeding
- The seed endpoint checks if test users already exist
- To recreate them, delete the documents from the `users` collection and run seed again

### "Invalid email or password" on login
- Check that the users collection was seeded successfully
- Verify email matches exactly (case-sensitive)
- Ensure MongoDB connection is working

### Database connection error
- Verify `MONGODB_URI` is set in `.env.local`
- Check MongoDB Atlas network access settings allow your IP
- Confirm database name is `next-school`
