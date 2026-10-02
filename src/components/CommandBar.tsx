import Link from "next/link";
import { BriefLauncher } from "@/components/brief/BriefLauncher";
import { mainNav } from "@/config/site";

/** Navigation principale : une barre flottante en bas d'écran, à portée de pouce. */
export function CommandBar() {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl items-center gap-2 rounded-pill border border-line-strong bg-surface p-1.5 sm:bottom-6"
    >
      <ul className="flex flex-1 gap-1.5 overflow-x-auto">
        {mainNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex min-h-11 items-center whitespace-nowrap rounded-pill border border-line px-4 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-text"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <BriefLauncher />
    </nav>
  );
}
