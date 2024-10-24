import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

// CORS headers function
const corsHeaders = (req: Request) => {
    const headers: Record<string, string> = {
        'Access-Control-Allow-Origin': '*', // Allow any origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    return headers;
};

export async function POST(req: Request) {
    const headers = corsHeaders(req);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers,
        });
    }

    const client = await connectToDatabase();
    const { id, name, email } = await req.json();

    try {
        const result = await client.query(
            'INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *',
            [id, name, email]
        );
        const newUser = result.rows[0];
        return NextResponse.json({ message: 'User created', user: newUser }, { status: 201, headers });
    } catch (error: unknown) {
        console.error('Insert error', error);
        return NextResponse.json({ message: 'Error saving data' }, { status: 500, headers });
    } finally {
        client.release(); // Close the connection
    }
}

export async function GET(req: Request) {
    const headers = corsHeaders(req);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers,
        });
    }

    const client = await connectToDatabase();

    try {
        const result = await client.query('SELECT * FROM users');
        return NextResponse.json(result.rows, { headers });
    } catch (error) {
        console.error('Fetch error', error);
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500, headers });
    } finally {
        client.release(); // Close the connection
    }
}