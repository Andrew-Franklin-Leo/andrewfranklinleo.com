'use client';

import { useState } from 'react';

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="share-links">
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-link" aria-label="Share on LinkedIn">Li</a>
      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-link" aria-label="Share on X">X</a>
      <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} className="share-link" aria-label="Share via email">Em</a>
      <button onClick={handleCopy} className="share-link" aria-label="Copy link" style={{ cursor: 'pointer', background: copied ? 'rgba(245,166,35,0.12)' : 'transparent', borderColor: copied ? 'var(--accent-gold)' : undefined, color: copied ? 'var(--accent-gold)' : undefined }}>
        {copied ? 'OK' : 'Cp'}
      </button>
    </div>
  );
}
