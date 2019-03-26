import React from 'react';
import {Group} from '@vx/group';
import {scaleLinear} from '@vx/scale';
import {Point} from '@vx/point';
import {Line, LineRadial} from '@vx/shape';
import data from "../../data"

const orange = '#ff9933';
const pumpkin = '#f5810c';
const silver = '#d9d9d9';
const bg = '#FAF7E9';

const ANG = 360;
console.log(data)

const y = d => d.frequency;

const RadarViz = ({
                      width,
                      height,
                      levels = 3,
                      margin = {
                          top: 40,
                          left: 80,
                          right: 80,
                          bottom: 80
                      }, fontSize = 12, textRangeCoeff = 10
                  }) => {
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    const radius = Math.min(xMax, yMax) / 1.3;

    const radiusScale = scaleLinear({
        range: [0, Math.PI * 2],
        domain: [ANG, 0]
    });

    const yScale = scaleLinear({
        range: [0, radius],
        domain: [0, Math.max(...data.map(y))]
    });

    const webs = genAngles(data.length);
    const points = genPoints(data.length, radius);
    const polygonPoints = genPolygonPoints(data, yScale, y);
    const zeroPoint = new Point({x: 0, y: 0});

    return (
        <svg width={width} height={height}>
            <rect fill={"none"} width={width} height={height}/>
            <Group top={height / 2} left={width / 2}>
                {[...Array(levels)].map((_, i) => {
                    const r = (i + 1) * radius / levels;
                    return (
                        <LineRadial
                            key={`web-${i}`}
                            data={webs}
                            angle={d => radiusScale(d.angle)}
                            radius={r}
                            fill="none"
                            stroke={silver}
                            strokeWidth={1.5}
                            strokeOpacity={0.8}
                            strokeLinecap="round"
                        />
                    );
                })}
                {[...Array(data.length)].map((_, i) => {
                    var {x,y} = points[i]
                    return (
                        <g>
                            <text fontSize={fontSize} textAnchor={getAnchorDirection(x)}
                                  key={`radar-text-${i}`}
                                  x={x * fontSize/textRangeCoeff/1.1}
                                  y={y > 0 ? y * fontSize / textRangeCoeff : y * fontSize / textRangeCoeff / 1.1}>asds
                            </text>
                            <Line
                                key={`radar-line-${i}`}
                                from={zeroPoint}
                                to={points[i]}
                                stroke={silver}
                            />
                        </g>
                    );
                })}
                <polygon
                    points={polygonPoints.polygon}
                    fill={orange}
                    fillOpacity={0.3}
                    stroke={orange}
                    strokeWidth={2}
                />
                {polygonPoints.map((point, i) => {
                    return (
                        <circle
                            key={`radar-point-${i}`}
                            cx={point.x}
                            cy={point.y}
                            r={4}
                            fill={pumpkin}
                        />
                    )
                })}
            </Group>
        </svg>
    );
};

function getAnchorDirection(x) {
    if (Math.abs(x) < 30) {
        return "middle"
    } else if (x < 0) {
        return "end"
    } else {
        return "start"
    }
}

function genAngles(length) {
    return [...Array(length + 1)].map((_, i) => {
        return {
            angle: i * (ANG / length)
        };
    });
}

function genPoints(length, radius) {
    const step = Math.PI * 2 / length;
    return [...Array(length)].map((_, i) => {
        return {
            x: radius * Math.sin(i * step),
            y: radius * Math.cos(i * step)
        };
    });
}

function genPolygonPoints(data, scale, access) {
    const step = Math.PI * 2 / data.length;
    const points = new Array(data.length).fill({});
    const pointString = new Array(data.length + 1).fill('').reduce((res, _, i) => {
        if (i > data.length) return res;
        const x = scale(access(data[i - 1])) * Math.sin(i * step);
        const y = scale(access(data[i - 1])) * Math.cos(i * step);
        points[i - 1] = {x, y};
        return (res += `${x},${y} `);
    });
    points.polygon = pointString;
    return points;
}

export default RadarViz