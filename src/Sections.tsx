import React, { useState } from 'react';

export function PlatformSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: '01',
      title: 'zero-knowledge encryption',
      tag: 'cryptography',
      desc: 'end-to-end mathematical guarantees ensuring your database cannot be inspected, even in memory dumps or insider exfiltration attempts.',
      specs: ['post-quantum Kyber-1024', 'hardware enclave HSM', 'distributed key shares'],
    },
    {
      id: '02',
      title: 'autonomous anomaly prevention',
      tag: 'runtime security',
      desc: 'sub-millisecond behavioral pattern matching detecting credential leaks and privilege escalations before payloads trigger.',
      specs: ['0.4ms latency penalty', 'zero false-positive SLA', 'automated circuit breakers'],
    },
    {
      id: '03',
      title: 'unified policy orchestration',
      tag: 'governance',
      desc: 'write access boundaries once in declarative code and propagate across multicloud clusters, serverless workers, and local dev environments.',
      specs: ['SOC2 Type II certified', 'HIPAA & GDPR ready', 'gitops policy sync'],
    },
  ];

  return (
    <section id="platform" className="relative py-28 px-6 md:px-12 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-white/50">architecture</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white hero-title">
              engineered for absolute confidentiality
            </h2>
          </div>
          <p className="text-sm text-white/60 max-w-sm leading-relaxed">
            securify transforms traditional perimeter defense into an immutable cryptographic fabric that isolates every micro-transaction.
          </p>
        </div>

        {/* Feature Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((f, idx) => (
            <div
              key={f.id}
              onClick={() => setActiveFeature(idx)}
              className={`p-8 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                activeFeature === idx
                  ? 'bg-neutral-900/90 border-white/40 shadow-2xl'
                  : 'bg-neutral-950/60 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-white/40">{f.id}</span>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  {f.desc}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                {f.specs.map((spec) => (
                  <div key={spec} className="flex items-center gap-2 text-[11px] text-white/60 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Terminal / Code inspect preview */}
        <div className="rounded-3xl border border-white/10 bg-neutral-950 p-6 md:p-8">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="ml-2 text-xs font-mono text-white/40">securify-cli inspect --policy</span>
            </div>
            <span className="text-[11px] font-mono text-white/60">runtime: active • zero-loss verified</span>
          </div>

          <pre className="font-mono text-xs md:text-sm text-white/80 overflow-x-auto leading-relaxed">
            <code>
{`// securify enterprise shield v4.8
import { createGuard } from '@securify/engine';

export const vault = createGuard({
  algorithm: 'KYBER-1024-PQ',
  isolationLevel: 'zero-leak-enclave',
  keyRotationPolicy: 'dynamic-ephemeral',
  fallbackAction: 'seal-node-silently'
});

await vault.enforce({ tenant: 'eu-west-cluster-9', latencyBudget: '0.4ms' });`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

export function SolutionsSection() {
  const cases = [
    {
      title: 'financial technology',
      role: 'pci-dss & instant settlement',
      description: 'protect user balances, card credentials, and high-frequency order books with hardware-bound enclave keys.',
      metric: '0.00ms',
      metricLabel: 'data exposure rate',
    },
    {
      title: 'generative ai workloads',
      role: 'rag & model weights privacy',
      description: 'feed private proprietary datasets into llms without training leakage or multi-tenant memory bleeding.',
      metric: '100%',
      metricLabel: 'confidential execution',
    },
    {
      title: 'healthtech & records',
      role: 'hipaa audit & compliance',
      description: 'anonymize patient diagnostic files with verifiable cryptographic proofs matching zero-trust healthcare standards.',
      metric: '99.999%',
      metricLabel: 'audit resilience',
    },
    {
      title: 'defense & infrastructure',
      role: 'air-gapped resilience',
      description: 'distributed failover nodes capable of continuing cryptographic verification with zero external connection.',
      metric: '< 24hr',
      metricLabel: 'full compliance audit',
    },
  ];

  return (
    <section id="solutions" className="relative py-28 px-6 md:px-12 bg-neutral-950 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white/70" />
              <span className="text-xs uppercase tracking-widest text-white/50">applications</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white hero-title">
              solutions tailored for critical workloads
            </h2>
          </div>
          <p className="text-sm text-white/60 max-w-sm leading-relaxed">
            from regulated fintech protocols to next-generation sovereign ai stacks, securify delivers instant compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <div
              key={c.title}
              className="p-8 rounded-3xl bg-black border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-white/50 font-mono">{c.role}</span>
                  <div className="h-px w-12 bg-white/20" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">
                  {c.title}
                </h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed mb-8">
                  {c.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl md:text-3xl font-medium text-white tabular-nums">
                    {c.metric}
                  </div>
                  <div className="text-[11px] text-white/60 uppercase tracking-wider mt-0.5">
                    {c.metricLabel}
                  </div>
                </div>
                <span className="text-xs text-white/40 hover:text-white transition-colors cursor-pointer">
                  explore case study →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CompanySection() {
  const values = [
    {
      num: '01',
      headline: 'mathematical determinism',
      body: 'we do not believe in trust. we believe in peer-reviewed mathematics and reproducible cryptography.',
    },
    {
      num: '02',
      headline: 'zero-latency impact',
      body: 'security that degrades developer experience or customer performance is failed security. we design for zero lag.',
    },
    {
      num: '03',
      headline: 'open auditability',
      body: 'our core algorithms undergo continuous external red teaming and verifiable bug bounties with top cryptographic labs.',
    },
  ];

  return (
    <section id="company" className="relative py-28 px-6 md:px-12 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white/70" />
              <span className="text-xs uppercase tracking-widest text-white/50">our mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white hero-title mb-6">
              we are restoring digital sovereignty to every organisation
            </h2>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              founded in 2024 by security engineers and distributed systems researchers, securify was created with a single premise: in an interconnected world, privacy is not a feature — it is the fundamental foundation of trust.
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              today, over 65,000 engineering teams protect petabytes of customer information with our autonomous cryptographic infrastructure.
            </p>
          </div>

          <div className="space-y-6">
            {values.map((v) => (
              <div
                key={v.num}
                className="p-6 rounded-2xl bg-neutral-950 border border-white/10 flex items-start gap-4"
              >
                <span className="text-sm font-mono text-white/40 pt-0.5">{v.num}</span>
                <div>
                  <h4 className="text-base font-medium text-white mb-1.5">{v.headline}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global stats banner */}
        <div className="rounded-3xl bg-neutral-900/60 border border-white/10 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-medium text-white">+140</div>
            <div className="text-xs text-white/60 mt-1">global pop nodes</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-medium text-white">99.999%</div>
            <div className="text-xs text-white/60 mt-1">sla uptime guarantee</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-medium text-white">&lt;0.5ms</div>
            <div className="text-xs text-white/60 mt-1">handshake overhead</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-medium text-white">0</div>
            <div className="text-xs text-white/60 mt-1">historical key breaches</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SupportSection({ onGetStarted }: { onGetStarted: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'how does securify integrate into our current cloud architecture?',
      a: 'securify functions either as a transparent sidecar proxy in kubernetes, an sdk library inside your node/go/python services, or an api gateway plugin. zero code rewrites required.',
    },
    {
      q: 'what happens if your servers go down? can we still decrypt our data?',
      a: 'yes. securify uses client-held ephemeral master keys split via shamir secret sharing. your services remain 100% operational even in a total network partition.',
    },
    {
      q: 'is it compliant with gdpr, hipaa, and soc2 standards?',
      a: 'all securify deployments are pre-configured to satisfy soc2 type ii, hipaa physical and technical safeguards, and gdpr article 32 data pseudonymization guidelines.',
    },
    {
      q: 'can we deploy securify on-premise or within air-gapped VPCs?',
      a: 'enterprise plans include sovereign self-hosted images designed for govcloud, dedicated bare-metal racks, and completely air-gapped data centers.',
    },
  ];

  return (
    <section id="support" className="relative py-28 px-6 md:px-12 bg-neutral-950 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white/70" />
            <span className="text-xs uppercase tracking-widest text-white/50">knowledge & answers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white hero-title mb-4">
            frequently asked questions
          </h2>
          <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed">
            everything you need to understand how securify guards your mission-critical infrastructure.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-20">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="rounded-2xl border border-white/10 bg-black p-6 cursor-pointer hover:border-white/25 transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm md:text-base font-medium text-white">{faq.q}</span>
                <span className="text-lg text-white/50 select-none font-mono">
                  {openFaq === idx ? '−' : '+'}
                </span>
              </div>
              {openFaq === idx && (
                <p className="text-xs md:text-sm text-white/70 mt-4 leading-relaxed pt-4 border-t border-white/10">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl border border-white/20 bg-neutral-900/90 backdrop-blur p-8 md:p-12 text-center relative overflow-hidden">
          <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight hero-title mb-3">
            ready to make your data impenetrable?
          </h3>
          <p className="text-xs md:text-sm text-white/70 max-w-md mx-auto mb-8 leading-relaxed">
            join +65,000 security engineers and startups protecting high-value user data today.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="bg-white text-black text-sm font-normal rounded-full px-8 py-3.5 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              get started now
            </button>
            <a
              href="#platform"
              className="text-white text-sm border border-white/20 rounded-full px-7 py-3 hover:bg-white/10 transition-colors"
            >
              read documentation
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-16 mt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 256 256"
              className="h-4 w-4"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
            </svg>
            <span className="text-white font-medium">securify inc.</span>
            <span>— all rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#platform" className="hover:text-white transition-colors">privacy policy</a>
            <a href="#solutions" className="hover:text-white transition-colors">terms of service</a>
            <a href="#support" className="hover:text-white transition-colors">security disclosures</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
