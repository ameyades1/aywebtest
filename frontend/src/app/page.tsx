import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedDiscourses } from '@/components/home/FeaturedDiscourses'
import { AboutAcharya } from '@/components/home/AboutAcharya'
import { ProgramsCarousel } from '@/components/home/ProgramsCarousel'
import { UpcomingEvents } from '@/components/home/UpcomingEvents'
import { JoinMovementCTA } from '@/components/home/JoinMovementCTA'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedDiscourses />
        <AboutAcharya />
        <ProgramsCarousel />
        <UpcomingEvents />
        <JoinMovementCTA />
      </main>
      <Footer />
    </>
  )
}
