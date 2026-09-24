import DashboardFrame from '../../../src/components/dashboard/frame.jsx';
import ErrorNotice from '../../../src/components/dashboard/error-notice.jsx';
import Field from '../../../src/components/dashboard/field.jsx';
import SuccessNotice from '../../../src/components/dashboard/success-notice.jsx';
import SubmitButton from '../../../src/components/dashboard/submit-button.jsx';
import { apiGet } from '../../../src/lib/api-client.js';
import { getApiKey } from '../../../src/lib/session.js';
import { saveAppearance } from '../../../src/actions/appearance.js';

export const dynamic = 'force-dynamic';

export default async function AppearancePage({ searchParams }) {
  const params = await searchParams;

  return (
    <DashboardFrame active="/dashboard/appearance">
      {async () => {
        const apiKey = await getApiKey();
        const res = await apiGet('/tenants/me/appearance', apiKey);
        const appearance = res.ok && res.data?.appearance ? res.data.appearance : {};

        return (
          <div className="flex flex-col gap-8">
            <ErrorNotice searchParams={params} />
            <SuccessNotice searchParams={params} keyName="saved" message="The assistant’s appearance was saved." />
            <div>
              <h1 className="font-display text-3xl font-medium tracking-tight">Appearance</h1>
              <p className="mt-2 text-sm text-muted">The title, accent color, and greeting visitors see in the chat.</p>
            </div>
            <form action={saveAppearance} className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-5">
              <Field
                label="Chat title"
                name="title"
                defaultValue={appearance.title}
                placeholder="Chat with us"
                hint="Shown in the panel’s header."
              />
              <Field
                label="Accent color"
                name="accentColor"
                type="color"
                defaultValue={appearance.accentColor}
                placeholder="#0f7a5a"
                hint="A six-digit hex color, like #0f7a5a."
              />
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Greeting</span>
                <textarea
                  name="greeting"
                  defaultValue={appearance.greeting}
                  placeholder="Ask me anything about our business."
                  required
                  rows={3}
                  maxLength={160}
                  className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                />
                <span className="text-xs text-faint">Shown before the first message.</span>
              </label>
              <SubmitButton>Save appearance</SubmitButton>
            </form>
          </div>
        );
      }}
    </DashboardFrame>
  );
}
