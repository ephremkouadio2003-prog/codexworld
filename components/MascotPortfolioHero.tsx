"use client"
/* eslint-disable react-hooks/refs, react-hooks/purity -- the ref setter runs at commit and performance.now() inside the effect; the compiler lint misreads both. */

import * as React from "react"

/* ------------------------------------------------------------------ types */

export type MascotPortfolioHeroProps = {
  /**
   * Height of the hero. Must be a definite length — the poster is fitted to
   * this box, so a percentage collapses to 0px unless every ancestor up to
   * `<html>` has a real height. Never pass `"100%"`.
   */
  height?: string
  /** Floor for the height, so the headline stays legible. */
  minHeight?: string

  /* ---- top rule ---- */
  /** Set in the green half of the index pill, top left. */
  index?: string
  /** Set beside the index, inside the same pill. */
  discipline?: string
  /** The bold line beside the pill. */
  tagline?: string
  /** Centre-right, set inside braces: `{ first / second }`. */
  collection?: [string, string]
  /** Top right, two lines beside the green dot. */
  reel?: [string, string]

  /* ---- headline ---- */
  /** First headline line, before the arrow. */
  year?: string
  /** First headline line, after the arrow. */
  initials?: string
  /** The ringed stamp beside the first line. */
  badge?: string
  /** Second headline line. */
  line2?: string
  /** Third headline line. Its last letter gets the looping swash. */
  line3?: string
  /** Fourth line, the big one — set before the vertical tag. */
  word?: string
  /** The vertical label between `word` and the bracketed letters. */
  verticalTag?: string
  /** Set between the two arcs, followed by an asterisk. */
  bracketed?: string

  /* ---- pill and services ---- */
  /** White half of the pill. */
  seekingLabel?: string
  /** Green half of the pill. */
  seeking?: string
  /** Turns the green half into a link. */
  href?: string
  /** The row along the bottom edge. */
  services?: string[]

  /* ---- the character ---- */
  /** Cycled through, one per click on the character. */
  greetings?: string[]
  skin?: string
  /** Curls, fade and brows. */
  hair?: string
  beard?: string
  /** The frames of the glasses. */
  glasses?: string
  shirt?: string

  /* ---- palette ---- */
  /** The green: index pill, dot, seeking pill, hover rules. */
  accent?: string
  /** The sheet. */
  paper?: string
  /** Type, rules and the room. */
  ink?: string
  /** Plain-text headline for search engines and screen readers. Defaults to the visual lines joined. */
  srTitle?: string
  className?: string
}

// The site loads Inter and Archivo Black through next/font, which exposes them
// as CSS variables; the literal names stay as fallbacks.
const SANS_STACK =
  'var(--font-inter),"Inter","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif'
const DISPLAY_STACK =
  'var(--font-archivo),"Archivo Black","Arial Black","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif'

/* The character's sheet. Every coordinate in the figure lives in this box. */
const CW = 600
const CH = 720

/* --------------------------------------------------------------- the gaze
   The figure is flat SVG. What sells it as a head turning is parallax: the
   features ride on top of the skull and move further than it does, the nose
   sits proud of the face and moves further still, and the ears go the other
   way and foreshorten. Nothing here is 3D maths — it is a stack of layers
   whose offsets are ordered by how far each one sits from the neck. */

// #region gaze

/**
 * Where the pointer is, relative to the head, as a direction in (-1, 1) on
 * each axis. Soft-saturated rather than clamped, so the head never slams into
 * a stop: it keeps turning a little further the further away you go.
 */
export function aim(px: number, py: number, cx: number, cy: number, rx: number, ry: number) {
  const sat = (v: number) => v / Math.sqrt(1 + v * v)
  return [sat((px - cx) / rx), sat((py - cy) / ry)]
}

/** Frame-rate-independent easing of `cur` towards `target`. */
export function approach(cur: number, target: number, dt: number, rate: number) {
  return target + (cur - target) * Math.exp(-rate * dt)
}

/**
 * How far each layer moves for a gaze of (x, y). Offsets are in figure units
 * and nested: `face` is relative to `head`, `nose` and `eyes` to `face`.
 * `near` is 0..1, how close the pointer is to the face — it widens the eyes
 * and lifts the brows.
 */
export function pose(x: number, y: number, near: number) {
  return {
    body: { dx: x * 4, dy: 0 },
    head: { dx: x * 10, dy: y * 7, rot: x * 4 },
    ears: { dx: -x * 7, dy: -y * 3, lead: 1 + x * 0.16, trail: 1 - x * 0.16 },
    hair: { dx: x * 13, dy: y * 4 },
    blush: { dx: x * 20, dy: y * 14 },
    face: { dx: x * 28, dy: y * (y < 0 ? 11 : 20) },
    nose: { dx: x * 10, dy: y * 7 },
    eyes: { dx: x * 4, dy: y * 4, scale: 1 + near * 0.14 },
    brows: { dx: x * 3, dy: y * 2 + Math.min(0, y) * 3 - near * 9 },
  }
}

/** Blink envelope: 1 is open, dips towards 0.08 across a 150ms blink. */
export function blink(since: number) {
  const d = 0.15
  if (since < 0 || since > d) return 1
  return 1 - Math.sin((Math.PI * since) / d) * 0.92
}

// #endregion

/* ------------------------------------------------------------- the room */

type Seg = [number, number, number, number]

