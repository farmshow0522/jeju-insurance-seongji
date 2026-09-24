// 데이터 접근 계층.
// Supabase가 설정돼 있으면 DB에서 읽고, 아니면 로컬 seed로 fallback합니다.
// (로컬 미리보기를 위해 — 실제 운영에서는 항상 DB에서 읽습니다.)

import { getSupabase, isSupabaseConfigured } from "./supabase";
import { SEED_GUIDES, SEED_BASICS, SEED_CASES, SEED_QNA } from "./seed";
import type { Guide, Basic, Case, GuideCategory, QnaItem } from "./types";

// ── 가이드 ──────────────────────────────────────────

export async function getGuides(category?: GuideCategory): Promise<Guide[]> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()!;
    let q = sb.from("guides").select("*").eq("is_public", true).order("updated_at", { ascending: false });
    if (category) q = q.eq("category", category);
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as Guide[];
  }
  const rows = SEED_GUIDES.filter((g) => g.is_public);
  return category ? rows.filter((g) => g.category === category) : rows;
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("guides")
      .select("*")
      .eq("slug", slug)
      .eq("is_public", true)
      .maybeSingle();
    if (error) throw error;
    return (data as Guide) ?? null;
  }
  return SEED_GUIDES.find((g) => g.slug === slug && g.is_public) ?? null;
}

export async function getTopGuides(limit = 6): Promise<Guide[]> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("guides")
      .select("*")
      .eq("is_public", true)
      .order("view_count", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []) as Guide[];
  }
  return SEED_GUIDES.filter((g) => g.is_public).slice(0, limit);
}

export async function searchGuides(query: string): Promise<Guide[]> {
  const all = await getGuides();
  const q = query.trim().toLowerCase();
  if (!q) return all;
  return all.filter(
    (g) => g.title.toLowerCase().includes(q) || g.one_line.toLowerCase().includes(q),
  );
}

/** 조회수 +1 (DB 연결 시에만). 실패해도 페이지에 영향 주지 않음. */
export async function incrementGuideView(slug: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const sb = getSupabase()!;
  try {
    await sb.rpc("increment_guide_view", { guide_slug: slug });
  } catch {
    // 조회수 집계 실패는 조용히 무시
  }
}

// ── 기준 정리 ────────────────────────────────────────

export async function getBasics(): Promise<Basic[]> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("basics")
      .select("*")
      .eq("is_public", true)
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Basic[];
  }
  return SEED_BASICS.filter((b) => b.is_public);
}

export async function getBasicBySlug(slug: string): Promise<Basic | null> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("basics")
      .select("*")
      .eq("slug", slug)
      .eq("is_public", true)
      .maybeSingle();
    if (error) throw error;
    return (data as Basic) ?? null;
  }
  return SEED_BASICS.find((b) => b.slug === slug && b.is_public) ?? null;
}

// ── 사례 ────────────────────────────────────────────

export async function getCases(): Promise<Case[]> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("cases")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Case[];
  }
  return SEED_CASES.filter((c) => c.is_public);
}

// ── QnA (질문+답변) ─────────────────────────────────

/** 특정 가이드에 연결된 공개 질문 (가이드 상세 하단 "이 가이드에서 나온 질문"). */
export async function getPublicQnaByGuide(guideId: string, limit = 3): Promise<QnaItem[]> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("questions")
      .select("*, answer:answers(*)")
      .eq("is_public", true)
      .eq("guide_id", guideId)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []).map((row: Record<string, unknown>) => ({
      ...(row as object),
      answer: Array.isArray(row.answer) ? row.answer[0] ?? null : row.answer ?? null,
    })) as QnaItem[];
  }
  return SEED_QNA.filter((q) => q.guide_id === guideId).slice(0, limit);
}

export async function getCaseBySlug(slug: string): Promise<Case | null> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("cases")
      .select("*")
      .eq("slug", slug)
      .eq("is_public", true)
      .maybeSingle();
    if (error) throw error;
    return (data as Case) ?? null;
  }
  return SEED_CASES.find((c) => c.slug === slug && c.is_public) ?? null;
}
