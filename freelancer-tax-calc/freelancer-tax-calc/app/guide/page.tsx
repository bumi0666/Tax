import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "가이드 | 프리랜서 종합소득세 계산기",
  description: "프리랜서 3.3% 원천징수, 경비율, 종합소득세 신고와 절세 방법을 정리한 가이드입니다.",
};

const GUIDES = [
  {
    slug: "withholding-33",
    title: "프리랜서 3.3% 원천징수란?",
    desc: "매달 떼이는 3.3%가 정확히 뭔지, 왜 5월에 또 정산하는지 정리했습니다.",
  },
  {
    slug: "expense-rate",
    title: "단순경비율 vs 기준경비율, 뭐가 유리할까",
    desc: "두 경비율의 차이와 적용 기준, 그리고 어떤 경우에 유리한지 비교했습니다.",
  },
  {
    slug: "filing-steps",
    title: "종합소득세 신고, 5월에 이렇게 하면 됩니다",
    desc: "홈택스 신고 화면을 처음 보는 프리랜서를 위한 3단계 흐름 안내입니다.",
  },
  {
    slug: "tax-saving-tips",
    title: "프리랜서 절세 팁 5가지",
    desc: "합법적으로 세금을 줄일 수 있는 소득공제·세액공제 활용법을 모았습니다.",
  },
];

export default function GuideIndexPage() {
  return (
    <main className="flex-1 bg-[var(--paper)]">
      <div className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.15em] text-[var(--stamp)] mb-6 inline-block hover:underline"
        >
          ← 계산기로 돌아가기
        </Link>

        <h1 className="font-display text-3xl font-bold mb-2">가이드</h1>
        <p className="text-[var(--ink-soft)] text-[14px] mb-10">
          프리랜서 세금과 관련해 자주 궁금해하는 내용을 정리했습니다.
        </p>

        <div className="space-y-4">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guide/${g.slug}`}
              className="block border border-[var(--rule)] rounded-sm p-5 hover:border-[var(--stamp)] transition-colors"
            >
              <h2 className="font-display text-lg font-bold mb-1">{g.title}</h2>
              <p className="text-[13px] text-[var(--ink-soft)]">{g.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
