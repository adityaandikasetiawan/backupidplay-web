"use client";
import React from 'react';
import Image from 'next/image';
import { type Article } from '@/types/article';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { resolveHeroImageUrl } from '@/lib/services/imageService';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const content = (article as any).content ?? article.description ?? '';
  const imageSrc = resolveHeroImageUrl((article as any).image ?? (article as any).imageUrl ?? (article as any).thumbnail);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Image */}
      {imageSrc && (
        <div className="mb-12">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100">
            <Image
              src={imageSrc}
              alt={article.title}
              width={1024}
              height={576}
              className="w-full h-auto object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-lg prose-gray max-w-none">
        <div className="article-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={{
              // Headings - rehype-slug
              h1: (props: any) => (
                <h1 {...props} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6 leading-tight">
                  {props.children}
                </h1>
              ),
              h2: (props: any) => (
                <h2 {...props} className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-5 leading-tight">
                  {props.children}
                </h2>
              ),
              h3: (props: any) => (
                <h3 {...props} className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-4 leading-tight">
                  {props.children}
                </h3>
              ),
              h4: (props: any) => (
                <h4 {...props} className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mt-6 mb-3">
                  {props.children}
                </h4>
              ),
              // Paragraphs
              p: (props: any) => (
                <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                  {props.children}
                </p>
              ),
              // Lists
              ul: (props: any) => (
                <ul className="space-y-2 mb-6 ml-6 text-base sm:text-lg">
                  {props.children}
                </ul>
              ),
              ol: (props: any) => (
                <ol className="space-y-2 mb-6 ml-6 text-base sm:text-lg">
                  {props.children}
                </ol>
              ),
              li: (props: any) => (
                <li className="text-gray-700 leading-relaxed text-base sm:text-lg relative">
                  <span className="absolute -left-6 text-black font-bold">•</span>
                  {props.children}
                </li>
              ),
              // Links
              a: (props: any) => (
                <a
                  href={props.href}
                  className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.children}
                </a>
              ),
              // Blockquotes
              blockquote: (props: any) => (
                <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-6 bg-gray-50 rounded-r-lg">
                  <div className="text-gray-700 italic text-base sm:text-lg">
                    {props.children}
                  </div>
                </blockquote>
              ),
              img: (props: any) => {
                const src = props.src;
                if (!src) return null;
                return (
                  <>
                    <Image
                      src={src}
                      alt={props.alt || ''}
                      width={800}
                      height={600}
                      className="my-8 rounded-xl overflow-hidden shadow-md w-full object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </>
                );
              },
              // Code blocks
              code: (props: any) => {
                if (props.inline) {
                  return (
                    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                      {props.children}
                    </code>
                  );
                }
                // Split code into lines and remove trailing empty line
                const codeString = String(props.children);
                let lines = codeString.split(/\r?\n/);
                if (lines.length > 1 && lines[lines.length - 1].trim() === "") {
                  lines = lines.slice(0, -1);
                }
                // Copy button logic
                const [copied, setCopied] = React.useState(false);
                const handleCopy = () => {
                  navigator.clipboard.writeText(codeString);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                };
                return (
                  <div className="my-6 rounded-xl overflow-hidden shadow-lg relative">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="absolute top-2 right-2 bg-gray-800 text-gray-100 px-2 py-1 rounded text-xs font-medium hover:bg-gray-700 transition"
                      aria-label="Copy code"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto w-full text-sm leading-relaxed">
                      <code className="grid grid-cols-[32px_1fr] gap-x-4 min-w-max">
                        {lines.map((line, idx) => (
                          <React.Fragment key={idx}>
                            <span className="text-gray-400 select-none text-right pr-2 font-mono">{idx + 1}</span>
                            <span className="whitespace-pre font-mono">{line}</span>
                          </React.Fragment>
                        ))}
                      </code>
                    </pre>
                  </div>
                );
              },
              // Strong/Bold
              strong: (props: any) => (
                <strong className="font-semibold text-gray-900">
                  {props.children}
                </strong>
              ),
              // Emphasis/Italic
              em: (props: any) => (
                <em className="italic text-gray-800">
                  {props.children}
                </em>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default ArticleContent;
