import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('next-school');
    
    const student = await db.collection('students').findOne({
      _id: new ObjectId(id),
    });

    if (!student) {
      return Response.json({ error: 'Student not found' }, { status: 404 });
    }

    return Response.json(student, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('next-school');
    const body = await request.json();

    const result = await db.collection('students').findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    console.log({result});
    

    if (!result) {
      return Response.json({ error: 'Student not found' }, { status: 404 });
    }

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error('Failed to update student:', error);
    return Response.json({ error: error.message || 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('next-school');

    const result = await db.collection('students').deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return Response.json({ error: 'Student not found' }, { status: 404 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
