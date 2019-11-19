import React from 'react';

interface Props {
  width: number
  height: number
  ref: React.Ref<HTMLCanvasElement>
}

const GridCanvas: React.FC<Props> = React.forwardRef((props: Props, ref: React.Ref<HTMLCanvasElement>) => {
  return (
    <canvas width={props.width} height={props.height} ref={ref} />
  )
})

export default GridCanvas
