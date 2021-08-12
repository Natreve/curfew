import React, { useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { DateTime } from "luxon"
import curfew from "../data/curfew.json"
import Clock from "components/clock"
import Curfew from "../classes/Curfew"
const IndexPage = () => {
  const { periods, ends } = curfew
  useEffect(() => {
    const curf = new Curfew()
    // curf.onInterval(duration => console.log(duration))
    console.log(curf.ongoing())
    console.log(curf.measuresEnd())
    console.log(curf.starts())
    console.log(curf.ends())

    const now = DateTime.now()
    const tomorrow = DateTime.now().plus({ days: 1 })
    let timer = null //keeps track of the interval in order to clean up on component unmount
    //curfew start and end period for current weekday
    const { start, end } = periods[now.weekday - 1]
    //curfew start and end dates
    const csd = DateTime.fromISO(`${now.toFormat("kkkk-MM-dd")}${start}`)
    const ced = DateTime.fromISO(`${tomorrow.toFormat("kkkk-MM-dd")}${end}`)
    const duce = DateTime.fromISO(ends) //duce(days until curfew ends)
    const isCurfew = () =>
      now.diff(csd, "minutes").toObject().minutes >= 0 ||
      now.diff(ced, "minutes").toObject().minutes >= 0

    const title = document.querySelector(".title")
    const date = document.querySelector(".today")
    const options = ["hours", "minutes", "seconds"]
    // Let's check if the browser supports notifications
    //     if (!("Notification" in window)) {
    //       let msg = "Browser does not support notification bet it's a iphone 😐"
    //       alert(`${msg} I said what I said...`)
    //       return
    //     }
    //     let result = await Notification.requestPermission()

    //   var body = "HEY! Your task is now overdue."
    //   var notification = new Notification("To do list", { body })

    if (isCurfew()) {
      //Show when curfew ends
      const time = ced.toFormat("t")
      title.innerHTML = "Curfew Ends"
      date.innerHTML = `${ced.toFormat("dd.MMM.kkkk")} @ ${time}`

      timer = setInterval(() => {
        let now = DateTime.now()
        let timer = document.querySelector("#timer")
        let endDate = document.querySelector(".day h1")
        let timeUntilEnd = document.querySelector(".day div span")
        const { hours, minutes, seconds } = ced.diff(now, options).toObject()
        timeUntilEnd.innerHTML = "Time until curfew ends"
        endDate.innerHTML = duce.diff(now, "days").toFormat("dd")
        timer.innerHTML = `${hours} hr ${minutes} min ${Math.round(
          seconds
        )} sec`
      }, 1000)
      return
    }
    //show when curfew starts
    const time = csd.toFormat("t")
    title.innerHTML = "Curfew Starts"
    date.innerHTML = `${csd.toFormat("dd.MMM.kkkk")} @ ${time}`

    timer = setInterval(() => {
      let now = DateTime.now()
      let timer = document.querySelector("#timer")
      let endDate = document.querySelector(".day h1")
      let timeUntilEnd = document.querySelector(".day div span")
      const { hours, minutes, seconds } = csd.diff(now, options).toObject() //.toFormat("hh mm ss ")
      timeUntilEnd.innerHTML = "Time until curfew starts"
      endDate.innerHTML = duce.diff(now, "days").toFormat("dd")
      timer.innerHTML = `${hours} hr ${minutes} min ${Math.round(seconds)} sec`
    }, 1000)

    return () => {
      clearInterval(timer)
      curf.unsubscribe()
    }
  })

  return (
    <Layout>
      <Seo title="Home" />
      <div>
        <h1 className="title">...</h1>
        <span className="today">--.--.--</span>
      </div>
      <Clock />

      <div className="day">
        <span>DAYS UNTIL MEASURES END</span>
        <h1>...</h1>
        <div>
          <span></span>
          <div id="timer">-- / -- / --</div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
