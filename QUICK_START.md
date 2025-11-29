# QUICK START GUIDE

## 🚀 Getting Started (5 minutes)

### 1. Setup MongoDB
Choose ONE option:

**Option A: Local MongoDB**
```powershell
# Download from https://www.mongodb.com/try/download/community
# Install and start the service
# MongoDB will run at: mongodb://localhost:27017
```

**Option B: MongoDB Atlas (Recommended for testing)**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string (looks like):
   mongodb+srv://username:password@cluster.mongodb.net/next-school
5. Update .env.local with this string
```

### 2. Install Dependencies
```bash
cd d:\next-school-app
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 📊 Quick Feature Tour

### Create a Student
1. Click "Add Student" button
2. Fill in the form:
   - Name: John Smith
   - Email: john@example.com
   - Phone: +1-234-567-8900
   - Roll Number: A101
   - Grade: Grade 10
3. Click "Create Student"

### View Students
- Students appear in table after creation
- Shows: Name, Email, Phone, Roll Number, Grade

### Edit a Student
1. Click "Edit" button on any student row
2. Form fills with student data
3. Modify fields
4. Click "Update Student"

### Delete a Student
1. Click "Delete" button
2. Confirm deletion
3. Student is removed

---

## 🔌 API Testing

### Test with cURL (Windows PowerShell)
```powershell
# Get all students
$uri = "http://localhost:3000/api/students"
Invoke-WebRequest -Uri $uri -Method Get

# Create student
$body = @{
    name = "Alice Johnson"
    email = "alice@example.com"
    phone = "+1-999-888-7777"
    rollNumber = "A102"
    grade = "Grade 11"
} | ConvertTo-Json

Invoke-WebRequest -Uri $uri -Method Post -Body $body -ContentType "application/json"
```

---

## 🛠️ Project Files

| File | Purpose |
|------|---------|
| `src/app/page.js` | Home page with student list |
| `src/components/StudentList.js` | Main CRUD interface |
| `src/components/StudentForm.js` | Add/Edit form |
| `src/components/StudentTable.js` | Data display table |
| `src/app/api/students/route.js` | GET, POST endpoints |
| `src/app/api/students/[id]/route.js` | PUT, DELETE endpoints |
| `src/store/studentApi.js` | RTK Query API hooks |
| `src/lib/mongodb.js` | MongoDB connection |
| `.env.local` | Configuration |

---

## 🐛 Common Issues & Solutions

### "Cannot connect to MongoDB"
- ✅ Make sure MongoDB is running
- ✅ Check `.env.local` has correct connection string
- ✅ For Atlas: Whitelist your IP in Network Access

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### "Students not loading"
- ✅ Check browser console (F12) for errors
- ✅ Check Network tab - API responses
- ✅ Verify MongoDB has `next-school` database

### Form not submitting
- ✅ Check all required fields are filled
- ✅ Check browser console for validation errors
- ✅ Verify API is responding (Network tab)

---

## 📚 Stack Overview

```
Frontend Layer:
├── React 19 (UI)
├── Next.js 16 (Framework)
├── Redux Toolkit (State)
├── RTK Query (API)
└── Tailwind CSS (Styling)

Backend Layer:
├── Next.js API Routes
├── MongoDB (Database)
└── Node.js Driver (Connection)
```

---

## 🎯 What You Can Do

✅ Create student records with full details
✅ View all students in a responsive table
✅ Update any student information
✅ Delete students from database
✅ Automatic data validation
✅ Real-time UI updates
✅ API endpoints for external apps
✅ Fully responsive on mobile

---

## 📞 Next Steps

1. **Add more fields** to student schema
2. **Create grade-wise views** to filter students
3. **Add search functionality** to find students
4. **Generate reports** with student data
5. **Add authentication** for admin access
6. **Deploy to Vercel** for production

---

## 🎓 Learning Resources

This project teaches:
- Next.js App Router patterns
- RTK Query for API management
- MongoDB CRUD operations
- Tailwind CSS responsive design
- React hooks (useState, useEffect)
- API route handlers
- Form handling in React

---

**Happy Coding! 🚀**
