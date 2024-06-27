import { useEffect, useRef } from "react"
import Matter, { Engine, Render, Runner, World, Bodies } from "matter-js"

export default function Demo() {
  const containerRef = useRef()
  const canvasRef = useRef()
  const rectRef = useRef()
  const clicked = useRef(false)
  const mouseConfig = { x: 0, angle: 0, speed: 0.01 }

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

    const ball = Bodies.circle(400, 100, 40, {
      restitution: 0.9,
      render: { fillStyle: "#006400" },
    })

    const rect = Bodies.rectangle(800, 600, 300, 40, {
      isStatic: true,
      render: { fillStyle: "#006400" },
    })
    rectRef.current = rect

    World.add(engine.world, [...mapColliders, rect, ball])
    Render.run(render)
    Runner.run(runner, engine)
  }, [])

  function onMouseMove(e) {

    if(!clicked.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const dx = e.clientX - centerX
    const x = (dx - mouseConfig.x) * mouseConfig.speed

    mouseConfig.x = dx
    mouseConfig.angle += x
    Matter.Body.setAngle(rectRef.current, mouseConfig.angle)
  }

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", ()=>clicked.current = true)
    document.addEventListener("mouseup", ()=>clicked.current = false)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", ()=>clicked.current = true)
      document.removeEventListener("mouseup", ()=>clicked.current = false)
    }
  }, [])

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

  const left = Bodies.rectangle(leftConfig.x, leftConfig.y, leftConfig.w, leftConfig.h, {
    isStatic: true,
    render: { fillStyle: color },
  })

  const right = Bodies.rectangle(rightConfig.x, rightConfig.y, rightConfig.w, rightConfig.h, {
    isStatic: true,
    render: { fillStyle: color },
  })

  return [floor, left, right]
}
