"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartDataItem, SemiCircleProgressBarProps } from "@/lib/types";

export const description = "A radial chart with stacked sections";

const chartConfig = {
  desktop: {
    label: "safetoSpend",
  },
  mobile: {
    label: "SpentAmount",
  },
} satisfies ChartConfig;

export function SemiCircleProgressBar({
  totalAmount = 30000,
  spentAmount = 10000,
  safeToSpend = 20000,
  className,
}: SemiCircleProgressBarProps) {
  const percentage = Math.round((spentAmount / totalAmount) * 100);
  const spendAmountPercent = Math.round((safeToSpend / totalAmount) * 100);

  const chartData: ChartDataItem[] = [
    {
      name: "Progress",
      safeToSpend: spendAmountPercent, // Background layer
      spentAmount: 100 - spendAmountPercent, // Foreground layer
    },
  ];
  return (
    <Card className="flex flex-col p-0">
      <CardContent className={`flex flex-1 items-center pb-0 ${className}`}>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const centerX = viewBox.cx || 125;
                    const centerY = viewBox.cy || 125;
                    return (
                      <text x={centerX} y={centerY} textAnchor="middle">
                        <tspan
                          x={centerX}
                          y={centerY - 50}
                          className="fill-white text-[8px] font-light"
                        >
                          {percentage}%
                        </tspan>
                        <tspan
                          x={centerX}
                          y={centerY - 35}
                          className="fill-white text-[8px] font-light"
                        >
                          you have spent
                        </tspan>
                        <tspan
                          x={centerX}
                          y={centerY - 12}
                          className="fill-white text-lg font-bold"
                        >
                          &#8377; {spentAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={centerX - 19}
                          y={centerY + 5}
                          className="fill-white text-[10px] font-light"
                        >
                          of
                        </tspan>
                        <tspan
                          x={centerX + 12}
                          y={centerY + 5}
                          className="fill-white text-[10px] font-bold"
                        >
                          &#8377; {totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={centerX - 35}
                          y={centerY + 40}
                          className="fill-white text-[8px] font-light"
                        >
                          safe to spend
                        </tspan>
                        <tspan
                          x={centerX + 30}
                          y={centerY + 42}
                          className="fill-white text-base font-bold"
                        >
                          &#8377; {safeToSpend.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
            <defs>
                <linearGradient
                  id="fillSafeToSpend"
                  x1="1"
                  y1="1"
                  x2="0"
                  y2="1"
                >
                  <stop offset="50%" stopColor="#7EFF64" stopOpacity={1} />
                  <stop offset="100%" stopColor="#00BA16" stopOpacity={0.9} />
                </linearGradient>  
                <linearGradient
                  id="fillSpentAmount"
                  x1="0"
                  y1="1"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#7f1d1d" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#991b1b" stopOpacity={0.95} />
                </linearGradient>
              </defs> 
            <RadialBar
              dataKey="safeToSpend"
              stackId="a"
              cornerRadius={5}
              fill="url(#fillSafeToSpend)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="spentAmount"
              fill="url(#fillSpentAmount)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
