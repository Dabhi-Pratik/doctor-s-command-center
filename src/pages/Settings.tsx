import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Clock, 
  Globe,
  Save,
  Camera,
  Mail,
  Phone,
  Building,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@medihospital.com",
    phone: "+91 98765 43210",
    specialty: "Cardiologist",
    hospital: "MediCare Hospital",
    license: "MED-2024-56789",
    bio: "Board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases.",
  });

  const [preferences, setPreferences] = useState({
    consultationDuration: "15",
    bufferTime: "5",
    maxPatientsPerDay: "30",
    workingHoursStart: "09:00",
    workingHoursEnd: "18:00",
    language: "en",
    timezone: "IST",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    appointmentReminders: true,
    patientArrivals: true,
    emergencyAlerts: true,
    aiInsights: true,
    weeklyReports: false,
  });

  const [appearance, setAppearance] = useState({
    darkMode: false,
    compactView: false,
    showAvatars: true,
    animatedTransitions: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    loginAlerts: true,
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved");
  };

  const handleSaveSecurity = () => {
    toast.success("Security settings updated");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Doctor Profile</CardTitle>
                <CardDescription>Update your professional information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">DR</span>
                    </div>
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-medium">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile.specialty}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="name"
                        className="pl-10"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <div className="relative">
                      <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="specialty"
                        className="pl-10"
                        value={profile.specialty}
                        onChange={(e) => setProfile({...profile, specialty: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email"
                        type="email"
                        className="pl-10"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone"
                        className="pl-10"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital/Clinic</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="hospital"
                        className="pl-10"
                        value={profile.hospital}
                        onChange={(e) => setProfile({...profile, hospital: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input 
                      id="license"
                      value={profile.license}
                      onChange={(e) => setProfile({...profile, license: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio"
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  />
                </div>

                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Clinic Preferences</CardTitle>
                <CardDescription>Configure your scheduling and workflow settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="consultation-duration">Default Consultation Duration (min)</Label>
                    <select 
                      id="consultation-duration"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={preferences.consultationDuration}
                      onChange={(e) => setPreferences({...preferences, consultationDuration: e.target.value})}
                    >
                      <option value="10">10 minutes</option>
                      <option value="15">15 minutes</option>
                      <option value="20">20 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buffer-time">Buffer Time Between Appointments (min)</Label>
                    <select 
                      id="buffer-time"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={preferences.bufferTime}
                      onChange={(e) => setPreferences({...preferences, bufferTime: e.target.value})}
                    >
                      <option value="0">No buffer</option>
                      <option value="5">5 minutes</option>
                      <option value="10">10 minutes</option>
                      <option value="15">15 minutes</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-patients">Max Patients Per Day</Label>
                    <Input 
                      id="max-patients"
                      type="number"
                      value={preferences.maxPatientsPerDay}
                      onChange={(e) => setPreferences({...preferences, maxPatientsPerDay: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="working-hours">Working Hours</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="time"
                        value={preferences.workingHoursStart}
                        onChange={(e) => setPreferences({...preferences, workingHoursStart: e.target.value})}
                      />
                      <span className="text-muted-foreground">to</span>
                      <Input 
                        type="time"
                        value={preferences.workingHoursEnd}
                        onChange={(e) => setPreferences({...preferences, workingHoursEnd: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select 
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={preferences.language}
                      onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="gu">Gujarati</option>
                      <option value="mr">Marathi</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select 
                      id="timezone"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                    >
                      <option value="IST">India Standard Time (IST)</option>
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                    </select>
                  </div>
                </div>

                <Button onClick={handleSavePreferences}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <Label htmlFor={key} className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                      </div>
                      <Switch 
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => setNotifications({...notifications, [key]: checked})}
                      />
                    </div>
                  ))}
                </div>

                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Notifications
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(appearance).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <Label htmlFor={key} className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                      </div>
                      <Switch 
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => setAppearance({...appearance, [key]: checked})}
                      />
                    </div>
                  ))}
                </div>

                <Button onClick={() => toast.success("Appearance settings saved")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Appearance
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <Label htmlFor="2fa">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch 
                      id="2fa"
                      checked={security.twoFactorAuth}
                      onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <Label htmlFor="login-alerts">Login Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified of new sign-ins</p>
                    </div>
                    <Switch 
                      id="login-alerts"
                      checked={security.loginAlerts}
                      onCheckedChange={(checked) => setSecurity({...security, loginAlerts: checked})}
                    />
                  </div>
                  <div className="p-4 rounded-lg border">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <select 
                      id="session-timeout"
                      className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="font-medium mb-4">Password</h4>
                  <Button variant="outline">Change Password</Button>
                </div>

                <Button onClick={handleSaveSecurity}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
