import MatterjsScene from "../Matterjs/MatterjsScene"

export default function UI({ page }) {
  return (
    <>
      { page == "matterjs" && <MatterjsScene /> }
    </>
  )
}