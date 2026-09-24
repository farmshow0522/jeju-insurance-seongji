import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Supabase 환경변수가 채워져 있으면 true. 없으면 seed fallback을 씁니다. */
export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}

/** 공개 페이지 읽기용 (anon 키 + RLS). */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

/** 서버 전용 쓰기/관리용 (service role 키). 절대 클라이언트로 노출 금지. */
export function getServiceSupabase(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
