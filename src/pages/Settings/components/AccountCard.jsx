import CardWrapper from "@/components/common/CardWrapper";
import SettingsItem from "./SettingsItem"
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, ShieldCheck, KeyRound, Smartphone, LogOut, } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import SecurityDialog from "./SecurityDialog";
import ConnectedDevicesDialog from "./ConnectedDevicesDialog";

export default function AccountCard() {

const navigate = useNavigate();
const [signOutOpen, setSignOutOpen] = useState(false);
const [changePasswordOpen, setChangePasswordOpen] = useState(false);
const [securityOpen, setSecurityOpen] = useState(false);
const [devicesOpen, setDevicesOpen] = useState(false);

const handleItemClick = (title) => {
  switch (title) {
    case "Profile":
    navigate("/profile");
    break;
    
    case "Security":
    setSecurityOpen(true);
    break;
    
    case "Connected Devices":
    setDevicesOpen(true);
    break;

    case "Sign Out":
    setSignOutOpen(true);
    break;

    case "Change Password":
    setChangePasswordOpen(true);
    break;

    default:
      break;
  }
};

  const account = [
  {
    title: "Profile",
    subtitle: "Manage your personal information",
    value: "Edit",
    icon: User,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    title: "Security",
    subtitle: "Password and authentication",
    value: "Manage",
    icon: ShieldCheck,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-500",
  },
  {
    title: "Change Password",
    subtitle: "Update your account password",
    value: "",
    icon: KeyRound,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-500",
  },
  {
    title: "Connected Devices",
    subtitle: "Manage signed-in devices",
    value: "1",
    icon: Smartphone,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-500",
  },
  {
    title: "Sign Out",
    subtitle: "Log out of your account",
    value: "",
    icon: LogOut,
    iconBg: "bg-red-500/20",
    iconColor: "text-red-500",
  },
];

  return (
  <CardWrapper>
    <div className="mb-6">
      <h2 className="text-xl font-bold">
        Account
      </h2>

      <p className="text-sm text-muted-foreground">
        Manage your account and security.
      </p>
    </div>

    <div className="space-y-1">
      {account.map((item) => (
        <SettingsItem
          key={item.title}
          item={item}
          onClick={() => handleItemClick(item.title)}
        />
      ))}
    </div>

      <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
      <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-red-500" />
              Sign Out
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to sign out?
              You will need to log in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/login");
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ChangePasswordDialog
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
      />

      <SecurityDialog
        open={securityOpen}
        onOpenChange={setSecurityOpen}
      />
      
      <ConnectedDevicesDialog
        open={devicesOpen}
        onOpenChange={setDevicesOpen}
      />

  </CardWrapper>
);
}