import { motion } from "framer-motion";
import { Bell, AlertTriangle, UserCheck, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Notification {
  id: string;
  type: "warning" | "info" | "alert";
  message: string;
  time: string;
}

const typeStyles = {
  warning: "bg-warning/10 border-warning/30",
  info: "bg-primary/10 border-primary/30",
  alert: "bg-destructive/10 border-destructive/30",
};

const typeIcons = {
  warning: AlertTriangle,
  info: UserCheck,
  alert: Clock,
};

interface NotificationsPanelProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function NotificationsPanel({ notifications, onDismiss }: NotificationsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Alerts & Notifications</h2>
          {notifications.length > 0 && (
            <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="divide-y divide-border max-h-[300px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <Bell className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No new notifications</p>
          </div>
        ) : (
          notifications.map((notification, index) => {
            const Icon = typeIcons[notification.type];
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-4 ${typeStyles[notification.type]} border-l-2 ${
                  notification.type === 'warning' ? 'border-l-warning' :
                  notification.type === 'alert' ? 'border-l-destructive' :
                  'border-l-primary'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                    notification.type === 'warning' ? 'text-warning' :
                    notification.type === 'alert' ? 'text-destructive' :
                    'text-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex-shrink-0"
                    onClick={() => onDismiss(notification.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
