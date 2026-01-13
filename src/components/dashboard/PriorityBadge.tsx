import { cn } from "@/lib/utils";

type Priority = "high" | "medium" | "low";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const priorityConfig = {
  high: {
    label: "High Priority",
    icon: "🔴",
    className: "priority-badge-high",
  },
  medium: {
    label: "Medium",
    icon: "🟡",
    className: "priority-badge-medium",
  },
  low: {
    label: "Low",
    icon: "🟢",
    className: "priority-badge-low",
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
