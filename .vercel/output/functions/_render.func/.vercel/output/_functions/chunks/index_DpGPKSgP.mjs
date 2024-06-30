import { k as createComponent, l as renderTemplate, m as maybeRenderHead, n as addAttribute, p as renderComponent, o as createAstro } from './astro/server_C0zuP6rZ.mjs';
import 'kleur/colors';
import 'html-escaper';
import { t as turso, $ as $$MainLayout } from './MainLayout_DlCIP0wJ.mjs';
import 'clsx';
/* empty css                         */

const $$ContenedorPreguntas = createComponent(async ($$result, $$props, $$slots) => {
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
  return renderTemplate`${maybeRenderHead()}<section class="section-preguntas"${addAttribute(`${JSON.stringify(data)}`, "data-questions")} data-astro-cid-ukc7lxmf> <article class="article-titulo" data-astro-cid-ukc7lxmf> <h1 data-astro-cid-ukc7lxmf>Quiz preguntas básicas</h1> </article> <article class="article-preguntas" data-astro-cid-ukc7lxmf> <h2 data-astro-cid-ukc7lxmf>Cargando pregunta...</h2> </article> <article class="article-respuesta-escrita" data-astro-cid-ukc7lxmf> <input class="input-respuesta" type="text" placeholder="Escribe tu respuesta aquí" data-astro-cid-ukc7lxmf> </article> <article class="article-botones" data-astro-cid-ukc7lxmf> <div class="contenedor-botones-preguntas" data-astro-cid-ukc7lxmf> <button class="custom-button" id="previousButton" onclick="window.handlePrevious()" data-astro-cid-ukc7lxmf>Anterior</button> <button class="custom-button" id="hintButton" onclick="window.handleHint()" data-astro-cid-ukc7lxmf>Pista</button> <button class="custom-button" id="verifyButton" onclick="window.handleVerify()" data-astro-cid-ukc7lxmf>Verificar</button> <button class="custom-button" id="nextButton" onclick="window.handleNext()" data-astro-cid-ukc7lxmf>Siguiente</button> </div> </article> <article class="article-respuestas" data-astro-cid-ukc7lxmf> <p style="display: none;" data-astro-cid-ukc7lxmf>Cargando respuesta...</p> <!-- Respuesta oculta inicialmente --> <div id="hintModal" class="modal" data-astro-cid-ukc7lxmf> <div class="modal-content" data-astro-cid-ukc7lxmf> <span class="close" data-astro-cid-ukc7lxmf>&times;</span> <div id="hintsContainer" data-astro-cid-ukc7lxmf> <ul id="hintList" data-astro-cid-ukc7lxmf></ul> <p id="noMoreHints" style="display: none; color: red;" data-astro-cid-ukc7lxmf>
No hay más pistas disponibles.
</p> </div> </div> </div> </article> <article class="aviso" data-astro-cid-ukc7lxmf></article> <!-- Aviso para mostrar mensajes de intentos --> </section>  `;
}, "C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/src/components/ContenedorPreguntas.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Welcome to Astro.", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ContenedorPreguntas", $$ContenedorPreguntas, { "data-astro-cid-j7pv25f6": true })} </main> ` })} `;
}, "C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/src/pages/index.astro", void 0);

const $$file = "C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
