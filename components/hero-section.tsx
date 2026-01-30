"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, ChevronDown } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"])

  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio) {
      console.log("[v0] Audio ref not found")
      return
    }

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
        console.log("[v0] Audio paused")
      } else {
        // Asegurar que el volumen esté al 100%
        audio.volume = 1.0
        audio.muted = isMuted
        await audio.play()
        setIsPlaying(true)
        console.log("[v0] Audio playing, volume:", audio.volume, "muted:", audio.muted)
      }
    } catch (error) {
      console.error("[v0] Audio play error:", error)
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted
      audioRef.current.muted = newMuted
      setIsMuted(newMuted)
      console.log("[v0] Audio muted:", newMuted)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Configurar volumen inicial
      audio.volume = 1.0
      
      const handleEnded = () => setIsPlaying(false)
      const handleError = (e: Event) => {
        console.error("[v0] Audio error:", e)
      }
      const handleCanPlay = () => {
        console.log("[v0] Audio ready to play")
        // Intentar reproducir automáticamente
        audio.play()
          .then(() => {
            setIsPlaying(true)
            console.log("[v0] Audio autoplay successful")
          })
          .catch((error) => {
            console.log("[v0] Audio autoplay blocked:", error)
            // Navegadores modernos bloquean autoplay con sonido
            // El usuario tendrá que hacer clic en el botón
          })
      }

      audio.addEventListener("ended", handleEnded)
      audio.addEventListener("error", handleError)
      audio.addEventListener("canplay", handleCanPlay)
      
      return () => {
        audio.removeEventListener("ended", handleEnded)
        audio.removeEventListener("error", handleError)
        audio.removeEventListener("canplay", handleCanPlay)
      }
    }
  }, [])

  // Intentar autoplay después de que cargue la página
  useEffect(() => {
    const timer = setTimeout(() => {
      const audio = audioRef.current
      if (audio && !isPlaying) {
        audio.volume = 1.0
        audio.muted = false
        audio.play()
          .then(() => {
            setIsPlaying(true)
            setIsMuted(false)
            console.log("[v0] Audio autoplay delayed successful")
          })
          .catch((error) => {
            console.log("[v0] Audio autoplay still blocked:", error)
          })
      }
    }, 1500) // Esperar 1.5 segundos después de cargar

    return () => clearTimeout(timer)
  }, [])

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    }),
  }

  const letters = "CAPITÁN".split("")

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] overflow-hidden bg-background"
    >
      {/* Image Background with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-10" />
        <img
          src="/images/hero.jpg"
          alt="CAPITÁN en vivo"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ objectPosition: '50% 30%' }}
        />
        <div className="absolute inset-0 bg-background/70" />
      </motion.div>

      {/* Animated Grain Overlay */}
      <div className="absolute inset-0 z-20 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-30 flex flex-col items-center justify-center h-screen px-4"
      >
        {/* Animated Title */}
        <div className="overflow-hidden mb-4">
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.4em] text-muted-foreground uppercase font-sans"
          >
            20 Años de Fuego Independiente
          </motion.p>
        </div>

        <motion.div style={{ y: textY }} className="overflow-hidden w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex justify-center"
          >
            <img 
              src="/images/logos/Logo_Base_2025_Blanco_Celeste.png" 
              alt="CAPITÁN" 
              className="w-[80vw] md:w-[60vw] max-w-4xl h-auto"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(100, 200, 255, 0.4))'
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 flex flex-col items-center gap-6"
        >
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAudio}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-mono font-semibold tracking-wider uppercase text-sm hover:bg-primary/90 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? "Pausar" : "Dale Play!"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="flex items-center justify-center w-14 h-14 bg-secondary rounded-full text-foreground hover:bg-secondary/80 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Audio Element */}
      <audio ref={audioRef} preload="auto" loop>
        <source src="/audio/Whatsapp - Capitán.mp3" type="audio/mpeg" />
      </audio>
    </section>
  )
}
