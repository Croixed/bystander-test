import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("trees").select('*') // .eq("id", 3);
  // const { data: info } = await supabase.from('info').select('*').eq('id', session.user.id)
  return {
    trees: data ?? [],
    // info
  };
}