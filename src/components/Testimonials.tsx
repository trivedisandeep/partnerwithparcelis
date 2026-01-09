import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Testimonial {
  id: string;
  agency_name: string;
  person_name: string;
  role: string;
  content: string;
  avatar_url: string | null;
  rating: number;
  display_order: number;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Check if testimonials section should be visible
      const { data: settings } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "testimonials_visible")
        .single();

      if (settings?.value && typeof settings.value === "object" && "enabled" in settings.value) {
        setIsVisible(settings.value.enabled as boolean);
      }

      // Fetch active testimonials
      const { data: testimonialsData } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (testimonialsData) {
        setTestimonials(testimonialsData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !isVisible || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Partner <span className="text-gradient">Success Stories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from agencies already earning with the Parcelis Partner Program
          </p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="basis-full">
                  <div className="glass-card p-8 md:p-10 relative">
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
                    
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>

                    <p className="text-foreground/90 mb-8 leading-relaxed text-lg md:text-xl italic">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4 pt-6 border-t border-border">
                      {testimonial.avatar_url ? (
                        <img
                          src={testimonial.avatar_url}
                          alt={testimonial.person_name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xl">
                          {testimonial.person_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.person_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.agency_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
