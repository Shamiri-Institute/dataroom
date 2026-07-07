// Shamiri: the OpenAI v6 SDK throws at construction when no API key is set,
// which breaks `next build` in environments without OPENAI_API_KEY. Construct
// the client lazily on first use so AI features fail at call time instead.
import OpenAI from "openai";

let client: OpenAI | null = null;

export const openai: OpenAI = new Proxy({} as OpenAI, {
  get(_target, prop) {
    if (!client) {
      client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    const value = (client as any)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
