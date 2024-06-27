import { useEffect, useRef } from "react"
import { Engine, Render, Runner, World, Bodies } from "matter-js"

export default function Demo({ orientation }) {

  const containerRef = useRef()
  const canvasRef = useRef()
  const engineRef = useRef()

  useEffect(() => {
    const debug = false
    const screen = containerRef.current.getBoundingClientRect()

    const engine = Engine.create()
    const runner = Runner.create()
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: screen.width,
        height: screen.height,
        background: "transparent",
        wireframes: false,
      },
    })

    const mapColliders = getMapCollider(screen, 50, debug)

    const ball = Bodies.circle(screen.width/2, screen.height/2, 40, {
      restitution: 0.9,
      render: { fillStyle: "#006400" },
    })

    World.add(engine.world, [...mapColliders, ball])
    Render.run(render)
    Runner.run(runner, engine)

    engineRef.current = engine
  }, [])

  useEffect(() => {
    const multiplier = 0.02
      engineRef.current.world.gravity.y = orientation.beta * multiplier
      engineRef.current.world.gravity.x = orientation.gamma * multiplier
  }, [orientation])

  return (
    <>
      <div className="container" ref={containerRef} align="center">
        <canvas ref={canvasRef} />
      </div>
    </>
  )
}

function getMapCollider(screen, size, debug = false) {
  // config
  const color = debug ? "transparent" : "lightblue"

  const floorConfig = {
    x: 0,
    y: screen.height - size / 2,
    w: screen.width * 2,
    h: size,
  }

  const topConfig = {
    x: 0,
    y: size / 2,
    w: screen.width * 2,
    h: size,
  }

  const leftConfig = {
    x: size / 2,
    y: 0,
    w: size,
    h: screen.height * 2,
  }

  const rightConfig = {
    x: screen.width - size / 2,
    y: 0,
    w: size,
    h: screen.height * 2,
  }

  // rigidbody
  const floor = Bodies.rectangle(floorConfig.x, floorConfig.y, floorConfig.w, floorConfig.h, {
    isStatic: true,
    render: { fillStyle: color },
  })

  const top = Bodies.rectangle(topConfig.x, topConfig.y, topConfig.w, topConfig.h, {
    isStatic: true,
    render: { fillStyle: color },
  })

  const left = Bodies.rectangle(leftConfig.x, leftConfig.y, leftConfig.w, leftConfig.h, {
    isStatic: true,
    render: { fillStyle: color },
  })

  const right = Bodies.rectangle(rightConfig.x, rightConfig.y, rightConfig.w, rightConfig.h, {
    isStatic: true,
    render: { fillStyle: color },
  })

  return [floor, top, left, right]
}
