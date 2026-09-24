import Link from "next/link";

export default function ComingSoon({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-2xl text-basalt">{title}</h1>
      <p className="mt-3 text-sm text-muted">
        {note ?? "이 페이지는 다음 단계에서 만들어요."}
      </p>
      <div className="mt-6 flex gap-3 text-sm">
        <Link href="/guides" className="font-medium text-tangerine-dark hover:underline">
          청구 가이드 보기
        </Link>
        <Link href="/" className="text-muted hover:text-ink">
          홈으로
        </Link>
      </div>
    </div>
  );
}
