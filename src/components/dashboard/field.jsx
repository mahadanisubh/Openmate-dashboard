export default function Field({ label, name, defaultValue, placeholder, type = 'text', required = true, hint }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
      />
      {hint ? <span className="text-xs text-faint">{hint}</span> : null}
    </label>
  );
}
