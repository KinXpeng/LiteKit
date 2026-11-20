import { CategoryGrid } from '@/components/home/CategoryGrid'
import { Hero } from '@/components/home/Hero'
import { PrinciplesSection } from '@/components/home/PrinciplesSection'
import { RecentLinks } from '@/components/home/RecentLinks'

export function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <RecentLinks />
      <PrinciplesSection />
    </>
  )
}
