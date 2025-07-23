import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { TOrder } from "../OrderHistory.type";

const TakeawayPieChart = ({ orders }: { orders: TOrder[] }) => {
  // Filter orders based on istakeaway property
  const takeawayOrders = orders.filter((order) => order.is_take_away);

  // Calculate the percentage of takeaway orders
  const totalOrders = orders.length;
  const takeawayPercentage = Math.round(
    (takeawayOrders.length / totalOrders) * 100
  );

  // Data for the pie chart
  const data = [
    { name: "Takeaway", value: takeawayPercentage },
    { name: "Dine-in", value: 100 - takeawayPercentage },
  ];

  // Custom colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <PieChart width={200} height={180}>
      <Pie
        data={data}
        cx={100}
        cy={90}
        labelLine={false}
        // label={({ name, percent }) =>
        //   `${name} ${(percent * totalOrders) / 100}`
        // }
        outerRadius={85}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default TakeawayPieChart;