/**
 * A one-point-perspective room in a 1000x1000 box that is stretched to fill
 * the hero. The back wall is a grid; every grid line on its edge runs out to
 * the frame away from the vanishing point; the depth lines are the back wall
 * scaled up about that point. Stretching distorts it, which is fine — it is a
 * room, and a taller screen just gets a taller one.
 */
function room(): { back: Seg[]; rays: Seg[]; depth: string[] } {
  const x0 = 95
  const x1 = 905
  const y0 = 85
  const y1 = 865
  const vx = (x0 + x1) / 2
  const vy = (y0 + y1) / 2
  const cols = 14
  const rows = 11
  const back: Seg[] = []
  const rays: Seg[] = []
  const out = (x: number, y: number): Seg => {
    // Walk from (x, y) away from the vanishing point until the frame.
    const dx = x - vx
    const dy = y - vy
    const tx = dx > 0 ? (1000 - x) / dx : dx < 0 ? -x / dx : Infinity
    const ty = dy > 0 ? (1000 - y) / dy : dy < 0 ? -y / dy : Infinity
    const t = Math.min(tx, ty)
    return [x, y, x + dx * t, y + dy * t]
  }
  for (let i = 0; i <= cols; i++) {
    const x = x0 + ((x1 - x0) * i) / cols
    back.push([x, y0, x, y1])
    rays.push(out(x, y0), out(x, y1))
  }
  for (let j = 0; j <= rows; j++) {
    const y = y0 + ((y1 - y0) * j) / rows
    back.push([x0, y, x1, y])
    rays.push(out(x0, y), out(x1, y))
  }
  const depth = [1.07, 1.16, 1.28, 1.45, 1.7].map((s) => {
    const l = vx + (x0 - vx) * s
    const r = vx + (x1 - vx) * s
    const t = vy + (y0 - vy) * s
    const b = vy + (y1 - vy) * s
    return "M" + l + " " + t + "H" + r + "V" + b + "H" + l + "Z"
  })
  return { back, rays, depth }
}

const ROOM = room()


/**
 * The coils of hair as [cx, cy, r], laid in rows across the top of the skull.
 * Rows run back to front so the front ones overlap; the jitter is seeded so
 * server and client render the same head.
 */
function curls() {
  const out: [number, number, number][] = []
  let seed = 7
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  for (let y = 112; y <= 236; y += 22) {
    const t = (y - 250) / 142
    const half = 168 * Math.sqrt(Math.max(0, 1 - t * t)) - (y > 210 ? (y - 210) * 1.6 : 0)
    const n = Math.max(1, Math.round((half * 2) / 34))
    for (let i = 0; i < n; i++) {
      const x = 300 - half + ((i + 0.5) * half * 2) / n + (rand() - 0.5) * 8
      out.push([+x.toFixed(1), +(y + (rand() - 0.5) * 8).toFixed(1), +(19 + rand() * 6).toFixed(1)])
    }
  }
  return out
}

const CURLS = curls()

/* ----------------------------------------------------------------- styles */

