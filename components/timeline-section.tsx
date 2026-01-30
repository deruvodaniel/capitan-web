"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const milestones = [
  {
    year: "2005",
    title: "El Comienzo",
    description: "Arrancamos en Burzaco mezclando rock, cumbia y ska. Era algo re fresco y nadie lo estaba haciendo así.",
    image: "/images/2005-el-comienzo.jpg",
  },
  {
    year: "2008",
    title: "1er EP o Demo",
    description: "Sacamos nuestro primer EP a pulmón, independientes desde el día uno. Ahí empezó a crecer la banda de fieles que nos sigue.",
    image: "/images/sax-players.jpg",
  },
  {
    year: "2013",
    title: "Se nos abre la cabeza",
    description: "Primer disco que presentamos en La Trastienda. Tremendo momento, consolidamos nuestro sonido y llegamos a más gente.",
    image: "/images/1er-disco-se nos abre la cabeza.png",
  },
  {
    year: "2019",
    title: "Tiempo 299",
    description: "Segundo disco que marca una evolución en nuestro estilo y nuestra trayectoria musical.",
    image: "/images/2erdisco-tiempo.png",
  },
  {
    year: "2025",
    title: "20 Años",
    description: "¡20 años! Lo celebramos con un show gigante en Zona Sur. Dos décadas haciendo lo que amamos, siempre fieles a nuestras raíces.",
    image: "/images/band-performance-2.jpg",
  },
]

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="relative py-32 bg-secondary/95 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
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
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm tracking-[0.4em] text-primary uppercase mb-4 font-sans">
            Nuestra Trayectoria
          </h2>
          <p className="text-4xl md:text-6xl font-mono font-bold text-foreground">
            El Viaje Continúa
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary to-accent"
            />
          </div>

          {/* Mobile Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary to-accent"
            />
          </div>

          {/* Milestones */}
          <div className="space-y-24">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} pl-20 md:pl-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-card border border-border rounded-xl p-8 inline-block"
                  >
                    <span className="text-6xl md:text-8xl font-mono font-bold text-primary/60">
                      {milestone.year}
                    </span>
                    <h3 className="text-2xl font-mono font-bold text-foreground mt-4 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-foreground/80 font-sans max-w-md">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Dot */}
                <motion.div
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"
                />

                {/* Image */}
                <div className="flex-1 hidden md:block">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative aspect-video max-w-sm rounded-xl overflow-hidden shadow-2xl"
                    style={{ marginLeft: index % 2 === 0 ? "auto" : 0 }}
                  >
                    <img
                      src={milestone.image || "/placeholder.svg"}
                      alt={milestone.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Fade gradient bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  )
}
