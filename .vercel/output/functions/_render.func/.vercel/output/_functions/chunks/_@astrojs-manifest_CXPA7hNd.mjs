import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './astro/server_C0zuP6rZ.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"header[data-astro-cid-3ef6ksr2]{position:fixed;top:0;width:100%;display:flex;justify-content:space-between;align-items:center;padding:0 20px;background-color:#a7a7a7;color:#fff;height:100px;z-index:1000}.logo-header[data-astro-cid-3ef6ksr2]{height:80px}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2]{display:flex;justify-content:space-between;width:35%;margin-right:50px}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{color:#000;text-decoration:none;font-size:2rem;transition:color .1s ease-in-out}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]:hover{color:#fff}footer[data-astro-cid-sz7xmlte]{position:fixed;bottom:0;width:100%;background-color:#a7a7a7;color:#fff;text-align:center;padding:20px;height:60px;z-index:1000}body{font-family:Lato,sans-serif;display:flex;flex-direction:column;height:calc(100vh - 200px);margin:100px 0 80px}body.light-theme{--background-color: #ffffff;--text-color: #000000;--nav-background-color: #a7a7a7;--nav-text-color: #000000}body.dark-theme{--background-color: #121212;--text-color: #ffffff;--nav-background-color: #333333;--nav-text-color: #ffffff}body{background-color:var(--background-color);color:var(--text-color);transition:background-color .3s,color .3s}header[data-astro-cid-ouamjn2i]{background-color:var(--nav-background-color);color:var(--nav-text-color);transition:background-color .3s,color .3s}header[data-astro-cid-ouamjn2i] nav[data-astro-cid-ouamjn2i] a[data-astro-cid-ouamjn2i]{color:var(--nav-text-color)}header[data-astro-cid-ouamjn2i] nav[data-astro-cid-ouamjn2i] a[data-astro-cid-ouamjn2i]:hover{color:var(--text-color)}\n"}],"routeData":{"route":"/api/querydata","isIndex":false,"type":"page","pattern":"^\\/api\\/queryData\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"queryData","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/queryData.astro","pathname":"/api/queryData","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CeBWAiE0.js"}],"styles":[{"type":"external","src":"/_astro/hoisted.CV79g7kv.css"},{"type":"inline","content":"header[data-astro-cid-3ef6ksr2]{position:fixed;top:0;width:100%;display:flex;justify-content:space-between;align-items:center;padding:0 20px;background-color:#a7a7a7;color:#fff;height:100px;z-index:1000}.logo-header[data-astro-cid-3ef6ksr2]{height:80px}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2]{display:flex;justify-content:space-between;width:35%;margin-right:50px}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{color:#000;text-decoration:none;font-size:2rem;transition:color .1s ease-in-out}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]:hover{color:#fff}footer[data-astro-cid-sz7xmlte]{position:fixed;bottom:0;width:100%;background-color:#a7a7a7;color:#fff;text-align:center;padding:20px;height:60px;z-index:1000}body{font-family:Lato,sans-serif;display:flex;flex-direction:column;height:calc(100vh - 200px);margin:100px 0 80px}body.light-theme{--background-color: #ffffff;--text-color: #000000;--nav-background-color: #a7a7a7;--nav-text-color: #000000}body.dark-theme{--background-color: #121212;--text-color: #ffffff;--nav-background-color: #333333;--nav-text-color: #ffffff}body{background-color:var(--background-color);color:var(--text-color);transition:background-color .3s,color .3s}header[data-astro-cid-ouamjn2i]{background-color:var(--nav-background-color);color:var(--nav-text-color);transition:background-color .3s,color .3s}header[data-astro-cid-ouamjn2i] nav[data-astro-cid-ouamjn2i] a[data-astro-cid-ouamjn2i]{color:var(--nav-text-color)}header[data-astro-cid-ouamjn2i] nav[data-astro-cid-ouamjn2i] a[data-astro-cid-ouamjn2i]:hover{color:var(--text-color)}\n"},{"type":"external","src":"/_astro/index.DgrOyYKK.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/src/pages/api/queryData.astro",{"propagation":"none","containsHead":true}],["C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/queryData@_@astro":"pages/api/querydata.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","C:/Users/Pablo Brasero/Desktop/V.I.P/projects/astro-preguntas-basicas/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_DDg9cVtO.mjs","/src/pages/api/queryData.astro":"chunks/queryData_C5MQbB7v.mjs","/src/pages/index.astro":"chunks/index_DpGPKSgP.mjs","\u0000@astrojs-manifest":"manifest_CHJgyZRm.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CeBWAiE0.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.DgrOyYKK.css","/favicon.svg","/_astro/hoisted.CeBWAiE0.js","/_astro/hoisted.CV79g7kv.css"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
