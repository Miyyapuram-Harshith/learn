import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      current_streak: (body.current_streak || 15) + 1,
      freeze_consumed: false,
      xp_bonus: 25,
      mascot_quote: 'Another day, another streak extended! Keep lighting up that heatmap.'
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
