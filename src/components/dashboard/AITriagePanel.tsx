import { motion, AnimatePresence } from "framer-motion";
import { Brain, Clock, AlertTriangle, FileText, Timer, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "./PriorityBadge";
import type { Patient } from "./PatientQueue";

interface AITriagePanelProps {
  patient: Patient | null;
  onDelayPatient: (patient: Patient) => void;
  onCompleteVisit: (patient: Patient) => void;
  onMarkEmergency: (patient: Patient) => void;
}

export function AITriagePanel({ patient, onDelayPatient, onCompleteVisit, onMarkEmergency }: AITriagePanelProps) {
  if (!patient) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card rounded-xl border border-border shadow-card p-8 text-center"
      >
        <Brain className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">AI Triage Summary</h3>
        <p className="text-sm text-muted-foreground/70 mt-2">
          Select a patient from the queue to view AI analysis
        </p>
      </motion.div>
    );
  }

  const aiInsights = {
    severityScore: patient.priority === 'high' ? 85 : patient.priority === 'medium' ? 55 : 25,
    suggestedDuration: patient.priority === 'high' ? '20-25 min' : patient.priority === 'medium' ? '12-15 min' : '8-10 min',
    possibleConditions: patient.priority === 'high' 
      ? ['Acute coronary syndrome', 'Angina pectoris']
      : patient.priority === 'medium'
      ? ['Viral infection', 'Bacterial infection']
      : ['Tension headache', 'Migraine'],
    recommendations: patient.priority === 'high'
      ? 'Immediate ECG and vital signs monitoring recommended'
      : patient.priority === 'medium'
      ? 'Standard examination, consider blood work if symptoms persist'
      : 'Brief consultation, OTC medication may suffice',
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={patient.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">AI Triage Analysis</h2>
          </div>
        </div>

        {/* Patient Info */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-lg">{patient.name}</h3>
              <p className="text-sm text-muted-foreground">Queue #{patient.queueNo}</p>
            </div>
            <PriorityBadge priority={patient.priority} />
          </div>
        </div>

        {/* AI Analysis */}
        <div className="p-6 space-y-5">
          {/* Severity Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">AI Severity Score</span>
              <span className={`text-lg font-bold ${
                aiInsights.severityScore >= 70 ? 'text-priority-high' :
                aiInsights.severityScore >= 40 ? 'text-priority-medium' :
                'text-priority-low'
              }`}>
                {aiInsights.severityScore}/100
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${aiInsights.severityScore}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  aiInsights.severityScore >= 70 ? 'bg-priority-high' :
                  aiInsights.severityScore >= 40 ? 'bg-priority-medium' :
                  'bg-priority-low'
                }`}
              />
            </div>
          </div>

          {/* Symptoms */}
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Reported Symptoms</p>
              <p className="text-sm text-muted-foreground">{patient.symptoms}</p>
            </div>
          </div>

          {/* Suggested Duration */}
          <div className="flex items-start gap-3">
            <Timer className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Suggested Consultation Time</p>
              <p className="text-sm text-muted-foreground">{aiInsights.suggestedDuration}</p>
            </div>
          </div>

          {/* Possible Conditions */}
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Possible Conditions</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                {aiInsights.possibleConditions.map((condition, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm font-medium text-primary flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Recommendation
            </p>
            <p className="text-sm text-foreground mt-1">{aiInsights.recommendations}</p>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground italic">
            ⚠️ AI suggestions are assistive only. Doctor's clinical judgment is final.
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-border bg-secondary/20">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelayPatient(patient)}
              className="gap-1.5"
            >
              <Clock className="h-3.5 w-3.5" />
              Delay 10 min
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onMarkEmergency(patient)}
              className="gap-1.5"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Mark Emergency
            </Button>
            <Button
              size="sm"
              onClick={() => onCompleteVisit(patient)}
              className="gap-1.5 ml-auto"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Complete Visit
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
