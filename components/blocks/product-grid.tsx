// components/blocks/product-grid.tsx
import { stegaClean } from "next-sanity";

import SectionContainer from "@/components/ui/section-container";
import ProductGrid from "@/components/store/ProductGrid";
import { fetchSanityProducts } from "@/sanity/lib/fetch";
import type { PAGE_QUERYResult } from "@/sanity.types";

type ProductGridBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "product-grid" }
>;

export default async function ProductGridBlock({
  heading,
  description,
  padding,
  colorVariant,
  selection,
  displayOptions,
}: ProductGridBlockProps) {
  const mode = selection?.mode ? stegaClean(selection.mode) : "manual";
  const productIds = selection?.products
    ?.map((product) => product?._ref)
    .filter((ref): ref is string => Boolean(ref));
  const collectionEntry = selection?.collection;
  const collectionId =
    collectionEntry && typeof collectionEntry === "object" && "_id" in collectionEntry
      ? (collectionEntry._id as string | undefined)
      : undefined;

  if (mode === "manual" && (!productIds || productIds.length === 0)) {
    return null;
  }

  if (mode === "collection" && !collectionId) {
    return null;
  }

  const products = await fetchSanityProducts({
    ids: mode === "manual" ? productIds : undefined,
    collectionId: mode === "collection" ? collectionId : undefined,
  });

  if (!products.length) {
    return null;
  }

  const cleanedHeading = heading ? stegaClean(heading) : null;
  const cleanedDescription = description ? stegaClean(description) : null;
  const color = colorVariant ? stegaClean(colorVariant) : undefined;
  const columns = displayOptions?.columns ?? 3;
  const showComparePrice = displayOptions?.showComparePrice ?? true;
  const showQuickView = displayOptions?.showQuickView ?? false;

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {(cleanedHeading || cleanedDescription) && (
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            {cleanedHeading && (
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                {cleanedHeading}
              </h2>
            )}
            {cleanedDescription && (
              <p className="mt-3 text-base text-muted-foreground">
                {cleanedDescription}
              </p>
            )}
          </div>
        )}
        <ProductGrid
          products={products}
          columns={columns}
          showComparePrice={showComparePrice}
          showQuickView={showQuickView}
        />
      </div>
    </SectionContainer>
  );
}
