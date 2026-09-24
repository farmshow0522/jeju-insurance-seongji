import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-sand-deep">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted">
        <div className="font-display text-base text-basalt">
          {SITE.name} <span className="text-tangerine">· {SITE.slogan}</span>
        </div>

        <p className="mt-3 leading-relaxed">
          {SITE.keeper.company} {SITE.keeper.branch} · 설계사 등록번호 {SITE.keeper.licenseNo} ·{" "}
          {SITE.keeper.note}
        </p>

        <nav className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/privacy" className="hover:text-ink">
            개인정보처리방침
          </Link>
          <Link href="/about" className="hover:text-ink">
            성지 지기
          </Link>
          {SITE.daangnCafeUrl ? (
            <a
              href={SITE.daangnCafeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              당근 카페에서도 물어보세요
            </a>
          ) : (
            <span className="text-muted/70">당근 카페에서도 물어보세요</span>
          )}
        </nav>

        <p className="mt-6 text-xs text-muted/70">
          이 사이트의 답변은 일반적인 정보 제공이며 특정 상품 권유가 아니에요. 가입·해지·청구
          여부는 본인이 결정합니다.
        </p>
      </div>
    </footer>
  );
}
