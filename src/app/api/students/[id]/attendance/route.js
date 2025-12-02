import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { id: studentId } = await params;  // ← Route param is 'id', rename to 'studentId'
    console.log('🔍 [GET] Raw params received:', { studentId, type: typeof studentId });
    
    // Ensure studentId is a valid ObjectId string
    if (!studentId) {
      console.error('❌ [GET] No studentId in params');
      return Response.json({ error: 'Student ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('next-school');
    const attendanceCollection = db.collection('attendance');

    // Log the query being performed
    console.log('🔍 [GET] Querying attendance for studentId:', studentId);

    const records = await attendanceCollection
      .find({ studentId: new ObjectId(studentId) })
      .sort({ date: -1 })
      .toArray();

    console.log('✅ [GET] Found records:', records.length);
    return Response.json({ success: true, records }, { status: 200 });
  } catch (error) {
    console.error('🚨 [GET] Error fetching attendance:', error);
    return Response.json({ error: 'Failed to fetch attendance: ' + error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { id: studentId } = await params;  // ← Route param is 'id', rename to 'studentId'
    const { date, status } = await request.json();

    console.log('📝 [POST] Marking attendance:', { studentId, date, status });

    if (!date || !status) {
      return Response.json({ error: 'Date and status are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('next-school');
    const attendanceCollection = db.collection('attendance');

    // Parse date and create a date range for comparison (midnight to midnight)
    const dateObj = new Date(date);
    const startOfDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    const endOfDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1);

    console.log('📝 [POST] Date range:', { startOfDay, endOfDay });

    // Check if attendance already exists for this date
    const existing = await attendanceCollection.findOne({
      studentId: new ObjectId(studentId),
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    if (existing) {
      // Update existing
      console.log('📝 [POST] Updating existing attendance record');
      const result = await attendanceCollection.updateOne(
        { _id: existing._id },
        { $set: { status, updatedAt: new Date() } }
      );
      return Response.json(
        { success: true, message: 'Attendance updated', recordId: existing._id },
        { status: 200 }
      );
    } else {
      // Create new
      console.log('📝 [POST] Creating new attendance record');
      const result = await attendanceCollection.insertOne({
        studentId: new ObjectId(studentId),
        date: startOfDay,
        status,
        createdAt: new Date(),
      });

      console.log('📝 [POST] Record created with ID:', result.insertedId);
      return Response.json(
        { success: true, message: 'Attendance recorded', recordId: result.insertedId },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('🚨 [POST] Error recording attendance:', error);
    return Response.json({ error: 'Failed to record attendance: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: studentId } = await params;  // ← Route param is 'id', rename to 'studentId'
    const { attendanceId } = await request.json();

    const client = await clientPromise;
    const db = client.db('next-school');
    const attendanceCollection = db.collection('attendance');

    const result = await attendanceCollection.deleteOne({
      _id: new ObjectId(attendanceId),
      studentId: new ObjectId(studentId),
    });

    if (result.deletedCount === 0) {
      return Response.json({ error: 'Attendance record not found' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Attendance deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting attendance:', error);
    return Response.json({ error: 'Failed to delete attendance' }, { status: 500 });
  }
}
