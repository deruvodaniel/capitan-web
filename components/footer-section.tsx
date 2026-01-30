"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook } from "lucide-react"

// Spotify Logo SVG Component
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

// YouTube Logo SVG Component
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const socials = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/capitanoficial__/",
    color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/capitan.rock",
    color: "hover:bg-[#1877F2]",
  },
  {
    name: "Spotify",
    icon: SpotifyIcon,
    href: "https://open.spotify.com/intl-es/artist/3Jf0v3pmaahIQD5QSq5XkX",
    color: "hover:bg-[#1DB954]",
  },
  {
    name: "YouTube",
    icon: YouTubeIcon,
    href: "https://www.youtube.com/watch?v=jhzLFn0GrZg",
    color: "hover:bg-[#FF0000]",
  },
]

export function FooterSection() {
  return (
    <footer className="relative py-24 bg-card border-t border-border overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[30vw] font-mono font-bold text-border/10 whitespace-nowrap">
          CAPITÁN
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Content */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-mono font-bold text-foreground mb-4"
          >
            Seguinos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-sans text-lg max-w-xl mx-auto"
          >
            Enterate de todos los shows, novedades y contenido exclusivo.
          </motion.p>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-16"
        >
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-foreground transition-all duration-300 ${social.color}`}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Info */}
        <div className="text-center border-t border-border pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground font-sans text-sm"
          >
            <div className="flex items-center gap-3">
              <img src="/images/logos/Logo_Base_2025_Blanco_Celeste.png" alt="CAPITÁN" className="h-6 md:h-7 w-auto" />
              <span>•</span>
              <span>20 Años</span>             
            </div>
            <p>Made in Zona Sur</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
