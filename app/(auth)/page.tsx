import { getTransactions } from "@/lib/db/transactions";
import DashboardClient from "../../components/DashboardClient";

export default function Home() {
  const data = getTransactions();
  return (
    <section>
      <DashboardClient data={data} />
    </section>
  );
}
