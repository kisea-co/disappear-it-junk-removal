import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Junk Removal Services in Metro Atlanta | Disappear It',
  description:
    'Junk removal, clean-outs, furniture and appliance removal, construction debris hauling, trash removal and more across Metro Atlanta. Get a free quote from Disappear It Junk & Trash Removal LLC.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Junk Removal Services in Metro Atlanta | Disappear It',
    description:
      'Fast, reliable junk removal, clean-outs, furniture and appliance removal, debris hauling and more across Metro Atlanta.',
    url: '/services',
    type: 'website',
  },
};

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
