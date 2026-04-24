import dynamicLoad from 'next/dynamic';

export const dynamic = 'force-dynamic';

const Home = dynamicLoad(() => import('@/components/home'));

export default function HomePage() {
  return <Home />;
}
