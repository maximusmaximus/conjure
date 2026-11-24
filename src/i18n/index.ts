import en from "./en.json";

export function t(path: string): string {
  let cur: unknown = en;
  for (const part of path.split(".")) {
    if (!cur || typeof cur !== "object" || !(part in (cur as Record<string, unknown>))) return path;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === "string" ? cur : path;
}
