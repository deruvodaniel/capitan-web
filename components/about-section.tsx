"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <section ref={containerRef} className="relative py-20 bg-background overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title with Animated Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.4em] text-primary uppercase mb-4 font-sans">
            Quiénes Somos
          </h2>
          <p className="text-4xl md:text-6xl font-mono font-bold text-foreground leading-tight max-w-4xl mx-auto text-balance">
            El origen de la banda que sacude Zona Sur
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-sans">
              Arrancamos en Burzaco, Zona Sur, y hace <strong className="text-foreground">20 años</strong> que venimos
              haciendo vibrar los escenarios del Gran Buenos Aires y más allá.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-sans">
              Mezclamos rock, cumbia y ska de una forma que es solo nuestra. Crudo, real y con toda la onda.
              Desde bares under hasta festivales grandes, armamos nuestra historia a pulmón, siempre independientes
              y pegados a nuestras raíces del sur.
            </p>
          </motion.div>

          {/* Animated Counter */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: "20", label: "Años de música" },
              { number: "500+", label: "Shows" },
              { number: "2", label: "Discos" },
              { number: "∞", label: "Aguante" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-card border border-border p-6 rounded-lg text-center hover:border-primary/50 transition-colors"
              >
                <span className="text-5xl md:text-6xl font-mono font-bold text-primary">{stat.number}</span>
                <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-sans">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Fade gradient bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
