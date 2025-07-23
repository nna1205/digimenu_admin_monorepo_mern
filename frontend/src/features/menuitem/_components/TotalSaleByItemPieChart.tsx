import { useParams } from "react-router-dom";
import { useTotalSaleByItem } from "@/hooks/useTotalSaleByItem";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const TotalSalesPieChart = () => {
  const COLORS = ["#0088FE", "#00C49F"];
  const { id: store_id } = useParams();
  const { totalsale, isLoading, error } = useTotalSaleByItem(
    store_id as string
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (totalsale.length === 0) return null;
  return (
    <PieChart width={400} height={180}>
      <Pie
        data={totalsale}
        cx={100}
        cy={90}
        labelLine={false}
        outerRadius={85}
        fill="#8884d8"
        dataKey="percentage"
      >
        {totalsale.map((item, index) => (
          <Cell key={item.id} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      {/* <Legend
        iconType="square"
        layout="vertical"
        verticalAlign="middle"
        align="right"
      /> */}
    </PieChart>
  );
};

export default TotalSalesPieChart;
