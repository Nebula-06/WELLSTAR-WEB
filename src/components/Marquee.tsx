import { Plus } from "lucide-react";

/** Infinite, pause-on-hover ticker. Items are duplicated once for a seamless loop. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const loop = [...items, ...items];
  return (
    <div className={`group mask-fade-x overflow-hidden ${className}`}>
      <ul className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]">
        {loop.map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
          >
            <span>{item}</span>
            <Plus aria-hidden="true" className="size-6 text-brand-red" strokeWidth={3} />
          </li>
        ))}
      </ul>
    </div>
  );
}
