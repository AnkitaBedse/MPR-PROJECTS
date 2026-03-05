import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { 
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Shield,
  LogOut,
  Edit,
  Save,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    company: "ABC Trading Co.",
    gstin: "27ABCDE1234F1Z5",
    address: "123 Business Street, Mumbai, Maharashtra 400001",
    joinDate: "January 2024"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    // Redirect logic would go here
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileSidebar />
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <main className="p-6 max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
              <p className="text-muted-foreground">
                Manage your account information and security settings.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(false)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSave}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={userInfo.phone}
                            onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="company"
                            value={userInfo.company}
                            onChange={(e) => setUserInfo(prev => ({ ...prev, company: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gstin">GSTIN</Label>
                      <Input
                        id="gstin"
                        value={userInfo.gstin}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, gstin: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <textarea
                          id="address"
                          value={userInfo.address}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, address: e.target.value }))}
                          disabled={!isEditing}
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Password Change */}
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!isChangingPassword ? (
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-foreground">Password</p>
                            <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsChangingPassword(true)}
                        >
                          Change Password
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4 border border-border rounded-lg p-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={handlePasswordChange}>
                            Update Password
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsChangingPassword(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Account Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Member Since</p>
                        <p className="text-sm text-muted-foreground">{userInfo.joinDate}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p className="font-medium text-foreground mb-2">Plan Details</p>
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                        <p className="font-semibold text-primary">Professional Plan</p>
                        <p className="text-sm text-muted-foreground">Unlimited filings, AI support</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <p className="font-medium text-foreground">Quick Stats</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Filings</span>
                          <span className="font-medium">24</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Filing</span>
                          <span className="font-medium">Nov 18, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Compliance Score</span>
                          <span className="font-medium text-success">100%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Logout */}
                <Card>
                  <CardContent className="pt-6">
                    <Button
                      variant="outline"
                      className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}