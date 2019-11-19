import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash'
import GridCanvas from './components/GridCanvas'
import styles from './assets/styles/App.module.scss';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  window.addEventListener('resize', _.debounce(() => {
    setCanvasSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, 100))

  useEffect(() => {
    if (!canvasRef.current) return
    const can = canvasRef.current
    const ctx = can.getContext('2d')
    let gridSize = 50
    let x = 0
    let y = 0
    let dragging = false
    let keyMaps: { [key: string]: number } = { }
  
    can.addEventListener('wheel', function(ev) {
      gridSize += ev.deltaY > 0 ? -2 : 2
      gridSize = gridSize < 4 ? 4 : gridSize
    })
    can.addEventListener('mousedown', function() {
      dragging = true
    })
    can.addEventListener('mouseup', function() {
      dragging = false
    })
    can.addEventListener('mouseleave', function() {
      dragging = false
    })
    can.addEventListener('mousemove', function(ev) {
      if (dragging) {
        x += ev.movementX
        y += ev.movementY
      }
    })
    document.addEventListener('keydown', function(ev) {
      keyMaps[ev.key] = 1
    })
    document.addEventListener('keyup', function(ev) {
      delete keyMaps[ev.key]
    })
  
    let rendering = true

    function render() {
      if (!ctx || !rendering) return
      
      if (keyMaps['a']) {
        x -= 2
      }
      if (keyMaps['d']) {
        x += 2
      }
      if (keyMaps['w']) {
        y -= 2
      }
      if (keyMaps['s']) {
        y += 2
      }
  
      ctx.clearRect(0, 0, can.width, can.height)
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, can.width, can.height)
  
      ctx.strokeStyle = '#fff'
      for (let i = 0; i < can.width / gridSize + 2; i++) {
        ctx.beginPath()
        ctx.moveTo(i * gridSize + x % gridSize - gridSize, -gridSize)
        ctx.lineTo(i * gridSize + x % gridSize - gridSize, can.height + gridSize)
        ctx.stroke()
      }
      for (let j = 0; j < can.height / gridSize + 2; j++) {
        ctx.beginPath()
        ctx.moveTo(-gridSize, j * gridSize + y % gridSize - gridSize)
        ctx.lineTo(can.width + gridSize, j * gridSize + y % gridSize - gridSize)
        ctx.stroke()
      }
  
      ctx.fillStyle = 'red'
      ctx.fillRect(125 + x, 125 + y, 50, 50)
  
      const id = requestAnimationFrame(render)
    }
    
    render()

    return () => {
      rendering = false
    }
  }, [])

  return (
    <div className={styles['App']}>
      <GridCanvas width={canvasSize.width} height={canvasSize.height} ref={canvasRef} />
    </div>
  );
}

export default App;
