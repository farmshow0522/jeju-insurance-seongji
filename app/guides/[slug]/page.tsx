import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuideBySlug, getPublicQnaByGuide } from "@/lib/db";
import { formatMonth } from "@/lib/format";
import { SITE } from "@/lib/site";
import Markdown from "@/components/Markdown";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return { title: "가이드를 찾을 수 없어요" };
  return {
    title: guide.title,
    description: guide.one_line,
    openGraph: {
      title: `${guide.title} · ${SITE.name} — ${SITE.slogan}`,
      description: guide.one_line,
      type: "article",
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedQna = await getPublicQnaByGuide(guide.id, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.one_line,
    dateModified: guide.updated_at,
    author: { "@type": "Person", name: SITE.keeper.name },
    publisher: { "@type": "Organization", name: `${SITE.name} — ${SITE.slogan}` },
  };

  return (
    <article className="mx-auto max-w-content px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 헤더 */}
      <div className="flex items-center gap-2 text-xs text-muted">
        <Link href="/guides" className="hover:text-ink">
          청구 가이드
        </Link>
        <span>·</span>
        <span>{guide.category}</span>
      </div>
      <h1 className="mt-2 font-display text-2xl leading-snug text-basalt">{guide.title}</h1>
      <p className="mt-1 text-xs text-muted/70">{formatMonth(guide.updated_at)}</p>

      {/* 한 줄 결론 */}
      <div className="mt-6 rounded-xl border-l-4 border-tangerine bg-paper px-5 py-4">
        <div className="text-xs font-semibold text-tangerine-dark">한 줄 결론</div>
        <p className="mt-1 font-medium text-basalt">{guide.one_line}</p>
      </div>

      {/* 회사별 청구 채널 표 */}
      <section className="mt-8">
        <h2 className="font-display text-lg text-basalt">
          <span className="border-b-2 border-tangerine pb-1">회사별 청구 채널</span>
        </h2>
        <div className="table-scroll mt-4">
          <table>
            <thead>
              <tr>
                <th>보험사</th>
                <th>앱</th>
                <th>팩스</th>
                <th>방문</th>
              </tr>
            </thead>
            <tbody>
              {guide.channels_json.map((row, i) => (
                <tr key={i}>
                  <td className="font-medium text-basalt">{row.insurer}</td>
                  <td>{row.app || "—"}</td>
                  <td>{row.fax || "—"}</td>
                  <td>{row.visit || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 필요 서류 */}
      <Section title="필요 서류">
        <Markdown>{guide.documents_md}</Markdown>
      </Section>

      {/* 자주 거절되는 이유 */}
      <Section title="자주 거절되는 이유">
        <Markdown>{guide.rejections_md}</Markdown>
      </Section>

      {/* 거절됐을 때 */}
      <Section title="거절됐을 때">
        <Markdown>{guide.appeal_md}</Markdown>
      </Section>

      {/* 근거 */}
      <section className="mt-8">
        <h2 className="font-display text-lg text-basalt">
          <span className="border-b-2 border-tangerine pb-1">근거</span>
        </h2>
        <div className="mt-4 rounded-xl border border-line bg-sand-deep px-5 py-4 text-sm">
          <Markdown>{guide.evidence_md}</Markdown>
        </div>
      </section>

      {/* 고정 마지막 줄 */}
      <div className="mt-10 rounded-xl bg-basalt px-5 py-5 text-sand">
        <p className="text-sm">내 경우가 다르면 물어보기에 남겨주세요.</p>
        <Link
          href={`/ask?guide=${encodeURIComponent(guide.slug)}`}
          className="mt-3 inline-flex rounded-md bg-tangerine px-4 py-2 text-sm font-semibold text-basalt hover:bg-tangerine-dark hover:text-white"
        >
          물어보기
        </Link>
      </div>

      {/* 이 가이드에서 나온 질문 */}
      {relatedQna.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg text-basalt">이 가이드에서 나온 질문</h2>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-paper">
            {relatedQna.map((q) => (
              <li key={q.id}>
                <Link href={`/qna/${q.id}`} className="block px-4 py-3 text-sm hover:bg-sand-deep">
                  {q.body}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-lg text-basalt">
        <span className="border-b-2 border-tangerine pb-1">{title}</span>
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
