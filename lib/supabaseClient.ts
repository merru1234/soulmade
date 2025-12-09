import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uncfrlinmfbkngscfnkw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuY2ZybGlubWZia25nc2Nmbmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5ODE1MDAsImV4cCI6MjA3OTU1NzUwMH0.mqpq0DGFDIySydFWQbFPJ0O8aYOKq9kGtaGmpmTPHtw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
