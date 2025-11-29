# ARCHITECTURE & SETUP GUIDE

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT SIDE (Browser)                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Components (src/components)         │  │
│  │  StudentList → StudentForm, StudentTable               │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓↑                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Redux Store + RTK Query (src/store/studentApi.js)    │  │
│  │  - Hooks: useGetStudentsQuery()                        │  │
│  │  - Hooks: useCreateStudentMutation()                   │  │
│  │  - Auto caching & tag invalidation                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓↑                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │       HTTP Requests (fetch via RTK Query)              │  │
│  │       Base URL: http://localhost:3000                  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓↑
┌─────────────────────────────────────────────────────────────┐
│                   SERVER SIDE (Node.js)                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │    Next.js API Routes (src/app/api/students/)         │  │
│  │  GET    /api/students     → Fetch all                 │  │
│  │  GET    /api/students/:id → Fetch one                 │  │
│  │  POST   /api/students     → Create                     │  │
│  │  PUT    /api/students/:id → Update                     │  │
│  │  DELETE /api/students/:id → Delete                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓↑                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │      MongoDB Connection (src/lib/mongodb.js)           │  │
│  │  - Connection pooling                                  │  │
│  │  - Error handling                                      │  │
│  │  - Client reuse                                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓↑
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                        │
│  Database: next-school                                      │
│  Collection: students                                       │
│  Schema:                                                    │
│  {                                                          │
│    _id: ObjectId,                                           │
│    name: string,                                            │
│    email: string,                                           │
│    phone: string,                                           │
│    rollNumber: string,                                      │
│    grade: string,                                           │
│    createdAt: Date,                                         │
│    updatedAt: Date                                          │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Complete File Structure

```
next-school-app/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── students/
│   │   │       ├── route.js              [GET all, POST create]
│   │   │       └── [id]/
│   │   │           └── route.js          [GET one, PUT update, DELETE]
│   │   │
│   │   ├── layout.js                     [Root layout with Redux Provider]
│   │   ├── page.js                       [Home page, renders StudentList]
│   │   ├── globals.css                   [Global Tailwind styles]
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── StudentList.js                [Main CRUD interface]
│   │   ├── StudentForm.js                [Add/Edit form with validation]
│   │   └── StudentTable.js               [Display students in table]
│   │
│   ├── store/
│   │   ├── store.js                      [Redux store configuration]
│   │   └── studentApi.js                 [RTK Query API definitions]
│   │
│   ├── lib/
│   │   └── mongodb.js                    [MongoDB connection handler]
│   │
│   └── providers.js                      [Redux Provider wrapper]
│
├── public/
│   ├── next.svg
│   └── vercel.svg
│
├── .env.local                            [Environment variables]
├── .gitignore                            [Git ignore rules]
├── .eslintrc.json                        [ESLint configuration]
├── next.config.js                        [Next.js configuration]
├── tailwind.config.js                    [Tailwind CSS config]
├── postcss.config.js                     [PostCSS config]
├── package.json                          [Dependencies & scripts]
├── package-lock.json                     [Dependency lock file]
├── README.md                             [Main documentation]
├── QUICK_START.md                        [Quick start guide]
├── ARCHITECTURE.md                       [This file]
└── jsconfig.json                         [JavaScript path aliases]
```

## 🔄 Data Flow Example: Create Student

```
1. User fills StudentForm & clicks "Create Student"
   ↓
2. handleSubmit() calls onSubmit(formData)
   ↓
3. useCreateStudentMutation hook executes
   ↓
4. RTK Query prepares POST request to /api/students
   Content-Type: application/json
   Body: { name, email, phone, rollNumber, grade }
   ↓
5. Next.js API Route (src/app/api/students/route.js)
   - Receives POST request
   - Parses JSON body
   - Connects to MongoDB
   - Inserts student document
   - Returns { _id, ...data } with status 201
   ↓
6. RTK Query receives response
   - Invalidates 'Students' tag
   - Updates Redux store
   - Triggers re-render
   ↓
7. Component displays:
   - Success message (implicit: no error)
   - New student in table
   - Form resets
   - Loading state ends
```

## 🔐 Error Handling Flow

```
API Request Error:
  ↓
RTK Query catches error
  ↓
Returns error object to component
  ↓
Component displays in console/UI
  ↓
User can retry
```

## 🚀 Deployment Checklist

Before deploying to production:

```
□ Update MONGODB_URI to production database
□ Set NODE_ENV=production in environment
□ Run: npm run build (verify success)
□ Update NEXT_PUBLIC_API_URL to production domain
□ Configure CORS if API accessed from different domain
□ Set up error logging (Sentry, LogRocket, etc.)
□ Enable database backups
□ Set up monitoring & alerts
□ Test all CRUD operations thoroughly
□ Load test the application
□ Set up CI/CD pipeline
□ Configure CDN for static assets (Optional)
```

## 🔧 Configuration Reference

### Environment Variables (.env.local)
```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/next-school
# OR for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/next-school

# Public API URL (used by client-side code)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: For production
# NODE_ENV=production
```

### NPM Scripts (package.json)
```json
{
  "scripts": {
    "dev": "next dev",                    # Start dev server (localhost:3000)
    "build": "next build",                # Build for production
    "start": "next start",                # Start production server
    "lint": "next lint"                   # Run ESLint
  }
}
```

## 🛠️ Technology Decisions

### Why Next.js?
- ✅ Full-stack framework (frontend + backend)
- ✅ App Router for modern patterns
- ✅ Built-in API routes
- ✅ Automatic code splitting
- ✅ Great developer experience

### Why RTK Query instead of Axios?
- ✅ Automatic caching
- ✅ Automatic request deduplication
- ✅ Tag-based invalidation
- ✅ Built-in loading/error states
- ✅ No boilerplate code needed

### Why MongoDB?
- ✅ Document-based (flexible schema)
- ✅ Easy setup (especially MongoDB Atlas)
- ✅ Great for rapid development
- ✅ Scales well
- ✅ Good driver support in Node.js

### Why Tailwind CSS?
- ✅ Utility-first (no naming conflicts)
- ✅ Responsive by default
- ✅ Small bundle size
- ✅ Easy to customize
- ✅ Great IDE support

## 🧪 Testing API Endpoints

### Using Postman (Recommended)
1. Download Postman
2. Create new collection "Student API"
3. Add requests:
   - GET http://localhost:3000/api/students
   - POST http://localhost:3000/api/students (with JSON body)
   - PUT http://localhost:3000/api/students/:id (with JSON body)
   - DELETE http://localhost:3000/api/students/:id

### Using cURL (Command Line)
```bash
# Get all students
curl http://localhost:3000/api/students

# Create student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"123","rollNumber":"R1","grade":"10"}'

# Update student (replace ID)
curl -X PUT http://localhost:3000/api/students/STUDENT_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","email":"updated@example.com","phone":"456","rollNumber":"R2","grade":"11"}'

# Delete student
curl -X DELETE http://localhost:3000/api/students/STUDENT_ID
```

## 📈 Performance Optimization

Current optimizations:
- ✅ RTK Query caching prevents duplicate requests
- ✅ Tag invalidation keeps data fresh
- ✅ Tailwind CSS purging removes unused styles
- ✅ Next.js automatic code splitting

Future improvements:
- [ ] Add pagination to student list
- [ ] Implement search/filter
- [ ] Add pagination to API endpoints
- [ ] Compress database indexes
- [ ] Add CDN for static assets
- [ ] Implement lazy loading for images

## 🐛 Debug Tips

1. **Browser DevTools (F12)**
   - Network tab: See API requests/responses
   - Console tab: Check for errors
   - Redux DevTools (if installed): See state changes

2. **Terminal Logs**
   - npm run dev shows compilation errors
   - Check for MongoDB connection errors

3. **VS Code Debugging**
   - Set breakpoints in API routes
   - Use VS Code debugger (F5)

## 🔗 Important Links

- [Next.js Docs](https://nextjs.org/docs)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [RTK Query Docs](https://redux-toolkit.js.org/rtk-query/overview)
- [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Last Updated:** November 27, 2025
