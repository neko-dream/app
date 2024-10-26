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
    colorIdx: any,
    radius = 5,
    // color = 0x0000ff,
  ) => {
    const colorList = [
      0xff9393, 0xffc993, 0xff93ff, 0x93ff93, 0xffff93, 0xc9ff93, 0xc993ff,
      0x9393ff, 0x93c9ff, 0x93ffff,
    ];
    // g.beginFill(color);
    g.beginFill(colorList[colorIdx]);
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
      dots.forEach(
        (dot: { x: any; y: any; groupId: number; radius: number }) => {
          drawDot(g, dot.x, dot.y, dot.groupId, dot.radius ?? 5);
        },
      );

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
  positions: any;
  myPosition: any;
};

const Dots = ({ positions, myPosition }: Props) => {
  let _minX = 100000000000;
  let _minY = 100000000000;
  let _maxX = -100000000000;
  let _maxY = -100000000000;

  const groupIds = new Set();
  const hasPerimeterIndexGroup = new Set();
  const idxToGroupId = [];
  positions.forEach((v: { groupId: string; posX: number; posY: any }) => {
    _minX = Math.min(_minX, v.posX);
    _minY = Math.min(_minY, v.posY);
    _maxX = Math.max(_maxX, v.posX);
    _maxY = Math.max(_maxY, v.posY);
    idxToGroupId.push(v.groupId);
    groupIds.add(v.groupId);
    if ("perimeterIndex" in v) {
      hasPerimeterIndexGroup.add(v.groupId);
    }
  });

  const width = 375;
  const height = 300;
  const originalWidth = _maxX - _minX;
  const originalHeight = _maxY - _minY;
  let myPositionFlag = false;
  const dots = positions.map(
    (v: { groupId: string; posX: number; posY: any }) => {
      let radius: number = 5;
      if (
        myPosition?.posX == v.posX &&
        myPosition?.posY == v.posY &&
        myPosition?.groupId == v.groupId &&
        !myPositionFlag
      ) {
        radius = 10;
        myPositionFlag = true;
      }
      return {
        x: (v.posX - _minX) * ((width - 30) / originalWidth) + 15,
        y: (v.posY - _minY) * ((height - 50) / originalHeight) + 25,
        groupId: v.groupId,
        radius: radius,
      };
    },
  );

  const resultPolygons = [];
  for (const groupId of hasPerimeterIndexGroup) {
    // poligonsを扱う
    const polygons = positions
      .filter((opinion: { groupId: number; perimeterIndex: number }) => {
        return (
          opinion.groupId === groupId &&
          (opinion.perimeterIndex || opinion.perimeterIndex === 0)
        );
      })
      .sort(
        (a: { perimeterIndex: any }, b: { perimeterIndex: any }) =>
          (a.perimeterIndex || 0) - (b.perimeterIndex || 0),
      );

    const points = polygons.flatMap((v: { posX: number; posY: any }) => {
      return [
        (v.posX - _minX) * ((width - 30) / originalWidth) + 15,
        (v.posY - _minY) * ((height - 50) / originalHeight) + 25,
      ];
    });
    resultPolygons.push({ points: points });
  }

  return (
    <Stage
      width={width}
      height={height}
      options={{ backgroundColor: 0xffffff }}
    >
      <DotPlot dots={dots} polygons={resultPolygons} />
    </Stage>
  );
};

export default Dots;
