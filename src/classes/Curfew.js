import { DateTime } from "luxon"
import curfew from "../data/curfew.json"
class Curfew {
  constructor() {
    this.now = DateTime.now()
    this.tomorrow = this.now.plus({ days: 1 })
    this.period = curfew.periods[this.now.weekday - 1]
    this.subscription = null
    this.onEvent = () => {}
    this.subscription = setInterval(() => {
      this.now = DateTime.now()
      const { tomorrow } = this
      const options = ["hours", "minutes", "seconds"]
      const { start, end } = this.period
      const csd = DateTime.fromISO(`${this.now.toFormat("kkkk-MM-dd")}${start}`) //curfew start date
      const ced = DateTime.fromISO(`${tomorrow.toFormat("kkkk-MM-dd")}${end}`) //curfew end date
      const { hours, minutes, seconds } = this.ongoing()
        ? ced.diff(this.now, options).toObject()
        : csd.diff(this.now, options).toObject()
      this.onInterval ??
        this.onInterval({ hours, minutes, seconds: Math.round(seconds) })
    }, 1000)
  }
  init() {
    return this
  }
  ongoing() {
    const { now, tomorrow, period } = this
    const { start, end } = period
    const csd = DateTime.fromISO(`${now.toFormat("kkkk-MM-dd")}${start}`) //curfew start date
    const ced = DateTime.fromISO(`${tomorrow.toFormat("kkkk-MM-dd")}${end}`) //curfew end date

    return (
      now.diff(csd, "minutes").toObject().minutes >= 0 ||
      now.diff(ced, "minutes").toObject().minutes >= 0
    )
  }
  measuresEnd() {
    const { now } = this
    return DateTime.fromISO(curfew.ends).diff(now, "days").toFormat("dd")
  }
  starts() {
    const { now, period } = this
    const date = DateTime.fromISO(
      `${now.toFormat("kkkk-MM-dd")}${period.start}`
    )
    return `${date.toFormat("dd.MMM.kkkk")} @ ${date.toFormat("t")}`
  }
  ends() {
    const { tomorrow, period } = this
    const date = DateTime.fromISO(
      `${tomorrow.toFormat("kkkk-MM-dd")}${period.end}`
    )
    return `${date.toFormat("dd.MMM.kkkk")} @ ${date.toFormat("t")}`
  }
  onEvent(cb) {
    this.onEvent = cb
  }
  onInterval(cb) {
    this.onInterval = cb
  }
  unsubscribe() {
    clearInterval(this.subscription)
  }
}
export default Curfew
