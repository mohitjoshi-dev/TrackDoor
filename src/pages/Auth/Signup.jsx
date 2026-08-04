import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

import { signUp } from "@/services/auth.service";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

  const { user, error } = await signUp(email, password);

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  if (!user) {
    setError("User could not be created.");
    setLoading(false);
    return;
  }

  navigate("/login");
  }

  return (
    <Card className="border-border bg-card/70 shadow-xl backdrop-blur-xl">
      <CardContent className="p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create your Smart Expense Tracker account.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">

          <div className="space-y-2">
            <Label>Full Name</Label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                className="pl-10"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                type="email"
                className="pl-10"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                type="password"
                className="pl-10"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </div>

      </CardContent>
    </Card>
  );
}