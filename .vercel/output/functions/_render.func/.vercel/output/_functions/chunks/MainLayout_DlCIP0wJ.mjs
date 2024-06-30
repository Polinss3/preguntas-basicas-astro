import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import { k as createComponent, l as renderTemplate, m as maybeRenderHead, o as createAstro, n as addAttribute, q as renderHead, p as renderComponent, t as renderSlot } from './astro/server_C0zuP6rZ.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                             */

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log("Database URL:", url);
console.log("Auth Token:", authToken);

const turso = createClient({
  url,
  authToken
});

console.log("Turso client:", turso);

// Prueba de consulta simple
async function testConnection() {
  try {
    const result = await turso.execute("SELECT * FROM questionsTable");
    console.log("Test query result:", result);
  } catch (error) {
    console.error("Error executing test query:", error);
  }
}

testConnection();

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <img class="logo-header" src="https://kinsta.com/wp-content/uploads/2023/05/introduction-to-astro-1024x512.jpg" alt="Logo de la app" data-astro-cid-3ef6ksr2> <nav data-astro-cid-3ef6ksr2> <a href="#" data-astro-cid-3ef6ksr2>Home</a> <a href="#" data-astro-cid-3ef6ksr2>Start Learning</a> <a href="#" data-astro-cid-3ef6ksr2>About</a> <a href="#" data-astro-cid-3ef6ksr2>Contact</a> </nav> </header>  `;
}, "C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>© 2023 Astro</p> </footer> `;
}, "C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-ouamjn2i> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-ouamjn2i": true })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-ouamjn2i": true })}  </html>`;
}, "C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, turso as t };
