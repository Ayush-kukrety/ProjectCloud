// page.tsx
import dynamic from 'next/dynamic';
import Loader from './loading';

const AnimatedHome = dynamic(() => import('./home'), {
  ssr: false,
  loading: () => <Loader />
});

export default function Home() {
  return <AnimatedHome />;
}