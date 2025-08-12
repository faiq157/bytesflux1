// src/app/blog/api/create/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '../../utils/supabaseClient';
import { slugify } from '../../utils/slugify';


// POST - create new category
export async function POST(req: Request) {
  const body = await req.json();
  const slug = slugify(body.name);
  const payload = { ...body, slug };

  const { data, error } = await supabase
    .from('blog_categories')
    .insert([payload])
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ category: data });
}

// GET - fetch all categories
export async function GET() {
  console.log('GET function was called!');
  const { data, error } = await supabase.from('blog_categories').select('*');

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}
// DELETE - delete category by ID (note: ID must come via query param or fix param handling)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  const { error } = await supabase.from('blog_categories').delete().eq('id', id);

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ message: 'Category deleted successfully' });
}
