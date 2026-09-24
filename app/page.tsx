import Link from "next/link";
import { getTopGuides } from "@/lib/db";
import { SITE } from "@/lib/site";
import GuideCard from "@/components/GuideCard";

export default async function Home() {
  const topGuides = await getTopGuides(6);

  return (
    <div>
      {/* 히어로 */}
      <section className="bg-basalt text-sand">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="font-display text-3xl leading-tight sm:text-4xl">{SITE.headline}</h1>
          <p className="mt-3 text-sand/80">{SITE.subhead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/guides"
              className="rounded-md bg-tangerine px-5 py-2.5 font-semibold text-basalt hover:bg-tangerine-dark hover:text-white"
            >
              청구 가이드 보기
            </Link>
            <Link
              href="/ask"
              className="rounded-md border border-sand/40 px-5 py-2.5 font-semibold text-sand hover:bg-white/10"
            >
              물어보기
            </Link>
          </div>
          <p className="mt-5 text-sm text-sand/60">
            가입 권유는 없어요. 정확히 보고 싶으면 그때 말씀하시면 됩니다.
          </p>
        </div>
      </section>

      {/* 자주 찾는 가이드 */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-display text-xl text-basalt">자주 찾는 가이드</h2>
        {topGuides.length === 0 ? (
          <p className="mt-4 text-sm text-muted">아직 올라온 가이드가 없어요. 곧 채워둘게요.</p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topGuides.map((g) => (
              <GuideCard key={g.id} guide={g} />
            ))}
          </div>
        )}
        <p className="mt-6 text-sm text-muted/70">
          * 최근 답변 · 성지 지기 소개 섹션은 다음 단계에서 채워요.
        </p>
      </section>
    </div>
  );
}
