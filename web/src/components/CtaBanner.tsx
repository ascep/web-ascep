import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";

type CtaBannerProps = {
  title: string;
  description?: string;
  href: string;
  buttonLabel: string;
};

export default function CtaBanner({ title, description, href, buttonLabel }: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-section-light py-20">
      <DecoShapes variant="teal" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0.2}>
          <div className="rounded-[10px] bg-brand-purple p-8 text-center text-white sm:p-12">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{title}</h2>
            {description ? (
              <p className="mx-auto mb-6 max-w-2xl text-white/80">{description}</p>
            ) : null}
            <Link
              href={href}
              className="inline-flex items-center rounded-[10px] bg-white px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-white/90 hover:shadow-lg"
            >
              {buttonLabel}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
