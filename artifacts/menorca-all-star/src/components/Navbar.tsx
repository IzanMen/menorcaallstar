import { Link } from 'wouter';

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between pointer-events-auto">
        <Link href="/" className="flex items-center">
          <img
            src="/menorca-all-star-logo.png"
            alt="Menorca All Star"
            className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(226,18,18,0.4)]"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/inscripcion"
            className="px-3 sm:px-4 py-1.5 rounded-full text-[0.6rem] sm:text-xs font-bold tracking-widest uppercase text-white/60 hover:text-white border border-transparent hover:border-white/10 transition-all duration-300"
            data-testid="link-nav-inscripciones"
          >
            Inscripciones
          </Link>
          <Link
            href="/resultados"
            className="px-3 sm:px-4 py-1.5 rounded-full text-[0.6rem] sm:text-xs font-bold tracking-widest uppercase text-primary border border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(226,18,18,0.25)] transition-all duration-300"
            data-testid="link-nav-resultados"
          >
            Resultados <span className="hidden sm:inline">en directo</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
