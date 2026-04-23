const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

function isCustomSize(size: string): boolean {
  const normalized = size.trim().toLowerCase();
  return normalized === "sur mesure" || normalized === "sur-mesure";
}

/**
 * Sort product sizes in a predictable order and keep custom size at the end.
 */
export function sortProductSizes(sizes: string[]): string[] {
  const uniqueSizes = Array.from(
    new Set(sizes.map((size) => size.trim()).filter(Boolean)),
  );
  const customSizes = uniqueSizes.filter(isCustomSize);
  const regularSizes = uniqueSizes.filter((size) => !isCustomSize(size));

  const knownSizes = regularSizes
    .filter((size) => SIZE_ORDER.includes(size.toUpperCase()))
    .sort(
      (a, b) =>
        SIZE_ORDER.indexOf(a.toUpperCase()) -
        SIZE_ORDER.indexOf(b.toUpperCase()),
    );

  const unknownSizes = regularSizes
    .filter((size) => !SIZE_ORDER.includes(size.toUpperCase()))
    .sort((a, b) => a.localeCompare(b, "fr"));

  return [...knownSizes, ...unknownSizes, ...customSizes];
}
