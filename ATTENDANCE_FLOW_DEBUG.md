# Attendance Flow Debugging Guide

## The Complete Flow

```
StudentDetailModal (has student._id)
         ↓
    passes student._id as prop
         ↓
AttendanceTracker receives studentId
         ↓
    calls fetch(`/api/students/${studentId}/attendance`)
         ↓
API Route receives params.studentId
         ↓
Query MongoDB with new ObjectId(studentId)
         ↓
Return records or error
```

## Debug Checklist

### Step 1: Check StudentDetailModal Logs
Open browser console (F12 → Console tab) and look for:
```
🎓 [StudentDetailModal] Student loaded: { 
  id: '...',  ← This should be a MongoDB ObjectId string like '67abc123...'
  idType: 'string' or 'object',  ← Should be 'string'
  idString: '67abc123...',  ← The stringified version
  name: 'John', 
  grade: '10' 
}
```

**Problem if you see:**
- `id: undefined` → Student object not being passed correctly
- `idType: 'object'` → ObjectId is an object, needs to be stringified

### Step 2: Check AttendanceTracker Logs
Look for:
```
📋 [AttendanceTracker] Fetching attendance for studentId: 67abc123... { type: 'string' }
🌐 [AttendanceTracker] Calling URL: /api/students/67abc123.../attendance
📡 [AttendanceTracker] API Response status: 200
📦 [AttendanceTracker] API Response data: { success: true, records: [...] }
✅ [AttendanceTracker] Successfully fetched records: [...]
📊 [AttendanceTracker] Setting attendance state to array of length: 3
```

**Problem if you see:**
- No logs appear → Component not mounted or studentId not passed
- `type: 'object'` → Need to convert to string in StudentDetailModal
- `API Response status: 404` → Route not found, check studentId format
- `API Response status: 500` → Server error, check server logs

### Step 3: Check API Server Logs (Terminal)
Look in the terminal running `npm run dev` for:
```
🔍 [GET] Raw params received: { studentId: '67abc123...', type: 'string' }
🔍 [GET] Querying attendance for studentId: 67abc123...
✅ [GET] Found records: 3
```

**Problem if you see:**
- `studentId: undefined` → Next.js not receiving the route param
- `Found records: 0` → Query executed but no matching documents in MongoDB

## Common Issues & Solutions

### Issue 1: studentId is undefined in route.js

**Symptom:** API logs show `studentId: undefined`

**Cause:** The route parameter name might be wrong

**Solution:** 
1. Route file is at: `/api/students/[id]/attendance/route.js`
2. But we're destructuring `{ studentId }` 
3. **Should be `{ id }` instead!**

**Fix:**
```javascript
export async function GET(request, { params }) {
  const { id } = await params;  // ← Change from 'studentId' to 'id'
  console.log('studentId:', id);
```

### Issue 2: studentId is an object instead of string

**Symptom:** `idType: 'object'` in StudentDetailModal logs

**Cause:** MongoDB ObjectId is being passed as an object

**Solution:** Convert to string when passing:
```javascript
// In StudentDetailModal
<AttendanceTracker 
  studentId={String(student._id)}  // ← Convert to string
  studentName={student.name} 
/>
```

### Issue 3: No records showing despite saving to DB

**Symptom:** Logs show `Found records: 0` but data exists in MongoDB

**Cause:** Date format or ObjectId mismatch

**Solution:** 
1. Check date is being stored as Date object in MongoDB
2. Verify studentId type matches between POST and GET
3. Run MongoDB query manually to verify:
```javascript
db.attendance.find({ studentId: ObjectId('67abc123...') })
```

### Issue 4: GET returns 404

**Symptom:** `API Response status: 404`

**Cause:** Route doesn't exist or URL is malformed

**Solution:**
1. Check URL format: `/api/students/[studentId]/attendance`
2. Verify the [id] directory name matches route file expectations
3. Ensure `await params` is being used (Next.js 15+)

## Testing Steps

### 1. Manual Test
```javascript
// Open browser console and run:
fetch('/api/students/67abc123.../attendance')
  .then(r => r.json())
  .then(console.log)
```

### 2. Check MongoDB
```javascript
// In MongoDB client:
use next-school
db.attendance.find().pretty()
db.students.find().project({ _id: 1, name: 1 }).limit(1).pretty()
```

### 3. Full Flow Test
1. Go to Students page
2. Click Details on a student
3. Go to Attendance tab
4. Open F12 Console
5. Watch for all the logs above
6. Mark new attendance
7. Check if it refreshes

## Expected Console Output

### First Load (when clicking Attendance tab):
```
🎓 [StudentDetailModal] Student loaded: { id: '67...', idType: 'string', idString: '67...', name: 'John', grade: '10' }
📋 [AttendanceTracker] Fetching attendance for studentId: 67... { type: 'string' }
🌐 [AttendanceTracker] Calling URL: /api/students/67.../attendance
📡 [AttendanceTracker] API Response status: 200
📦 [AttendanceTracker] API Response data: { success: true, records: [...] }
✅ [AttendanceTracker] Successfully fetched records: [...]
📊 [AttendanceTracker] Setting attendance state to array of length: 0 (or N)
```

### Server Logs (from terminal running npm run dev):
```
🔍 [GET] Raw params received: { studentId: '67...', type: 'string' }
🔍 [GET] Querying attendance for studentId: 67...
✅ [GET] Found records: 0 (or N)
```

## Next Action

1. Open browser console (F12)
2. Click Details on a student
3. Go to Attendance tab
4. **Screenshot the console logs** and share what you see
5. I'll diagnose the exact issue based on the logs
