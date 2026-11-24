import { get, setBase } from "xeroemoji";

let based = false;

/** Self-hosted subset. Never hotlink the CDN at runtime. */
export function xeSrc(emoji: string): string {
  if (!based) {
    setBase("/xeroemoji/");
    based = true;
  }
  return get(emoji)?.svgUrl ?? "";
}

export function XeIcon({
  emoji,
  className,
}: {
  emoji: string;
  className?: string;
}) {
  const src = xeSrc(emoji);
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className ? `xe ${className}` : "xe"}
    />
  );
}
