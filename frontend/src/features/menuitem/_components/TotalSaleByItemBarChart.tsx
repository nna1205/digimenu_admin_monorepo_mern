import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { useParams } from "react-router-dom";
import { useTotalSaleByItem } from "@/hooks/useTotalSaleByItem";

const TotalSalesBarChart = () => {
  const { id: store_id } = useParams();
  const { totalsale, isLoading, error } = useTotalSaleByItem(
    store_id as string
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (totalsale.length === 0) return null;
  return (
    <ResponsiveContainer width="50%" height={300}>
      <BarChart data={totalsale}>
        {/* <XAxis
          dataKey="name"
          tickFormatter={(name) =>
            name.length > 15 ? `${name.slice(0, 15)}...` : name
          }
        /> */}
        {/* <YAxis /> */}
        <Tooltip />
        <Bar
          dataKey="totalsale"
          fill="black" // Cycle through colors
          barSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TotalSalesBarChart;
