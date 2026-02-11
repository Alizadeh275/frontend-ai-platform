import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleData = [
  { name: '0', value: 12 },
  { name: '1', value: 19 },
  { name: '2', value: 23 },
  { name: '3', value: 25 },
  { name: '4', value: 29 },
  { name: '5', value: 33 },
  { name: '6', value: 38 },
  { name: '7', value: 42 },
];

export function ChartOutput() {
  return (
    <div className="bg-white p-4 rounded border border-gray-200">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'متغیر X', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'متغیر Y', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="داده‌ها" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
