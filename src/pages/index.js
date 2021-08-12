import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Clock from "components/clock"
import Curfew from "../classes/Curfew"
import icon from "../images/icon.png"
const IndexPage = () => {
  const curfew = React.useMemo(() => new Curfew(), [])
  const [state, setState] = useState(curfew.ongoing())
  const notifyMe = () => {
    if (!("Notification" in window)) {
      return alert("This browser does not support desktop notification 😐")
    }
    if (Notification.permission === "granted") {
      let body = "Notification permissions have already been granted"
      return new Notification("Notification Permissions", { body, icon })
    }

    if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          let body = "Notification permssions have been granted"
          new Notification("Notification Permissions", { body, icon })
        }
      })
    }
  }
  //
  const notify = (title, body) => {
    if (!("Notification" in window) && Notification.permission !== "granted")
      return false
    new Notification(title, { body, icon })
  }
  useEffect(() => {
    curfew.onInterval(({ hours, minutes, seconds }) => {
      //if the current ongoing status of the curfew is different than the initial state update UI by changing state
      if (hours === 0 && minutes === 59 && seconds === 0) {
        if (curfew.ongoing()) {
          return notify("Curfew Reminder", "Curfew ends in 1 hour")
        }
        notify("Curfew Reminder", "Curfew start in 1 hour")
      }
      if (state !== curfew.ongoing()) setState(curfew.ongoing)

      let timer = document.querySelector("#timer")
      timer.innerHTML = `${hours} hr ${minutes} min ${seconds} sec`
    })

    return () => {
      curfew.unsubscribe()
    }
  }, [curfew, state])

  return (
    <Layout>
      <Seo title="Home" />
      <div>
        <header>
          <h1>{curfew.ongoing() ? "Curfew Ends" : "Curfew Starts"}</h1>
          <div>
            <svg
              id="Iconly_Light_Notification"
              data-name="Iconly/Light/Notification"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={() => notifyMe()}
            >
              <g id="Notification" transform="translate(3.5 2)">
                <path
                  id="Path_425"
                  d="M0,11.787v-.219A3.6,3.6,0,0,1,.6,9.75,4.87,4.87,0,0,0,1.8,7.436c0-.666,0-1.342.058-2.009C2.155,2.218,5.327,0,8.461,0h.078c3.134,0,6.306,2.218,6.617,5.427.058.666,0,1.342.049,2.009A4.955,4.955,0,0,0,16.4,9.759a3.506,3.506,0,0,1,.6,1.809v.209a3.566,3.566,0,0,1-.844,2.39A4.505,4.505,0,0,1,13.3,15.538a45.078,45.078,0,0,1-9.615,0A4.554,4.554,0,0,1,.835,14.167,3.6,3.6,0,0,1,0,11.787Z"
                  transform="translate(0 0)"
                  fill="none"
                  stroke="#200e32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  id="Path_421"
                  d="M0,0A3.061,3.061,0,0,0,2.037,1.127,3.088,3.088,0,0,0,4.288.5,2.886,2.886,0,0,0,4.812,0"
                  transform="translate(6.055 18.852)"
                  fill="none"
                  stroke="#200e32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
            <a href="https://github.com/Natreve/curfew" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="24"
                height="24"
              >
                <path
                  fill="var(--primary)"
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </a>
          </div>
        </header>

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
