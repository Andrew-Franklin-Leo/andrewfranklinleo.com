/**
 * GitHub Intelligence Scanner for AINEFF Ecosystem
 *
 * Scans monitored repositories for new releases, trending repos in
 * relevant topics, and generates a weekly research digest.
 *
 * Usage: npx tsx scripts/scan-github-trends.ts
 * Output: Markdown report to stdout
 */

const MONITORED_REPOS = [
  'karpathy/autoresearch',
  'microsoft/autogen',
  'langchain-ai/langgraph',
  'crewAIInc/crewAI',
  'anthropics/claude-code',
  'modelcontextprotocol/servers',
  'huggingface/transformers',
  'ollama/ollama',
  'open-webui/open-webui',
  'All-Hands-AI/OpenHands',
  'princeton-nlp/SWE-agent',
  'significant-gravitas/AutoGPT',
  'BerriAI/litellm',
  'letta-ai/letta',
  'langgenius/dify',
  'run-llama/llama_index',
];

const SEARCH_TOPICS = [
  'agentic-ai',
  'multi-agent',
  'autonomous-agents',
  'self-healing-systems',
  'llm-agents',
  'agent-framework',
  'mcp-server',
  'nature-inspired-computing',
  'swarm-intelligence',
];

const AINEFF_SYSTEMS = [
  'Aureya OS',
  'Tower Control',
  'AINE',
  'AINEF',
  'AINEG',
  'WGE',
  'E-AEGL',
  'JRAS',
  'Agent Assembly',
  'Organism Evolution',
  'Knowledge Graph',
  'Aureya Local',
  'Aureya Notebook',
  'Aureya Code',
  'Aureya Hub',
  'Maxwork',
];

interface RepoInfo {
  full_name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  language: string;
  topics: string[];
}

interface Release {
  tag_name: string;
  published_at: string;
  html_url: string;
  body: string;
}

async function githubFetch(url: string): Promise<unknown> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'aineff-auto-research',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text}`);
  }
  return res.json();
}

async function getRepoInfo(repo: string): Promise<RepoInfo> {
  return (await githubFetch(`https://api.github.com/repos/${repo}`)) as RepoInfo;
}

async function getLatestRelease(repo: string): Promise<Release | null> {
  try {
    return (await githubFetch(
      `https://api.github.com/repos/${repo}/releases/latest`
    )) as Release;
  } catch {
    return null;
  }
}

async function searchTrendingRepos(topic: string): Promise<RepoInfo[]> {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const data = (await githubFetch(
    `https://api.github.com/search/repositories?q=topic:${topic}+pushed:>${weekAgo}&sort=stars&order=desc&per_page=5`
  )) as { items: RepoInfo[] };

  return data.items || [];
}

