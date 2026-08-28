import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 | 프리랜서 종합소득세 계산기",
  description: "프리랜서 종합소득세 계산기를 만든 이유와 계산 근거를 소개합니다.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-[var(--paper)]">
      <div className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.15em] text-[var(--stamp)] mb-6 inline-block hover:underline"
        >
          ← 계산기로 돌아가기
        </Link>

        <h1 className="font-display text-3xl font-bold mb-8">소개</h1>

        <div className="space-y-8 text-[14.5px] leading-relaxed text-[var(--ink)]">
          <section>
            <h2 className="font-display text-lg font-bold mb-2">왜 만들었나</h2>
            <p className="text-[var(--ink-soft)]">
              3.3% 원천징수로 일하는 프리랜서는 매년 5월 종합소득세를 신고합니다. 그런데
              &ldquo;내가 환급을 받는지, 추가로 내야 하는지&rdquo;를 미리 가늠할 수 있는
              간단한 도구가 마땅치 않았습니다. 큰 취업 사이트의 연봉 계산기는 근로소득자
              기준이라 경비율, 단순/기준경비율 구분 같은 사업소득자 특유의 계산을
              반영하지 못합니다. 이 계산기는 그 빈틈을 채우기 위해 만들었습니다.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold mb-2">계산 근거</h2>
            <p className="text-[var(--ink-soft)]">
              세율표는 소득세법상 종합소득세율 구간(2025년 귀속 기준)을 그대로 반영했고,
              업종별 경비율은 국세청 홈택스 &ldquo;기준·단순경비율 조회&rdquo; 메뉴에서
              업종코드별로 직접 조회한 수치를 사용했습니다. 국민연금보험료 소득공제,
              표준세액공제, 자녀세액공제 등 실제로 프리랜서에게 자주 적용되는 항목을
              단계적으로 반영하고 있습니다.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold mb-2">한계</h2>
            <p className="text-[var(--ink-soft)]">
              이 계산기는 참고용 추정 도구이며, 세무 신고 자료로서 법적 효력을 갖지
              않습니다. 복식부기의무 여부, 자가 사업장 경비율, 4천만원 초과분 별도 요율,
              특별세액공제 등 세부 예외 상황은 아직 반영하지 못했습니다. 실제 신고 전에는
              반드시 홈택스 모의계산이나 세무 전문가 확인을 거치시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold mb-2">더 알아보기</h2>
            <p className="text-[var(--ink-soft)]">
              프리랜서 세금과 관련된 배경 지식은{" "}
              <Link href="/guide" className="text-[var(--stamp)] underline underline-offset-2">
                가이드
              </Link>{" "}
              페이지에 정리해두었습니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
