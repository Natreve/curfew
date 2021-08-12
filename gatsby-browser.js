import "theme.scss"
export const onServiceWorkerUpdateReady = async () => {
  try {
    const message = `This application has been updated. In order for the updates to take effect you have to reload this app`
    window.alert(message)
  } catch (e) {
    console.log(e)
    window.location.reload()
  }
}
