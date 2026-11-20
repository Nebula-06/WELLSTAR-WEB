import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} id={id} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
