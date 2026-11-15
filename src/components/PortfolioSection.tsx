import { FormEvent, useState } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/storeData';
import { PortfolioProject } from '../types/store';
import { ResilientImage } from './ResilientImage';

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !projectScope.trim()) return;
    setInquirySubmitted(true);
    setClientName('');
    setClientEmail('');
    setProjectScope('');
  };

  return (
    <section id="portfolio" className="py-14 lg:py-20 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-zinc-500 mb-2">
              Frontend Portfolio · Selected Client Work by Kaleemullah
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 [text-wrap:balance] max-w-2xl">
              Recent e-commerce storefronts and digital product builds.
            </h2>
          </div>

          <p className="text-sm text-zinc-600 max-w-md">
            This storefront serves as a live interactive reference for prospective
            clients evaluating layout clarity, responsive grids, and checkout UX.
          </p>
        </div>

        {/* 3-Column Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PORTFOLIO_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="group border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50 flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-zinc-100 overflow-hidden">
                <ResilientImage
                  src={project.image}
                  alt={project.imageAlt}
                  fallbackTitle={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4 bg-white">
                <div>
                  <p className="text-xs text-zinc-500">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="mt-1.5 font-display text-base font-semibold text-zinc-950">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-zinc-500 truncate">
                    {project.stack.join(' · ')}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-950 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Direct Client Contact Block */}
        <div
          id="contact"
          className="mt-14 pt-12 border-t border-zinc-200 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-medium text-zinc-500">
              Client Inquiries · Available for Frontend Projects
            </p>
            <h3 className="font-display text-2xl font-semibold text-zinc-950 [text-wrap:balance]">
              Testing this link from Kaleemullah’s portfolio?
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Share your storefront or web application requirements below. Every
              project is engineered with clean responsive breakpoints, accessible
              controls, and production-ready React & TypeScript code.
            </p>
          </div>

          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200 rounded-xl p-6 sm:p-8">
            {inquirySubmitted ? (
              <div className="py-6 space-y-3">
                <div className="inline-flex items-center gap-2 text-emerald-700 font-display text-base font-semibold">
                  <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
                  <span>Inquiry received by Kaleemullah</span>
                </div>
                <p className="text-sm text-zinc-600">
                  Thank you for reaching out. Your project brief has been logged for
                  review—you can submit another note anytime.
                </p>
                <button
                  type="button"
                  onClick={() => setInquirySubmitted(false)}
                  className="mt-2 px-4 py-2 text-xs font-medium text-zinc-950 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block text-xs font-medium text-zinc-700 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Jordan Taylor"
                      className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-950"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client-email"
                      className="block text-xs font-medium text-zinc-700 mb-1.5"
                    >
                      Work Email
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="jordan@company.com"
                      className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-950"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="client-scope"
                    className="block text-xs font-medium text-zinc-700 mb-1.5"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="client-scope"
                    rows={3}
                    required
                    value={projectScope}
                    onChange={(e) => setProjectScope(e.target.value)}
                    placeholder="Tell Kaleemullah about your e-commerce storefront, timeline, and goals..."
                    className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-950 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <span className="text-xs text-zinc-500">
                    Responsive Web · E-Commerce UI · React
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                  >
                    Send Project Brief
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close case study"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg bg-white/95 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-zinc-950 cursor-pointer"
            >
              <X className="w-4 h-4" strokeWidth={1.75} />
            </button>

            <div className="aspect-[16/9] bg-zinc-100">
              <ResilientImage
                src={selectedProject.image}
                alt={selectedProject.imageAlt}
                fallbackTitle={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <p className="text-xs text-zinc-500">
                  {selectedProject.client} · {selectedProject.category} · {selectedProject.year}
                </p>
                <h3
                  id="case-study-title"
                  className="mt-1.5 font-display text-xl font-semibold text-zinc-950"
                >
                  {selectedProject.title}
                </h3>
                <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed">
                  {selectedProject.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-zinc-200">
                <div>
                  <h4 className="font-display text-xs font-semibold text-zinc-950 mb-2">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600">
                    {selectedProject.deliverables.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-xs font-semibold text-zinc-950 mb-2">
                    Client Outcome
                  </h4>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    {selectedProject.outcome}
                  </p>
                  <p className="mt-3 text-xs text-zinc-500">
                    Stack: {selectedProject.stack.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
