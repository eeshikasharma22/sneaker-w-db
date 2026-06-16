import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ifukmdojgtajayfxijwq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdWttZG9qZ3RhamF5ZnhpandxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTMzNzI3NSwiZXhwIjoyMDk2OTEzMjc1fQ.cp_Wz2g-UtlRF6zQqO8AYvBToNUTq15JlaW9nHOnjms";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);