// DARK MODE
if (!localStorage.getItem("theme")) {
  if (window.matchMedia) {
    try {
      const theme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      localStorage.setItem("theme", theme)
    } catch (error) {
      localStorage.setItem("theme", "dark")
      console.error(error)
    }
  } else {
    localStorage.setItem("theme", "dark")
  }
}
document.documentElement.setAttribute(
  "theme",
  localStorage.getItem("theme"),
)
try {
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        const theme = e.matches ? "dark" : "light"
        document.documentElement.setAttribute("theme", theme)
        localStorage.setItem("theme", theme)
      })
  }
} catch (error) {
  console.error(error)
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("theme")
  const theme = current === "dark" ? "light" : "dark"
  document.documentElement.setAttribute("theme", theme)
  localStorage.setItem("theme", theme)
}

// MOVE ANIMATION
const glassh = document.getElementById("glassholder")
const glass = document.getElementsByClassName("glass")[0]
const sh = document.getElementsByClassName("socialholder")[0]
const im = document.getElementsByClassName("im")
const sig = document.getElementById("sig")

const isTouchEnabled = window.Touch || false

if (!isTouchEnabled) {
  glassh.addEventListener("mousemove", (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 15
    let yAxis = (window.innerHeight / 2 - e.pageY) / 15
    glass.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`
  })
} else {
  glassh.addEventListener("touchmove", (e) => {
    let evt =
      typeof e.originalEvent === "undefined" ? e : e.originalEvent
    let touch = evt.touches[0] || evt.changedTouches[0]
    let xAxis = (window.innerWidth / 2 - touch.pageX) / 15
    let yAxis = (window.innerHeight / 2 - touch.pageY) / 15
    glass.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`
  })
}

function aniStart(signal) {
  glass.style.transition = "none"
  sh.style.transform = `translateZ(${signal * 50}px)`
  im[0].style.transform = `translateZ(${signal * 75}px)`
  im[1].style.transform = `translateZ(${signal * 75}px)`
  sig.style.transform = `translateZ(${signal * 150}px)`
}
if (!isTouchEnabled)
  glassh.addEventListener("mouseenter", () => {
    aniStart(-1)
  })
else
  glassh.addEventListener("touchstart", () => {
    aniStart(1)
  })

function aniEnd() {
  glass.style.transition = "all 0.2s ease-in-out"
  glass.style.transform = `rotateY(0deg) rotateX(0deg)`
  sh.style.transform = "translateZ(0px)"
  im[0].style.transform = "translateZ(0px)"
  im[1].style.transform = "translateZ(0px)"
  sig.style.transform = "translateZ(0px)"
}
if (!isTouchEnabled)
  glassh.addEventListener("mouseleave", () => {
    aniEnd()
  })
else
  glassh.addEventListener("touchend", () => {
    aniEnd()
  })
