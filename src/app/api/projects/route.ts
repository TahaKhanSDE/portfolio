import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Project from '@/lib/db/models/Project';

// Initial fallback projects when database is offline
const FALLBACK_PROJECTS = [
  {
    _id: 'fallback-naadan',
    title: 'Naadan Cloud Kitchen & KDS',
    slug: 'naadan-kds',
    category: 'production',
    description:
      'Real-time cloud kitchen order dispatch and Kitchen Display System with sub-150ms websocket updates, zero dropouts, and PostgreSQL concurrency control.',
    tags: ['Next.js', 'PostgreSQL', 'WebSockets', 'Render', 'Vercel'],
    isSpotlight: true,
    order: 1,
  },
  {
    _id: 'fallback-refnet',
    title: 'Job Referral Network System (RefNet)',
    slug: 'refnet',
    category: 'distributed',
    description:
      'Distributed job referral coordination network utilizing Redis caching, PostgreSQL indexing, and containerized microservice design.',
    tags: ['Node.js', 'Express', 'Redis', 'PostgreSQL', 'Docker'],
    isSpotlight: true,
    order: 2,
  },
  {
    _id: 'fallback-thealgorithms',
    title: 'TheAlgorithms / TypeScript',
    slug: 'the-algorithms-ts',
    category: 'opensource',
    description:
      'Open-source implementations of asynchronous Semaphore concurrency primitives, vitest suites, and LRU cache structures.',
    tags: ['TypeScript', 'Concurrency', 'Async/Await', 'Data Structures'],
    isSpotlight: true,
    order: 3,
  },
];

// In-memory project cache for live session updates when running without DB
let inMemoryProjects = [...FALLBACK_PROJECTS];

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const dbProjects = await Project.find({}).sort({ order: 1, createdAt: -1 });
      if (dbProjects.length > 0) {
        return NextResponse.json(dbProjects, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
        });
      }
    }
  } catch (error) {
    console.warn('[Projects API] Database read failed, using fallback memory:', error);
  }

  return NextResponse.json(inMemoryProjects);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const db = await connectToDatabase();

    if (db) {
      const project = await Project.create(data);
      return NextResponse.json(project, { status: 201 });
    }

    // Fallback store in memory
    const localProject = {
      _id: 'local-' + Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    inMemoryProjects.unshift(localProject);
    return NextResponse.json(localProject, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}