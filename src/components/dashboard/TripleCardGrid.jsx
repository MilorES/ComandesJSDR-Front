import DashboardCard from "./DashboardCard";

export default function TripleCardGrid({ novetats, ultimsStocks, sobrePetició }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard title="Novetats" items={novetats} />
      <DashboardCard title="Últims Stocks" items={ultimsStocks} showStock={true} />
      <DashboardCard title="Sobre petició" items={sobrePetició} />
    </div>
  );
}