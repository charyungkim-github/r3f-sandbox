import { useEffect } from "react"
import { getProject } from "@theatre/core"

export function useRegisterTheatrejs(projectName, sheetName, state = null) {

  // import theatrejs
  useEffect(() => { initializeTheatrejs() }, [])

  // create sheet
  const sheet = getProject(projectName, { state }).sheet(sheetName)
  const length = state?.sheetsById[sheetName].sequence.length
  return { sheet, length }
}

async function initializeTheatrejs() {
  const studio = await import("@theatre/studio")
  studio.default.initialize()

  const extension = await import("@theatre/r3f/dist/extension")
  studio.default.extend(extension.default)
}

export function playAnimation(sheet, count, range) {
  sheet.project.ready.then(() => sheet.sequence.play({ iterationCount: count, range: range }))
}