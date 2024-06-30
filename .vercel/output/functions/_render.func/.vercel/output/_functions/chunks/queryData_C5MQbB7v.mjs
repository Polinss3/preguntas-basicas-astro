import { k as createComponent, l as renderTemplate, p as renderComponent, o as createAstro, m as maybeRenderHead, F as Fragment } from './astro/server_C0zuP6rZ.mjs';
import 'kleur/colors';
import 'html-escaper';
import { t as turso, $ as $$MainLayout } from './MainLayout_DlCIP0wJ.mjs';

const $$Astro = createAstro();
const $$QueryData = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$QueryData;
  async function fetchData() {
    try {
      const result = await turso.execute("SELECT * FROM questionsTable");
      console.log("Query result:", result);
      return result.rows;
    } catch (error) {
      console.error("Error executing query:", error);
      return [];
    }
  }
  const data = await fetchData();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Welcome to Astro." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div> <h1>Data from questionsTable</h1> <ul> ${data.length > 0 ? data.map((row) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <li>${row.question}</li> <li>${row.answer}</li> ` })}`) : renderTemplate`<li>No data available</li>`} </ul> </div> </main> ` })}`;
}, "C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/src/pages/api/queryData.astro", void 0);

const $$file = "C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/src/pages/api/queryData.astro";
const $$url = "/api/queryData";

export { $$QueryData as default, $$file as file, $$url as url };
