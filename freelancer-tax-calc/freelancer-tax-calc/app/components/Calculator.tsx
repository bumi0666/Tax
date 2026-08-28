"use client";

import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { calculateTax, formatWon, ExpenseType } from "@/lib/tax";

const EXPENSE_PRESETS: { code: string; label: string; simple: number; standard: number }[] = [
  { code: "940909", label: "일반 프리랜서 (기타자영업)", simple: 64.1, standard: 17.4 },
  { code: "940926", label: "소프트웨어 프리랜서", simple: 64.4, standard: 20.9 },
  { code: "940903", label: "학원강사·강사·과외교습자", simple: 61.7, standard: 15.4 },
  { code: "940306", label: "1인미디어 콘텐츠 창작자", simple: 64.1, standard: 12.1 },
  { code: "custom", label: "직접 입력", simple: 0, standard: 0 },
];

export interface CalculatorInitialState {
  revenue?: number;
  presetCode?: string;
  expenseType?: ExpenseType;
  customRate?: number;
  dependents?: number;
  pensionPremium?: number;
  childCount?: number;
  prepaidKnown?: boolean;
  prepaidTaxInput?: number;
}

function NumberField({
  label,
  value,
  onChange,
  suffix = "원",
  placeholder,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-3 py-2">
      <label className="font-display text-[15px] text-[var(--ink)] whitespace-nowrap">
        {label}
      </label>
      <input
        type="text"
        inputMode="numeric"
        value={value === 0 ? "" : value.toLocaleString("ko-KR")}
        placeholder={placeholder ?? "0"}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          onChange(raw === "" ? 0 : parseInt(raw, 10));
        }}
        className="font-mono text-right bg-transparent border-b border-[var(--ink-soft)]/40 focus:border-[var(--stamp)] outline-none py-1 text-[15px] w-full"
      />
      <span className="font-mono text-[13px] text-[var(--ink-soft)]">{suffix}</span>
    </div>
  );
}

