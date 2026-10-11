import { redirect } from 'next/navigation';

import Sidebar from './sidebar.jsx';
import { getTenant } from '../../lib/session.js';

// The main column carries matching left padding so the fixed sidebar never overlaps it; the sidebar owns its own state, so the layout needs no client state.
export default async function DashboardFrame({ active, children }) {
  const tenant = await getTenant();
  if (!tenant) redirect('/dashboard/sign-in');

  return (
    <div className="min-h-screen bg-paper">
      <Sidebar active={active} tier={tenant.tier} />
      <main className="min-w-0 px-5 pb-10 pt-20 sm:px-8 lg:pb-10 lg:pl-72 lg:pt-10">
        <div className="mx-auto max-w-5xl">{children(tenant)}</div>
      </main>
    </div>
  );
}
