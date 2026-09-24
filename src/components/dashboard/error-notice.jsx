export default function ErrorNotice({ searchParams }) {
  const message = searchParams?.error;
  if (!message) return null;

  return (
    <p
      role="alert"
      className="rounded-xl border border-berry/30 bg-berry-soft px-4 py-3 text-sm text-ink"
    >
      {message}
    </p>
  );
}
