import { TOrder } from "../OrderHistory.type";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function getAllDatesInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0); // Get last day of the month
  const dates: Date[] = [];

  while (firstDay <= lastDay) {
    dates.push(new Date(firstDay));
    firstDay.setDate(firstDay.getDate() + 1); // Increment day
  }

  return dates;
}

export function calculateDailySales(
  orders: TOrder[],
  year: number,
  month: number
): { date: string; totalsale: number }[] {
  const allDates = getAllDatesInMonth(year, month);
  const dailySale: { [key: string]: number } = {};

  allDates.forEach((date) => {
    dailySale[date.toLocaleDateString("en-US")] = 0; // Initialize all dates with 0 sales
  });

  orders.forEach((order) => {
    const orderDate = new Date(order.created_at).toLocaleDateString("en-US");
    const orderTotalPrice =
      typeof order.total_price === "string"
        ? parseFloat(order.total_price)
        : order.total_price;
    dailySale[orderDate] += orderTotalPrice;
  });

  return Object.entries(dailySale).map(([date, totalSale]) => ({
    date,
    totalsale: totalSale,
  }));
}

interface DailySale {
  date: string;
  totalsale: number;
}

interface DailySalesChartProps {
  dailySalesData: DailySale[]; // Array of DailySale objects
  // Add other props you might need here
}

const DailySalesChart: React.FC<DailySalesChartProps> = ({
  dailySalesData,
}) => {
  return (
    <ResponsiveContainer width="50%" height={300}>
      <LineChart data={dailySalesData}>
        <Line type="monotone" dataKey="totalsale" stroke="black" dot={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(date) =>
            new Date(date).toLocaleDateString().substring(0, 3)
          }
        />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DailySalesChart;
