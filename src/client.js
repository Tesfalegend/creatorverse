import { createClient } from '@supabase/supabase-js';
const URL = 'https://niiklwitnagubostidqb.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5paWtsd2l0bmFndWJvc3RpZHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MzY3NTAsImV4cCI6MjA4NTIxMjc1MH0.px68J-r9kLa7gH7vXGm62OviRU5dNVbFyZ6g8vnRO18';
export const supabase = createClient(URL, API_KEY);