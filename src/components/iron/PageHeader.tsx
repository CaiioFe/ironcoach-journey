export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-5 pt-6 pb-4">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}
