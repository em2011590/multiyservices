import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      passwordHash,
      createdAt: new Date(),
    });

    await newUser.save();

    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
