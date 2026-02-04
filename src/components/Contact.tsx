import { useState } from "react";
import { Send, MessageCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const deviceTypes = [
  "Laptop",
  "Desktop PC",
  "Mobile Phone",
  "Tablet",
  "TV",
  "Heater",
  "Router",
  "Network Switch",
  "Other",
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    deviceType: "",
    problem: "",
    contactMethod: "whatsapp",
    contact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("repair_requests").insert({
        name: formData.name.trim(),
        device_type: formData.deviceType,
        problem: formData.problem.trim(),
        contact_method: formData.contactMethod,
        contact: formData.contact.trim(),
      });

      if (error) throw error;

      toast({
        title: "Request Received! 🎉",
        description: "I'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        deviceType: "",
        problem: "",
        contactMethod: "whatsapp",
        contact: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-6">
              Get in Touch
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Let's Fix Your <span className="gradient-text">Device</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Fill out the form and I'll get back to you within 24 hours. For urgent repairs,
              mention it in your message!
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Service Area</div>
                  <div className="text-sm text-muted-foreground">The Netherlands 🇳🇱</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Preferred Contact</div>
                  <div className="text-sm text-muted-foreground">WhatsApp for quick responses</div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-border">
              <div className="flex items-center justify-center h-48 text-muted-foreground">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-primary/50" />
                  <p className="font-medium">Service throughout the Netherlands</p>
                  <p className="text-sm mt-1">Remote diagnostics available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-6">Book a Repair</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Device Type */}
              <div className="space-y-2">
                <Label>Device Type</Label>
                <Select
                  value={formData.deviceType}
                  onValueChange={(value) => setFormData({ ...formData, deviceType: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your device" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviceTypes.map((device) => (
                      <SelectItem key={device} value={device.toLowerCase()}>
                        {device}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Problem Description */}
              <div className="space-y-2">
                <Label htmlFor="problem">Describe the Problem</Label>
                <Textarea
                  id="problem"
                  placeholder="My laptop overheats when playing games..."
                  rows={4}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  required
                />
              </div>

              {/* Contact Method */}
              <div className="space-y-3">
                <Label>Preferred Contact Method</Label>
                <RadioGroup
                  value={formData.contactMethod}
                  onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whatsapp" id="whatsapp" />
                    <Label htmlFor="whatsapp" className="flex items-center gap-2 cursor-pointer">
                      <MessageCircle className="w-4 h-4 text-accent" />
                      WhatsApp
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
                      <Mail className="w-4 h-4 text-primary" />
                      Email
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <Label htmlFor="contact">
                  {formData.contactMethod === "whatsapp" ? "WhatsApp Number" : "Email Address"}
                </Label>
                <Input
                  id="contact"
                  type={formData.contactMethod === "email" ? "email" : "tel"}
                  placeholder={
                    formData.contactMethod === "whatsapp"
                      ? "+31 6 12345678"
                      : "your@email.com"
                  }
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Repair Request
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                I'll respond within 24 hours. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
