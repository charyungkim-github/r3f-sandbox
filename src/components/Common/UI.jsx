import DeviceOrientationScene from "../DeviceOrientation/DeviceOrientationScene"

export default function UI({ page }) {
  return (
    <>
      { page == "device-orientation" && <DeviceOrientationScene /> }
    </>
  )
}
