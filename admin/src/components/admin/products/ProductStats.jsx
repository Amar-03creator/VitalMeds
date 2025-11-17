import { Card, CardContent } from '@/components/ui/card';

const StatCard = ({ title, value, hint, variant = 'default' }) => {
  const variantStyles = {
    // Light mode colors (default light backgrounds)
    default: 'bg-blue-50 dark:bg-slate-800 border-l-4 border-blue-500',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500',
    danger: 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500',
    success: 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500',
  };

  const textColorStyles = {
    default: 'text-blue-600 dark:text-blue-400',
    warning: 'text-yellow-700 dark:text-yellow-400',
    danger: 'text-red-700 dark:text-red-400',
    success: 'text-green-700 dark:text-green-400',
  };

  return (
    <Card className={`${variantStyles[variant]} shadow-sm hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</div>
        <div className={`text-3xl font-bold mt-2 ${textColorStyles[variant]}`}>{value}</div>
        {hint && <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{hint}</div>}
      </CardContent>
    </Card>
  );
};

export const ProductStats = ({ stats, categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Products" value={stats.total} variant="default" />
      <StatCard
        title="Low Stock"
        value={stats.lowStock}
        hint="<= 50 units"
        variant="warning"
      />
      <StatCard
        title="Out of Stock"
        value={stats.outOfStock}
        variant="danger"
      />
      <StatCard
        title="Total Categories"
        value={categories.length}
        variant="success"
      />
    </div>
  );
};

export default ProductStats;
