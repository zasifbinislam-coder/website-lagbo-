import { useState } from 'react';
import PageShell from './PageShell.jsx';
import { BLOG_POSTS, t, tr } from '../data/content.js';

const ACCENT = '#6366f1';

const BlogList = ({ onOpen, lang }) => (
  <section className="relative max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20">
    <div className="text-center mb-10 md:mb-14">
      <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
        {t(lang, 'blogHeroBadge')}
      </div>
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mt-4">
        {t(lang, 'blogHeroTitle')}
      </h1>
      <p className="text-[14px] md:text-[16px] text-white/55 mt-3 max-w-2xl mx-auto">
        {t(lang, 'blogHeroSubtitle')}
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {BLOG_POSTS.map((p) => (
        <button
          key={p.slug}
          onClick={() => onOpen(p.slug)}
          className="group text-left rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all hover:-translate-y-1"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <div className="relative h-44 md:h-48 overflow-hidden">
            <img loading="lazy" decoding="async"
              src={p.cover}
              alt={tr(p, 'title', lang)}
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(7,9,26,0.85))' }} />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <span>{tr(p, 'date', lang)}</span>
              <span>·</span>
              <span>{p.readTime} {t(lang, 'blogReadTime')}</span>
            </div>
            <div className="font-display font-extrabold text-white text-[16px] md:text-[17px] mt-2 leading-snug">
              {tr(p, 'title', lang)}
            </div>
            <div className="text-[13px] text-white/55 mt-2 line-clamp-3 leading-relaxed">
              {tr(p, 'excerpt', lang)}
            </div>
            <div className="text-[12.5px] font-bold mt-3 inline-flex items-center gap-1.5 group-hover:gap-2 transition-all" style={{ color: ACCENT }}>
              {t(lang, 'blogReadMore')}
            </div>
          </div>
        </button>
      ))}
    </div>
  </section>
);

const BlogPost = ({ slug, onBack, lang }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  return (
    <article className="relative max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
      <button
        onClick={onBack}
        className="text-[12.5px] font-bold text-white/65 hover:text-white inline-flex items-center gap-1"
      >
        {t(lang, 'blogBack')}
      </button>

      <div className="mt-6 md:mt-8">
        <div className="flex items-center gap-2 text-[11.5px] text-white/50">
          <span>{tr(post, 'date', lang)}</span>
          <span>·</span>
          <span>{post.readTime} {t(lang, 'blogReadTime')}</span>
          <span>·</span>
          <span>{tr(post, 'author', lang)}</span>
        </div>
        <h1 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3 leading-tight">
          {tr(post, 'title', lang)}
        </h1>
      </div>

      <div className="mt-6 md:mt-8 rounded-2xl overflow-hidden border border-white/10">
        <img loading="lazy" decoding="async" src={post.cover} alt={tr(post, 'title', lang)} className="w-full h-56 md:h-72 object-cover" />
      </div>

      <div className="mt-6 md:mt-10 space-y-4 md:space-y-5">
        {tr(post, 'body', lang).map((para, i) => (
          <p key={i} className="text-[14.5px] md:text-[16px] text-white/75 leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
};

export default function BlogPage(props) {
  const [activeSlug, setActiveSlug] = useState(null);
  return (
    <PageShell {...props} current="blog">
      {activeSlug ? (
        <BlogPost slug={activeSlug} onBack={() => setActiveSlug(null)} lang={props.lang} />
      ) : (
        <BlogList onOpen={setActiveSlug} lang={props.lang} />
      )}
    </PageShell>
  );
}
