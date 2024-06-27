import Home from "../Home"
import MatterjsScene from "../Matterjs/MatterjsScene"

export default function UI({ page }) {
  return (
    <>
      { page == "home" && <Home /> }
      { page == "matterjs" && <MatterjsScene /> }
    </>
  )
}