"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Instagram } from "lucide-react"

// Spotify Logo SVG Component
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

// YouTube Logo SVG Component
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const navLinks = [
  { name: "Inicio", href: "#hero" },
  { name: "Nosotros", href: "#about" },
  { name: "Videos", href: "#videos" },
  { name: "Música", href: "#music" },
  { name: "Historia", href: "#timeline" },
  { name: "Galería", href: "#gallery" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const offset = 80 // altura del navbar
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="relative group">
              <img src="/images/logos/Logo_Base_2025_Blanco_Celeste.png" alt="CAPITÁN" className="h-7 md:h-8 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors tracking-wide cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/capitanoficial__/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://open.spotify.com/intl-es/artist/3Jf0v3pmaahIQD5QSq5XkX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SpotifyIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/watch?v=jhzLFn0GrZg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <YouTubeIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-foreground"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <img src="/images/logos/Logo_Base_2025_Negro_Fucsia.png" alt="CAPITÁN" className="h-8 w-auto" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 flex flex-col justify-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-4xl font-mono font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Social */}
              <div className="flex items-center gap-6 pt-8 border-t border-border">
                <a
                  href="https://www.instagram.com/capitanoficial__/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://open.spotify.com/intl-es/artist/3Jf0v3pmaahIQD5QSq5XkX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SpotifyIcon className="w-6 h-6" />
                </a>
                <a
                  href="https://www.youtube.com/watch?v=jhzLFn0GrZg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <YouTubeIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
