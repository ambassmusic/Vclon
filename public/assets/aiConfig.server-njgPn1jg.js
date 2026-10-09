// Standalone, zero-dependency AI Config module chunk
// Eliminates circular dependencies to index-Dh2QSrHi.js and client.server-Dtv9yODj.js

const DEFAULT_PROVIDERS = {
  llm: "gemini-flash",
  tts: "edge-tts",
  image: "gemini-image",
  video: "studio-canvas-engine"
};

let cache = null;

async function resolveProvider(category) {
  let label = category === "llm"
    ? "Gemini 2.5 Flash (API Pool)"
    : category === "image"
    ? "Gemini 2.5 Flash Image Pool"
    : "Edge TTS Voice Engine";

  if (typeof window !== "undefined") {
    try {
      const win = window;
      if (typeof win.__geminiPoolCount === "number" && win.__geminiPoolCount > 0) {
        const count = win.__geminiPoolCount;
        label = category === "llm"
          ? `Gemini 2.5 Flash Pool (${count} Active Key${count > 1 ? "s" : ""})`
          : category === "image"
          ? `Gemini 2.5 Image Pool (${count} Active Key${count > 1 ? "s" : ""})`
          : "Edge TTS Voice Engine";
      } else {
        const res = await fetch("/api/ai/pool-status");
        if (res.ok) {
          const data = await res.json();
          const count = Number(data.activeKeys) || 1;
          win.__geminiPoolCount = count;
          label = category === "llm"
            ? `Gemini 2.5 Flash Pool (${count} Active Key${count > 1 ? "s" : ""})`
            : category === "image"
            ? `Gemini 2.5 Image Pool (${count} Active Key${count > 1 ? "s" : ""})`
            : "Edge TTS Voice Engine";
        }
      }
    } catch {}
  }

  return {
    id: category === "llm" ? "gemini-flash" : category === "image" ? "gemini-image" : "edge-tts",
    label,
    category,
    apiKey: null,
    zeroCostMode: false
  };
}

function clearConfigCache() {
  cache = null;
}

async function logUsage(_event) {
  return Promise.resolve();
}

export {
  clearConfigCache,
  logUsage,
  resolveProvider
};
