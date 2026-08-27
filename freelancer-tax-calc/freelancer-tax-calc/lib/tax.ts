// 2026년 5월 신고 기준 (2025년 귀속 종합소득세)
// 출처: 국세청 종합소득세 세율 고시 — 반드시 매년 갱신 필요

export type ExpenseType = "simple" | "standard";

export interface TaxInput {
  revenue: number; // 연간 총수입 (원)
  expenseType: ExpenseType;
  expenseRate: number; // 경비율 (%), 업종코드별로 사용자가 입력
  dependents: number; // 인적공제 대상 인원 (본인 포함)
  pensionPremium: number; // 연간 국민연금보험료 납부액 (연금보험료공제, 전액 소득공제)
  childCount: number; // 8세 이상 기본공제대상 자녀 수 (자녀세액공제용)
  prepaidTax: number; // 기납부세액 (3.3% 원천징수 합계 등)
}

export interface TaxResult {
  recognizedExpense: number;
  incomeAmount: number; // 종합소득금액
  personalDeduction: number; // 인적공제
  pensionDeduction: number; // 연금보험료공제
  taxBase: number; // 과세표준
  bracketRate: number;
  progressiveDeduction: number;
  calculatedTax: number; // 산출세액
  standardTaxCredit: number; // 표준세액공제
  childTaxCredit: number; // 자녀세액공제
  taxAfterCredit: number; // 세액공제 반영 후 결정세액(지방세 전)
  localTax: number; // 지방소득세 (10%)
  totalTax: number; // 결정세액 + 지방소득세
  balance: number; // 최종 정산액 (양수: 추가납부, 음수: 환급)
}

// 2026년 종합소득세 누진세율표 (2025년 귀속)
const BRACKETS = [
  { limit: 14_000_000, rate: 0.06, deduction: 0 },
  { limit: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { limit: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { limit: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { limit: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { limit: 500_000_000, rate: 0.4, deduction: 25_940_000 },
  { limit: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { limit: Infinity, rate: 0.45, deduction: 65_940_000 },
];

const PERSONAL_DEDUCTION_PER_PERSON = 1_500_000; // 1인당 기본공제
const STANDARD_TAX_CREDIT = 70_000; // 표준세액공제 (특별소득·세액공제 미신청 시)

function calcChildTaxCredit(childCount: number): number {
  const n = Math.max(0, Math.floor(childCount));
  if (n <= 0) return 0;
  if (n === 1) return 150_000;
  if (n === 2) return 350_000;
  return 350_000 + (n - 2) * 300_000;
}

export function findBracket(taxBase: number) {
  return BRACKETS.find((b) => taxBase <= b.limit) ?? BRACKETS[BRACKETS.length - 1];
}

export function calculateTax(input: TaxInput): TaxResult {
  const recognizedExpense = Math.round(input.revenue * (input.expenseRate / 100));
  const incomeAmount = Math.max(0, input.revenue - recognizedExpense);
  const personalDeduction = Math.max(0, input.dependents) * PERSONAL_DEDUCTION_PER_PERSON;
  const pensionDeduction = Math.max(0, input.pensionPremium); // 국민연금보험료는 전액 소득공제
  const taxBase = Math.max(0, incomeAmount - personalDeduction - pensionDeduction);

  const bracket = findBracket(taxBase);
  const calculatedTax = Math.max(0, Math.round(taxBase * bracket.rate - bracket.deduction));

  const childTaxCredit = calcChildTaxCredit(input.childCount);
  const standardTaxCredit = STANDARD_TAX_CREDIT;
  const taxAfterCredit = Math.max(0, calculatedTax - standardTaxCredit - childTaxCredit);

  const localTax = Math.round(taxAfterCredit * 0.1);
  const totalTax = taxAfterCredit + localTax;
  const balance = totalTax - input.prepaidTax;

  return {
    recognizedExpense,
    incomeAmount,
    personalDeduction,
    pensionDeduction,
    taxBase,
    bracketRate: bracket.rate,
    progressiveDeduction: bracket.deduction,
    calculatedTax,
    standardTaxCredit,
    childTaxCredit,
    taxAfterCredit,
    localTax,
    totalTax,
    balance,
  };
}

export function formatWon(n: number): string {
  return Math.round(n).toLocaleString("ko-KR");
}
