import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xmhuyyywfkjbvtrhmrla.supabase.co'      // Thay bằng URL của bạn
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtaHV5eXl3ZmtqYnZ0cmhtcmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MjU2NzYsImV4cCI6MjA2MzMwMTY3Nn0.5xaXTscYUXvgXKpY9ZexA3I9e2IfzZ6F4T594ZnaRLQ' // Thay bằng anon key của bạn

export const supabase = createClient(supabaseUrl, supabaseKey)
