import DashboardFrame from '../../../src/components/dashboard/frame.jsx';
import ErrorNotice from '../../../src/components/dashboard/error-notice.jsx';
import Field from '../../../src/components/dashboard/field.jsx';
import SuccessNotice from '../../../src/components/dashboard/success-notice.jsx';
import SubmitButton from '../../../src/components/dashboard/submit-button.jsx';
import { saveWebhook } from '../../../src/actions/webhooks.js';

export const dynamic = 'force-dynamic';

export default async function WebhooksPage({ searchParams }) {
  const params = await searchParams;

  return (
    <DashboardFrame active="/dashboard/webhooks">
      {async (tenant) => {
        const entitled = tenant.tier !== 'free';

        return (
          <div className="flex flex-col gap-8">
            <ErrorNotice searchParams={params} />
            <SuccessNotice searchParams={params} keyName="saved" message="The webhook destination was saved." />
            <div>
              <h1 className="font-display text-3xl font-medium tracking-tight">Webhooks</h1>
              <p className="mt-2 text-sm text-muted">Where captured leads are delivered, one POST per lead.</p>
            </div>
            {entitled ? (
              <form action={saveWebhook} className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
                <Field
                  label="Webhook URL"
                  name="webhookUrl"
                  type="url"
                  defaultValue={tenant.webhookUrl ?? ''}
                  placeholder="https://hook.example.com/leads"
                  required={false}
                  hint="Private and link-local addresses are refused before the URL is saved."
                />
                <SubmitButton>Save webhook</SubmitButton>
              </form>
            ) : (
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h2 className="font-display text-base font-medium">Pro and Agency</h2>
                <p className="mt-2 text-sm text-muted">Webhook delivery is available on Pro and Agency tiers. Upgrade to send captured leads to your own endpoint.</p>
              </div>
            )}
          </div>
        );
      }}
    </DashboardFrame>
  );
}
