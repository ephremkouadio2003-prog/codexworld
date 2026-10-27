import type { Faq as FaqItem } from "@/content/seo";

// Liste de questions/réponses en HTML natif (<details>) : lisible sans
// JavaScript, accessible au clavier et indexable par les moteurs de recherche.
export default function Faq({ items, dark }: { items: FaqItem[]; dark?: boolean }) {
  return (
    <div className={`grid gap-3 ${dark ? "text-paper" : "text-ink"}`}>
      {items.map((f) => (
        <details
          key={f.q}
          className={`group rounded-3xl border-2 p-6 transition-colors open:bg-white ${
            dark ? "border-paper/20 open:text-ink" : "border-ink/10 bg-paper"
          }`}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-extrabold leading-snug [&::-webkit-details-marker]:hidden">
            <span className="text-lg">{f.q}</span>
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-ink transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-ink/75">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
