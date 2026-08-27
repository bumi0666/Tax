"use client";

import { useMemo, useState } from "react";
import { calculateTax, formatWon, ExpenseType } from "@/lib/tax";

const EXPENSE_PRESETS: { code: string; label: string; simple: number; standard: number }[] = [
  { code: "940909", label: "일반 프리랜서 (기타자영업)", simple: 64.1, standard: 17.4 },
  { code: "940926", label: "소프트웨어 프리랜서", simple: 64.4, standard: 20.9 },
  { code: "custom", label: "직접 입력", simple: 0, standard: 0 },
];

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

export default function Calculator() {
  const [revenue, setRevenue] = useState(30_000_000);
  const [presetCode, setPresetCode] = useState("940909");
  const [expenseType, setExpenseType] = useState<ExpenseType>("simple");
  const [customRate, setCustomRate] = useState(64.1);
  const [dependents, setDependents] = useState(1);
  const [prepaidTax, setPrepaidTax] = useState(990_000);

  const preset = EXPENSE_PRESETS.find((p) => p.code === presetCode)!;
  const expenseRate =
    presetCode === "custom" ? customRate : expenseType === "simple" ? preset.simple : preset.standard;

  const result = useMemo(
    () =>
      calculateTax({
        revenue,
        expenseType,
        expenseRate,
        dependents,
        prepaidTax,
      }),
    [revenue, expenseType, expenseRate, dependents, prepaidTax]
  );

  const isRefund = result.balance < 0;

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

        <NumberField
          label="③ 인적공제 인원"
          value={dependents}
          onChange={setDependents}
          suffix="명"
        />

        <NumberField
          label="④ 기납부세액(3.3%)"
          value={prepaidTax}
          onChange={setPrepaidTax}
        />

        <p className="mt-6 text-[12px] leading-relaxed text-[var(--ink-soft)] border-t border-[var(--rule)] pt-4">
          경비율·기준수입금액 요건은 홈택스 &ldquo;기준·단순경비율 조회&rdquo;에서 본인 업종코드로 반드시 재확인하세요.
          이 계산기는 추정치이며 법적 효력이 없습니다.
        </p>
      </section>

      {/* 오른쪽: 영수증 출력 */}
      <section className="relative">
        <div className="h-2 receipt-edge bg-[var(--receipt)]" />
        <div className="bg-[var(--receipt)] px-7 py-8 shadow-lg animate-print">
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
          <Row label="과세표준" value={result.taxBase} strong />

          <div className="border-t border-dashed border-[var(--ink-soft)]/50 my-3" />

          <Row label={`적용세율 ${(result.bracketRate * 100).toFixed(0)}%`} value={null} />
          <Row label="산출세액" value={result.calculatedTax} />
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
        </div>
        <div className="h-2 receipt-edge-bottom bg-[var(--receipt)]" />
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
