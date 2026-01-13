import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  X, 
  Settings,
  Filter,
  Check,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "warning" | "info" | "alert" | "success";
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: "patient" | "appointment" | "system" | "ai";
}

const sampleNotifications: Notification[] = [
  { id: "1", type: "warning", title: "High No-Show Risk", message: "Patient Anita Gupta has a 72% no-show probability for tomorrow's appointment", time: "2 min ago", read: false, category: "ai" },
  { id: "2", type: "info", title: "Early Arrival", message: "Raj Patel arrived 15 minutes early for his emergency appointment", time: "5 min ago", read: false, category: "patient" },
  { id: "3", type: "alert", title: "Emergency Case Assigned", message: "Dr. Kumar is unavailable. Emergency case transferred to your queue", time: "10 min ago", read: false, category: "system" },
  { id: "4", type: "success", title: "Appointment Confirmed", message: "Neha Shah confirmed her appointment for tomorrow at 10:00 AM", time: "15 min ago", read: true, category: "appointment" },
  { id: "5", type: "info", title: "Lab Results Ready", message: "Lab results for patient Vikram Singh are now available", time: "30 min ago", read: true, category: "patient" },
  { id: "6", type: "warning", title: "AI Triage Alert", message: "Patient symptoms indicate potential cardiac concern - prioritize review", time: "45 min ago", read: false, category: "ai" },
  { id: "7", type: "success", title: "Visit Completed", message: "Successfully completed consultation with Aman Desai", time: "1 hour ago", read: true, category: "patient" },
  { id: "8", type: "info", title: "Schedule Update", message: "Your afternoon schedule has been optimized by AI for better patient flow", time: "2 hours ago", read: true, category: "system" },
  { id: "9", type: "alert", title: "Medication Alert", message: "Drug interaction warning for patient Priya Sharma's prescription", time: "3 hours ago", read: false, category: "ai" },
  { id: "10", type: "success", title: "Weekly Report", message: "Your weekly performance report is now available in Analytics", time: "1 day ago", read: true, category: "system" },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [filter, setFilter] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    patientAlerts: true,
    appointmentReminders: true,
    aiInsights: true,
    systemUpdates: false,
    emailNotifications: true,
    pushNotifications: true,
  });

  const filteredNotifications = notifications.filter(n => {
    if (!filter) return true;
    if (filter === "unread") return !n.read;
    return n.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.info("Notification dismissed");
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "warning": return AlertTriangle;
      case "alert": return AlertTriangle;
      case "success": return CheckCircle;
      default: return Info;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "warning": return "text-amber-500";
      case "alert": return "text-destructive";
      case "success": return "text-success";
      default: return "text-blue-500";
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "warning": return "bg-amber-500/10";
      case "alert": return "bg-destructive/10";
      case "success": return "bg-success/10";
      default: return "bg-blue-500/10";
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "patient": return "bg-primary/10 text-primary";
      case "appointment": return "bg-success/10 text-success";
      case "system": return "bg-muted text-muted-foreground";
      case "ai": return "bg-purple-500/10 text-purple-500";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">Stay updated with patient alerts and system messages</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button 
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="patient-alerts">Patient Alerts</Label>
                    <Switch 
                      id="patient-alerts"
                      checked={settings.patientAlerts}
                      onCheckedChange={(checked) => setSettings({...settings, patientAlerts: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                    <Switch 
                      id="appointment-reminders"
                      checked={settings.appointmentReminders}
                      onCheckedChange={(checked) => setSettings({...settings, appointmentReminders: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-insights">AI Insights</Label>
                    <Switch 
                      id="ai-insights"
                      checked={settings.aiInsights}
                      onCheckedChange={(checked) => setSettings({...settings, aiInsights: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-updates">System Updates</Label>
                    <Switch 
                      id="system-updates"
                      checked={settings.systemUpdates}
                      onCheckedChange={(checked) => setSettings({...settings, systemUpdates: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch 
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch 
                      id="push-notifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={filter === null ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter(null)}
        >
          All
        </Button>
        <Button 
          variant={filter === "unread" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("unread")}
        >
          Unread ({unreadCount})
        </Button>
        <Button 
          variant={filter === "patient" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("patient")}
        >
          Patient
        </Button>
        <Button 
          variant={filter === "appointment" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("appointment")}
        >
          Appointments
        </Button>
        <Button 
          variant={filter === "ai" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("ai")}
        >
          AI Insights
        </Button>
        <Button 
          variant={filter === "system" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("system")}
        >
          System
        </Button>
        
        <div className="ml-auto">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={handleClearAll}
            disabled={notifications.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No notifications</h3>
                <p className="text-muted-foreground">You're all caught up!</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification, index) => {
              const Icon = getIcon(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className={`${!notification.read ? 'border-primary/30 bg-primary/5' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${getBgColor(notification.type)}`}>
                          <Icon className={`h-5 w-5 ${getIconColor(notification.type)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-medium">{notification.title}</h4>
                                <Badge variant="outline" className={getCategoryBadge(notification.category)}>
                                  {notification.category}
                                </Badge>
                                {!notification.read && (
                                  <span className="h-2 w-2 rounded-full bg-primary" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.time}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => handleDismiss(notification.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notifications;
