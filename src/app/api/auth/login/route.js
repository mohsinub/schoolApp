import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('next-school');
    const usersCollection = db.collection('users');

    // Find user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('valid');
    
    // Return user data (excluding password hash)
    const userData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      teacherClasses: user.teacherClasses || [],
    };

    return Response.json({ success: true, user: userData }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
