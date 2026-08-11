import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PASSWORD = "admin2026"; // 비밀번호 설정

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!password.trim()) {
      toast.error(t("error.passwordRequired") || "Please enter password");
      return;
    }

    setIsLoading(true);
    try {
      // 비밀번호 검증
      if (password === ADMIN_PASSWORD) {
        // 로컬스토리지에 관리자 세션 저장
        localStorage.setItem("adminSession", JSON.stringify({
          authenticated: true,
          timestamp: Date.now(),
        }));
        toast.success(t("message.adminLoginSuccess") || "Admin login successful");
        onClose();
        navigate("/admin");
      } else {
        toast.error(t("error.invalidPassword") || "Invalid password");
        setPassword("");
      }
    } catch (error) {
      toast.error(t("error.loginFailed") || "Login failed");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("admin.loginTitle") || "Admin Login"}</DialogTitle>
          <DialogDescription>
            {t("admin.loginDesc") || "Enter the admin password to access the dashboard"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">{t("form.password") || "Password"}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("placeholder.password") || "Enter password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              {t("button.cancel") || "Cancel"}
            </Button>
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="bg-slate-700 hover:bg-slate-800"
            >
              {isLoading ? t("button.loggingIn") || "Logging in..." : t("button.login") || "Login"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
