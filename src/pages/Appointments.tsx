import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Video,
  MapPin,
  User,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  duration: number;
  type: "consultation" | "follow-up" | "emergency" | "checkup" | "video";
  status: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
}

const sampleAppointments: Appointment[] = [
  { id: "1", patientName: "Raj Patel", patientEmail: "raj@email.com", date: "2024-01-15", time: "09:00", duration: 30, type: "emergency", status: "confirmed", notes: "Chest pain complaint" },
  { id: "2", patientName: "Neha Shah", patientEmail: "neha@email.com", date: "2024-01-15", time: "09:30", duration: 20, type: "consultation", status: "confirmed" },
  { id: "3", patientName: "Aman Desai", patientEmail: "aman@email.com", date: "2024-01-15", time: "10:00", duration: 15, type: "follow-up", status: "pending" },
  { id: "4", patientName: "Priya Sharma", patientEmail: "priya@email.com", date: "2024-01-15", time: "10:30", duration: 30, type: "consultation", status: "confirmed" },
  { id: "5", patientName: "Vikram Singh", patientEmail: "vikram@email.com", date: "2024-01-15", time: "11:00", duration: 20, type: "video", status: "confirmed" },
  { id: "6", patientName: "Anita Gupta", patientEmail: "anita@email.com", date: "2024-01-15", time: "11:30", duration: 25, type: "checkup", status: "pending" },
  { id: "7", patientName: "Rahul Mehta", patientEmail: "rahul@email.com", date: "2024-01-16", time: "09:00", duration: 30, type: "consultation", status: "confirmed" },
  { id: "8", patientName: "Sunita Rao", patientEmail: "sunita@email.com", date: "2024-01-16", time: "10:00", duration: 20, type: "follow-up", status: "confirmed" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [view, setView] = useState<"day" | "week">("day");
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientEmail: "",
    time: "",
    duration: "30",
    type: "consultation" as Appointment["type"],
    notes: "",
  });

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const filteredAppointments = appointments.filter(apt => {
    if (view === "day") {
      return apt.date === formatDate(selectedDate);
    }
    const weekStart = new Date(selectedDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const aptDate = new Date(apt.date);
    return aptDate >= weekStart && aptDate <= weekEnd;
  });

  const handleAddAppointment = () => {
    if (!newAppointment.patientName || !newAppointment.time) {
      toast.error("Please fill in required fields");
      return;
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      patientName: newAppointment.patientName,
      patientEmail: newAppointment.patientEmail,
      date: formatDate(selectedDate),
      time: newAppointment.time,
      duration: parseInt(newAppointment.duration),
      type: newAppointment.type,
      status: "pending",
      notes: newAppointment.notes,
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({ patientName: "", patientEmail: "", time: "", duration: "30", type: "consultation", notes: "" });
    setIsAddDialogOpen(false);
    toast.success(`Appointment scheduled for ${appointment.patientName}`);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: "cancelled" as const } : apt
    ));
    toast.info("Appointment cancelled");
  };

  const handleCompleteAppointment = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: "completed" as const } : apt
    ));
    toast.success("Appointment marked as completed");
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "emergency": return "bg-destructive/10 text-destructive border-destructive/20";
      case "video": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "follow-up": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "checkup": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-success/10 text-success";
      case "pending": return "bg-amber-500/10 text-amber-600";
      case "cancelled": return "bg-destructive/10 text-destructive";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    }
    setSelectedDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Appointments</h2>
          <p className="text-muted-foreground">Manage your schedule and patient appointments</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule Appointment</DialogTitle>
              <DialogDescription>Book a new appointment for {selectedDate.toLocaleDateString()}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input 
                    id="patientName" 
                    value={newAppointment.patientName}
                    onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientEmail">Email</Label>
                  <Input 
                    id="patientEmail" 
                    type="email"
                    value={newAppointment.patientEmail}
                    onChange={(e) => setNewAppointment({...newAppointment, patientEmail: e.target.value})}
                    placeholder="patient@email.com" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Time Slot *</Label>
                  <select 
                    id="time"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <select 
                    id="duration"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newAppointment.duration}
                    onChange={(e) => setNewAppointment({...newAppointment, duration: e.target.value})}
                  >
                    <option value="15">15 minutes</option>
                    <option value="20">20 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <select 
                  id="type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value as Appointment["type"]})}
                >
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="checkup">Regular Checkup</option>
                  <option value="emergency">Emergency</option>
                  <option value="video">Video Call</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  placeholder="Additional notes..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddAppointment}>Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mini Calendar */}
            <div className="lg:w-80">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </div>

            {/* Day View */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold min-w-[200px] text-center">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={view === "day" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setView("day")}
                  >
                    Day
                  </Button>
                  <Button 
                    variant={view === "week" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setView("week")}
                  >
                    Week
                  </Button>
                </div>
              </div>

              {/* Appointments List */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No appointments scheduled</p>
                  </div>
                ) : (
                  filteredAppointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((apt, index) => (
                      <motion.div
                        key={apt.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-lg border ${
                          apt.status === "cancelled" ? "opacity-50" : ""
                        } bg-card`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <div className="text-center">
                              <p className="text-lg font-bold text-primary">{apt.time}</p>
                              <p className="text-xs text-muted-foreground">{apt.duration} min</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{apt.patientName}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className={getTypeStyles(apt.type)}>
                                  {apt.type === "video" && <Video className="h-3 w-3 mr-1" />}
                                  {apt.type.charAt(0).toUpperCase() + apt.type.slice(1)}
                                </Badge>
                                <Badge className={getStatusStyles(apt.status)}>
                                  {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                </Badge>
                              </div>
                              {apt.notes && (
                                <p className="text-sm text-muted-foreground mt-2">{apt.notes}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {apt.status !== "completed" && apt.status !== "cancelled" && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleCompleteAppointment(apt.id)}
                                >
                                  Complete
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleCancelAppointment(apt.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{filteredAppointments.length}</p>
            <p className="text-sm text-muted-foreground">Total Appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {filteredAppointments.filter(a => a.status === "confirmed").length}
            </p>
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-500">
              {filteredAppointments.filter(a => a.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">
              {filteredAppointments.filter(a => a.status === "completed").length}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appointments;
