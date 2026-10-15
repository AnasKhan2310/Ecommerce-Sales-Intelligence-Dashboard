import React from 'react';
import { X, CheckCircle2, FileCode, Database, TrendingUp, User } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-800 border border-slate-100">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#00bac7] flex items-center justify-center bg-[#00bac7]/10 text-[#00bac7]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Data Engineering &amp; Colab Pipeline
              </h2>
              <p className="text-xs text-slate-500 font-mono-numbers">
                UCI Online Retail Dataset · Python 3 / Pandas to React Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs sm:text-sm">
          {/* Section 1 */}
          <section className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h3 className="text-xs uppercase tracking-wider font-bold text-[#00929d] mb-2 flex items-center gap-2 font-mono-numbers">
              <Database className="w-4 h-4 text-[#00bac7]" />
              1. Dataset Provenance &amp; Raw Schema
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs">
              Transaction activity originates from the UK Online Retail dataset at the UCI Machine Learning Repository. It catalogues all line-item purchases between 01/12/2010 and 09/12/2011 for an omnichannel distributor supplying European gift shops.
            </p>
          </section>

          {/* Section 2: Data Cleaning */}
          <section>
            <h3 className="text-xs uppercase tracking-wider font-bold text-[#00929d] mb-3 flex items-center gap-2 font-mono-numbers">
              <FileCode className="w-4 h-4 text-[#00bac7]" />
              2. Data Sanitization Protocol
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#00bac7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Duplicate Purge:</strong> Removed 5,268 exact duplicate rows to prevent artificial inflation of transactional volume.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#00bac7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Cancellations Excluded:</strong> Filtered 17,031 transactions with invoice numbers starting with &apos;C&apos; (representing customer returns and merchant write-offs).
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#00bac7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Price &amp; Quantity Guardrails:</strong> Retained only verified orders where Quantity &gt; 0 and UnitPrice &gt; 0, eliminating test records and postage adjustments.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Strategic Findings */}
          <section className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h3 className="text-xs uppercase tracking-wider font-bold text-[#00929d] mb-3 flex items-center gap-2 font-mono-numbers">
              <TrendingUp className="w-4 h-4 text-[#00bac7]" />
              3. Commercial Takeaways for Leadership
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
              <li>
                <strong className="text-slate-900">Seasonality &amp; Logistics:</strong> Q4 generates over a third of yearly revenue. November sales surge to £1.50M (+30.6% MoM). Logistics and freight capacity must be contracted by August.
              </li>
              <li>
                <strong className="text-slate-900">Wholesale Account Management:</strong> 65.58% repeat rate reflects strong merchant retention. The top 10 accounts contribute &gt;£1.5M in GMV; establishing dedicated wholesale account tiers will protect recurring trade cashflow.
              </li>
              <li>
                <strong className="text-slate-900">High-Value Export Corridors:</strong> Continental markets (Netherlands, EIRE, Germany, France) generate significantly higher average order values than domestic UK transactions.
              </li>
            </ul>
          </section>

          {/* Attribution footer */}
          <div className="p-4 rounded-2xl bg-[#00bac7]/10 border border-[#00bac7]/20 flex items-center justify-between text-xs">
            <span className="text-slate-700">
              Developed by <strong className="text-slate-900">Anas Khan</strong> · Portfolio Analytics Case Study
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold rounded-full bg-[#ffbe3b] hover:bg-[#f59e0b] text-slate-900 shadow-xs transition-colors"
            >
              Close Brief
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
