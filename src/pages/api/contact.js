export const prerender = false; // CRITICAL: Forces Netlify to deploy this as a live serverless function

import { supabaseAdmin } from '../../lib/supabase';

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const type = formData.get('type') || 'general'; // Detects 'report', 'job_application', or 'contact'

    // Gather any dynamic secondary fields (like portfolio links, resumes, or bug categories)
    const metadata = {};
    for (const [key, value] of formData.entries()) {
      if (!['name', 'email', 'message', 'type'].includes(key)) {
        metadata[key] = value;
      }
    }

    // Insert data into your master Supabase table
    const { data, error } = await supabaseAdmin
      .from('submissions') // Ensure this matches your exact table name in Supabase
      .insert([
        {
          name,
          email,
          message,
          type,
          metadata: Object.keys(metadata).length > 0 ? metadata : null,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, message: 'Submission saved successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Submission API Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}