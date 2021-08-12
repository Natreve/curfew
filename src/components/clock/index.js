import React, { useEffect } from "react"
import { clock, hr, min, sec } from "./css.module.scss"
const Clock = () => {
  useEffect(() => {
    let ticker = setInterval(() => {
      const r = (el, deg) =>
        el.setAttribute("transform", "rotate(" + deg + " 500 500)")

      var d = new Date()
      let hour = document.querySelector(`#${hr}`)
      let minute = document.querySelector(`#${min}`)
      let second = document.querySelector(`#${sec}`)
      r(second, 6 * d.getSeconds())
      r(minute, 6 * d.getMinutes())
      r(hour, 30 * (d.getHours() % 12) + d.getMinutes() / 2)
    }, 1000)
    return () => clearInterval(ticker)
  })
  return (
    <svg id={clock} height="200" width="200" viewBox="0 0 1000 1000">
      <path d="M978,500c0,263.99-214.01,478-478,478s-478-214.01-478-478,214.01-478,478-478,478,214.01,478,478zm-888.93,237.25,20.179-11.65m779.16-449.85l22.517-13m-648.18,648.18,11.65-20.18m449.85-779.16l13-22.517m-711.75,410.93h23.305m899.7,0h26m-885.43-237.25,20.179,11.65m779.16,449.85,22.517,13m-648.18-648.18l11.652,20.183m449.85,779.16,13,22.517m-237.25-885.43v23.305m0,899.7,0,26" />
      <path d="M500,500,500,236" id={hr} />
      <path d="M500,500,500,120" id={min} />
      <path d="M500,500,500,90" id={sec} />
    </svg>
  )
}

export default Clock
