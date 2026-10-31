import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      user: {
        id: 'user_' + Date.now(),
        username: body.username || 'harshith',
        email: body.email,
        name: body.name,
        created_at: new Date().toISOString()
      },
      token: 'jwt_edge_session_' + Math.random().toString(36).substring(2)
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
