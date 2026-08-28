import Link from "next/link";
import type { Metadata } from "next";
import { GuideArticle } from "../_components/GuideArticle";
import { calculateTax } from "@/lib/tax";

export const metadata: Metadata = {
  title: "프리랜서 연소득 3,000만원 종합소득세·환급 계산 | 가이드",
  description:
    "프리랜서로 연 3,000만원을 벌었을 때 5월 종합소득세가 얼마나 나오는지, 조건별로 나눠 계산 예시를 정리했습니다.",
};

const REVENUE = 30_000_000;

function caseResult(expenseRate: number, expenseType: "simple" | "standard", dependents = 1) {
  return calculateTax({
    revenue: REVENUE,
    expenseType,
    expenseRate,
    dependents,
    pensionPremium: 0,
    childCount: 0,
    prepaidTax: Math.round(REVENUE * 0.033),
  });
}

export default function Page() {
  const caseA = caseResult(64.1, "simple");
  const caseB = caseResult(17.4, "standard");
  const caseC = caseResult(64.4, "simple", 1); // 소프트웨어 프리랜서 예시

  return (
    <GuideArticle title="프리랜서 연소득 3,000만원 종합소득세·환급 계산" updated="2026.08">
      <p>
        연 3,000만원은 단순경비율과 기준경비율의 <strong>기준금액(3,600만원)에 가까워
        결과가 특히 갈리기 쉬운 구간</strong>입니다. 아래 예시로 조건별 차이를 비교해보세요.
        (모두 국민연금·자녀공제 없이, 기납부세액은 3.3% 원천징수로 가정한 참고용
        계산입니다.)
      </p>

      <h2>CASE A — 일반 프리랜서, 단순경비율 대상 (업종코드 940909)</h2>
      <ul>
        <li>총수입 3,000만원 · 경비율 64.1%</li>
        <li>종합소득금액 약 {caseA.incomeAmount.toLocaleString("ko-KR")}원</li>
        <li>과세표준 약 {caseA.taxBase.toLocaleString("ko-KR")}원 → 세율 {(caseA.bracketRate * 100).toFixed(0)}%</li>
        <li>결정세액 합계 약 {caseA.totalTax.toLocaleString("ko-KR")}원</li>
        <li>
          <strong>
            {caseA.balance < 0
              ? `${Math.abs(caseA.balance).toLocaleString("ko-KR")}원 환급 예상`
              : `${caseA.balance.toLocaleString("ko-KR")}원 추가납부 예상`}
          </strong>
        </li>
      </ul>

      <h2>CASE B — 같은 업종이지만 기준경비율 대상인 경우</h2>
      <p>
        직전 연도 수입이 기준금액을 넘어 기준경비율(17.4%)이 적용된다고 가정한
        예시입니다. (주요경비 없다고 가정)
      </p>
      <ul>
        <li>총수입 3,000만원 · 경비율 17.4%</li>
        <li>종합소득금액 약 {caseB.incomeAmount.toLocaleString("ko-KR")}원</li>
        <li>결정세액 합계 약 {caseB.totalTax.toLocaleString("ko-KR")}원</li>
        <li>
          <strong>
            {caseB.balance < 0
              ? `${Math.abs(caseB.balance).toLocaleString("ko-KR")}원 환급 예상`
              : `${caseB.balance.toLocaleString("ko-KR")}원 추가납부 예상`}
          </strong>
        </li>
      </ul>
      <p>
        CASE A와 CASE B의 차이가 꽤 큰 걸 볼 수 있습니다. 이게 바로{" "}
        <Link href="/guide/expense-rate" className="text-[var(--stamp)] underline underline-offset-2">
          단순경비율과 기준경비율
        </Link>
        을 정확히 구분해야 하는 이유입니다.
      </p>

      <h2>CASE C — 소프트웨어 프리랜서 (업종코드 940926)</h2>
      <p>비슷한 단순경비율이라도 업종코드에 따라 소폭 다릅니다.</p>
      <ul>
        <li>총수입 3,000만원 · 경비율 64.4%</li>
        <li>
          <strong>
            {caseC.balance < 0
              ? `${Math.abs(caseC.balance).toLocaleString("ko-KR")}원 환급 예상`
              : `${caseC.balance.toLocaleString("ko-KR")}원 추가납부 예상`}
          </strong>
        </li>
      </ul>

      <h2>내 조건으로 직접 계산해보기</h2>
      <p>
        연 3,000만원 구간은 기준경비율 여부에 따른 차이가 크게 벌어지는 만큼, 본인이
        단순경비율 대상인지 기준경비율 대상인지부터 정확히 확인하는 게 중요합니다.
      </p>
      <p>
        <Link
          href={`/?revenue=${REVENUE}`}
          className="inline-block font-mono text-[13px] text-[var(--stamp)] border border-[var(--stamp)] rounded-sm px-4 py-2 hover:bg-[var(--stamp)] hover:text-white transition-colors no-underline"
        >
          3,000만원으로 계산기에서 확인하기 →
        </Link>
      </p>
    </GuideArticle>
  );
}
