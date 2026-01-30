"use client"

import { useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

const photos = [
  {
    src: "/images/band-live-3.jpg",
    width: 800,
    height: 1200,
    alt: "Banda en vivo - Show completo",
  },
  {
    src: "/images/singer-live.jpg",
    width: 1200,
    height: 800,
    alt: "Cantante en vivo con guitarra",
  },
  {
    src: "/images/band-performance-1.jpg",
    width: 1200,
    height: 800,
    alt: "Performance en vivo 1",
  },
  {
    src: "/images/guitarist-live.jpg",
    width: 800,
    height: 1200,
    alt: "Guitarrista en show",
  },
  {
    src: "/images/band-studio-1.jpg",
    width: 1200,
    height: 800,
    alt: "Banda ensayando en estudio",
  },
  {
    src: "/images/sax-players.jpg",
    width: 1200,
    height: 800,
    alt: "Saxofonistas en acción",
  },
  {
    src: "/images/band-live-2.jpg",
    width: 1200,
    height: 900,
    alt: "Banda en vivo 2",
  },
  {
    src: "/images/band-performance-2.jpg",
    width: 1200,
    height: 800,
    alt: "Performance en vivo 2",
  },
  {
    src: "/images/drummer-bw.jpg",
    width: 1000,
    height: 1000,
    alt: "Baterista blanco y negro",
  },
  {
    src: "/images/band-stage.jpg",
    width: 1200,
    height: 800,
    alt: "Banda en escenario con luces",
  },

  {
    src: "/images/band-live-4.jpg",
    width: 1200,
    height: 800,
    alt: "Banda en vivo 4",
  },
  {
    src: "/images/bass-player-studio.jpg",
    width: 800,
    height: 1200,
    alt: "Bajista en estudio",
  },
  {
    src: "/images/band-performance-3.jpg",
    width: 1200,
    height: 800,
    alt: "Performance en vivo 3",
  },
  {
    src: "/images/singer-studio-2.jpg",
    width: 800,
    height: 1200,
    alt: "Cantante en estudio 2",
  },
  {
    src: "/images/band-studio-2.jpg",
    width: 1200,
    height: 800,
    alt: "Banda en estudio 2",
  },
  {
    src: "/images/band-studio-3.jpg",
    width: 1200,
    height: 900,
    alt: "Banda en estudio 3",
  },
]

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(-1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <>
      <section ref={containerRef} className="relative py-32 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm tracking-[0.4em] text-primary uppercase mb-4 font-sans">
              Galería
            </h2>
            <p className="text-4xl md:text-6xl font-mono font-bold text-foreground">
              En Vivo y en Estudio
            </p>
          </motion.div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
                onClick={() => setIndex(i)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        }}
      />
    </>
  )
}
