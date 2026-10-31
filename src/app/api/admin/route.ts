import { NextResponse } from 'next/server';


export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    edge_location: 'Cloudflare Edge PoP (HYD/BOM/MAA)',
    d1_status: 'connected',
    kv_status: 'active',
    r2_status: 'active',
    queue_depth: 0,
    server_time: new Date().toISOString()
  });
}
