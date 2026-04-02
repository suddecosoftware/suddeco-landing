/**
 * TopBar: Slim utility bar with contact info and auth links
 * Design: Forge & Build — subtle dark strip above main nav
 */
import { Phone, Mail, LogIn, UserPlus } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-slate-950/80 border-b border-slate-800/50 text-sm hidden sm:block">
      <div className="container flex items-center justify-between py-2">
        <div className="flex items-center gap-6 text-slate-400">
          <a
            href="tel:+442036338086"
            className="flex items-center gap-2 hover:text-amber-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+44 20 3633 8086</span>
          </a>
          <a
            href="mailto:sales@suddeco.com"
            className="flex items-center gap-2 hover:text-amber-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>sales@suddeco.com</span>
          </a>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <a
            href="https://my.suddeco.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </a>
          <a
            href="https://my.suddeco.com"
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </a>
        </div>
      </div>
    </div>
  );
}