const CSS = `
.mph-root{position:relative;width:100%;overflow:hidden;isolation:isolate;background:var(--mph-paper);color:var(--mph-ink);container:mph / size;font-family:var(--mph-sans);-webkit-font-smoothing:antialiased;}
.mph-room{position:absolute;inset:0;width:100%;height:100%;display:block;color:var(--mph-ink);pointer-events:none;}
.mph-room line,.mph-room path{vector-effect:non-scaling-stroke;}
.mph-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(100cqw,177.78cqh);aspect-ratio:16/9;container:mphs / inline-size;}

.mph-top{position:absolute;left:4.6%;right:4.6%;top:4.4%;display:grid;grid-template-columns:auto auto 1fr auto auto;align-items:center;column-gap:2.4cqw;font-size:1.05cqw;font-weight:800;line-height:1.1;text-transform:uppercase;letter-spacing:.02em;}
.mph-index{display:inline-flex;align-items:center;gap:.9em;border:.12cqw solid var(--mph-ink);border-radius:999px;padding:.12em .9em .12em .12em;font-size:.72em;}
.mph-index b{background:var(--mph-accent);color:var(--mph-ink);border-radius:999px;padding:.3em 1.2em;font-weight:800;}
.mph-tagline{font-size:1.18em;font-weight:900;margin-left:1cqw;}
.mph-brace{grid-column:4;font-size:1.3em;font-weight:700;letter-spacing:.04em;margin-right:2.6cqw;}
.mph-reel{grid-column:5;display:flex;align-items:center;gap:.8em;font-size:.8em;text-align:right;}
.mph-reel i{display:block;width:1.9em;height:1.9em;border-radius:50%;background:var(--mph-accent);border:.12cqw solid var(--mph-ink);flex:none;}

.mph-h1{position:absolute;left:8.8%;top:17.5%;margin:0;font-family:var(--mph-display);font-weight:900;font-size:6.5cqw;line-height:.93;letter-spacing:-.045em;text-transform:uppercase;color:var(--mph-ink);}
.mph-line{display:block;width:max-content;white-space:nowrap;position:relative;}
.mph-ch{display:inline-block;transition:transform .35s cubic-bezier(.3,1.6,.5,1),color .2s;}
.mph-ch:hover{transform:translateY(-.08em) rotate(-4deg);color:var(--mph-accent);}
.mph-arrow{display:inline-block;width:.6em;height:.6em;margin:0 .06em 0 .1em;vertical-align:-.02em;}
.mph-arrow path{stroke:currentColor;stroke-width:15;fill:none;stroke-linecap:square;}
.mph-badge{position:absolute;top:-.02em;left:calc(100% + .55em);font-family:var(--mph-sans);font-size:.2em;font-weight:800;letter-spacing:0;line-height:1;text-transform:none;border:.13cqw solid var(--mph-ink);border-radius:50%;padding:.75em 1.15em;transform:rotate(-9deg);transition:background .25s,transform .4s cubic-bezier(.3,1.6,.5,1);cursor:default;}
.mph-badge sup{font-size:.7em;margin-left:.1em;}
.mph-badge:hover{background:var(--mph-accent);transform:rotate(6deg) scale(1.08);}
.mph-swash{position:relative;display:inline-block;}
.mph-swash svg{position:absolute;left:-.95em;top:.3em;width:2.55em;height:.72em;overflow:visible;pointer-events:none;}
.mph-swash path{fill:none;stroke:var(--mph-ink);stroke-width:.2cqw;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0;animation:mph-draw 1.6s .5s cubic-bezier(.6,0,.2,1) both;}
.mph-h1:hover .mph-swash path{animation:mph-draw 1.1s cubic-bezier(.6,0,.2,1) both;}
.mph-l4{font-size:1.2em;letter-spacing:-.02em;margin-top:.04em;}
.mph-vtag{display:inline-flex;flex-direction:column;align-items:stretch;vertical-align:-.02em;margin:0 .1em 0 .06em;width:.2em;}
.mph-vtag span{display:block;background:var(--mph-ink);color:var(--mph-paper);writing-mode:vertical-rl;font-family:var(--mph-sans);font-size:.105em;font-weight:800;letter-spacing:.12em;padding:.55em 0;text-align:center;}
.mph-vtag i{display:block;height:.34em;background:repeating-linear-gradient(to bottom,var(--mph-ink) 0 .02em,transparent .02em .045em);}
.mph-bracket{position:relative;display:inline-block;padding:0 .08em;}
.mph-bracket svg{position:absolute;left:-.02em;right:-.02em;top:-.1em;bottom:-.12em;width:calc(100% + .04em);height:calc(100% + .22em);overflow:visible;}
.mph-bracket path{fill:none;stroke:var(--mph-ink);stroke-width:.62cqw;stroke-linecap:butt;transition:transform .45s cubic-bezier(.3,1.6,.5,1);}
.mph-bracket:hover .mph-arc-t{transform:translateY(-10px);}
.mph-bracket:hover .mph-arc-b{transform:translateY(10px);}
.mph-star{display:inline-block;font-size:.66em;vertical-align:.5em;margin-left:.02em;transition:transform .6s cubic-bezier(.3,1.6,.5,1);}
.mph-l4:hover .mph-star{transform:rotate(180deg) scale(1.2);}

.mph-pill{position:absolute;left:8.8%;top:72.8%;display:flex;align-items:stretch;font-size:1.72cqw;font-weight:800;line-height:1;}
.mph-pill-a{position:relative;z-index:1;background:#fff;color:var(--mph-ink);border:.16cqw solid var(--mph-ink);border-radius:999px;padding:.72em 1.25em;}
.mph-pill-b{display:inline-flex;align-items:center;gap:.5em;margin-left:-1.4em;padding:.72em 3.4em .72em 3.1em;background:var(--mph-accent);color:var(--mph-ink);border:.16cqw solid var(--mph-ink);border-radius:0 999px 999px 0;text-decoration:none;transition:background .25s,color .25s,padding .35s cubic-bezier(.3,1.4,.5,1);}
.mph-pill-b em{font-style:normal;display:inline-block;width:0;overflow:hidden;opacity:0;transition:width .35s,opacity .25s;}
.mph-pill-b:hover,.mph-pill-b:focus-visible{background:var(--mph-ink);color:var(--mph-paper);padding-right:2.4em;outline:none;}
.mph-pill-b:hover em,.mph-pill-b:focus-visible em{width:1em;opacity:1;}

.mph-curl{position:absolute;left:43.2%;top:52.5%;width:5.6%;aspect-ratio:1;overflow:visible;pointer-events:none;}
.mph-curl path{fill:none;stroke:var(--mph-ink);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;animation:mph-draw 1.4s 1s cubic-bezier(.6,0,.2,1) both;}

.mph-services{position:absolute;left:4.6%;bottom:4.6%;display:flex;gap:4cqw;margin:0;padding:0;list-style:none;font-size:1.3cqw;font-weight:800;}
.mph-services li{position:relative;cursor:default;padding-bottom:.25em;}
.mph-services li::after{content:"";position:absolute;left:0;right:0;bottom:0;height:.18em;background:var(--mph-accent);transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.6,0,.2,1);}
.mph-services li:hover::after{transform:scaleX(1);}

.mph-rule{position:absolute;width:0;border-left:.1cqw solid var(--mph-ink);}
.mph-rule::after{content:"";position:absolute;bottom:0;left:-.1cqw;width:1.1cqw;border-top:.1cqw solid var(--mph-ink);transform:rotate(28deg);transform-origin:left;}
.mph-rule-l{left:3.7%;top:23%;height:13%;}
.mph-rule-r{left:94.8%;top:66%;height:13%;}

.mph-char{position:absolute;left:55.5%;bottom:-1.2%;width:40.5%;aspect-ratio:600/720;padding:0;margin:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent;border-radius:40% 40% 8% 8%;}
.mph-char:focus-visible{outline:.2cqw dashed var(--mph-ink);outline-offset:.4cqw;}
.mph-char svg{display:block;width:100%;height:100%;overflow:visible;}
.mph-bubble{position:absolute;left:-4%;top:6%;max-width:46%;background:#fff;color:var(--mph-ink);border:.16cqw solid var(--mph-ink);border-radius:1.4em 1.4em 1.4em .2em;padding:.8em 1.1em;font-size:1.3cqw;font-weight:800;line-height:1.2;text-align:left;box-shadow:.35cqw .35cqw 0 var(--mph-accent);transform-origin:0 100%;transform:scale(0) rotate(-8deg);opacity:0;transition:transform .45s cubic-bezier(.3,1.6,.5,1),opacity .2s;pointer-events:none;}
.mph-bubble[data-on="true"]{transform:scale(1) rotate(-4deg);opacity:1;}

@keyframes mph-draw{from{stroke-dashoffset:1;}to{stroke-dashoffset:0;}}

@container mph (orientation: portrait){
.mph-stage{top:0;transform:translateX(-50%);width:min(100cqw,56.25cqh);height:100cqh;aspect-ratio:auto;}
.mph-top{top:5cqw;left:6%;right:6%;grid-template-columns:auto 1fr auto;font-size:2.5cqw;}
.mph-tagline,.mph-brace{display:none;}
.mph-reel{grid-column:3;}
.mph-h1{left:7%;top:17cqw;font-size:11.4cqw;}
.mph-badge{left:calc(100% + .35em);top:.1em;font-size:.22em;}
.mph-pill{left:7%;top:70cqw;font-size:3.5cqw;}
.mph-curl{left:auto;right:4%;top:44cqw;width:11%;}
.mph-services{left:7%;right:7%;bottom:auto;top:84cqw;flex-wrap:wrap;gap:1.6cqw 5cqw;font-size:3cqw;}
.mph-rule-l{left:3%;top:22cqw;height:12cqw;}
.mph-rule-r{left:95%;top:auto;bottom:40cqw;height:12cqw;}
.mph-char{left:12%;width:76%;bottom:-.6%;}
.mph-bubble{font-size:3cqw;left:-8%;top:2%;max-width:52%;}
}

@media (prefers-reduced-motion: reduce){
.mph-root *,.mph-root *::after{animation:none!important;transition:none!important;}
}
`

