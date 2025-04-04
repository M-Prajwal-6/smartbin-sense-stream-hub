
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DataPoint {
  timestamp: number;
  value: number;
}

interface SensorChartProps {
  title: string;
  data: DataPoint[];
  dataKey?: string;
  color?: string;
  unit: string;
}

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

const SensorChart: React.FC<SensorChartProps> = ({ 
  title, 
  data, 
  dataKey = 'value', 
  color = "#2DD4BF",
  unit
}) => {
  // Format the data for the chart
  const chartData = data.map(point => ({
    time: formatTime(point.timestamp),
    [dataKey]: point.value
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }} 
                stroke="#888888" 
                tickLine={false} 
                axisLine={false}
                minTickGap={50}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                stroke="#888888"
                tickLine={false}
                axisLine={false}
                unit={unit}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #f0f0f0', borderRadius: '4px' }}
                labelStyle={{ color: '#444', fontWeight: 'bold', marginBottom: '4px' }}
                itemStyle={{ padding: '2px 0' }}
                formatter={(value) => [`${value} ${unit}`, dataKey]}
              />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorChart;
