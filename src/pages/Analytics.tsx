import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  CalendarCheck,
  AlertTriangle,
  Activity,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";

const weeklyPatientsData = [
  { name: "Mon", value: 24 },
  { name: "Tue", value: 32 },
  { name: "Wed", value: 28 },
  { name: "Thu", value: 35 },
  { name: "Fri", value: 30 },
  { name: "Sat", value: 18 },
  { name: "Sun", value: 12 },
];

const monthlyData = [
  { name: "Week 1", value: 145 },
  { name: "Week 2", value: 168 },
  { name: "Week 3", value: 152 },
  { name: "Week 4", value: 189 },
];

const peakHoursData = [
  { name: "8AM", value: 3 },
  { name: "9AM", value: 8 },
  { name: "10AM", value: 12 },
  { name: "11AM", value: 10 },
  { name: "12PM", value: 5 },
  { name: "2PM", value: 9 },
  { name: "3PM", value: 11 },
  { name: "4PM", value: 7 },
  { name: "5PM", value: 4 },
];

const noShowTrendData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 10 },
  { name: "Mar", value: 8 },
  { name: "Apr", value: 6 },
  { name: "May", value: 5 },
  { name: "Jun", value: 4 },
];

const consultationTypeData = [
  { name: "General", value: 45 },
  { name: "Follow-up", value: 28 },
  { name: "Emergency", value: 12 },
  { name: "Checkup", value: 35 },
  { name: "Video", value: 20 },
];

const Analytics = () => {
  const stats = [
    { 
      title: "Total Patients This Month", 
      value: "654", 
      change: "+12%", 
      positive: true, 
      icon: Users,
      color: "text-primary" 
    },
    { 
      title: "Avg. Consultation Time", 
      value: "14 min", 
      change: "-2 min", 
      positive: true, 
      icon: Clock,
      color: "text-success" 
    },
    { 
      title: "Appointment Completion Rate", 
      value: "94%", 
      change: "+3%", 
      positive: true, 
      icon: CalendarCheck,
      color: "text-blue-500" 
    },
    { 
      title: "No-Show Rate", 
      value: "6%", 
      change: "-2%", 
      positive: true, 
      icon: AlertTriangle,
      color: "text-amber-500" 
    },
  ];

  const performanceMetrics = [
    { label: "Patient Satisfaction", value: 92, target: 90 },
    { label: "On-Time Appointments", value: 88, target: 85 },
    { label: "Follow-Up Compliance", value: 76, target: 80 },
    { label: "AI Triage Accuracy", value: 94, target: 90 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Track performance metrics and patient statistics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.positive ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <span className={`text-sm font-medium ${stat.positive ? 'text-success' : 'text-destructive'}`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-primary/10 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Patients This Week"
          data={weeklyPatientsData}
        />
        <AnalyticsChart
          title="Peak Hours Distribution"
          data={peakHoursData}
          color="hsl(15, 90%, 60%)"
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Monthly Patient Volume"
          data={monthlyData}
          color="hsl(262, 83%, 58%)"
        />
        <AnalyticsChart
          title="No-Show Rate Trend"
          data={noShowTrendData}
          color="hsl(38, 92%, 50%)"
        />
      </div>

      {/* Consultation Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Appointments by Type"
          data={consultationTypeData}
          color="hsl(173, 80%, 40%)"
        />
        
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {performanceMetrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className="text-sm">
                    <span className={metric.value >= metric.target ? "text-success" : "text-amber-500"}>
                      {metric.value}%
                    </span>
                    <span className="text-muted-foreground"> / {metric.target}%</span>
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${
                      metric.value >= metric.target ? 'bg-success' : 'bg-amber-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-primary">Peak Time Optimization</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Consider adding a 15-min buffer between 10-11 AM slots. High patient volume causes average delays of 8 minutes.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-success/5 border border-success/20">
              <h4 className="font-medium text-success">No-Show Prevention</h4>
              <p className="text-sm text-muted-foreground mt-2">
                AI reminders have reduced no-shows by 40%. Enable SMS reminders 2 hours before appointments for better results.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <h4 className="font-medium text-amber-600">Follow-Up Alert</h4>
              <p className="text-sm text-muted-foreground mt-2">
                23 patients are due for follow-up appointments this week. Consider sending automated reminders to improve compliance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
