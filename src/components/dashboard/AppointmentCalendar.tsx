import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Appointment {
  id: string;
  time: string;
  patientName: string;
  type: string;
  status: "confirmed" | "high-risk" | "emergency";
  duration: number;
}

const statusStyles = {
  confirmed: "bg-success/10 border-success/30 text-success",
  "high-risk": "bg-warning/10 border-warning/30 text-warning",
  emergency: "bg-destructive/10 border-destructive/30 text-destructive",
};

const statusLabels = {
  confirmed: "Confirmed",
  "high-risk": "No-Show Risk",
  emergency: "Emergency",
};

interface AppointmentCalendarProps {
  appointments: Appointment[];
}

export function AppointmentCalendar({ appointments }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const prevDay = () => {
    setCurrentDate(prev => new Date(prev.getTime() - 86400000));
  };

  const nextDay = () => {
    setCurrentDate(prev => new Date(prev.getTime() + 86400000));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={prevDay} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground min-w-[200px] text-center">
              {formatDate(currentDate)}
            </span>
            <Button variant="ghost" size="icon" onClick={nextDay} className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6">
        <div className="space-y-3">
          {appointments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-stretch gap-4"
            >
              {/* Time */}
              <div className="w-16 flex-shrink-0 text-right">
                <span className="text-sm font-medium text-foreground">{apt.time}</span>
              </div>
              
              {/* Timeline dot */}
              <div className="relative flex flex-col items-center">
                <div className={`h-3 w-3 rounded-full border-2 ${
                  apt.status === 'emergency' ? 'border-destructive bg-destructive' :
                  apt.status === 'high-risk' ? 'border-warning bg-warning' :
                  'border-success bg-success'
                }`} />
                {index < appointments.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-1" />
                )}
              </div>
              
              {/* Appointment Card */}
              <div className={`flex-1 p-4 rounded-lg border ${statusStyles[apt.status]} mb-2`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{apt.patientName}</h4>
                      <p className="text-sm text-muted-foreground">{apt.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[apt.status]}`}>
                      {statusLabels[apt.status]}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{apt.duration} min</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