export default function Calculator({ initial }: { initial?: CalculatorInitialState }) {
  const [revenue, setRevenue] = useState(initial?.revenue ?? 30_000_000);
  const [presetCode, setPresetCode] = useState(initial?.presetCode ?? "940909");
  const [expenseType, setExpenseType] = useState<ExpenseType>(initial?.expenseType ?? "simple");
  const [customRate, setCustomRate] = useState(initial?.customRate ?? 64.1);
  const [dependents, setDependents] = useState(initial?.dependents ?? 1);
  const [pensionPremium, setPensionPremium] = useState(initial?.pensionPremium ?? 0);
  const [childCount, setChildCount] = useState(initial?.childCount ?? 0);
  const [prepaidKnown, setPrepaidKnown] = useState(initial?.prepaidKnown ?? false);
  const [prepaidTaxInput, setPrepaidTaxInput] = useState(initial?.prepaidTaxInput ?? 990_000);
  const [copyLabel, setCopyLabel] = useState("링크 복사");
  const receiptRef = useRef<HTMLDivElement>(null);

  const preset = EXPENSE_PRESETS.find((p) => p.code === presetCode)!;
  const expenseRate =
    presetCode === "custom" ? customRate : expenseType === "simple" ? preset.simple : preset.standard;

  const estimatedPrepaid = Math.round(revenue * 0.033);
  const prepaidTax = prepaidKnown ? prepaidTaxInput : estimatedPrepaid;

  const result = useMemo(
    () =>
      calculateTax({
        revenue,
        expenseType,
        expenseRate,
        dependents,
        pensionPremium,
        childCount,
        prepaidTax,
      }),
    [revenue, expenseType, expenseRate, dependents, pensionPremium, childCount, prepaidTax]
  );

  const isRefund = result.balance < 0;

  function buildShareUrl() {
    const params = new URLSearchParams({
      revenue: String(revenue),
      preset: presetCode,
      type: expenseType,
      customRate: String(customRate),
      dependents: String(dependents),
      pension: String(pensionPremium),
      children: String(childCount),
      prepaidKnown: prepaidKnown ? "1" : "0",
      prepaid: String(prepaidTaxInput),
    });
    return `${window.location.origin}/?${params.toString()}`;
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(buildShareUrl());
      setCopyLabel("복사됨!");
      setTimeout(() => setCopyLabel("링크 복사"), 2000);
    } catch {
      setCopyLabel("복사 실패");
      setTimeout(() => setCopyLabel("링크 복사"), 2000);
    }
  }

  async function handleSaveImage() {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await toPng(receiptRef.current, {
        pixelRatio: 2,
        backgroundColor: "#F1EFE8",
      });
      const link = document.createElement("a");
      link.download = "mytax33-정산표.png";
      link.href = dataUrl;
      link.click();
    } catch {
      // 이미지 생성 실패 시 조용히 무시 (브라우저 호환성 이슈 등)
    }
  }

  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
      {/* 왼쪽: 장부 입력 시트 */}
      <section className="bg-[var(--paper-deep)] rounded-sm p-8 shadow-[0_1px_0_var(--rule)] ledger-lines border border-[var(--rule)]">
        <div className="flex items-baseline justify-between mb-6 border-b-2 border-[var(--ink)] pb-3">
          <h2 className="font-display text-2xl font-bold">수입 · 공제 기입란</h2>
          <span className="font-mono text-xs text-[var(--ink-soft)]">2025년 귀속분</span>
        </div>

        <NumberField label="① 연간 총수입" value={revenue} onChange={setRevenue} />

        <div className="py-2">
          <div className="font-display text-[15px] mb-2">② 업종 (경비율)</div>
          <select
            value={presetCode}
            onChange={(e) => setPresetCode(e.target.value)}
            className="w-full bg-transparent border-b border-[var(--ink-soft)]/40 focus:border-[var(--stamp)] outline-none py-2 text-[14px] font-mono"
          >
            {EXPENSE_PRESETS.map((p) => (
              <option key={p.code} value={p.code}>
                {p.code !== "custom" ? `${p.code} · ` : ""}
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {presetCode !== "custom" ? (
          <div className="flex gap-6 py-2">
            <label className="flex items-center gap-2 font-mono text-[13px] cursor-pointer">
              <input
                type="radio"
                checked={expenseType === "simple"}
                onChange={() => setExpenseType("simple")}
                className="accent-[var(--stamp)]"
              />
              단순경비율 {preset.simple}%
            </label>
            <label className="flex items-center gap-2 font-mono text-[13px] cursor-pointer">
              <input
                type="radio"
                checked={expenseType === "standard"}
                onChange={() => setExpenseType("standard")}
                className="accent-[var(--stamp)]"
              />
              기준경비율 {preset.standard}%
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-3 py-2">
            <label className="font-display text-[15px]">경비율 직접입력</label>
            <input
              type="number"
              step="0.1"
              value={customRate}
              onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
              className="font-mono text-right bg-transparent border-b border-[var(--ink-soft)]/40 focus:border-[var(--stamp)] outline-none py-1 text-[15px] w-full"
            />
            <span className="font-mono text-[13px] text-[var(--ink-soft)]">%</span>
          </div>
        )}

        {presetCode !== "custom" && expenseType === "standard" && (
          <p className="text-[11.5px] text-[var(--stamp)] -mt-1 mb-1 pl-0.5">
            매입비용·임차료·인건비 같은 &ldquo;주요경비&rdquo;가 없다고 가정한 계산입니다.
            직원을 고용하거나 사무실을 임차하는 등 주요경비가 있다면 실제 세액과 차이가
            클 수 있어요.
          </p>
        )}

        <NumberField
          label="③ 인적공제 인원"
          value={dependents}
          onChange={setDependents}
          suffix="명"
        />

        <NumberField
          label="④ 국민연금보험료(연납)"
          value={pensionPremium}
          onChange={setPensionPremium}
        />
        <p className="text-[11.5px] text-[var(--ink-soft)] -mt-1 mb-1 pl-0.5">
          지역가입자 국민연금 납부액(전액 소득공제). 건강보험료는 경비율에 이미 반영돼 있어 별도 입력하지 않습니다.
        </p>

        <NumberField
          label="⑤ 8세 이상 자녀 수"
          value={childCount}
          onChange={setChildCount}
          suffix="명"
        />
        <p className="text-[11.5px] text-[var(--ink-soft)] -mt-1 mb-1 pl-0.5">
          자녀세액공제용. 표준세액공제 7만원은 자동 적용됩니다.
        </p>

        <div className="py-2">
          <div className="font-display text-[15px] mb-2">⑥ 기납부세액(3.3% 원천징수)</div>
          <div className="flex gap-6 mb-2">
            <label className="flex items-center gap-2 font-mono text-[13px] cursor-pointer">
              <input
                type="radio"
                checked={!prepaidKnown}
                onChange={() => setPrepaidKnown(false)}
                className="accent-[var(--stamp)]"
              />
              모르겠어요 — 3.3%로 추정
            </label>
            <label className="flex items-center gap-2 font-mono text-[13px] cursor-pointer">
              <input
                type="radio"
                checked={prepaidKnown}
                onChange={() => setPrepaidKnown(true)}
                className="accent-[var(--stamp)]"
              />
              직접 입력할게요
            </label>
          </div>
          {prepaidKnown ? (
            <NumberField label="" value={prepaidTaxInput} onChange={setPrepaidTaxInput} />
          ) : (
            <div className="font-mono text-right text-[15px] py-1 text-[var(--ink-soft)]">
              {formatWon(estimatedPrepaid)}원 (자동 추정)
            </div>
          )}
        </div>
        <p className="text-[11.5px] text-[var(--ink-soft)] -mt-1 mb-1 pl-0.5">
          실제 원천징수액은 지급명세서 합계와 다를 수 있으니, 정확히 알고 있다면 직접
          입력을 선택하세요.
        </p>

        <p className="mt-6 text-[12px] leading-relaxed text-[var(--ink-soft)] border-t border-[var(--rule)] pt-4">
          경비율·기준수입금액 요건은 홈택스 &ldquo;기준·단순경비율 조회&rdquo;에서 본인 업종코드로 반드시 재확인하세요.
          이 계산기는 추정치이며 법적 효력이 없습니다.
        </p>
      </section>

      {/* 오른쪽: 영수증 출력 */}
      <section className="relative">
        <div className="h-2 receipt-edge bg-[var(--receipt)]" />
        <div ref={receiptRef} className="bg-[var(--receipt)] px-7 py-8 shadow-lg animate-print">
          <div className="text-center font-display font-bold text-lg tracking-wide mb-1">
            종 합 소 득 세 정 산 표
          </div>
          <div className="text-center font-mono text-[11px] text-[var(--ink-soft)] mb-5">
            NATIONAL TAX SERVICE · 추정 계산 결과
          </div>

          <div className="border-t border-dashed border-[var(--ink-soft)]/50 my-3" />

          <Row label="총수입" value={result.recognizedExpense + result.incomeAmount} />
          <Row label="인정 필요경비" value={result.recognizedExpense} minus />
          <Row label="종합소득금액" value={result.incomeAmount} strong />
          <Row label="인적공제" value={result.personalDeduction} minus />
          <Row label="연금보험료공제" value={result.pensionDeduction} minus />
          <Row label="과세표준" value={result.taxBase} strong />

          <div className="border-t border-dashed border-[var(--ink-soft)]/50 my-3" />

          <Row label={`적용세율 ${(result.bracketRate * 100).toFixed(0)}%`} value={null} />
          <Row label="산출세액" value={result.calculatedTax} />
          <Row label="표준세액공제" value={result.standardTaxCredit} minus />
          {result.childTaxCredit > 0 && (
            <Row label="자녀세액공제" value={result.childTaxCredit} minus />
          )}
          <Row label="지방소득세(10%)" value={result.localTax} />
          <Row label="결정세액 합계" value={result.totalTax} strong />
          <Row label="기납부세액" value={prepaidTax} minus />

          <div className="border-t-2 border-[var(--ink)] my-3" />

          <div className="flex items-baseline justify-between py-2">
            <span className="font-display text-base font-bold">
              {isRefund ? "환급 예상액" : "추가 납부 예상액"}
            </span>
            <span
              className={`font-mono text-2xl font-semibold ${
                isRefund ? "text-[var(--gold)]" : "text-[var(--stamp)]"
              }`}
            >
              {formatWon(Math.abs(result.balance))}원
            </span>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="w-24 h-24 rounded-full border-[3px] border-[var(--stamp)] text-[var(--stamp)] flex items-center justify-center rotate-[-8deg] font-display font-bold text-sm text-center leading-tight opacity-80">
              추정
              <br />
              계산
            </div>
          </div>

          <div className="mt-6 text-center font-mono text-[10px] tracking-[0.15em] text-[var(--ink-soft)]">
            mytax33.com
          </div>
        </div>
        <div className="h-2 receipt-edge-bottom bg-[var(--receipt)]" />

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleCopyLink}
            className="flex-1 font-mono text-[12px] border border-[var(--ink-soft)]/40 rounded-sm py-2.5 hover:border-[var(--stamp)] hover:text-[var(--stamp)] transition-colors"
          >
            {copyLabel}
          </button>
          <button
            onClick={handleSaveImage}
            className="flex-1 font-mono text-[12px] border border-[var(--ink-soft)]/40 rounded-sm py-2.5 hover:border-[var(--stamp)] hover:text-[var(--stamp)] transition-colors"
          >
            이미지로 저장
          </button>
        </div>
      </section>
    </div>
  );
}

function Row({
  label,
  value,
  minus,
  strong,
}: {
  label: string;
  value: number | null;
  minus?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between py-1 font-mono text-[13px] ${
        strong ? "font-semibold text-[15px]" : "text-[var(--ink-soft)]"
      }`}
    >
      <span>{label}</span>
      {value !== null && (
        <span className={strong ? "text-[var(--ink)]" : ""}>
          {minus ? "− " : ""}
          {formatWon(value)}원
        </span>
      )}
    </div>
  );
}
