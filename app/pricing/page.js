import SiteHeader from '../../src/components/site-header.jsx';
import SiteFooter from '../../src/components/site-footer.jsx';
import Pricing from '../../src/components/pricing.jsx';

export const metadata = {
  title: 'Pricing — OpenMate',
  description:
    'Start free with an assistant on your website, then move up when you want it to be yours alone. Simple tiers, no urgency games.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <main>
        <Pricing />
      </main>
      <SiteFooter />
    </div>
  );
}
