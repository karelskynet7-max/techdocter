import { useState } from "react";
import { Send, MessageCircle, Mail, MapPin, CheckCircle, Copy, ExternalLink } from "lucide-react";
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

const serviceCategories = [
  "Hardware Repair",
  "Software Project",
  "Trading Inquiry",
  "General Tech Question",
];

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
  const [trackingLink, setTrackingLink] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    serviceCategory: "",
    deviceType: "",
    problem: "",
    contactMethod: "whatsapp",
    contact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const deviceType = formData.deviceType || formData.serviceCategory || "general";
      const { data: trackingToken, error } = await supabase
        .rpc('submit_repair_request', {
          p_name: formData.name.trim(),
          p_device_type: deviceType,
          p_problem: formData.problem.trim(),
          p_contact_method: formData.contactMethod,
          p_contact: formData.contact.trim(),
        });

      if (error) throw error;

      // Generate tracking link using the returned tracking token
      const trackingUrl = `${window.location.origin}/track/${trackingToken}`;
      setTrackingLink(trackingUrl);

      toast({
        title: "Request Received! 🎉",
        description: "I'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        serviceCategory: "",
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

  const copyTrackingLink = () => {
    if (trackingLink) {
      navigator.clipboard.writeText(trackingLink);
      toast({ title: "Link copied to clipboard!" });
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

            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-accent/10 rounded-full text-sm font-medium text-accent">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              Currently accepting new projects & repairs in the Netherlands
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

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9882.394276789!2d5.805!3d51.825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c70837a05e5c93%3A0x8c08e0c6d09ff7d2!2sTolhuis%2C%20Nijmegen!5e0!3m2!1sen!2snl!4v1707100000000!5m2!1sen!2snl"
                width="100%"
                height="256"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Service Location - Tolhuis, Dukenburg, Nijmegen"
              />
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg ring-1 ring-accent/20">
            {trackingLink ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Request Submitted!</h3>
                <p className="text-muted-foreground mb-6">
                  Save this link to track your repair status anytime:
                </p>
                
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <p className="text-sm text-foreground break-all font-mono">{trackingLink}</p>
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button onClick={copyTrackingLink} variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button asChild>
                    <a href={trackingLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Status
                    </a>
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  className="mt-6"
                  onClick={() => setTrackingLink(null)}
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              /* Form State */
              <>
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

              {/* Service Category */}
              <div className="space-y-2">
                <Label>What do you need help with?</Label>
                <Select
                  value={formData.serviceCategory}
                  onValueChange={(value) => setFormData({ ...formData, serviceCategory: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Device Type - only show for Hardware Repair */}
              {formData.serviceCategory === "hardware repair" && (
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
              )}

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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
