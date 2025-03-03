import type { getCategoryList } from "@/app/_actions/category"
import { ContentSection } from "@/components/content-section"

import { CategoryCard } from "./category-card"
import { CategoryCardSkeleton } from "./category-card-skeleton"

interface CategoryContentProps {
  categoriesPromises: ReturnType<typeof getCategoryList>
}

export async function CategoryContent({
  categoriesPromises,
}: CategoryContentProps) {
  const [allCategories] = await Promise.all([categoriesPromises])

  return (
    <ContentSection
      title="Courses"
      description="Explore available courses for you"
    >
      {allCategories.map((item) => (
        <CategoryCard
          key={item.id}
          category={item}
          href={`/category/${item.id}`}
        />
      ))}
    </ContentSection>
  )
}

export async function CategoryContentSkeleton() {
  return (
    <ContentSection
      title="Courses"
      description="Explore available courses for you"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </ContentSection>
  )
}
