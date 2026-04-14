/**
 * BlogArticle: Individual blog article page with SEO and responsive layout
 * Design: Dark professional theme with amber accents, matching site design
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blogArticles";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-slate-100">
        <TopBar />
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-slate-400 mb-8">
            The article you are looking for does not exist or has been moved.
          </p>
          <Link href="/blog">
            <Button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Find related articles (same category, excluding current)
  const related = blogArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <SEOHead
        title={`${article.title} | Suddeco AI Blog`}
        description={article.metaDescription}
        canonicalPath={`/blog/${article.slug}`}
      />
      <StructuredData
        type="article"
        title={article.title}
        description={article.metaDescription}
        author={article.author}
        publishDate={article.publishDate}
        slug={article.slug}
        tags={article.tags}
        category={article.category}
      />
      <TopBar />
      <Navbar />

      <main>
        {/* Article Header */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
          <div className="container relative z-10 max-w-4xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link href="/blog">
                <Button
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-slate-800/50 -ml-3"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </motion.div>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-medium text-amber-400">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight"
            >
              {article.title}
            </motion.h1>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-sm text-slate-400"
            >
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="w-1 h-1 bg-slate-600 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishDate)}
              </span>
              <span className="w-1 h-1 bg-slate-600 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </motion.div>
          </div>
        </section>

        {/* Article Body */}
        <section className="pb-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-8 md:p-12"
            >
              <div className="prose prose-invert prose-lg max-w-none">
                {article.content.map((paragraph, i) => {
                  // Check if paragraph is a heading (bold text)
                  if (
                    paragraph.startsWith("<strong>") &&
                    paragraph.endsWith("</strong>")
                  ) {
                    const text = paragraph.replace(/<\/?strong>/g, "");
                    return (
                      <h2
                        key={i}
                        className="text-2xl font-bold text-white mt-10 mb-4 first:mt-0"
                      >
                        {text}
                      </h2>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-slate-300 leading-relaxed mb-5"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  );
                })}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-slate-700/50">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="pb-20">
            <div className="container max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`}>
                    <div className="group bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-amber-500/30 transition-all duration-300 cursor-pointer">
                      <span className="text-xs text-amber-400 font-medium">
                        {rel.category}
                      </span>
                      <h4 className="text-lg font-bold mt-2 mb-2 group-hover:text-amber-400 transition-colors leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-slate-400 text-sm line-clamp-2">
                        {rel.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-4 text-xs text-slate-500">
                        <span>{formatDate(rel.publishDate)}</span>
                        <span>{rel.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-gradient-to-b from-slate-800/30 to-transparent">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Try{" "}
              <span className="text-amber-400">Suddeco AI</span>?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Experience the future of construction estimation. Upload your
              drawings and get a costed scope of works in minutes.
            </p>
            <a href="https://my.suddeco.com">
              <Button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-3 text-base shadow-lg shadow-amber-500/20">
                Start today
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
