/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stage, Graphics } from "@pixi/react";
import React from "react";

const DotPlot = ({ dots, polygons }: { dots: any; polygons: any }) => {
  const drawDot = (
    g: {
      beginFill: (arg0: number) => void;
      drawCircle: (arg0: any, arg1: any, arg2: number) => void;
      endFill: () => void;
    },
    x: any,
    y: any,
    radius = 5,
    color = 0x0000ff,
  ) => {
    g.beginFill(color);
    g.drawCircle(x, y, radius);
    g.endFill();
  };

  const drawPolygon = (
    g: {
      beginFill: (arg0: number, arg1: number) => void;
      drawPolygon: (arg0: any) => void;
      endFill: () => void;
    },
    points: any,
    color = 0xff0000,
  ) => {
    g.beginFill(color, 0.5); // 色と透明度
    g.drawPolygon(points);
    g.endFill();
  };

  const draw = React.useCallback(
    (g: {
      clear?: any;
      beginFill: (arg0: number) => void;
      drawCircle: (arg0: any, arg1: any, arg2: number) => void;
      drawPolygon: (arg0: any) => void;
      endFill: () => void;
    }) => {
      g.clear();
      dots.forEach((dot: { x: any; y: any }) => {
        drawDot(g, dot.x, dot.y);
      });

      polygons.forEach((polygon: { points: any }) => {
        drawPolygon(g, polygon.points);
      });
    },
    [dots, polygons],
  );

  return <Graphics pointertap={console.log} draw={draw} />;
};

type Props = {
  polygons: any;
};

const Dots = ({ polygons }: Props) => {
  const dots = [
    { x: 840, y: 687 },
    { x: 844, y: 715 },
    { x: 844, y: 711 },
    { x: 842, y: 700 },
  ];

  const fa = [
    {
      points: [84, 68, 84, 71, 84, 71, 84, 70],
    },
    // 元データ
    // { points: [50, 50, 150, 100, 250, 150, 250, 100] }, // 4つの点からなる多角形
  ];

  console.log(polygons);

  return (
    <Stage width={375} height={300} options={{ backgroundColor: 0xffffff }}>
      <DotPlot dots={dots} polygons={fa} />
      {/* <Sprite
        onClick={() => {
          console.log("ON CLICKING!!");
        }}
        interactive={true}
        image={bunnyUrl}
        x={400}
        y={200}
      /> */}
    </Stage>
  );
};

export default Dots;