/* ------------------------------------------------------------- component */

type Layers = Partial<
  Record<
    | "body" | "head" | "earL" | "earR" | "hair" | "blush"
    | "face" | "nose" | "eyes" | "brows",
    SVGGElement | null
  >
>

const DEFAULT_SERVICES = ["Brand design", "Logo design", "Interface design", "IP character design"]
const DEFAULT_GREETINGS = ["Hi there!", "Let's make something bold.", "Psst — I'm open to work.", "Okay, you can stop poking me :)"]

export default function MascotPortfolioHero({
  height = "100svh",
  minHeight = "440px",
  index = "08/01",
  discipline = "Visual design",
  tagline = "Make it helpful",
  collection = ["Selected", "Works"],
  reel = ["Sample reels @ 2026", "Visual design"],
  year = "2026",
  initials = "UI",
  badge = "Hire me",
  line2 = "Portfolio",
  line3 = "Design",
  word = "Work",
  verticalTag = "Visual",
  bracketed = "S",
  seekingLabel = "Seeking*",
  seeking = "UI / Graphic",
  href,
  services = DEFAULT_SERVICES,
  greetings = DEFAULT_GREETINGS,
  skin = "#7b4532",
  hair = "#1c1216",
  beard = "#2a1d1b",
  glasses = "#c9ccd3",
  shirt = "#ececef",
  accent = "#5fb57a",
  paper = "#ebebea",
  ink = "#111111",
  srTitle,
  className,
}: MascotPortfolioHeroProps) {
  // Gradient and filter ids are global. Two heroes on one page would otherwise
  // share them and the second mount would repaint the first.
  const uid = React.useId().replace(/:/g, "")
  const id = (n: string) => n + uid
  const u = (n: string) => "url(#" + id(n) + ")"

  const rootRef = React.useRef<HTMLDivElement>(null)
  const charRef = React.useRef<HTMLButtonElement>(null)
  const layers = React.useRef<Layers>({})
  const set = (k: keyof Layers) => (el: SVGGElement | null) => {
    layers.current[k] = el
  }

  const [happy, setHappy] = React.useState(false)
  const [said, setSaid] = React.useState(-1)
  const happyTimer = React.useRef<number | undefined>(undefined)

  const poke = () => {
    setSaid((n) => (n + 1) % Math.max(1, greetings.length))
    setHappy(true)
    window.clearTimeout(happyTimer.current)
    happyTimer.current = window.setTimeout(() => setHappy(false), 2200)
  }
  React.useEffect(() => () => window.clearTimeout(happyTimer.current), [])

  /* The loop. Everything the pointer drives is written straight to the SVG —
     running it through React state would re-render the whole poster at 60fps. */
  React.useEffect(() => {
    const root = rootRef.current
    const char = charRef.current
    if (!root || !char) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let still = mq.matches
    const onMq = () => (still = mq.matches)
    mq.addEventListener("change", onMq)

    let px = 0
    let py = 0
    let lastMove = -1e9
    let gx = 0
    let gy = 0
    let near = 0
    let prev = performance.now()
    let nextBlink = prev + 1800
    let blinkAt = -1e9
    let raf = 0
    let visible = true

    const onMove = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      lastMove = performance.now()
    }
    const onLeave = () => (lastMove = -1e9)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    window.addEventListener("blur", onLeave)

    const tr = (dx: number, dy: number) => "translate(" + dx.toFixed(2) + " " + dy.toFixed(2) + ")"
    const L = layers.current

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now

      const r = char.getBoundingClientRect()
      // The head, not the box: the face sits at about 50% across and 48% down.
      const cx = r.left + r.width * 0.5
      const cy = r.top + r.height * 0.48
      let tx = 0
      let ty = 0
      let tn = 0
      const idle = now - lastMove > 3500
      if (!idle) {
        const reach = Math.max(innerWidth, innerHeight)
        ;[tx, ty] = aim(px, py, cx, cy, reach * 0.3, reach * 0.26)
        const dist = Math.hypot(px - cx, py - cy)
        tn = Math.max(0, 1 - dist / (r.width * 0.45))
      } else if (!still) {
        // Nobody is there: look around the room on its own.
        const t = now / 1000
        tx = Math.sin(t * 0.45) * 0.55 + Math.sin(t * 1.1) * 0.1
        ty = Math.sin(t * 0.31 + 1) * 0.25
      }

      const rate = still ? 30 : 7
      gx = approach(gx, tx, dt, rate)
      gy = approach(gy, ty, dt, rate)
      near = approach(near, tn, dt, 8)
      const p = pose(gx, gy, near)
      const breathe = still ? 0 : Math.sin(now / 620) * 1.6

      if (!still && now > nextBlink) {
        blinkAt = now
        // Now and then a double blink, the way people actually do it.
        nextBlink = now + (Math.random() < 0.2 ? 260 : 2200 + Math.random() * 3200)
      }
      const open = still ? 1 : blink((now - blinkAt) / 1000)

      L.body?.setAttribute("transform", tr(p.body.dx, p.body.dy + breathe * 0.4))
      L.head?.setAttribute(
        "transform",
        tr(p.head.dx, p.head.dy + breathe) + " rotate(" + p.head.rot.toFixed(2) + " 300 560)",
      )
      L.earL?.setAttribute("transform", tr(p.ears.dx, p.ears.dy) + " translate(138 380) scale(" + p.ears.lead.toFixed(3) + " 1) translate(-138 -380)")
      L.earR?.setAttribute("transform", tr(p.ears.dx, p.ears.dy) + " translate(462 380) scale(" + p.ears.trail.toFixed(3) + " 1) translate(-462 -380)")
      L.hair?.setAttribute("transform", tr(p.hair.dx, p.hair.dy))
      L.blush?.setAttribute("transform", tr(p.blush.dx, p.blush.dy))
      L.face?.setAttribute("transform", tr(p.face.dx, p.face.dy))
      L.nose?.setAttribute("transform", tr(p.nose.dx, p.nose.dy))
      L.brows?.setAttribute("transform", tr(p.brows.dx, p.brows.dy))
      L.eyes?.setAttribute(
        "transform",
        tr(p.eyes.dx, p.eyes.dy) +
          " translate(300 350) scale(" + p.eyes.scale.toFixed(3) + " " + (p.eyes.scale * open).toFixed(3) + ") translate(-300 -350)",
      )
    }
    raf = requestAnimationFrame(frame)

    // Offscreen, the loop keeps its slot but does no work.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      prev = performance.now()
    })
    io.observe(root)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      mq.removeEventListener("change", onMq)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("blur", onLeave)
    }
  }, [])

  const chars = (s: string) =>
    Array.from(s).map((c, i) => (
      <span key={i} className="mph-ch">
        {c === " " ? " " : c}
      </span>
    ))

  const l3 = Array.from(line3)
  const l3Head = l3.slice(0, -1).join("")
  const l3Tail = l3[l3.length - 1] ?? ""
  const greeting = said >= 0 ? greetings[said % greetings.length] : greetings[0]

  const vars = {
    "--mph-accent": accent,
    "--mph-paper": paper,
    "--mph-ink": ink,
    "--mph-sans": SANS_STACK,
    "--mph-display": DISPLAY_STACK,
    height,
    minHeight,
  } as React.CSSProperties

  const pillInner = (
    <>
      {seeking}
      <em aria-hidden="true">→</em>
    </>
  )

  return (
    <div ref={rootRef} className={"mph-root" + (className ? " " + className : "")} style={vars}>
      <style>{CSS}</style>

      <svg className="mph-room" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.13">
          {ROOM.back.map((s, i) => (
            <line key={"b" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
          ))}
          {ROOM.rays.map((s, i) => (
            <line key={"r" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
          ))}
          {ROOM.depth.map((d, i) => (
            <path key={"d" + i} d={d} />
          ))}
        </g>
      </svg>

      <div className="mph-stage">
        <header className="mph-top">
          <span className="mph-index">
            <b>{index}</b>
            {discipline}
          </span>
          <span className="mph-tagline">{tagline}</span>
          <span className="mph-brace">
            {"{"}
            {collection[0]}/{collection[1]}
            {"}"}
          </span>
          <span className="mph-reel">
            <i aria-hidden="true" />
            <span>
              {reel[0]}
              <br />
              {reel[1]}
            </span>
          </span>
        </header>

        <span className="mph-rule mph-rule-l" aria-hidden="true" />
        <span className="mph-rule mph-rule-r" aria-hidden="true" />

        <h1 className="mph-h1">
          <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
            {srTitle ?? [year, initials, line2, line3, word + bracketed].join(" ")}
          </span>
          <span className="mph-line" aria-hidden="true">
            {chars(year)}
            <svg className="mph-arrow" viewBox="0 0 100 100">
              <path d="M14 14 L84 84 M84 30 V84 H30" />
            </svg>
            {chars(initials)}
            <span className="mph-badge">
              {badge}
              <sup>@</sup>
            </span>
          </span>
          <span className="mph-line" aria-hidden="true">
            {chars(line2)}
          </span>
          <span className="mph-line" aria-hidden="true">
            {chars(l3Head)}
            <span className="mph-swash">
              <span className="mph-ch">{l3Tail}</span>
              <svg viewBox="0 0 255 72" preserveAspectRatio="none">
                <path
                  pathLength={1}
                  d="M6 44 C40 18 150 4 222 14 C262 20 258 48 214 58 C150 72 60 70 30 60 C10 53 20 40 60 34"
                />
              </svg>
            </span>
          </span>
          <span className="mph-line mph-l4" aria-hidden="true">
            {chars(word)}
            <span className="mph-vtag">
              <span>{verticalTag}</span>
              <i />
            </span>
            <span className="mph-bracket">
              <svg viewBox="0 0 100 120" preserveAspectRatio="none">
                <path className="mph-arc-t" vectorEffect="non-scaling-stroke" d="M4 16 Q50 -8 96 16" />
                <path className="mph-arc-b" vectorEffect="non-scaling-stroke" d="M4 104 Q50 128 96 104" />
              </svg>
              {bracketed}
            </span>
            <span className="mph-star">*</span>
          </span>
        </h1>

        <svg className="mph-curl" viewBox="0 0 100 100" aria-hidden="true">
          <path
            pathLength={1}
            d="M92 8 C70 6 52 22 58 40 C63 56 84 52 80 36 C76 22 50 30 40 48 C32 62 26 74 16 84 M14 66 L14 86 L34 86"
          />
        </svg>

        <div className="mph-pill">
          <span className="mph-pill-a">{seekingLabel}</span>
          {href ? (
            <a className="mph-pill-b" href={href}>
              {pillInner}
            </a>
          ) : (
            <span className="mph-pill-b" tabIndex={0}>
              {pillInner}
            </span>
          )}
        </div>


        <ul className="mph-services">
          {services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <button
          ref={charRef}
          type="button"
          className={"mph-char" + (happy ? " mph-happy" : "")}
          onClick={poke}
          aria-label="Dire bonjour à Ephrem"
        >
          <svg viewBox={"0 0 " + CW + " " + CH} aria-hidden="true">
            <defs>
              {/* Shading is layered over a flat fill rather than baked into it,
                  so every colour prop still reads as lit and round. */}
              <radialGradient id={id("shade")} cx="46%" cy="40%" r="62%">
                <stop offset="0.5" stopColor="#1e0a04" stopOpacity="0" />
                <stop offset="1" stopColor="#1e0a04" stopOpacity="0.5" />
              </radialGradient>
              <radialGradient id={id("hi")} cx="38%" cy="30%" r="40%">
                <stop offset="0" stopColor="#ffd2b8" stopOpacity="0.32" />
                <stop offset="1" stopColor="#ffd2b8" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={id("blush")}>
                <stop offset="0" stopColor="#d0503a" stopOpacity="0.3" />
                <stop offset="1" stopColor="#d0503a" stopOpacity="0" />
              </radialGradient>
              {/* One highlight shared by every curl, so the hair reads as a mass of round coils. */}
              <radialGradient id={id("curl")} cx="34%" cy="28%" r="70%">
                <stop offset="0" stopColor="#fff" stopOpacity="0.24" />
                <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.45" />
              </radialGradient>
              <radialGradient id={id("iris")} cx="45%" cy="40%" r="65%">
                <stop offset="0" stopColor="#7a4628" />
                <stop offset="1" stopColor="#2a140a" />
              </radialGradient>
              <radialGradient id={id("nose")} cx="42%" cy="34%" r="66%">
                <stop offset="0" stopColor="#ffc7a8" stopOpacity="0.2" />
                <stop offset="1" stopColor="#1e0a04" stopOpacity="0.45" />
              </radialGradient>
              <linearGradient id={id("neck")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#140602" stopOpacity="0.6" />
                <stop offset="0.5" stopColor="#140602" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id={id("cloth")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.4" />
                <stop offset="1" stopColor="#3a3550" stopOpacity="0.28" />
              </linearGradient>
              <linearGradient id={id("lens")} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
                <stop offset="0.45" stopColor="#fff" stopOpacity="0.02" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
              </linearGradient>
              {/* Roughs the edges of the beard and the fade so they read as hair, not paint. */}
              <filter id={id("fuzz")} x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <clipPath id={id("mouth")}>
                <path d="M258 466 Q300 478 342 466 Q336 508 300 512 Q264 508 258 466 Z" />
              </clipPath>
              <clipPath id={id("eyeL")}>
                <path d="M208 356 Q214 334 240 332 Q266 332 274 354 Q262 378 240 379 Q216 378 208 356 Z" />
              </clipPath>
              <clipPath id={id("eyeR")}>
                <path d="M326 354 Q334 332 360 332 Q386 334 392 356 Q384 378 360 379 Q338 378 326 354 Z" />
              </clipPath>
            </defs>

            {/* Contact shadow on the floor. */}
            <ellipse cx="300" cy="712" rx="250" ry="16" fill="#000" opacity="0.08" />

            <g ref={set("body")}>
              <path d="M28 730 C40 646 104 604 206 588 L394 588 C496 604 560 646 572 730 Z" fill={shirt} />
              <path d="M28 730 C40 646 104 604 206 588 L394 588 C496 604 560 646 572 730 Z" fill={u("cloth")} stroke="#141218" strokeOpacity="0.18" strokeWidth="2" />
              {/* Neck, with the chin's shadow falling on it. */}
              <path d="M240 500 L360 500 L366 604 Q300 628 234 604 Z" fill={skin} />
              <path d="M240 500 L360 500 L366 604 Q300 628 234 604 Z" fill={u("neck")} />
              {/* Shirt collar, open at the neck, and the button placket. */}
              <path d="M230 566 Q252 606 300 626 L268 664 Q222 640 196 596 Z" fill={shirt} stroke="#141218" strokeOpacity="0.28" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M370 566 Q348 606 300 626 L332 664 Q378 640 404 596 Z" fill={shirt} stroke="#141218" strokeOpacity="0.28" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M300 626 V730" stroke="#141218" strokeOpacity="0.16" strokeWidth="2.5" />
              <path d="M310 630 V730" stroke="#141218" strokeOpacity="0.08" strokeWidth="2" />
              {/* The fleur-de-lis on the chest. */}
              <g transform="translate(386 676) scale(0.95)" fill="#141218">
                <path d="M0 -24 C7 -15 9 -6 0 7 C-9 -6 -7 -15 0 -24 Z" />
                <path d="M-3 5 C-9 -9 -24 -7 -20 5 C-18 10 -12 9 -11 4 C-9 7 -6 8 -3 9 Z" />
                <path d="M3 5 C9 -9 24 -7 20 5 C18 10 12 9 11 4 C9 7 6 8 3 9 Z" />
                <rect x="-11" y="7" width="22" height="4.5" rx="1.5" />
                <path d="M-6 11.5 L0 22 L6 11.5 Z" />
              </g>
            </g>

            <g ref={set("head")}>
              <g ref={set("earL")}>
                <ellipse cx="138" cy="380" rx="40" ry="54" fill={skin} />
                <ellipse cx="138" cy="380" rx="40" ry="54" fill={u("shade")} />
                <path d="M150 350 Q122 360 128 392 Q134 414 150 412" fill="none" stroke="#1e0a04" strokeOpacity="0.4" strokeWidth="7" strokeLinecap="round" />
              </g>
              <g ref={set("earR")}>
                <ellipse cx="462" cy="380" rx="40" ry="54" fill={skin} />
                <ellipse cx="462" cy="380" rx="40" ry="54" fill={u("shade")} />
                <path d="M450 350 Q478 360 472 392 Q466 414 450 412" fill="none" stroke="#1e0a04" strokeOpacity="0.4" strokeWidth="7" strokeLinecap="round" />
                {/* The stud. */}
                <circle cx="466" cy="424" r="6" fill="#d8b25a" />
                <circle cx="464" cy="422" r="2" fill="#fff" opacity="0.8" />
              </g>

              {/* Skull and face: a touch wider at the jaw than the default. */}
              <path d="M300 140 C405 140 474 222 474 345 C474 470 404 566 300 566 C196 566 126 470 126 345 C126 222 195 140 300 140 Z" fill={skin} />
              <path d="M300 140 C405 140 474 222 474 345 C474 470 404 566 300 566 C196 566 126 470 126 345 C126 222 195 140 300 140 Z" fill={u("shade")} />
              <path d="M300 140 C405 140 474 222 474 345 C474 470 404 566 300 566 C196 566 126 470 126 345 C126 222 195 140 300 140 Z" fill={u("hi")} />

              <g ref={set("blush")}>
                <ellipse cx="190" cy="430" rx={happy ? 50 : 44} ry={happy ? 34 : 30} fill={u("blush")} />
                <ellipse cx="410" cy="430" rx={happy ? 50 : 44} ry={happy ? 34 : 30} fill={u("blush")} />
              </g>

              {/* Beard: a jawline band from the sideburns, and a goatee round the mouth. */}
              <g filter={u("fuzz")} fill={beard}>
                <path d="M140 350 C144 456 196 552 300 570 C404 552 456 456 460 350 L450 350 C440 424 410 476 358 498 L300 506 L242 498 C190 476 160 424 150 350 Z" />
                <path d="M244 454 C262 438 286 438 300 444 C314 438 338 438 356 454 C368 470 370 502 362 526 C346 552 254 552 238 526 C230 502 232 470 244 454 Z" />
              </g>

              <g ref={set("face")}>
                <g ref={set("brows")}>
                  <path d={happy ? "M194 286 Q232 262 272 280" : "M194 292 Q232 274 272 288"} fill="none" stroke={hair} strokeWidth="20" strokeLinecap="round" />
                  <path d={happy ? "M328 280 Q368 262 406 286" : "M328 288 Q368 274 406 292"} fill="none" stroke={hair} strokeWidth="20" strokeLinecap="round" />
                </g>

                <g ref={set("eyes")}>
                  {happy ? (
                    <>
                      <path d="M212 358 Q240 334 268 358" fill="none" stroke="#120806" strokeWidth="11" strokeLinecap="round" />
                      <path d="M332 358 Q360 334 388 358" fill="none" stroke="#120806" strokeWidth="11" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      {/* Sclera with a heavy upper lid, which gives the calm, half-lidded look. */}
                      <path d="M208 356 Q214 334 240 332 Q266 332 274 354 Q262 378 240 379 Q216 378 208 356 Z" fill="#f4eee8" />
                      <g clipPath={u("eyeL")}>
                        <circle cx="242" cy="358" r="17" fill={u("iris")} />
                        <circle cx="242" cy="358" r="8" fill="#0b0605" />
                        <circle cx="236" cy="351" r="4.5" fill="#fff" />
                        <path d="M204 330 H278 V346 Q240 336 204 346 Z" fill={skin} />
                      </g>
                      <path d="M206 352 Q214 332 240 331 Q266 331 276 350" fill="none" stroke="#120806" strokeWidth="5" strokeLinecap="round" />
                      <path d="M326 354 Q334 332 360 332 Q386 334 392 356 Q384 378 360 379 Q338 378 326 354 Z" fill="#f4eee8" />
                      <g clipPath={u("eyeR")}>
                        <circle cx="358" cy="358" r="17" fill={u("iris")} />
                        <circle cx="358" cy="358" r="8" fill="#0b0605" />
                        <circle cx="352" cy="351" r="4.5" fill="#fff" />
                        <path d="M322 330 H396 V346 Q360 336 322 346 Z" fill={skin} />
                      </g>
                      <path d="M324 350 Q334 331 360 331 Q386 332 394 352" fill="none" stroke="#120806" strokeWidth="5" strokeLinecap="round" />
                    </>
                  )}
                  <path d="M218 388 Q240 396 262 388 M338 388 Q360 396 382 388" fill="none" stroke="#1e0a04" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Silver double-bridge frames. */}
                <g fill="none" stroke={glasses} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
                  <rect x="182" y="302" width="114" height="86" rx="26" fill={u("lens")} />
                  <rect x="304" y="302" width="114" height="86" rx="26" fill={u("lens")} />
                  <path d="M296 330 Q300 322 304 330" />
                  <path d="M262 305 H338" strokeWidth="4" />
                  <path d="M182 326 L136 318 M418 326 L464 318" strokeWidth="5" />
                  <path d="M196 322 L226 314" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" />
                  <path d="M318 322 L348 314" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" />
                </g>

                {/* The mouth: a relaxed closed smile, or teeth when poked. */}
                <g>
                  {happy ? (
                    <>
                      <path d="M258 466 Q300 478 342 466 Q336 508 300 512 Q264 508 258 466 Z" fill="#3a0e0c" />
                      <g clipPath={u("mouth")}>
                        <path d="M250 462 Q300 478 350 462 L350 484 Q300 494 250 484 Z" fill="#fff" />
                        <ellipse cx="300" cy="512" rx="26" ry="12" fill="#c55252" />
                      </g>
                      <path d="M258 466 Q300 478 342 466 Q336 508 300 512 Q264 508 258 466 Z" fill="none" stroke="#7d3a30" strokeWidth="5" strokeLinejoin="round" />
                    </>
                  ) : (
                    <>
                      <path d="M262 470 C280 460 292 464 300 467 C308 464 320 459 340 466 C320 474 280 476 262 470 Z" fill="#4a1c18" />
                      <path d="M264 472 C284 492 318 492 338 468 C318 478 284 478 264 472 Z" fill="#8a4436" />
                      <path d="M284 480 Q300 486 316 480" fill="none" stroke="#d08a74" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
                    </>
                  )}
                </g>

                <g ref={set("nose")}>
                  <ellipse cx="300" cy="438" rx="34" ry="11" fill="#1e0a04" opacity="0.18" />
                  <ellipse cx="300" cy="418" rx="35" ry="25" fill={skin} />
                  <ellipse cx="300" cy="418" rx="35" ry="25" fill={u("nose")} />
                  <ellipse cx="285" cy="430" rx="7" ry="4" fill="#120604" opacity="0.4" />
                  <ellipse cx="315" cy="430" rx="7" ry="4" fill="#120604" opacity="0.4" />
                  <ellipse cx="292" cy="408" rx="10" ry="7" fill="#ffd2b8" opacity="0.3" />
                </g>
              </g>

              <g ref={set("hair")}>
                {/* The fade at the temples. */}
                <g filter={u("fuzz")} fill={hair} opacity="0.6">
                  <path d="M134 262 C128 296 132 326 140 346 L154 344 C150 316 152 288 164 258 Z" />
                  <path d="M466 262 C472 296 468 326 460 346 L446 344 C450 316 448 288 436 258 Z" />
                </g>
                {/* The cap of hair, then the coils piled on top of it, back rows first. */}
                <path d="M138 290 C126 168 202 100 300 100 C398 100 474 168 462 290 C446 256 414 236 300 232 C186 236 154 256 138 290 Z" fill={hair} />
                {CURLS.map((c, i) => (
                  <g key={i}>
                    <circle cx={c[0]} cy={c[1]} r={c[2]} fill={hair} />
                    <circle cx={c[0]} cy={c[1]} r={c[2]} fill={u("curl")} />
                  </g>
                ))}
              </g>
            </g>
          </svg>
          <span className="mph-bubble" data-on={happy ? "true" : "false"} aria-live="polite">
            {greeting}
          </span>
        </button>
      </div>
    </div>
  )
}
