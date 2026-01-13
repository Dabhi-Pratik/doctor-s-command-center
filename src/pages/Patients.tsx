import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Plus, 
  Filter, 
  Phone, 
  Mail, 
  Calendar,
  MoreVertical,
  User,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface PatientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  lastVisit: string;
  condition: string;
  status: "active" | "inactive" | "critical";
  avatar?: string;
}

const samplePatients: PatientRecord[] = [
  { id: "1", name: "Raj Patel", email: "raj.patel@email.com", phone: "+91 98765 43210", age: 45, gender: "Male", bloodGroup: "O+", lastVisit: "2024-01-10", condition: "Hypertension", status: "active" },
  { id: "2", name: "Neha Shah", email: "neha.shah@email.com", phone: "+91 87654 32109", age: 32, gender: "Female", bloodGroup: "A+", lastVisit: "2024-01-12", condition: "Diabetes Type 2", status: "active" },
  { id: "3", name: "Aman Desai", email: "aman.desai@email.com", phone: "+91 76543 21098", age: 28, gender: "Male", bloodGroup: "B+", lastVisit: "2024-01-08", condition: "Migraine", status: "inactive" },
  { id: "4", name: "Priya Sharma", email: "priya.sharma@email.com", phone: "+91 65432 10987", age: 55, gender: "Female", bloodGroup: "AB+", lastVisit: "2024-01-13", condition: "Cardiac Issues", status: "critical" },
  { id: "5", name: "Vikram Singh", email: "vikram.singh@email.com", phone: "+91 54321 09876", age: 38, gender: "Male", bloodGroup: "O-", lastVisit: "2024-01-11", condition: "Regular Checkup", status: "active" },
  { id: "6", name: "Anita Gupta", email: "anita.gupta@email.com", phone: "+91 43210 98765", age: 42, gender: "Female", bloodGroup: "A-", lastVisit: "2024-01-09", condition: "Thyroid", status: "active" },
];

const Patients = () => {
  const [patients, setPatients] = useState<PatientRecord[]>(samplePatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "Male",
    bloodGroup: "",
    condition: "",
  });

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterStatus || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.email || !newPatient.phone) {
      toast.error("Please fill in required fields");
      return;
    }

    const patient: PatientRecord = {
      id: Date.now().toString(),
      name: newPatient.name,
      email: newPatient.email,
      phone: newPatient.phone,
      age: parseInt(newPatient.age) || 0,
      gender: newPatient.gender,
      bloodGroup: newPatient.bloodGroup,
      lastVisit: new Date().toISOString().split('T')[0],
      condition: newPatient.condition || "New Patient",
      status: "active",
    };

    setPatients([patient, ...patients]);
    setNewPatient({ name: "", email: "", phone: "", age: "", gender: "Male", bloodGroup: "", condition: "" });
    setIsAddDialogOpen(false);
    toast.success(`Patient ${patient.name} added successfully`);
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter(p => p.id !== id));
    toast.success("Patient removed successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "inactive": return "bg-muted text-muted-foreground border-muted";
      case "critical": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Patient Records</h2>
          <p className="text-muted-foreground">Manage and view all patient information</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter the patient's information below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name" 
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                    placeholder="30" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    placeholder="patient@email.com" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input 
                    id="phone" 
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                    placeholder="+91 98765 43210" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select 
                    id="gender"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input 
                    id="bloodGroup" 
                    value={newPatient.bloodGroup}
                    onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})}
                    placeholder="O+" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Medical Condition</Label>
                <Textarea 
                  id="condition"
                  value={newPatient.condition}
                  onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                  placeholder="Describe the patient's condition..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddPatient}>Add Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name, email, or condition..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {filterStatus ? filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1) : "All Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus(null)}>All Status</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("inactive")}>Inactive</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("critical")}>Critical</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{patient.age} yrs • {patient.gender}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Appointment
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeletePatient(patient.id)}
                      >
                        Remove Patient
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getStatusColor(patient.status)}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Blood: {patient.bloodGroup}</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{patient.phone}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Condition: </span>
                    <span className="font-medium">{patient.condition}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No patients found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Patients;
