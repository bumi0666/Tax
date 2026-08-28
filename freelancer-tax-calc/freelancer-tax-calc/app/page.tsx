import Link from "next/link";
import Calculator from "./components/Calculator";

export default function Home() {
  return (
    <main className="flex-1 bg-[var(--paper)]">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-24">
        <header className="mb-12">
          <div className="font-mono text-xs tracking-[0.2em] text-[var(--stamp)] mb-3">
            3.3% 원천징수 사업소득자 전용
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
            내 프리랜서 소득,
            <br />
            5월에 얼마 더 내거나 돌려받을까
          </h1>
          <p className="text-[var(--ink-soft)] text-[15px] max-w-xl leading-relaxed">
            연간 총수입과 업종별 경비율만 넣으면 종합소득세 정산표가 영수증처럼 바로
            출력돼요. 원천징수로 미리 낸 3.3%와 비교해 환급인지 추가납부인지 확인하세요.
          </p>
        </header>

        <Calculator />

        <footer className="mt-16 pt-6 border-t border-[var(--rule)] text-[12px] text-[var(--ink-soft)] leading-relaxed">
          <p>
            2026년 5월 신고(2025년 귀속) 세율표 기준 추정 계산입니다. 실제 세액은 소득공제·세액공제
            항목, 복식부기 의무 여부 등에 따라 달라질 수 있으니 최종 신고 전 홈택스 모의계산 또는
            세무 전문가 확인을 권장합니다.
          </p>
          <div className="mt-4 flex gap-4 font-mono text-[11px]">
            <Link href="/terms" className="hover:text-[var(--stamp)] hover:underline">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-[var(--stamp)] hover:underline">
              개인정보처리방침
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
