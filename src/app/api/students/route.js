import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('next-school');
    const students = await db.collection('students').find({}).toArray();
    
    return Response.json(students, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('next-school');
    const body = await request.json();
    const { _id, ...bodyWithoutId } = body;
    
    const result = await db.collection('students').insertOne({
      ...bodyWithoutId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Response.json(
      { _id: result.insertedId, ...bodyWithoutId },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
