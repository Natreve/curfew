import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Clock from "components/clock"
import Curfew from "../classes/Curfew"
const IndexPage = () => {
  const curfew = React.useMemo(() => new Curfew(), [])
  const [state, setState] = useState(curfew.ongoing())
  useEffect(() => {
    curfew.onInterval(({ hours, minutes, seconds }) => {
      //if the current ongoing status of the curfew is different than the initial state update UI by changing state
      if (state !== curfew.ongoing()) setState(curfew.ongoing)

      let timer = document.querySelector("#timer")
      timer.innerHTML = `${hours} hr ${minutes} min ${seconds} sec`
    })

    //     if (!("Notification" in window)) {
    //       let msg = "Browser does not support notification bet it's a iphone 😐"
    //       alert(`${msg} I said what I said...`)
    //       return
    //     }
    //     let result = await Notification.requestPermission()

    //   var body = "HEY! Your task is now overdue."
    //   var notification = new Notification("To do list", { body })

    return () => {
      curfew.unsubscribe()
    }
  }, [curfew, state])

  return (
    <Layout>
      <Seo title="Home" />
      <div>
        <h1 className="title">
          {curfew.ongoing() ? "Curfew Ends" : "Curfew Starts"}
        </h1>
        <span className="today">
          {curfew.ongoing() ? curfew.ends() : curfew.starts()}
        </span>
      </div>
      <Clock />

      <div className="day">
        <span>DAYS UNTIL MEASURES END</span>
        <h1>{curfew.measuresEnd()}</h1>
        <div>
          <span>
            {curfew.ongoing()
              ? "Time until curfew ends"
              : "Time until curfew starts"}
          </span>
          <div id="timer">-- / -- / --</div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
