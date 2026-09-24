export default function SuccessNotice({ searchParams, keyName, message }) {
  if (!searchParams?.[keyName]) return null;

  return (
    <p role="status" className="rounded-xl border border-mint/30 bg-mint-soft px-4 py-3 text-sm text-ink">
      {message}
    </p>
  );
}
