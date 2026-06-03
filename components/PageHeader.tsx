export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-black text-slate-900">{title}</h1>
      <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
  );
}


