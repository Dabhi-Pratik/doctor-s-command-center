import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CalendarDays, 
  Users, 
  Clock, 
  AlertTriangle,
  Stethoscope
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { PatientQueue, type Patient } from "@/components/dashboard/PatientQueue";
import { AITriagePanel } from "@/components/dashboard/AITriagePanel";
import { AppointmentCalendar } from "@/components/dashboard/AppointmentCalendar";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { toast } from "sonner";

// Sample data
const samplePatients: Patient[] = [
  { id: "1", queueNo: 1, name: "Raj Patel", symptoms: "Chest pain, shortness of breath", priority: "high", waitingTime: 5, arrivalTime: "9:00 AM", aiScore: 85 },
  { id: "2", queueNo: 2, name: "Neha Shah", symptoms: "High fever, body aches, cough", priority: "medium", waitingTime: 12, arrivalTime: "9:15 AM", aiScore: 55 },
  { id: "3", queueNo: 3, name: "Aman Desai", symptoms: "Mild headache, fatigue", priority: "low", waitingTime: 20, arrivalTime: "9:25 AM", aiScore: 25 },
  { id: "4", queueNo: 4, name: "Priya Sharma", symptoms: "Recurring stomach pain", priority: "medium", waitingTime: 28, arrivalTime: "9:35 AM", aiScore: 48 },
  { id: "5", queueNo: 5, name: "Vikram Singh", symptoms: "Follow-up checkup", priority: "low", waitingTime: 35, arrivalTime: "9:45 AM", aiScore: 15 },
];

const sampleAppointments = [
  { id: "a1", time: "9:00 AM", patientName: "Raj Patel", type: "Emergency Consultation", status: "emergency" as const, duration: 25 },
  { id: "a2", time: "9:30 AM", patientName: "Neha Shah", type: "General Checkup", status: "confirmed" as const, duration: 15 },
  { id: "a3", time: "10:00 AM", patientName: "Aman Desai", type: "Follow-up", status: "confirmed" as const, duration: 10 },
  { id: "a4", time: "10:30 AM", patientName: "Priya Sharma", type: "Consultation", status: "high-risk" as const, duration: 20 },
  { id: "a5", time: "11:00 AM", patientName: "Vikram Singh", type: "Regular Checkup", status: "confirmed" as const, duration: 15 },
  { id: "a6", time: "11:30 AM", patientName: "Anita Gupta", type: "New Patient", status: "high-risk" as const, duration: 30 },
];

const sampleNotifications = [
  { id: "n1", type: "warning" as const, message: "Patient Anita Gupta may not arrive (AI Prediction: 72% no-show risk)", time: "2 min ago" },
  { id: "n2", type: "info" as const, message: "Raj Patel arrived early for emergency appointment", time: "5 min ago" },
  { id: "n3", type: "alert" as const, message: "Emergency case assigned - Dr. Kumar unavailable", time: "10 min ago" },
];

const dailyPatientsData = [
  { name: "Mon", value: 24 },
  { name: "Tue", value: 32 },
  { name: "Wed", value: 28 },
  { name: "Thu", value: 35 },
  { name: "Fri", value: 30 },
  { name: "Sat", value: 18 },
  { name: "Sun", value: 12 },
];

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>(samplePatients);
  const [notifications, setNotifications] = useState(sampleNotifications);

  const handleCallPatient = (patient: Patient) => {
    toast.success(`Calling ${patient.name}`, {
      description: `Queue #${patient.queueNo} - ${patient.symptoms}`,
    });
  };

  const handleDelayPatient = (patient: Patient) => {
    toast.info(`Delayed ${patient.name} by 10 minutes`, {
      description: "Patient has been notified",
    });
  };

  const handleCompleteVisit = (patient: Patient) => {
    setPatients(prev => prev.filter(p => p.id !== patient.id));
    setSelectedPatient(null);
    toast.success(`Visit completed for ${patient.name}`, {
      description: "Patient removed from queue",
    });
  };

  const handleMarkEmergency = (patient: Patient) => {
    setPatients(prev => 
      prev.map(p => p.id === patient.id ? { ...p, priority: "high" as const, queueNo: 1 } : 
        { ...p, queueNo: p.queueNo + 1 }
      ).sort((a, b) => a.queueNo - b.queueNo)
    );
    toast.warning(`${patient.name} marked as emergency`, {
      description: "Moved to front of queue",
    });
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Good Morning, Dr. Wilson</h1>
              <p className="text-muted-foreground">Here's your patient overview for today</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Cards */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatCard
              title="Today's Appointments"
              value={24}
              subtitle="3 remaining"
              icon={CalendarDays}
              trend={{ value: 12, positive: true }}
              variant="primary"
            />
            <StatCard
              title="Patients Waiting"
              value={patients.length}
              subtitle="In queue now"
              icon={Users}
              variant="default"
            />
            <StatCard
              title="Avg. Consultation Time"
              value="12 min"
              subtitle="2 min faster than usual"
              icon={Clock}
              trend={{ value: 8, positive: true }}
              variant="success"
            />
            <StatCard
              title="No-Show Risk"
              value="8%"
              subtitle="2 high-risk patients"
              icon={AlertTriangle}
              variant="warning"
            />
          </motion.section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Queue */}
            <div className="xl:col-span-2 space-y-8">
              <PatientQueue
                patients={patients}
                selectedPatientId={selectedPatient?.id}
                onSelectPatient={setSelectedPatient}
                onCallPatient={handleCallPatient}
              />
              
              <AppointmentCalendar appointments={sampleAppointments} />
            </div>

            {/* Right Column - AI Panel & Notifications */}
            <div className="space-y-8">
              <AITriagePanel
                patient={selectedPatient}
                onDelayPatient={handleDelayPatient}
                onCompleteVisit={handleCompleteVisit}
                onMarkEmergency={handleMarkEmergency}
              />
              
              <NotificationsPanel
                notifications={notifications}
                onDismiss={handleDismissNotification}
              />
            </div>
          </div>

          {/* Analytics */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnalyticsChart
                title="Patients This Week"
                data={dailyPatientsData}
              />
              <AnalyticsChart
                title="Peak Hours (Today)"
                data={[
                  { name: "8AM", value: 3 },
                  { name: "9AM", value: 8 },
                  { name: "10AM", value: 12 },
                  { name: "11AM", value: 10 },
                  { name: "12PM", value: 5 },
                  { name: "2PM", value: 9 },
                  { name: "3PM", value: 11 },
                  { name: "4PM", value: 7 },
                ]}
                color="hsl(15, 90%, 60%)"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
