import { redirect } from 'next/navigation';

import DashboardNav from './nav.jsx';
import { getTenant } from '../../lib/session.js';

export default async function DashboardFrame({ active, children }) {
  const tenant = await getTenant();
  if (!tenant) redirect('/dashboard/sign-in');

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 lg:flex-row">
      <DashboardNav active={active} />
      <main className="min-w-0 flex-1">{children(tenant)}</main>
    </div>
  );
}
