export function Loader({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-7 w-7"
  };

  return (
    <div className={className}>
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizeClasses[size]}`} />
    </div>
  );
}