import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 프리랜서 종합소득세 계산기",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-[var(--paper)]">
      <div className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.15em] text-[var(--stamp)] mb-6 inline-block hover:underline"
        >
          ← 계산기로 돌아가기
        </Link>

        <h1 className="font-display text-3xl font-bold mb-2">개인정보처리방침</h1>
        <p className="font-mono text-xs text-[var(--ink-soft)] mb-10">시행일: 2026년 8월 28일</p>

        <div className="space-y-8 text-[14px] leading-relaxed text-[var(--ink)]">
          <Section title="1. 수집하는 정보">
            <p>
              프리랜서 종합소득세 계산기(이하 &ldquo;서비스&rdquo;)는 계산 기능 이용을 위해
              이용자가 입력하는 수입금액, 경비율, 공제 인원 등의 정보를 별도의 서버에 저장하지
              않습니다. 입력값은 이용자의 브라우저 내에서만 처리되며, 페이지를 벗어나면
              사라집니다.
            </p>
          </Section>

          <Section title="2. 광고 및 쿠키">
            <p>
              서비스는 운영을 위해 Google AdSense 등 제3자 광고를 게재할 수 있습니다. Google을
              비롯한 광고 제공업체는 이용자에게 맞춤형 광고를 제공하기 위해 쿠키를 사용할 수
              있습니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                Google의 광고 쿠키 사용에 대한 자세한 내용은{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--stamp)] underline underline-offset-2"
                >
                  Google 광고 정책 페이지
                </a>
                에서 확인할 수 있습니다.
              </li>
              <li>
                이용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있으며, 이 경우
                일부 광고 기능이 제한될 수 있습니다.
              </li>
              <li>
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--stamp)] underline underline-offset-2"
                >
                  Google 광고 설정
                </a>
                에서 맞춤형 광고를 비활성화할 수 있습니다.
              </li>
            </ul>
          </Section>

          <Section title="3. 방문 통계 분석">
            서비스는 방문자 수, 페이지 조회수 등 서비스 개선을 위한 목적으로 Google Analytics
            등 분석 도구를 사용할 수 있습니다. 이를 통해 수집되는 정보는 개인을 식별할 수 없는
            형태의 통계 정보입니다.
          </Section>

          <Section title="4. 개인정보의 제3자 제공">
            서비스는 이용자의 개인정보를 별도로 수집하지 않으므로 제3자에게 제공하지 않습니다.
            다만 광고·분석 도구 제공업체(Google 등)가 자체 정책에 따라 쿠키 기반 정보를 처리할
            수 있습니다.
          </Section>

          <Section title="5. 문의처">
            개인정보처리방침에 대한 문의사항은 서비스 내 안내된 연락처로 문의해 주시기
            바랍니다.
          </Section>

          <Section title="6. 방침의 변경">
            이 방침은 관련 법령 또는 서비스 운영 방침에 따라 변경될 수 있으며, 변경 시 이
            페이지를 통해 공지합니다.
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
