"use client";
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import type { ScatterPoint } from "@/lib/types";

interface Props {
  data: ScatterPoint[];
  selectedTema: string | null;
  onTemaClick: (tema: string) => void;
  avgX: number;
  avgY: number;
}

const ScatterTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ScatterPoint & { cx?: number; cy?: number } }> }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs max-w-[200px]">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
        <p className="font-semibold text-slate-900 leading-tight">{d.name}</p>
      </div>
      <p className="text-slate-600"><span className="font-medium">{d.x}</span> citações</p>
      <p className="text-slate-600">Score médio: <span className="font-medium">{d.y.toFixed(2)}</span></p>
      <p className="text-slate-500">{d.z} subtemas</p>
    </div>
  );
};

export default function FreqScatterPlot({ data, selectedTema, onTemaClick, avgX, avgY }: Props) {
  const renderShape = (props: {
    cx?: number; cy?: number; payload?: ScatterPoint;
    r?: number; [k: string]: unknown;
  }) => {
    const { cx = 0, cy = 0, payload } = props;
    if (!payload) return null;
    const isSelected = selectedTema === payload.name;
    const isDimmed = !!selectedTema && !isSelected;
    const r = Math.max(6, Math.min(22, payload.z * 2.2 + 3));
    return (
      <g
        onClick={() => onTemaClick(payload.name)}
        style={{ cursor: "pointer" }}
      >
        <circle
          cx={cx} cy={cy}
          r={r + (isSelected ? 3 : 0)}
          fill={payload.color}
          fillOpacity={isDimmed ? 0.18 : isSelected ? 1 : 0.82}
          stroke={isSelected ? "#0f172a" : "white"}
          strokeWidth={isSelected ? 2.5 : 1}
        />
        {isSelected && (
          <text
            x={cx} y={cy - r - 7}
            textAnchor="middle"
            fill="#0f172a"
            fontSize={10}
            fontWeight={700}
            fontFamily="Inter, sans-serif"
          >
            {payload.shortName}
          </text>
        )}
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={290}>
      <ScatterChart margin={{ top: 16, right: 20, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          type="number" dataKey="x" name="citações"
          label={{ value: "nº citações", position: "insideBottom", offset: -4, fontSize: 11, fill: "#94a3b8" }}
          tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}
        />
        <YAxis
          type="number" dataKey="y" name="score" domain={[0.3, 1.05]}
          label={{ value: "score médio", angle: -90, position: "insideLeft", offset: 10, fontSize: 11, fill: "#94a3b8" }}
          tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}
        />
        <ZAxis type="number" dataKey="z" range={[50, 350]} />
        <ReferenceLine x={avgX} stroke="#cbd5e1" strokeDasharray="4 3" label={{ value: "média", position: "top", fontSize: 9, fill: "#94a3b8" }} />
        <ReferenceLine y={avgY} stroke="#cbd5e1" strokeDasharray="4 3" label={{ value: "média", position: "right", fontSize: 9, fill: "#94a3b8" }} />
        <Tooltip content={<ScatterTooltip />} />
        <Scatter data={data} shape={renderShape as unknown as React.ReactElement} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
