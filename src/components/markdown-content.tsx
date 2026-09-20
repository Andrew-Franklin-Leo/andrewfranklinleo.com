export function MarkdownContent({ html }: { html: string }) {
  return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
