import { lazy, Suspense } from 'react';
import { Switch, Route, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';

const Inscripcion = lazy(() => import('@/pages/Inscripcion'));
const NotFound = lazy(() => import('@/pages/not-found'));

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/inscripcion" component={Inscripcion} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </WouterRouter>
  );
}
