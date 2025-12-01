import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { studentId } = await params;

    const client = await clientPromise;
    const db = client.db('next-school');
    const attendanceCollection = db.collection('attendance');

    const records = await attendanceCollection
      .find({ studentId: new ObjectId(studentId) })
      .sort({ date: -1 })
      .toArray();

    return Response.json({ success: true, records }, { status: 200 });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return Response.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { studentId } = await params;
    const { date, status } = await request.json();

    if (!date || !status) {
      return Response.json({ error: 'Date and status are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('next-school');
    const attendanceCollection = db.collection('attendance');

    // Check if attendance already exists for this date
    const existing = await attendanceCollection.findOne({
      studentId: new ObjectId(studentId),
      date: new Date(date),
    });

    if (existing) {
      // Update existing
      const result = await attendanceCollection.updateOne(
        { _id: existing._id },
        { $set: { status, updatedAt: new Date() } }
      );
      return Response.json(
        { success: true, message: 'Attendance updated', record: result },
        { status: 200 }
      );
    } else {
      // Create new
      const result = await attendanceCollection.insertOne({
        studentId: new ObjectId(studentId),
        date: new Date(date),
        status,
        createdAt: new Date(),
      });

      return Response.json(
        { success: true, message: 'Attendance recorded', recordId: result.insertedId },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error recording attendance:', error);
    return Response.json({ error: 'Failed to record attendance' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { studentId } = await params;
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
