import { createClient } from "@supabase/supabase-js";

let supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprYml3cm1ycndheXdjaWVpZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxNDMwNzMsImV4cCI6MjAwODcxOTA3M30.1bf9IgjQ2puhcmj4dnHznJo5RF0jsexhRbL7f5Dc9FQ'

export const supabase = createClient('https://zkbiwrmrrwaywcieifbs.supabase.co', supabaseKey)