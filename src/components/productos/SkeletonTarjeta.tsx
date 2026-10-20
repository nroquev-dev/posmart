/**
 * Skeleton loader para tarjeta de producto
 * Usa animación shimmer mientras carga el catálogo
 */

export default function SkeletonTarjeta() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Imagen skeleton */}
      <div className="aspect-square shimmer" />

      {/* Contenido skeleton */}
      <div className="p-3.5 flex flex-col gap-2.5">
        <div className="h-3 w-20 shimmer rounded-full" />
        <div className="h-4 w-full shimmer rounded-md" />
        <div className="h-4 w-3/4 shimmer rounded-md" />
        <div className="h-3 w-24 shimmer rounded-full" />
        <div className="h-3 w-16 shimmer rounded-full" />
        <div className="flex items-center justify-between mt-1">
          <div className="h-6 w-24 shimmer rounded-md" />
          <div className="h-8 w-20 shimmer rounded-lg" />
        </div>
      </div>
    </div>
  );
}