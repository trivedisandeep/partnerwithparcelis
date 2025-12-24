import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { LogOut, Plus, Save, Trash2, ArrowLeft, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Testimonial {
  id: string;
  agency_name: string;
  person_name: string;
  role: string;
  content: string;
  rating: number;
  is_active: boolean;
  display_order: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsVisible, setTestimonialsVisible] = useState(true);
  const [saving, setSaving] = useState(false);

  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      setUser(session.user);
      await checkAdminRole(session.user.id);
    }
    setLoading(false);
  };

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();

    if (data) {
      setIsAdmin(true);
      await fetchData();
    } else {
      setIsAdmin(false);
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
    }
  };

  const fetchData = async () => {
    // Fetch testimonials
    const { data: testimonialsData } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (testimonialsData) {
      setTestimonials(testimonialsData);
    }

    // Fetch visibility setting
    const { data: settings } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "testimonials_visible")
      .single();

    if (settings?.value && typeof settings.value === "object" && "enabled" in settings.value) {
      setTestimonialsVisible(settings.value.enabled as boolean);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else if (data.user) {
      setUser(data.user);
      await checkAdminRole(data.user.id);
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  const handleVisibilityToggle = async (enabled: boolean) => {
    setTestimonialsVisible(enabled);
    const { error } = await supabase
      .from("site_settings")
      .update({ value: { enabled } })
      .eq("key", "testimonials_visible");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Updated",
        description: `Testimonials section ${enabled ? "enabled" : "disabled"}`,
      });
    }
  };

  const updateTestimonial = (id: string, field: keyof Testimonial, value: any) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const saveTestimonial = async (testimonial: Testimonial) => {
    setSaving(true);
    const { error } = await supabase
      .from("testimonials")
      .update({
        agency_name: testimonial.agency_name,
        person_name: testimonial.person_name,
        role: testimonial.role,
        content: testimonial.content,
        rating: testimonial.rating,
        is_active: testimonial.is_active,
        display_order: testimonial.display_order,
      })
      .eq("id", testimonial.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved",
        description: "Testimonial updated successfully",
      });
    }
    setSaving(false);
  };

  const addTestimonial = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .insert({
        agency_name: "New Agency",
        person_name: "Name",
        role: "Role",
        content: "Testimonial content here...",
        rating: 5,
        display_order: testimonials.length + 1,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add testimonial",
        variant: "destructive",
      });
    } else if (data) {
      setTestimonials((prev) => [...prev, data]);
      toast({
        title: "Added",
        description: "New testimonial created",
      });
    }
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    } else {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast({
        title: "Deleted",
        description: "Testimonial removed",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Login form
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={authLoading}>
                {authLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive mb-4">You do not have admin access.</p>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Testimonials Toggle */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Testimonials Section</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Switch
                checked={testimonialsVisible}
                onCheckedChange={handleVisibilityToggle}
              />
              <Label>
                {testimonialsVisible ? "Visible on homepage" : "Hidden from homepage"}
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials List */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Manage Testimonials</h2>
          <Button onClick={addTestimonial}>
            <Plus className="w-4 h-4 mr-2" /> Add Testimonial
          </Button>
        </div>

        <div className="space-y-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Agency Name</Label>
                    <Input
                      value={testimonial.agency_name}
                      onChange={(e) =>
                        updateTestimonial(testimonial.id, "agency_name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Person Name</Label>
                    <Input
                      value={testimonial.person_name}
                      onChange={(e) =>
                        updateTestimonial(testimonial.id, "person_name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Input
                      value={testimonial.role}
                      onChange={(e) =>
                        updateTestimonial(testimonial.id, "role", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Rating (1-5)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={testimonial.rating}
                        onChange={(e) =>
                          updateTestimonial(testimonial.id, "rating", parseInt(e.target.value) || 5)
                        }
                        className="w-20"
                      />
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <Label>Content</Label>
                  <Textarea
                    value={testimonial.content}
                    onChange={(e) =>
                      updateTestimonial(testimonial.id, "content", e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={testimonial.is_active}
                      onCheckedChange={(checked) =>
                        updateTestimonial(testimonial.id, "is_active", checked)
                      }
                    />
                    <Label>{testimonial.is_active ? "Active" : "Inactive"}</Label>
                    <div className="flex items-center gap-2 ml-4">
                      <Label>Order:</Label>
                      <Input
                        type="number"
                        value={testimonial.display_order}
                        onChange={(e) =>
                          updateTestimonial(testimonial.id, "display_order", parseInt(e.target.value) || 0)
                        }
                        className="w-16"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => saveTestimonial(testimonial)}
                      disabled={saving}
                    >
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteTestimonial(testimonial.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Admin;
