import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { JobApplicationsOverview } from "../../..";
import { EmptyChartData } from "./empty-chart";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { format } from "date-fns";
import { memo } from "react";

type ApplicationTrendsProps = {
  applicationTrends: JobApplicationsOverview["applicationTrends"];
  applicationTrendsGraphActive: boolean;
};

export const ApplicationTrends = memo(
  ({
    applicationTrends,
    applicationTrendsGraphActive,
  }: ApplicationTrendsProps) => {
    return (
      <div className="h-full w-full">
        {applicationTrendsGraphActive ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={200}
              data={applicationTrends}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary-indigo))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary-indigo))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <YAxis
                dataKey="applications"
                tick={{ fontSize: 12 }}
                domain={[
                  0,
                  (dataMax: number) =>
                    dataMax < 10 ? 10 : dataMax + dataMax * 0.5,
                ]}
                axisLine={false}
                tickLine={false}
                hide={true}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                interval={2}
                tickLine={false}
                axisLine={false}
                hide={true}
              />
              <Tooltip
                cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
                content={
                  <CustomTooltip active={false} label={""} payload={[]} />
                }
              />
              <Area
                type="monotone"
                dataKey="applications"
                stroke="hsl(var(--primary-indigo))"
                fillOpacity={1}
                fill="url(#colorUv)"
                className="relative"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChartData message="Please wait for at least 3 days to process your application trends data." />
        )}
      </div>
    );
  }
);

type CustomTooltipProps = {
  active: boolean;
  payload: Payload<string, string>[];
  label: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload?.length) {
    const payloadListEl = payload.map(({ value }, index) => (
      <>
        <small
          key={`application-trend-tooltip-${value}-${index}`}
          className="muted text-sm"
        >
          Applications : {value}
        </small>
      </>
    ));

    return (
      <div className="bg-card border grid p-3 shadow rounded">
        <span className="text-sm">{format(label, "PP")}</span>
        {payloadListEl}
      </div>
    );
  }

  return null;
};
