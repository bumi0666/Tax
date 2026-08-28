import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | 프리랜서 종합소득세 계산기",
};

export default function TermsPage() {
  return (
    <main className="flex-1 bg-[var(--paper)]">
      <div className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.15em] text-[var(--stamp)] mb-6 inline-block hover:underline"
        >
          ← 계산기로 돌아가기
        </Link>

        <h1 className="font-display text-3xl font-bold mb-2">이용약관</h1>
        <p className="font-mono text-xs text-[var(--ink-soft)] mb-10">시행일: 2026년 8월 28일</p>

        <div className="space-y-8 text-[14px] leading-relaxed text-[var(--ink)]">
          <Section title="제1조 (목적)">
            이 약관은 프리랜서 종합소득세 계산기(이하 &ldquo;서비스&rdquo;)가 제공하는 세액
            추정 계산 기능의 이용 조건과 절차, 이용자와 서비스 운영자의 권리·의무 및 책임사항을
            정하는 것을 목적으로 합니다.
          </Section>

          <Section title="제2조 (서비스의 성격)">
            <p>
              서비스는 이용자가 입력한 수입금액, 경비율, 공제 항목을 바탕으로 종합소득세
              예상액을 계산해 보여주는 참고용 도구입니다. 국세청 고시 경비율 및 세율표를
              반영하여 계산하나, 다음 각 호에 유의하시기 바랍니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>계산 결과는 세무 신고 자료로서 법적 효력을 갖지 않습니다.</li>
              <li>
                실제 세액은 업종코드별 정확한 경비율, 복식부기 의무 여부, 추가 공제·감면 항목
                등에 따라 달라질 수 있습니다.
              </li>
              <li>
                최종 신고 전에는 반드시 홈택스 모의계산 또는 세무 전문가의 확인을 거치시기
                바랍니다.
              </li>
            </ul>
          </Section>

          <Section title="제3조 (면책조항)">
            서비스 운영자는 이용자가 서비스의 계산 결과를 신뢰하여 취한 조치(세무 신고,
            납부 등)로 발생한 손해에 대해 책임을 지지 않습니다. 서비스는 관련 법령이나 국세청
            고시 경비율의 개정 사항을 실시간으로 반영하지 못할 수 있습니다.
          </Section>

          <Section title="제4조 (개인정보)">
            서비스는 이용자가 입력한 수입·공제 정보를 서버에 저장하거나 수집하지 않습니다.
            자세한 내용은{" "}
            <Link href="/privacy" className="text-[var(--stamp)] underline underline-offset-2">
              개인정보처리방침
            </Link>
            을 참고하시기 바랍니다.
          </Section>

          <Section title="제5조 (광고)">
            서비스는 운영 비용 충당을 위해 광고를 게재할 수 있으며, 광고 서비스 제공을 위해
            제3자(Google 등)의 쿠키가 사용될 수 있습니다.
          </Section>

          <Section title="제6조 (약관의 변경)">
            이 약관은 서비스 운영상 필요에 따라 개정될 수 있으며, 개정 시 이 페이지를 통해
            공지합니다.
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-lg font-bold mb-2 pb-2 border-b border-[var(--rule)]">
        {title}
      </h2>
      <div className="text-[var(--ink-soft)]">{children}</div>
    </section>
  );
}
