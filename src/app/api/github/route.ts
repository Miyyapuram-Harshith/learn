import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      enqueued: true,
      queue_name: 'articlarity-github-commits',
      commit_sha: 'a1b2c3d4e5f67890abcdef1234567890abcdef12',
      commit_url: `https://github.com/${body.github_username || 'Miyyapuram-Harshith'}/${body.repo_name || 'articlarity-dsa-solutions'}/commit/a1b2c3d`,
      files_committed: [
        `/${body.unit_slug || 'arrays-and-hashing'}/${body.problem_slug || 'two-sum'}/solution.py`,
        `/${body.unit_slug || 'arrays-and-hashing'}/${body.problem_slug || 'two-sum'}/NOTES.md`,
        '/README.md'
      ]
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Queue error' }, { status: 400 });
  }
}