function assessRelevance(repo: RepoInfo): {
  score: number;
  targetSystems: string[];
} {
  const desc = `${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();
  let score = 0;
  const targetSystems: string[] = [];

  // Multi-agent / orchestration
  if (desc.match(/multi.?agent|orchestrat|coordinat/)) {
    score += 3;
    targetSystems.push('Agent Assembly', 'Tower Control');
  }
  // Self-healing / feedback
  if (desc.match(/self.?heal|feedback|closed.?loop|autonom/)) {
    score += 3;
    targetSystems.push('Organism Evolution', 'E-AEGL');
  }
  // Workflow / task
  if (desc.match(/workflow|task|sprint|pipeline/)) {
    score += 2;
    targetSystems.push('WGE', 'JRAS');
  }
  // Governance / compliance
  if (desc.match(/govern|complian|audit|policy/)) {
    score += 2;
    targetSystems.push('E-AEGL', 'AINEG');
  }
  // Local LLM / model serving
  if (desc.match(/local|ollama|llm.?serv|model.?deploy/)) {
    score += 2;
    targetSystems.push('Aureya Local', 'Aureya Hub');
  }
  // Code / development
  if (desc.match(/code|develop|ide|terminal|cli/)) {
    score += 1;
    targetSystems.push('Aureya Code');
  }
  // Research / notebook
  if (desc.match(/research|notebook|document|citation/)) {
    score += 1;
    targetSystems.push('Aureya Notebook');
  }
  // MCP / tools
  if (desc.match(/mcp|model.?context|tool.?use/)) {
    score += 2;
    targetSystems.push('Aureya Code', 'Tower Control');
  }
  // Nature-inspired
  if (desc.match(/swarm|evolut|genetic|neural|bio.?inspir/)) {
    score += 2;
    targetSystems.push('Organism Evolution', 'Aureya OS');
  }
  // Knowledge graph
  if (desc.match(/knowledge.?graph|ontolog|neo4j|graph.?db/)) {
    score += 2;
    targetSystems.push('Knowledge Graph', 'Tower Control');
  }

  // Star bonus
  if (repo.stargazers_count > 10000) score += 2;
  else if (repo.stargazers_count > 1000) score += 1;

  return { score: Math.min(score, 10), targetSystems: [...new Set(targetSystems)] };
}

async function main() {
  const lines: string[] = [];
  const week = new Date().toISOString().split('T')[0];

  lines.push(`# AINEFF Auto-Research Digest — ${week}`);
  lines.push('');
  lines.push(
    'Automated intelligence scan of GitHub repositories and trending topics relevant to the AINEFF autonomous AI ecosystem.'
  );
  lines.push('');

  // Section 1: Monitored repos — new releases
  lines.push('## 1. Monitored Repository Updates');
  lines.push('');
  lines.push('| Repository | Stars | Latest Release | Updated |');
  lines.push('|---|---|---|---|');

  for (const repo of MONITORED_REPOS) {
    try {
      const info = await getRepoInfo(repo);
      const release = await getLatestRelease(repo);
      const relStr = release
        ? `[${release.tag_name}](${release.html_url})`
        : 'No releases';
      const updated = new Date(info.updated_at).toISOString().split('T')[0];
      lines.push(
        `| [${info.full_name}](${info.html_url}) | ${info.stargazers_count.toLocaleString()} | ${relStr} | ${updated} |`
      );
    } catch (err) {
      lines.push(`| ${repo} | Error | — | — |`);
    }
    // Rate limit: 100ms between requests
    await new Promise((r) => setTimeout(r, 100));
  }

  lines.push('');

  // Section 2: Trending repos by topic
  lines.push('## 2. Trending Repositories by Topic');
  lines.push('');

  for (const topic of SEARCH_TOPICS) {
    lines.push(`### Topic: \`${topic}\``);
    lines.push('');

    try {
      const repos = await searchTrendingRepos(topic);
      if (repos.length === 0) {
        lines.push('No new trending repos this week.');
      } else {
        for (const repo of repos) {
          const { score, targetSystems } = assessRelevance(repo);
          if (score >= 2) {
            lines.push(
              `- **[${repo.full_name}](${repo.html_url})** (${repo.stargazers_count.toLocaleString()} stars)`
            );
            lines.push(`  - ${repo.description || 'No description'}`);
            lines.push(`  - Relevance: ${score}/10`);
            lines.push(`  - Target Systems: ${targetSystems.join(', ')}`);
            lines.push(`  - Language: ${repo.language || 'Unknown'}`);
            lines.push('');
          }
        }
      }
    } catch (err) {
      lines.push(`Error scanning topic: ${err}`);
    }

    lines.push('');
    await new Promise((r) => setTimeout(r, 200));
  }

  // Section 3: Integration recommendations
  lines.push('## 3. Integration Recommendations');
  lines.push('');
  lines.push(
    'Based on this scan, the following AINEFF systems have the most relevant new external contributions:'
  );
  lines.push('');

  const systemMentions: Record<string, number> = {};
  for (const sys of AINEFF_SYSTEMS) systemMentions[sys] = 0;

  // Count mentions from the output above (simplified)
  const fullText = lines.join('\n');
  for (const sys of AINEFF_SYSTEMS) {
    const regex = new RegExp(sys.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    systemMentions[sys] = (fullText.match(regex) || []).length;
  }

  const sorted = Object.entries(systemMentions)
    .sort((a, b) => b[1] - a[1])
    .filter(([, count]) => count > 0);

  for (const [sys, count] of sorted) {
    lines.push(`- **${sys}**: ${count} relevant findings`);
  }

  lines.push('');
  lines.push('---');
  lines.push(
    '*Generated by AINEFF Auto-Research Intelligence Scanner. Review findings and create integration tickets for high-relevance items (score 7+).*'
  );

  console.log(lines.join('\n'));
}

main().catch((err) => {
  console.error('Auto-research scan failed:', err);
  process.exit(1);
});
