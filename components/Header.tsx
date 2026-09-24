import Link from "next/link";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/guides", label: "청구 가이드" },
  { href: "/basics", label: "기준 정리" },
  { href: "/cases", label: "사례" },
  { href: "/qna", label: "답변" },
  { href: "/about", label: "성지 지기" },
];

export default function Header() {
  return (
    <header className="bg-basalt text-sand">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex flex-col leading-none shrink-0">
          <span className="font-display text-xl text-sand">{SITE.name}</span>
          <span className="mt-0.5 text-[11px] text-tangerine tracking-tight">
            {SITE.slogan}
          </span>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto whitespace-nowrap text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-sand/85 transition-colors hover:bg-white/10 hover:text-sand"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/ask"
            className="ml-1 rounded-md bg-tangerine px-3 py-1.5 font-semibold text-basalt transition-colors hover:bg-tangerine-dark hover:text-white"
          >
            물어보기
          </Link>
        </nav>
      </div>
    </header>
  );
}
