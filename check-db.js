
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log('Checking faculties...');
  const { data: facs, error: ef } = await supabase.from('faculties').select('id, name');
  console.log('Faculties:', facs?.length || 0, ef ? ef.message : 'OK');

  console.log('Checking departments...');
  const { data: deps, error: ed } = await supabase.from('departments').select('id, name');
  console.log('Departments:', deps?.length || 0, ed ? ed.message : 'OK');

  console.log('Checking tickets table existence...');
  const { data: tix, error: et } = await supabase.from('tickets').select('id').limit(1);
  console.log('Tickets:', tix ? 'Exists' : 'NOT FOUND', et ? et.message : 'OK');

  console.log('Checking grades and relations...');
  const { data: grs, error: eg } = await supabase.from('grades').select('id, course_id').limit(1);
  console.log('Grades:', grs ? 'Exists' : 'NOT FOUND', eg ? eg.message : 'OK');

  console.log('Checking profiles columns...');
  const { data: prof, error: ep } = await supabase.from('profiles').select('full_name, student_id, department, nom, matricule').limit(1);
  console.log('Profiles columns test:', prof ? 'OK' : 'FAILED', ep ? ep.message : 'OK');
  
  if (facs?.length === 0 && deps?.length === 0 && !tix) {
    console.log('DATABASE IS EMPTY or RLS IS DENYING ACCESS');
  }
}

checkData();
