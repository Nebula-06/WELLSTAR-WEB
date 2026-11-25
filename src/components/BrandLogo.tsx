import markImage from "@/assets/wellstar-mark.webp";

/**
 * Wellstar lockup: the drop mark + "WELLSTAR" wordmark with the full name underneath.
 * `inverted` is for dark surfaces (footer, navy panels): the mark sits on a white tile.
 */
export function BrandLogo({ inverted = false, className = "" }: { inverted?: boolean; className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`flex h-11 w-[3.6rem] shrink-0 items-center justify-center transition-[padding,background-color] ${
          inverted ? "rounded-xl bg-white p-1.5 shadow-sm" : "dark:rounded-xl dark:bg-white dark:p-1.5"
        }`}
      >
        <img src={markImage} alt="" width={78} height={58} className="h-full w-full object-contain" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.45rem] font-black tracking-[0.06em] ${
            inverted ? "text-white" : "text-brand-navy dark:text-white"
          }`}
        >
          WELLSTAR
        </span>{" "}
        {/* One text node (wraps to two lines on phones) so the link's spoken name matches what's visible. */}
        <span
          className={`mt-1 max-w-[7.6rem] text-[0.6rem] font-bold uppercase leading-[1.25] tracking-[0.12em] sm:max-w-none ${
            inverted ? "text-[#ff8a98]" : "text-brand-red"
          }`}
        >
          Polyclinic &amp; Diagnostic Centre
        </span>
      </span>
    </span>
  );
}
