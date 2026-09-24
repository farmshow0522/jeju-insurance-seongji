import Link from "next/link";
import type { Metadata } from "next";
import { getGuides } from "@/lib/db";
import { GUIDE_CATEGORIES } from "@/lib/types";

export const metadata: Metadata = {
  title: "가이드 목차",
  description: "전체 청구 가이드를 카테고리별로 한 화면에 모았어요.",
};

export default async function GuideIndexPage() {
  const guides = await getGuides();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl text-basalt">가이드 목차</h1>
      <p className="mt-1 text-sm text-muted">
        전체 청구 가이드를 카테고리별로 모았어요.
      </p>

      <div className="mt-8 space-y-8">
        {GUIDE_CATEGORIES.map((cat) => {
          const list = guides.filter((g) => g.category === cat);
          return (
            <section key={cat}>
              <h2 className="font-display text-lg text-basalt">
                <span className="border-b-2 border-tangerine pb-1">{cat}</span>
              </h2>
              {list.length === 0 ? (
                <p className="mt-3 text-sm text-muted/70">아직 준비 중이에요.</p>
              ) : (
                <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-paper">
                  {list.map((g) => (
                    <li key={g.id}>
                      <Link
                        href={`/guides/${g.slug}`}
                        className="block px-4 py-3 text-sm text-ink hover:bg-sand-deep"
                      >
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-10">
        <Link href="/guides" className="text-sm font-medium text-tangerine-dark hover:underline">
          ← 가이드 목록으로
        </Link>
      </div>
    </div>
  );
}
