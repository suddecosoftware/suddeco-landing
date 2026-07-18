/**
 * TopBar: Slim utility bar with contact and secondary navigation
 * Design: Forge & Build — subtle dark strip above main nav
 */
import { Download, Home, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-slate-950/80 border-b border-slate-800/50 text-sm hidden sm:block">
      <div className="container flex items-center justify-between gap-6 py-2">
        <div className="flex min-w-0 items-center text-slate-400">
          <a
            href="mailto:sales@suddeco.com"
            className="flex min-w-0 items-center gap-2 hover:text-amber-400 transition-colors"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">sales@suddeco.com</span>
          </a>
        </div>
        <div className="flex shrink-0 items-center gap-4 text-slate-400 lg:gap-6">
          <a
            href="https://suddecohomes.com/?utm_source=site_topbar&utm_campaign=nav_homeowner"
            className="hidden items-center gap-1.5 transition-colors hover:text-amber-300 md:flex"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            For homeowners
          </a>
          <a
            href="/download"
            className="flex items-center gap-1.5 transition-colors hover:text-amber-300"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Get the app
          </a>
          <a
            href="https://my.suddeco.com/sign-in"
            className="font-medium text-slate-300 transition-colors hover:text-white"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
