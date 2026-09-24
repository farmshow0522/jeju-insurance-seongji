import Link from "next/link";
import type { Guide } from "@/lib/types";
import { formatMonth } from "@/lib/format";

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex flex-col rounded-xl border border-line bg-paper p-5 transition-colors hover:border-tangerine"
    >
      <span className="inline-flex w-fit rounded-full bg-sand-deep px-2.5 py-0.5 text-xs font-medium text-muted">
        {guide.category}
      </span>
      <h3 className="mt-3 font-display text-lg leading-snug text-basalt group-hover:text-tangerine-dark">
        {guide.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted">{guide.one_line}</p>
      <span className="mt-4 text-xs text-muted/70">{formatMonth(guide.updated_at)}</span>
    </Link>
  );
}
