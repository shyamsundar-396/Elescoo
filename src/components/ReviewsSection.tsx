import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-white text-zinc-950 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
            COMMUNITY & REVIEWS
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 mt-2">
            Loved by 45,000+ Riders
          </h2>
          <p className="text-zinc-500 text-base mt-2">
            See how everyday commuters, long-distance riders and urban adventurers experience Elescoo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-[#F8F9FA] border border-zinc-200/80 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500 bg-white px-2.5 py-0.5 rounded-full border border-zinc-200">
                    {review.model}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-zinc-300 mb-2" />
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-200/70 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-zinc-950">{review.author}</h5>
                  <p className="text-[11px] text-zinc-400">{review.location}</p>
                </div>

                {review.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Owner</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
