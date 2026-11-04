import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
export function getStaticPaths() { return [{ params: { lang: undefined } }, { params: { lang: 'en' } }]; }
export async function GET(ctx: APIContext) {
  const lang = ctx.params.lang === 'en' ? 'en' : 'zh', base = lang === 'en' ? '/en' : '';
  const posts = (await getCollection('writing')).filter((e) => !e.data.draft && e.id.startsWith(lang + '/'));
  return rss({
    title: 'KUDEW', description: lang === 'zh' ? '让想法，保持新鲜。' : 'Ideas, fresh by nature.', site: ctx.site!,
    items: posts.map((e) => ({ title: e.data.title, pubDate: e.data.date, description: e.data.summary, link: `${base}/writing/${e.id.split('/').pop()}/` })),
    customData: `<language>${lang === 'zh' ? 'zh-CN' : 'en'}</language>`,
  });
}
