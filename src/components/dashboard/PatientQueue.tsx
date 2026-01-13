import { motion } from "framer-motion";
import { Phone, Clock, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "./PriorityBadge";

export interface Patient {
  id: string;
  queueNo: number;
  name: string;
  symptoms: string;
  priority: "high" | "medium" | "low";
  waitingTime: number;
  arrivalTime: string;
  aiScore?: number;
}

interface PatientQueueProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onCallPatient: (patient: Patient) => void;
  selectedPatientId?: string;
}

export function PatientQueue({ patients, onSelectPatient, onCallPatient, selectedPatientId }: PatientQueueProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
            <h2 className="text-lg font-semibold text-foreground">Live Patient Queue</h2>
          </div>
          <span className="text-sm text-muted-foreground">{patients.length} patients waiting</span>
        </div>
      </div>
      
      <div className="divide-y divide-border">
        {patients.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No patients in queue</p>
          </div>
        ) : (
          patients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`px-6 py-4 hover:bg-secondary/50 cursor-pointer transition-colors ${
                selectedPatientId === patient.id ? 'bg-primary/5 border-l-2 border-l-primary' : ''
              }`}
              onClick={() => onSelectPatient(patient)}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">#{patient.queueNo}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-medium text-foreground truncate">{patient.name}</h3>
                      <PriorityBadge priority={patient.priority} />
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">{patient.symptoms}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{patient.waitingTime} min</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Since {patient.arrivalTime}</p>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCallPatient(patient);
                    }}
                    className="gap-1.5"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Call</span>
                  </Button>
                  
                  <ChevronRight className="h-5 w-5 text-muted-foreground hidden md:block" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
