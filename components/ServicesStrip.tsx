import Link from 'next/link';
import styles from './ServicesStrip.module.css';

const services = [
  { title: 'Junk Removal', copy: 'Furniture, appliances, bulk junk + more', icon: 'truck' },
  { title: 'Property Cleanouts', copy: 'Homes, apartments, garages + move-outs', icon: 'cleanout' },
  { title: 'Furniture Removal', copy: 'Couches, mattresses, tables + oversized items', icon: 'chair' },
  { title: 'Light Demolition', copy: 'Sheds, fixtures + small tear-down projects', icon: 'demo' },
] as const;

function ServiceIcon({ type }: { type: (typeof services)[number]['icon'] }) {
  if (type === 'truck') {
    return (
      <svg className={styles.icon} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M7 42h30V20H17l-5 10v12Z" />
        <path d="M37 28h9l9 9v5H37Z" />
        <circle cx="19" cy="46" r="5" />
        <circle cx="48" cy="46" r="5" />
        <path d="M16 16h21M18 12h19" />
      </svg>
    );
  }

  if (type === 'cleanout') {
    return (
      <svg className={styles.icon} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M9 30 32 11l23 19" />
        <path d="M15 27v26h34V27" />
        <path d="M25 39c2-5 8-7 13-4" />
        <path d="m34 31 4 4-4 4" />
        <path d="M39 44c-3 5-9 6-14 3" />
        <path d="m28 51-4-4 4-4" />
      </svg>
    );
  }

  if (type === 'chair') {
    return (
      <svg className={styles.icon} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M18 34V20c0-7 5-11 14-11s14 4 14 11v14" />
        <path d="M14 31c-5 0-8 4-8 9s3 8 8 8h36c5 0 8-3 8-8s-3-9-8-9c-3 0-5 2-5 5v9H19v-9c0-3-2-5-5-5Z" />
        <path d="M15 48v7M49 48v7" />
      </svg>
    );
  }

  return (
    <svg className={styles.icon} viewBox="0 0 64 64" aria-hidden="true">
      <path d="m14 14 12 12" />
      <path d="m25 9 9 9-10 10-9-9Z" />
      <path d="M29 23 17 49" />
      <path d="M36 35h19v18H36z" />
      <path d="M40 31h11" />
      <path d="m43 42 4-4 4 4-4 4Z" />
      <path d="m31 39-5 3M29 47l-6 1M34 31l-4-4" />
    </svg>
  );
}

export default function ServicesStrip() {
  return (
    <section className={styles.strip} aria-label="Featured junk removal services">
      <div className={styles.inner}>
        {services.map((service) => (
          <Link className={styles.card} href="/services" key={service.title}>
            <ServiceIcon type={service.icon} />
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
