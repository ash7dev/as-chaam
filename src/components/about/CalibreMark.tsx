/** Petit cadran gradué avec son repère glacier : rappelle le cadran de /projets. */
export function CalibreMark() {
  return (
    <span aria-hidden="true" className="relative size-10 shrink-0">
      <span className="calibre-ticks absolute inset-0 rounded-full" />
      <span className="absolute inset-0 rounded-full border border-line-strong" />
      <span className="absolute -top-1.5 left-1/2 h-3.5 w-0.5 -translate-x-1/2 rounded-pill bg-accent" />
    </span>
  );
}
