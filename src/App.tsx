import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash'
import GridCanvas from './components/GridCanvas'
import styles from './assets/styles/App.module.scss';
import Scene from './assets/engine/Scene';
import Tile from './assets/engine/Tile';
import Renderer from './assets/engine/Renderer';
import Controller from './assets/engine/Controller';

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

    const scene = new Scene()
    for (let i = -5; i < 5; i++) {
      scene.addTile(new Tile({
        x: i,
        y: i,
        z: 0
      }, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`))
    }
    const renderer = new Renderer(canvasRef.current, scene, 50)
    const controller = new Controller(renderer)
    controller.register()
    let running = true
    
    function render() {
      if (!running) return
      renderer.render()
      requestAnimationFrame(render)
    }

    render()

    return () => {
      running = false
      controller.unregister()
    }

  }, [])

  return (
    <div className={styles['App']}>
      <GridCanvas width={canvasSize.width} height={canvasSize.height} ref={canvasRef} />
    </div>
  );
}

export default App;
