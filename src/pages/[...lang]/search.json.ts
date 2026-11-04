import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
export function getStaticPaths() { return [{ params: { lang: undefined } }, { params: { lang: 'en' } }]; }
export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang === 'en' ? 'en' : 'zh', base = lang === 'en' ? '/en' : '';
  const label = lang === 'zh' ? { projects: '项目', writing: '文章', links: '收藏' } : { projects: 'Work', writing: 'Writing', links: 'Collected' };
  const out: object[] = [];
  for (const kind of ['projects', 'writing', 'links'] as const)
    for (const e of await getCollection(kind)) {
      if (e.data.draft || !e.id.startsWith(lang + '/')) continue;
      const ext = kind === 'links';
      out.push({ n: e.data.title, s: e.data.summary, g: e.data.tags.join(' '), k: label[kind], h: ext ? e.data.url : `${base}/${kind}/${e.id.split('/').pop()}/`, ext });
    }
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json' } });
};
