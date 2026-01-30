"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Zap, Music, PartyPopper } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Pura Potencia",
    description: "Riffs pesados y energía que te vuela la cabeza—rock sin vueltas, directo y al hueso.",
  },
  {
    icon: Music,
    title: "Sabor Cumbia",
    description: "Ritmos que te hacen mover sí o sí—cumbia mezclada con la intensidad del rock.",
  },
  {
    icon: PartyPopper,
    title: "Onda Ska",
    description: "Vientos que levantan todo y un bajo que no para—puro festejo en cada tema.",
  },
]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <section ref={containerRef} className="relative py-32 bg-background overflow-hidden">
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
          className="text-center mb-20"
        >
          <h2 className="text-sm tracking-[0.4em] text-primary uppercase mb-4 font-sans">
            Quiénes Somos
          </h2>
          <p className="text-4xl md:text-6xl font-mono font-bold text-foreground leading-tight max-w-4xl mx-auto text-balance">
            20 Años Rompiendo Todo
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
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

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group relative bg-card border border-border p-8 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-mono font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground font-sans">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
