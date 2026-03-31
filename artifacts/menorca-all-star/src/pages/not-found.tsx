import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-6">
        <p className="text-xs text-primary/60 font-bold tracking-[0.5em] uppercase mb-4">Error 404</p>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">PÁGINA<br />NO ENCONTRADA</h1>
        <p className="text-muted-foreground mb-10 text-sm">Esta ruta no existe en el universo Menorca All Star.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary text-xs font-bold tracking-widest uppercase rounded-full hover:bg-primary/10 transition-colors duration-300">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
