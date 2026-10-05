import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(fs.readFileSync(path.join(root, 'content/site.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(root, 'content/site-pages.json'), 'utf8'));
const out = path.join(root, 'dist');
const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const links = [['/','Home'],['/guides/','가이드 / Guide'],['/license/','이용조건 / License'],['/privacy/','개인정보 / Privacy'],['/terms/','약관 / Terms'],['/about/','소개 / About'],['/contact/','문의 / Contact']];
const css = `:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#080e20;color:#e2e8f0;font:16px/1.8 system-ui,sans-serif}header,main,footer{max-width:960px;margin:auto;padding:24px}header{border-bottom:1px solid #334155}a{color:#a5b4fc;text-underline-offset:4px}nav{display:flex;gap:12px 20px;flex-wrap:wrap}h1{font-size:clamp(1.5rem,5vw,2.4rem);line-height:1.4}h2{font-size:1.3rem;color:#c7d2fe}section{margin:28px 0;padding:20px;border:1px solid #334155;border-radius:16px;background:#0f172a}audio{max-width:100%;width:100%}.button{display:inline-block;padding:10px 18px;background:#3730a3;color:white;border-radius:10px}.specs{display:flex;gap:8px;flex-wrap:wrap}.specs span{background:#1e293b;padding:4px 10px;border-radius:8px}footer{font-size:.85rem;color:#94a3b8}li{margin-bottom:8px}a:focus-visible{outline:3px solid #fbbf24;outline-offset:4px}p{overflow-wrap:anywhere}`;
function shell(title, description, pathname, body, schema, noindex=false) {
 const canonical=site.origin+pathname;
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} | JYE SOUNDS</title><meta name="description" content="${escape(description)}"><meta name="robots" content="${noindex?'noindex,follow':'index,follow'}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><style>${css}</style>${schema?'<script type="application/ld+json">'+JSON.stringify(schema).replaceAll('<','\\u003c')+'</script>':''}</head><body><header><a href="/">${escape(site.name)}</a><nav aria-label="사이트 메뉴">${links.map(([u,l])=>`<a href="${u}">${l}</a>`).join('')}</nav></header><main>${body}</main><footer><nav><a href="https://www.jyesounds.com/">Sound library</a><a href="https://bgm.jyesounds.com/">BGM Studio</a><a href="https://sfxmaker.jyesounds.com/">SFX Studio</a></nav><p>JYE SOUNDS · <a href="mailto:lbhl7585@naver.com">lbhl7585@naver.com</a> · 안내 수정일 / Updated: ${escape(site.updated)}</p></footer></body></html>`;
}
function write(relative, content) { const dest=path.join(out,relative);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,content); }
const urls=[site.origin+'/'];
for(const [key,doc] of Object.entries(pages)) {
 const body=`<h1>${escape(doc.ko.title)}</h1><p>${escape(doc.ko.intro)}</p><a href="#english">English version</a>`+doc.ko.sections.map(([h,p])=>`<section><h2>${escape(h)}</h2><p>${escape(p)}</p></section>`).join('')+`<div id="english" lang="en"><h2>${escape(doc.en.title)}</h2><p>${escape(doc.en.intro)}</p>`+doc.en.sections.map(([h,p])=>`<section><h2>${escape(h)}</h2><p>${escape(p)}</p></section>`).join('')+'</div>';
 write(`${key}/index.html`,shell(doc.ko.title,doc.ko.intro,`/${key}/`,body));urls.push(site.origin+`/${key}/`);
}
if(fs.existsSync(path.join(root,'content/tracks.json'))){
 const tracks=JSON.parse(fs.readFileSync(path.join(root,'content/tracks.json'),'utf8'));
 for(const t of tracks){
  const url=`${site.origin}/sfx/${t.slug}/`;
  const related=tracks.filter(x=>x.id!==t.id&&x.subCategory===t.subCategory).slice(0,3);
  const format=`WAV · ${t.format.sampleRate/1000} kHz · ${t.format.bitDepth}-bit · ${t.format.channels===1?'Mono':'Stereo'}`;
  const body=`<h1>${escape(t.title)}</h1><p>${escape(t.notes.ko.desc)}</p><div class="specs"><span>${escape(format)}</span><span>${escape(t.duration)}</span><span>${escape(t.subCategory||t.category)}</span></div><section><h2>미리듣기 / Preview</h2><audio controls preload="none" src="${escape(t.r2_url)}"></audio><p><a class="button" href="/api/download/${t.id}">WAV 다운로드 / Download WAV</a></p><p>저장 창 또는 브라우저 다운로드 목록에서 결과를 확인해 주세요. Check your browser’s save dialog or downloads list.</p></section><section><h2>사용 예시</h2><p>${escape(t.notes.ko.usage)}</p><p>파일을 프로젝트에 배치한 뒤 앞뒤 구간을 자르고 짧은 페이드를 비교해 보세요. 원본은 따로 보관하세요.</p><div lang="en"><h2>Usage example</h2><p>${escape(t.notes.en.usage)}</p><p>Trim a copy in your project and compare short boundary fades. Keep the original file separately.</p></div></section><section><h2>이용조건 / License</h2><p>창작물 내 상업적·비상업적 활용을 허용합니다. 음원 자체 재배포 및 독점 권리 등록은 제한됩니다. 플랫폼의 자동 클레임은 발생할 수 있습니다.</p><p lang="en">Use in commercial and noncommercial creative projects is permitted. Standalone redistribution and exclusive rights registration are restricted. Automated platform claims can still occur.</p><a href="/license/">전체 이용조건 / Full conditions</a> · <a href="/contact/">문의 / Contact</a></section><section><h2>관련 효과음 / Related sounds</h2><ul>${related.map(x=>`<li><a href="/sfx/${x.slug}/">${escape(x.title)}</a></li>`).join('')}</ul><a href="/">전체 라이브러리 / All sounds</a></section>`;
  const schema={'@context':'https://schema.org','@type':'AudioObject',name:t.title,description:t.notes.ko.desc,url,contentUrl:t.r2_url,encodingFormat:'audio/wav',license:site.origin+'/license/',acquireLicensePage:site.origin+'/license/',publisher:{'@type':'Organization',name:'JYE SOUNDS',url:site.origin+'/'}};
  write(`sfx/${t.slug}/index.html`,shell(t.title,t.notes.ko.desc,`/sfx/${t.slug}/`,body,schema));urls.push(url);
 }
}
write('404.html',shell('페이지를 찾을 수 없습니다 / Page not found','다른 페이지로 이동하거나 라이브러리에서 검색해 주세요.','/404.html','<h1>페이지를 찾을 수 없습니다 / Page not found</h1><p>주소를 확인하거나 <a href="/">홈에서 다시 찾아 주세요.</a></p>',null,true));
write('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>`  <url><loc>${escape(u)}</loc></url>`).join('\n')+'\n</urlset>\n');
write('robots.txt',`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${site.origin}/sitemap.xml\n`);
console.log(`Generated ${urls.length} indexable pages and 404 for ${site.name}`);
