
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

  console.log('Checking services...');
  const { data: servs, error: es } = await supabase.from('services').select('id, name');
  console.log('Services:', servs?.length || 0, es ? es.message : 'OK');
  
  if (facs?.length === 0 && deps?.length === 0 && servs?.length === 0) {
    console.log('DATABASE IS EMPTY or RLS IS DENYING ACCESS');
  }
}

checkData();
