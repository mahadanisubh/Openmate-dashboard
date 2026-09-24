export default function SubmitButton({ children, className = '' }) {
  return (
    <button
      type="submit"
      className={`rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover ${className}`}
    >
      {children}
    </button>
  );
}
