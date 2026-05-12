"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, MapPin, Ticket, ExternalLink, Music } from "lucide-react"

const TICKETS_URL = "https://capitan-tickets.vercel.app"

interface ShowTier {
  name: string
  priceArs: number
  available: boolean
}

interface Show {
  id: string
  slug: string
  title: string
  venue: string
  address: string | null
  startsAt: string
  doorsAt: string | null
  coverImageUrl: string | null
  minPriceArs: number | null
  soldOut: boolean
  tiers: ShowTier[]
}

function formatArs(pesos: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(pesos)
}

function formatShowDate(iso: string) {
  const date = new Date(iso)
  const day = date.toLocaleDateString("es-AR", { day: "2-digit" })
  const month = date.toLocaleDateString("es-AR", { month: "short" }).toUpperCase()
  const weekday = date.toLocaleDateString("es-AR", { weekday: "long" })
  const time = date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
  return { day, month, weekday, time }
}

function ShowCard({ show, index }: { show: Show; index: number }) {
  const { day, month, weekday, time } = formatShowDate(show.startsAt)
  const ticketUrl = `${TICKETS_URL}/show/${show.slug}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Glow on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-border bg-secondary/50 backdrop-blur-sm group-hover:border-primary/40 transition-colors duration-300">

        {/* Cover image */}
        {show.coverImageUrl && (
          <div className="relative md:w-64 lg:w-72 shrink-0 overflow-hidden">
            <img
              src={show.coverImageUrl}
              alt={show.title}
              className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-secondary/60 hidden md:block" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-1 gap-0">

          {/* Date block — ticket stub left */}
          <div className="flex md:flex-col items-center justify-center gap-4 md:gap-1 px-6 py-4 md:py-6 md:w-28 shrink-0 border-b md:border-b-0 md:border-r border-dashed border-border">
            <span className="text-4xl md:text-5xl font-mono font-bold text-primary leading-none">{day}</span>
            <span className="text-lg md:text-xl font-mono font-bold text-primary leading-none">{month}</span>
            <span className="hidden md:block text-xs text-muted-foreground font-sans uppercase tracking-widest mt-1 text-center">{weekday}</span>
          </div>

          {/* Show info */}
          <div className="flex flex-col flex-1 justify-between gap-4 p-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                {show.title}
              </h3>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground font-sans">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {show.venue}{show.address ? ` — ${show.address}` : ""}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  Puertas {show.doorsAt ? formatShowDate(show.doorsAt).time : time}hs
                </span>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <div className="flex-1">
                {show.soldOut ? (
                  <span className="text-sm font-mono font-bold text-destructive uppercase tracking-widest">AGOTADO</span>
                ) : show.minPriceArs ? (
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest">Entradas desde</p>
                    <p className="text-2xl font-mono font-bold text-accent">{formatArs(show.minPriceArs)}</p>
                  </div>
                ) : null}
              </div>

              {!show.soldOut ? (
                <a
                  href={ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative flex items-center gap-2 px-7 py-3.5 rounded-xl font-mono font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-300"
                >
                  {/* Button background */}
                  <span className="absolute inset-0 bg-primary group-hover/btn:bg-accent transition-colors duration-300" />
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  <Ticket className="relative w-4 h-4 text-primary-foreground" />
                  <span className="relative text-primary-foreground">Comprar Entradas</span>
                  <ExternalLink className="relative w-3 h-3 text-primary-foreground/70" />
                </a>
              ) : (
                <div className="px-7 py-3.5 rounded-xl border border-border font-mono font-bold text-sm uppercase tracking-widest text-muted-foreground">
                  Sin Disponibilidad
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ShowsSection() {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120])

  useEffect(() => {
    fetch(`${TICKETS_URL}/api/shows`)
      .then((r) => r.json())
      .then(setShows)
      .catch(() => setShows([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      ref={containerRef}
      id="shows"
      className="relative py-24 bg-background overflow-hidden"
    >
      {/* Ambient background glows */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-10 left-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.4em] text-primary uppercase mb-4 font-sans">
            En vivo
          </p>
          <h2 className="text-5xl md:text-7xl font-mono font-bold text-foreground mb-6 leading-none">
            Próximos Shows
          </h2>
          <p className="text-muted-foreground font-sans text-lg max-w-xl mx-auto">
            Viví la experiencia en vivo. Conseguí tus entradas antes de que se agoten.
          </p>
        </motion.div>

        {/* Show list */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              ))}
            </div>
          </div>
        ) : shows.length > 0 ? (
          <div className="space-y-6">
            {shows.map((show, i) => (
              <ShowCard key={show.id} show={show} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Music className="w-10 h-10 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-sans mb-1">
              Próximas fechas en camino...
            </p>
            <p className="text-muted-foreground/50 font-sans text-sm">
              Seguinos en redes para ser el primero en enterarte.
            </p>
          </motion.div>
        )}

        {/* Main CTA — always visible */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: shows.length > 0 ? 0.3 : 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <a
              href={TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta relative flex items-center gap-3 px-8 py-4 rounded-xl font-mono font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 text-base"
            >
              <span className="absolute inset-0 bg-primary group-hover/cta:bg-accent transition-colors duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700" />
              <Ticket className="relative w-5 h-5 text-primary-foreground" />
              <span className="relative text-primary-foreground">Ver todos los Shows</span>
              <ExternalLink className="relative w-4 h-4 text-primary-foreground/70" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
