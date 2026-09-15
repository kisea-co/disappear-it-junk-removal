import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Free Junk Removal Estimate | Disappear It Atlanta',
  description:
    'Request a free residential or commercial junk removal estimate from Disappear It Junk & Trash Removal LLC, serving Metro Atlanta and surrounding communities.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Get a Free Junk Removal Estimate | Disappear It Atlanta',
    description:
      'Request a free residential or commercial junk removal estimate from Disappear It Junk & Trash Removal LLC.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
