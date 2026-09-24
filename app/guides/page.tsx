import Link from "next/link";
import type { Metadata } from "next";
import { getGuides, searchGuides } from "@/lib/db";
import { GUIDE_CATEGORIES, type GuideCategory } from "@/lib/types";
import GuideCard from "@/components/GuideCard";

export const metadata: Metadata = {
  title: "청구 가이드",
  description: "어느 회사 보험이든 청구·가입 방법을 근거와 함께 정리했어요.",
};

const TABS = ["전체", ...GUIDE_CATEGORIES] as const;

function isCategory(v: string | undefined): v is GuideCategory {
  return !!v && (GUIDE_CATEGORIES as readonly string[]).includes(v);
}

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const activeCat = isCategory(category) ? category : undefined;
  const query = (q ?? "").trim();

  const guides = query
    ? (await searchGuides(query)).filter((g) => !activeCat || g.category === activeCat)
    : await getGuides(activeCat);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-basalt">청구 가이드</h1>
          <p className="mt-1 text-sm text-muted">
            어느 회사 보험이든 · 근거 있는 답 · 헷갈리면 여기서 확인
          </p>
        </div>
        <Link
          href="/guides/index"
          className="rounded-md border border-line bg-paper px-3 py-2 text-sm font-medium text-basalt hover:border-tangerine"
        >
          가이드 목차 보기
        </Link>
      </div>

      {/* 카테고리 탭 */}
      <nav className="mt-6 flex gap-2 overflow-x-auto whitespace-nowrap pb-1">
        {TABS.map((tab) => {
          const isActive =
            tab === "전체" ? !activeCat : activeCat === tab;
          const href =
            tab === "전체"
              ? "/guides"
              : `/guides?category=${encodeURIComponent(tab)}`;
          return (
            <Link
              key={tab}
              href={href}
              className={
                "rounded-full px-3.5 py-1.5 text-sm transition-colors " +
                (isActive
                  ? "bg-basalt text-sand"
                  : "bg-paper text-muted hover:text-ink border border-line")
              }
            >
              {tab}
            </Link>
          );
        })}
      </nav>

      {/* 검색 */}
      <form action="/guides" method="get" className="mt-4 flex gap-2">
        {activeCat && <input type="hidden" name="category" value={activeCat} />}
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="가이드 검색 (예: 도수치료, 입원, 거절)"
          className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-tangerine"
        />
        <button
          type="submit"
          className="rounded-md bg-basalt px-4 py-2 text-sm font-medium text-sand hover:bg-black"
        >
          검색
        </button>
      </form>

      {/* 결과 */}
      {guides.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-line bg-paper px-5 py-10 text-center text-sm text-muted">
          {query
            ? "찾는 내용이 없네요. 물어보기에 남겨주시면 여기에 정리해둘게요."
            : "아직 올라온 가이드가 없어요. 곧 채워둘게요."}
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <GuideCard key={g.id} guide={g} />
          ))}
        </div>
      )}
    </div>
  );
}
