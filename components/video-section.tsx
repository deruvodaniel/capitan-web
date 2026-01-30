"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, X } from "lucide-react"

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState("")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])

  const videos = [
    {
      id: "negrita-linda",
      title: "Negrita Linda",
      subtitle: "Video Oficial",
      youtubeId: "jhzLFn0GrZg",
      thumbnail: "/images/band-live.jpg",
    },
    {
      id: "en-vivo",
      title: "En Vivo",
      subtitle: "Show Completo",
      youtubeId: "RHecX55ufm4",
      thumbnail: "/images/band-live-2.jpg",
    },
    {
      id: "detras-escenas",
      title: "Backstage",
      subtitle: "Detrás de Escenas",
      youtubeId: "qBA30rx5z1o",
      thumbnail: "/images/guitarist-live.jpg",
    },
  ]

  const openModal = (youtubeId: string) => {
    setActiveVideo(youtubeId)
    setIsModalOpen(true)
  }

  return (
    <>
      <section ref={containerRef} className="relative py-32 bg-secondary/95 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Fade gradient top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
        
        {/* Parallax Background Text */}
        <motion.div
          style={{ y, rotate }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="text-[20vw] font-mono font-bold text-border/30 whitespace-nowrap">
            VIDEOS
          </span>
        </motion.div>

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
              Mirá Nuestros Videos
            </h2>
            <p className="text-4xl md:text-6xl font-mono font-bold text-foreground">
              En Acción
            </p>
          </motion.div>

          {/* Featured Video - YouTube Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mb-12"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/jhzLFn0GrZg?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=jhzLFn0GrZg"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Negrita Linda - CAPITÁN - Video Oficial"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-2xl md:text-3xl font-mono font-bold text-foreground">
                Negrita Linda - Video Oficial
              </h3>
              <p className="text-muted-foreground font-sans mt-1">Nuevo single disponible en todas las plataformas</p>
            </div>
          </motion.div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {videos.slice(1).map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group cursor-pointer"
                onClick={() => openModal(video.youtubeId)}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors" />
                  
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </motion.div>

                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-xl font-mono font-bold text-foreground">{video.title}</h4>
                    <p className="text-sm text-muted-foreground font-sans">{video.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Fade gradient bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </section>

      {/* Video Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-5xl mx-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video player"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
