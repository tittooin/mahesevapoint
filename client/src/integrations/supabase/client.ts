import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ecmgzqteuohwearfdvnn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbWd6cXRldW9od2VhcmZkdm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NDkyOTgsImV4cCI6MjA2OTQyNTI5OH0.dP7Jo6JJ1O6lSuafU9hBBSnXnlqtrqjsLgnd-QxGjJQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);