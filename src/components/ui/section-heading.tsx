type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-sky-300">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-slate-300 md:text-lg">{description}</p>
    </div>
  );
}
