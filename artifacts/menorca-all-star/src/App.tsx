import { useEffect } from 'react';
import { Switch, Route, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import Inscripcion from '@/pages/Inscripcion';
import NotFound from '@/pages/not-found';
import Lenis from 'lenis';

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf: number;
    function animate(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <SmoothScroll />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/inscripcion" component={Inscripcion} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}
