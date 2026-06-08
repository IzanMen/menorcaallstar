import { lazy, Suspense } from 'react';
import { Switch, Route, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import { Navbar } from '@/components/Navbar';

const Inscripcion = lazy(() => import('@/pages/Inscripcion'));
const Resultados = lazy(() => import('@/pages/Resultados'));
const NotFound = lazy(() => import('@/pages/not-found'));

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Navbar />
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/inscripcion" component={Inscripcion} />
          <Route path="/resultados" component={Resultados} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </WouterRouter>
  );
}
