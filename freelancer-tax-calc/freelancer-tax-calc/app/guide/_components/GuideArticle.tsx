import Link from "next/link";

export function GuideArticle({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 bg-[var(--paper)]">
      <div className="max-w-2xl mx-auto px-6 pt-14 pb-24">
        <Link
          href="/guide"
          className="font-mono text-xs tracking-[0.15em] text-[var(--stamp)] mb-6 inline-block hover:underline"
        >
          ← 가이드 목록
        </Link>

        <h1 className="font-display text-3xl font-bold mb-2 leading-snug">{title}</h1>
        <p className="font-mono text-xs text-[var(--ink-soft)] mb-10">최종 업데이트 {updated}</p>

        <article className="space-y-7 text-[14.5px] leading-[1.85] text-[var(--ink)] [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-2 [&_p]:text-[var(--ink-soft)] [&_li]:text-[var(--ink-soft)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_strong]:text-[var(--ink)] [&_strong]:font-semibold">
          {children}
        </article>

        <div className="mt-12 pt-6 border-t border-[var(--rule)] text-[12px] text-[var(--ink-soft)] leading-relaxed">
          이 글은 일반적인 정보 제공을 목적으로 하며 개별 세무 상담을 대체하지 않습니다. 실제
          신고 전에는{" "}
          <Link href="/" className="text-[var(--stamp)] underline underline-offset-2">
            계산기
          </Link>
          로 대략적인 금액을 가늠해보고, 홈택스 모의계산이나 세무 전문가 확인을 함께
          거치시길 권합니다.
        </div>
      </div>
    </main>
  );
}
