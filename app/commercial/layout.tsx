import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Junk Removal in Metro Atlanta | Disappear It',
  description:
    'Commercial junk removal and property cleanout support for apartment communities, property managers, businesses and real estate turnovers across Metro Atlanta.',
  alternates: {
    canonical: '/commercial',
  },
  openGraph: {
    title: 'Commercial Junk Removal in Metro Atlanta | Disappear It',
    description:
      'Reliable commercial junk removal and cleanout support for apartments, property managers, businesses and turnovers across Metro Atlanta.',
    url: '/commercial',
    type: 'website',
  },
};

export default function CommercialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
