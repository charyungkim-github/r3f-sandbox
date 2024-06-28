import { useEffect } from "react"
import { getProject, val } from "@theatre/core"

export function useTheatrejsEditor() {

  async function initializeTheatrejsEditor() {
    const studio = await import("@theatre/studio")
    studio.default.initialize()
    const extension = await import("@theatre/r3f/dist/extension")
    studio.default.extend(extension.default)
  }

  useEffect(() => { initializeTheatrejsEditor() }, [])

  return null
}

export function createSheet(projectName, sheetName, state = null) {
  const sheet = getProject(projectName, { state }).sheet(sheetName)
  const length = val(sheet.sequence.pointer.length)
  return { sheet, length }
}

export function playAnimation(sheet, count, range) {
  sheet.project.ready.then(() => sheet.sequence.play({ iterationCount: count, range: range }))
}