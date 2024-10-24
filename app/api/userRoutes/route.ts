import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function POST(req: Request) {
    const client = await connectToDatabase();

    const { id, name, email } = await req.json();

    try {
        const result = await client.query(
            'INSERT INTO users (id, name, email) VALUES ($1, $2, $3)',
            [id, name, email]
        );
        const newUser = result.rows[0];
        return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Insert error', error.message);
            return NextResponse.json({ message: 'Error saving data' }, { status: 500 });
        }
        return NextResponse.json({ message: 'Unexpected error' }, { status: 500 });
    } finally {
        client.release(); // Close the connection
    }
}

export async function GET() {
  const client = await connectToDatabase();

  try {
      const result = await client.query('SELECT * FROM users');
      return NextResponse.json(result.rows);
  } catch (error) {
      console.error('Fetch error', error);
      return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  } finally {
      client.release();
  }
}