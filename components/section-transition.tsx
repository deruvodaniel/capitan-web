"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface SectionTransitionProps {
  variant?: "glitch" | "particles" | "scan"
}

export function SectionTransition({ variant = "glitch" }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  if (variant === "glitch") {
    return (
      <div ref={ref} className="relative h-20 overflow-hidden bg-background z-0">
        {/* Líneas glitch horizontales */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute inset-0 flex flex-col justify-around"
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0, x: -100 }}
              whileInView={{ scaleX: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.1, 
                duration: 0.5,
                ease: "easeOut"
              }}
              className="h-1 bg-gradient-to-r from-primary/50 via-primary to-transparent"
              style={{
                width: `${Math.random() * 60 + 40}%`,
                marginLeft: `${Math.random() * 40}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Efecto de escaneo */}
        <motion.div
          style={{ y: y2, scale }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent" 
               style={{ height: '30%' }} />
        </motion.div>

        {/* Partículas flotantes */}
        {[...Array(8)].map((_, i) => {
          const randomY1 = Math.random() * 200 - 100
          const randomY2 = Math.random() * -200 + 100
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{ opacity: 0, scale: 0, y: randomY1 }}
              whileInView={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1.5, 0],
                y: randomY2
              }}
              viewport={{ once: true }}
              transition={{
                duration: 2,
                delay: i * 0.15,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          )
        })}

        {/* Glow effect */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 blur-xl"
        />
      </div>
    )
  }

  if (variant === "particles") {
    return (
      <div ref={ref} className="relative h-16 overflow-hidden bg-background z-0">
        {/* Grid de partículas que se mueven */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2"
              style={{
                left: `${(i % 10) * 10}%`,
                top: `${Math.floor(i / 10) * 50}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ 
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent rotate-45 blur-sm" />
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // scan variant
  return (
    <div ref={ref} className="relative h-12 overflow-hidden bg-background z-0">
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </motion.div>
      
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
      />
    </div>
  )
}
