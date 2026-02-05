import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Wrench, 
  LogOut, 
  Inbox, 
  Clock, 
  CheckCircle, 
  XCircle,
  MessageCircle,
  Mail,
  Smartphone,
  Monitor,
  Home,
  Wifi,
  RefreshCw,
  Link,
  Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface RepairRequest {
  id: string;
  name: string;
  device_type: string;
  problem: string;
  contact_method: string;
  contact: string;
  status: string;
  notes: string | null;
  tracking_token: string;
  created_at: string;
  updated_at: string;
}

const deviceIcons: Record<string, React.ReactNode> = {
  laptop: <Monitor className="w-5 h-5" />,
  "desktop pc": <Monitor className="w-5 h-5" />,
  "mobile phone": <Smartphone className="w-5 h-5" />,
  tablet: <Smartphone className="w-5 h-5" />,
  tv: <Home className="w-5 h-5" />,
  heater: <Home className="w-5 h-5" />,
  router: <Wifi className="w-5 h-5" />,
  "network switch": <Wifi className="w-5 h-5" />,
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "in-progress": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  completed: "bg-green-500/10 text-green-600 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const [requests, setRequests] = useState<RepairRequest[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<RepairRequest | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/admin/login");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchRequests();
    }
  }, [user, isAdmin]);

  const fetchRequests = async () => {
    setIsLoadingData(true);
    const { data, error } = await supabase
      .from("repair_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading requests",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setRequests(data || []);
    }
    setIsLoadingData(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("repair_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Status updated" });
      fetchRequests();
      if (selectedRequest?.id === id) {
        setSelectedRequest({ ...selectedRequest, status });
      }
    }
  };

  const updateNotes = async (id: string) => {
    const { error } = await supabase
      .from("repair_requests")
      .update({ notes })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error saving notes",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Notes saved" });
      fetchRequests();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have admin privileges. Contact the site owner to get access.
          </p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      </div>
    );
  }

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    inProgress: requests.filter((r) => r.status === "in-progress").length,
    completed: requests.filter((r) => r.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchRequests}>
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <Inbox className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.inProgress}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Request List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Repair Requests</h2>
            
            {isLoadingData ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No repair requests yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    onClick={() => {
                      setSelectedRequest(request);
                      setNotes(request.notes || "");
                    }}
                    className={`bg-card rounded-xl p-4 border cursor-pointer transition-all hover:shadow-md ${
                      selectedRequest?.id === request.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          {deviceIcons[request.device_type] || <Wrench className="w-5 h-5" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-foreground truncate">
                            {request.name}
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {request.device_type}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {request.problem}
                          </p>
                        </div>
                      </div>
                      <Badge className={statusColors[request.status]} variant="outline">
                        {request.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {request.contact_method === "whatsapp" ? (
                          <MessageCircle className="w-3 h-3" />
                        ) : (
                          <Mail className="w-3 h-3" />
                        )}
                        {request.contact}
                      </div>
                      <div>
                        {new Date(request.created_at).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedRequest ? (
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Request Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Customer</label>
                    <div className="font-medium text-foreground">{selectedRequest.name}</div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Device</label>
                    <div className="font-medium text-foreground capitalize">
                      {selectedRequest.device_type}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Problem</label>
                    <div className="text-foreground">{selectedRequest.problem}</div>
                  </div>

                  {/* Tracking Link */}
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Tracking Link</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-lg px-3 py-2 text-xs font-mono text-muted-foreground truncate">
                        {`${window.location.origin}/track/${selectedRequest.tracking_token}`}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/track/${selectedRequest.tracking_token}`
                          );
                          toast({ title: "Tracking link copied!" });
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Send this link to client via WhatsApp/Email
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Contact</label>
                    <div className="flex items-center gap-2">
                      {selectedRequest.contact_method === "whatsapp" ? (
                        <MessageCircle className="w-4 h-4 text-accent" />
                      ) : (
                        <Mail className="w-4 h-4 text-primary" />
                      )}
                      <a
                        href={
                          selectedRequest.contact_method === "whatsapp"
                            ? `https://wa.me/${selectedRequest.contact.replace(/\D/g, "")}`
                            : `mailto:${selectedRequest.contact}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {selectedRequest.contact}
                      </a>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Status</label>
                    <Select
                      value={selectedRequest.status}
                      onValueChange={(value) => updateStatus(selectedRequest.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Notes</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add internal notes..."
                      rows={4}
                    />
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => updateNotes(selectedRequest.id)}
                    >
                      Save Notes
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <p className="text-muted-foreground">
                  Select a request to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
