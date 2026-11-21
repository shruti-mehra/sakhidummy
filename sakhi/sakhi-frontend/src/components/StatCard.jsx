function StatCard({ icon: Icon, title, value, description }) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
          <Icon size={21} />
        </div>
  
        <p className="text-sm text-gray-500">{title}</p>
  
        <h3 className="mt-1 text-2xl font-bold text-gray-900">
          {value}
        </h3>
  
        {description && (
          <p className="mt-1 text-xs text-gray-400">
            {description}
          </p>
        )}
      </div>
    );
  }
  
  export default StatCard;