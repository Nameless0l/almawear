import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Gem, Paintbrush, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Découvrez l'histoire d'Alma Wear, marque de mode africaine contemporaine basée à Douala, Cameroun. Artisanat, élégance et modernité.",
};

const values = [
  {
    icon: Paintbrush,
    title: "Artisanat",
    description:
      "Chaque pièce est confectionnée à la main dans notre atelier de Douala, avec un souci du détail qui fait la différence.",
  },
  {
    icon: Gem,
    title: "Élégance",
    description:
      "Nous créons des vêtements qui subliment la femme africaine moderne, avec des coupes raffinées et des matières nobles.",
  },
  {
    icon: Heart,
    title: "Modernité",
    description:
      "Nous réinventons les silhouettes traditionnelles avec une vision contemporaine, pour une mode qui traverse les époques.",
  },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden bg-[var(--color-dark)]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero/atelier.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1714]/50 via-[#1a1714]/30 to-[#1a1714]/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
            Notre histoire
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl font-light italic">
            À Propos
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface)]">
                <Image
                  src="/images/hero/atelier.jpg"
                  alt="Fondatrice Alma Wear"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[var(--color-text)] mb-8">
                  L&apos;histoire
                  <br />
                  <em>d&apos;Alma Wear</em>
                </h2>

                <div className="space-y-6 font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed">
                  <p>
                    Alma Wear est née d&apos;un rêve simple : offrir à la femme
                    africaine des vêtements qui reflètent sa beauté naturelle et
                    sa force intérieure. Fondée à Douala, au cœur du Cameroun,
                    notre maison de couture puise son inspiration dans la richesse
                    des traditions textiles africaines.
                  </p>
                  <p>
                    Chaque création est le fruit d&apos;un travail minutieux,
                    depuis la sélection des plus beaux tissus jusqu&apos;aux
                    finitions à la main. Nous travaillons avec des artisans
                    locaux talentueux qui partagent notre vision d&apos;une mode
                    éthique et responsable.
                  </p>
                  <p>
                    Notre ambition est de proposer une mode africaine
                    contemporaine qui s&apos;inscrit dans l&apos;air du temps tout
                    en honorant un héritage culturel riche. Chaque boubou, chaque
                    kaftan, chaque ensemble raconte une histoire — celle de la
                    femme qui le porte.
                  </p>
                </div>

                <blockquote className="mt-10 pl-6 border-l-2 border-[var(--color-accent)]">
                  <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light italic text-[var(--color-text)]">
                    &ldquo;Nous ne créons pas simplement des vêtements, nous
                    tissons des émotions.&rdquo;
                  </p>
                  <cite className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-3 block not-italic">
                    — Fondatrice, Alma Wear
                  </cite>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
              Ce qui nous anime
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[var(--color-text)]">
              Nos Valeurs
            </h2>
            <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto mt-6" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.15}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[var(--color-accent)] mb-6">
                    <value.icon
                      size={24}
                      className="text-[var(--color-accent)]"
                    />
                  </div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[var(--color-text)] mb-4">
                    {value.title}
                  </h3>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[var(--color-accent)] mb-6">
              <MapPin size={24} className="text-[var(--color-accent)]" />
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[var(--color-text)] mb-6">
              Basée au cœur de Douala, Cameroun
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed max-w-xl mx-auto">
              Notre atelier se trouve à Douala, la capitale économique du
              Cameroun. C&apos;est ici que nous donnons vie à chaque création,
              avec passion et savoir-faire.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
