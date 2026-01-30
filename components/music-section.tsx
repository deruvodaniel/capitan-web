"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink } from "lucide-react"

export function MusicSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const x2 = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="relative py-32 bg-background overflow-hidden">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ x: x1 }}
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <motion.div
          style={{ x: x2 }}
          className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        />
        <motion.div
          style={{ x: x1 }}
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.4em] text-primary uppercase mb-4 font-sans">
            Escuchanos
          </h2>
          <p className="text-4xl md:text-6xl font-mono font-bold text-foreground">
            Nuestra Música
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Album Art and Spotify Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Album Cover */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl mb-6"
              >
                <img
                  src="/images/album-tiempo.jpg"
                  alt="Album Cover - Tiempo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-sm text-primary uppercase tracking-wider font-sans mb-1">Último Lanzamiento</p>
                  <h3 className="text-3xl font-mono font-bold text-foreground">Tiempo</h3>
                </div>
              </motion.div>

              {/* Spotify Embed - Track "Sola" */}
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src="https://open.spotify.com/embed/track/14axBbNbCFVD8vhDGVTx9e?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                  title="Sola - CAPITÁN"
                />
              </div>
            </div>
          </motion.div>

          {/* Album Embed and Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-mono font-bold text-foreground mb-6">
              El Sonido Que Nos Define
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-sans">
              Rock, cumbia y ska fusionados en un sonido único que nació en las calles de Burzaco. 
              20 años de música independiente, desde locales underground hasta festivales masivos.
            </p>

            {/* Spotify Album Embed */}
            <div className="rounded-xl overflow-hidden mb-8">
              <iframe
                src="https://open.spotify.com/embed/album/3W1lolYpxaC3cqNOhXdOu7?utm_source=generator&theme=0"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
                title="Album Completo - CAPITÁN"
              />
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://open.spotify.com/intl-es/artist/3Jf0v3pmaahIQD5QSq5XkX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#1DB954] text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#1DB954]/90 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Escuchar en Spotify
              </a>
              <a
                href="https://linktr.ee/rockcapitan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-secondary text-foreground px-8 py-4 rounded-full font-sans font-medium hover:bg-secondary/80 transition-colors border border-border"
              >
                <ExternalLink className="w-4 h-4" />
                Todos los Links
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
