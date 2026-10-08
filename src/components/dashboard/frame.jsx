import { redirect } from 'next/navigation';

import Sidebar from './sidebar.jsx';
import { getTenant } from '../../lib/session.js';

// The sidebar is fixed on every breakpoint; the main column carries a matching left padding so the
// two never overlap. The sidebar owns only its own open/closed state, so the server layout needs no
// client state to stay aligned.
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
