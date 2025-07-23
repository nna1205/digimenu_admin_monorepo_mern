import { createClient } from '@supabase/supabase-js'

const supabaseClient = createClient("https://qrupimnxoochpfjdumwk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXBpbW54b29jaHBmamR1bXdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODYwOTM2OSwiZXhwIjoyMDM0MTg1MzY5fQ.ojJGrqiWjeZSh3wvLgMcM7TM21ItxoSGV7V-wmCQTZI");

export default supabaseClient