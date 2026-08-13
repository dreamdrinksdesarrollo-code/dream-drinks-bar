import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: ReactNode;
  subtitle?: string;
  description?: ReactNode;
  /** Label chico arriba del título (ej. "Contacto") */
  eyebrow?: string;
  className?: string;
  align?: "center" | "left";
};

/** Patrón tipográfico de sección: eyebrow → título → subtítulo → descripción */
export const SectionHeader = ({
  title,
  subtitle,
  description,
  eyebrow,
  className = "",
  align = "center",
}: SectionHeaderProps) => {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const descWidth = align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl";

  return (
    <div className={`${alignClass} mb-10 ${className}`}>
      <h2 className={`${subtitle || description ? "mb-3" : "mb-0"} uppercase`}>{title}</h2>
      {eyebrow ? (
        <p className="text-[10px] tracking-[0.08em] uppercase text-gray-400 font-medium mb-4">
          {eyebrow}
        </p>
      ) : null}
      {subtitle ? (
        <p className="mb-4 text-gray-300 uppercase">{subtitle}</p>
      ) : null}
      {description ? (
        <p
          className={`text-gray-400 ${descWidth} uppercase text-[10px] tracking-[0.08em] font-medium leading-relaxed`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
};

export const sectionDescClass =
  "text-gray-400 uppercase text-[10px] tracking-[0.08em] font-medium leading-relaxed";
