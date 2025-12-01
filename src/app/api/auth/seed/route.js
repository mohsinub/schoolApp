import bcrypt from 'bcrypt';
import { clientPromise } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('next-school');
    const usersCollection = db.collection('users');

    // Check if users already exist
    const existingAdminCount = await usersCollection.countDocuments({ email: 'admin@school.com' });
    const existingTeacherCount = await usersCollection.countDocuments({ email: 'teacher@school.com' });

    if (existingAdminCount > 0 && existingTeacherCount > 0) {
      return Response.json(
        { message: 'Test users already exist' },
        { status: 200 }
      );
    }

    // Hash passwords
    const adminPasswordHash = await bcrypt.hash('admin', 10);
    const teacherPasswordHash = await bcrypt.hash('teacher', 10);

    // Delete existing users if any
    await usersCollection.deleteMany({
      email: { $in: ['admin@school.com', 'teacher@school.com'] }
    });

    // Create admin user
    const adminUser = {
      email: 'admin@school.com',
      passwordHash: adminPasswordHash,
      name: 'Admin User',
      role: 'admin',
      teacherClasses: [],
      createdAt: new Date(),
    };

    // Create teacher user
    const teacherUser = {
      email: 'teacher@school.com',
      passwordHash: teacherPasswordHash,
      name: 'Teacher User',
      role: 'teacher',
      teacherClasses: ['KG1', 'KG2', 'Grade 1', 'Grade 2'],
      createdAt: new Date(),
    };

    const result = await usersCollection.insertMany([adminUser, teacherUser]);

    return Response.json(
      {
        success: true,
        message: 'Test users created successfully',
        userIds: result.insertedIds,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json(
      { error: 'Failed to seed users: ' + error.message },
      { status: 500 }
    );
  }
}
