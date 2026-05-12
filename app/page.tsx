"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { VideoSection } from "@/components/video-section"
import { MusicSection } from "@/components/music-section"
import { TimelineSection } from "@/components/timeline-section"
import { GallerySection } from "@/components/gallery-section"
import { FooterSection } from "@/components/footer-section"
import { ShowsSection } from "@/components/shows-section"

export default function HomePage() {
  return (
    <main className="relative bg-background text-foreground overflow-hidden">
      <Navbar />
      
      <section id="hero">
        <HeroSection />
      </section>
      
      <section id="shows">
        <ShowsSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>
      
      <section id="videos">
        <VideoSection />
      </section>
      
      <section id="music">
        <MusicSection />
      </section>
      
      <section id="timeline">
        <TimelineSection />
      </section>
      
      <section id="gallery">
        <GallerySection />
      </section>
      
      <FooterSection />
    </main>
  )
}
