import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Smartphone,
  Monitor,
  Home,
  Wifi
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface RepairRequest {
  id: string;
  name: string;
  device_type: string;
  problem: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const deviceIcons: Record<string, React.ReactNode> = {
  laptop: <Monitor className="w-6 h-6" />,
  "desktop pc": <Monitor className="w-6 h-6" />,
  "mobile phone": <Smartphone className="w-6 h-6" />,
  tablet: <Smartphone className="w-6 h-6" />,
  tv: <Home className="w-6 h-6" />,
  heater: <Home className="w-6 h-6" />,
  router: <Wifi className="w-6 h-6" />,
  "network switch": <Wifi className="w-6 h-6" />,
};

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bgColor: string; label: string }> = {
  pending: {
    icon: <Clock className="w-6 h-6" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/10 border-yellow-500/20",
    label: "Pending Review",
  },
  "in-progress": {
    icon: <RefreshCw className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    label: "In Progress",
  },
  completed: {
    icon: <CheckCircle className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-500/10 border-green-500/20",
    label: "Completed",
  },
  cancelled: {
    icon: <XCircle className="w-6 h-6" />,
    color: "text-red-600",
    bgColor: "bg-red-500/10 border-red-500/20",
    label: "Cancelled",
  },
};

const TrackRepair = () => {
  const { token } = useParams<{ token: string }>();
  const [request, setRequest] = useState<RepairRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      if (!token) {
        setError("Invalid tracking link");
        setIsLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("repair_requests")
        .select("id, name, device_type, problem, status, created_at, updated_at")
        .eq("tracking_token", token)
        .maybeSingle();

      if (fetchError) {
        setError("Failed to load repair status");
      } else if (!data) {
        setError("Repair request not found");
      } else {
        setRequest(data);
      }
      setIsLoading(false);
    };

    fetchRequest();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "This tracking link is invalid or has expired."}
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = statusConfig[request.status] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-16">
        {/* Status Hero */}
        <div className={`rounded-2xl border p-8 mb-8 ${statusInfo.bgColor}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-xl bg-background flex items-center justify-center ${statusInfo.color}`}>
              {statusInfo.icon}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Repair Status
              </h1>
              <Badge className={`mt-1 ${statusInfo.bgColor} ${statusInfo.color}`} variant="outline">
                {statusInfo.label}
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground">
            {request.status === "pending" && "Your repair request has been received and is awaiting review."}
            {request.status === "in-progress" && "Great news! Your device is currently being repaired."}
            {request.status === "completed" && "Your repair has been completed! We'll contact you for pickup/delivery."}
            {request.status === "cancelled" && "This repair request has been cancelled."}
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Request Details</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                {deviceIcons[request.device_type] || <Wrench className="w-6 h-6" />}
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Device</div>
                <div className="font-medium text-foreground capitalize">{request.device_type}</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Problem Description</div>
              <div className="text-foreground bg-muted/50 rounded-lg p-4">
                {request.problem}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <div className="text-sm text-muted-foreground">Submitted</div>
                <div className="font-medium text-foreground">
                  {new Date(request.created_at).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Last Updated</div>
                <div className="font-medium text-foreground">
                  {new Date(request.updated_at).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          Bookmark this page to check your repair status anytime.
          <br />
          Questions? Contact us via WhatsApp or email.
        </p>
      </main>
    </div>
  );
};

export default TrackRepair;
