'use client';

import React, { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const headings = Array.from(
      article.querySelectorAll('h2, h3')
    );

    const tocItems: TocItem[] = headings.map((heading) => ({
      id: heading.id,
      title: heading.textContent || '',
      level: Number(heading.tagName.replace('H', '')),
    }));

    setToc(tocItems);
  }, []);

  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) {
          setActiveId(intersectingEntry.target.id);
        }
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (toc.length === 0) return null;

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-xs">
        <nav>
          <ul className="space-y-2">
            {toc.map((item) => (
              <li 
                key={item.id}
                className={`border-l-2 transition-colors ${
                  activeId === item.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
                style={{ paddingLeft: `${(item.level - 2) * 16 + 16}px` }}
              >
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`text-left py-2 px-0 hover:text-orange-600 transition-colors block w-full text-sm leading-relaxed ${
                    activeId === item.id 
                      ? 'text-orange-700 font-medium' 
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;