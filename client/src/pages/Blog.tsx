/**
 * Blog listing page — Construction industry insights for SEO
 * Design: Dark professional theme with amber accents, matching site design
 */
import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogArticles, BLOG_CATEGORIES } from "@/data/blogArticles";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogArticles
      : blogArticles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <SEOHead
        title="Blog | Suddeco AI - Construction Industry Insights"
        description="Expert articles on AI in construction, estimation best practices, NRM1 standards, project management, and business growth for UK construction professionals."
        canonicalPath="/blog"
      />
      <TopBar />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
          <div className="container relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-amber-400 font-semibold tracking-widest text-xs uppercase mb-4"
            >
              Construction Insights
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Industry Knowledge &{" "}
              <span className="text-amber-400">Expert Insights</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Stay ahead with expert articles on AI in construction, estimation
              best practices, UK industry standards, and business growth
              strategies.
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pb-8">
          <div className="container">
            <div className="flex flex-wrap gap-2 justify-center">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-amber-500 text-slate-900"
                      : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="pb-24">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, index) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="group bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 flex flex-col"
                >
                  {/* Cover gradient */}
                  <div
                    className={`h-48 bg-gradient-to-br ${article.coverGradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoNnptMC0zMHY2aC02VjRoNnptMCAzMHY2aC02di02aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs font-medium text-amber-400">
                        <Tag className="w-3 h-3" />
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(article.publishDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors leading-tight">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                      {article.excerpt}
                    </p>

                    {/* Read more */}
                    <Link href={`/blog/${article.slug}`}>
                      <Button
                        variant="ghost"
                        className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 p-0 h-auto font-medium group/btn"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-500 text-lg">
                  No articles found in this category yet. Check back soon.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-b from-slate-800/30 to-transparent">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with{" "}
              <span className="text-amber-400">Industry Insights</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Get the latest construction technology insights, estimation tips,
              and industry news delivered to your workflow.
            </p>
            <a href="https://my.suddeco.com">
              <Button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-3 text-base shadow-lg shadow-amber-500/20">
                Get Started Free
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
