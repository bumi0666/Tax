import Link from "next/link";
import type { Metadata } from "next";
import { GuideArticle } from "../_components/GuideArticle";
import { calculateTax } from "@/lib/tax";

export const metadata: Metadata = {
  title: "프리랜서 연소득 2,000만원 종합소득세·환급 계산 | 가이드",
  description:
    "프리랜서로 연 2,000만원을 벌었을 때 5월 종합소득세가 얼마나 나오는지, 조건별로 나눠 계산 예시를 정리했습니다.",
};

const REVENUE = 20_000_000;

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
  const caseA = caseResult(64.1, "simple"); // 일반 프리랜서, 단순경비율
  const caseB = caseResult(17.4, "standard"); // 같은 업종, 기준경비율이라 가정
  const caseC = caseResult(64.1, "simple", 2); // 부양가족 1인 추가

  return (
    <GuideArticle title="프리랜서 연소득 2,000만원 종합소득세·환급 계산" updated="2026.08">
      <p>
        <strong>연 2,000만원 = 항상 얼마</strong>라는 답은 없습니다. 같은 수입이라도
        업종별 경비율, 단순/기준경비율 여부, 부양가족 유무에 따라 결과가 꽤 달라집니다.
        아래 세 가지 예시로 감을 잡아보세요. (모두 국민연금·자녀공제 없이, 기납부세액은
        3.3% 원천징수로 가정한 참고용 계산입니다.)
      </p>

      <h2>CASE A — 일반 프리랜서, 단순경비율 대상</h2>
      <p>
        업종코드 940909(일반 프리랜서) 기준 단순경비율 64.1%를 적용하면, 인정 필요경비가
        커서 과세표준이 낮게 잡힙니다.
      </p>
      <ul>
        <li>총수입 2,000만원 · 경비율 64.1%</li>
        <li>종합소득금액 약 {caseA.incomeAmount.toLocaleString("ko-KR")}원</li>
        <li>결정세액 합계 약 {caseA.totalTax.toLocaleString("ko-KR")}원</li>
        <li>
          기납부세액(3.3%) 약 {Math.round(REVENUE * 0.033).toLocaleString("ko-KR")}원 대비{" "}
          <strong>
            {caseA.balance < 0
              ? `${Math.abs(caseA.balance).toLocaleString("ko-KR")}원 환급 예상`
              : `${caseA.balance.toLocaleString("ko-KR")}원 추가납부 예상`}
          </strong>
        </li>
      </ul>

      <h2>CASE B — 같은 업종이지만 기준경비율 대상인 경우</h2>
      <p>
        직전 연도 수입이 기준금액을 넘어 기준경비율(17.4%)이 적용된다고 가정하면,
        인정 경비가 크게 줄어 세금 부담이 늘어납니다. (주요경비 없다고 가정)
      </p>
      <ul>
        <li>총수입 2,000만원 · 경비율 17.4%</li>
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

      <h2>CASE C — 부양가족 1명이 더 있는 경우 (CASE A 조건 + 인적공제 2인)</h2>
      <ul>
        <li>총수입 2,000만원 · 경비율 64.1% · 인적공제 2인</li>
        <li>과세표준 약 {caseC.taxBase.toLocaleString("ko-KR")}원</li>
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
        위 세 가지는 예시일 뿐, 실제 결과는 본인의 정확한 업종코드와 공제 항목에 따라
        달라집니다.
      </p>
      <p>
        <Link
          href={`/?revenue=${REVENUE}`}
          className="inline-block font-mono text-[13px] text-[var(--stamp)] border border-[var(--stamp)] rounded-sm px-4 py-2 hover:bg-[var(--stamp)] hover:text-white transition-colors no-underline"
        >
          2,000만원으로 계산기에서 확인하기 →
        </Link>
      </p>
    </GuideArticle>
  );
}
