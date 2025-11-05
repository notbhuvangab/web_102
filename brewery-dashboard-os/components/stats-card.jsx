export default function StatsCard({ label, value }) {
  return (
    <div className="border-4 border-black p-6 bg-white">
      <p className="text-sm font-bold uppercase mb-2">{label}</p>
      <p className="text-5xl font-bold">{value}</p>
    </div>
  )
}
