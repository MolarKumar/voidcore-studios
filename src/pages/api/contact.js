/* src/pages/api/contact.js */
export const prerender = false;
import { supabase } from '../../lib/supabase';

export async function POST({ request }) {
  try {
    const data = await request.json();
    
    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message
        }
      ]);

    if (error) {
      console.error("Database Insert Error:", error);
      return new Response(JSON.stringify({ error: "Database error." }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server processing failed." }), { status: 500 });
  }
}