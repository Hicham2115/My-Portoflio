"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { ArrowUpRight, Send } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/errors";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
];

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

type ContactPayload = z.infer<typeof contactSchema>;

async function sendContactMessage(payload: ContactPayload): Promise<void> {
  await api.post("/api/contact", payload);
}

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const mailRef = useRef<HTMLAnchorElement>(null);
  const [year, setYear] = useState(2026);
  const [time, setTime] = useState("—");

  useEffect(() => {
    setYear(new Date().getFullYear());
    const tick = () => {
      try {
        setTime(
          new Date().toLocaleTimeString("en-GB", {
            timeZone: "Africa/Casablanca",
            hour: "2-digit",
            minute: "2-digit",
          }) + " GMT+1",
        );
      } catch {
        /* ignore */
      }
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      gsap.from(".r-line > *", {
        yPercent: 110,
        duration: 0.95,
        ease: "power4.out",
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
      gsap.from("[data-fade]", {
        autoAlpha: 0,
        y: 26,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        immediateRender: false,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
      const el = mailRef.current;
      if (!el) return;
      const sx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const sy = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        sx((e.clientX - (r.left + r.width / 2)) * 0.35);
        sy((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const onLeave = () => {
        sx(0);
        sy(0);
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root },
  );

  const contact = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      toast.success("Message sent — I'll get back to you soon.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const form = useForm({
    defaultValues: { name: "", email: "", message: "" },
    onSubmit: async ({ value }) => {
      const parsed = contactSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0].message);
        return;
      }
      try {
        await contact.mutateAsync(parsed.data);
        form.reset();
      } catch {
        // surfaced via the mutation's onError toast above
      }
    },
  });

  return (
    <footer
      ref={root}
      id="contact"
      className="pt-[130px] pb-[50px] border-t border-[var(--line)] relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[680px] h-[340px] bg-[rgba(186,252,12,0.12)] blur-[120px] rounded-full pointer-events-none" />

      <div className="wrap relative text-center">
        <div className="eyebrow justify-center" data-fade>
          Let&apos;s work together
        </div>

        <h2
          className="mt-6 font-medium tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem,12vw,11rem)", lineHeight: 0.86 }}
        >
          <span className="r-line">
            <span>ready to</span>
          </span>
          <span className="r-line">
            <span>
              <span className="text-[var(--lime)]">accelerate?</span>
            </span>
          </span>
        </h2>

        <a
          ref={mailRef}
          href="mailto:hichamkama20@gmail.com"
          data-cursor="✦"
          className="inline-flex items-center gap-[14px] mt-[50px] font-[family-name:var(--font-display)] font-medium bg-[var(--lime)] text-black! rounded-full px-9 py-5 cursor-none will-change-transform"
          style={{ fontSize: "clamp(1.1rem,2.6vw,1.7rem)" }}
        >
          hichamkama20@gmail.com
          <ArrowUpRight size={22} aria-hidden="true" />
        </a>

        {/* Contact form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          data-fade
          className="mt-10 max-w-[440px] mx-auto text-left"
        >
          <div className="grid grid-cols-2 gap-3 max-[480px]:grid-cols-1">
            <form.Field name="name">
              {(field) => (
                <input
                  type="text"
                  placeholder="Your name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-[18px] py-3 bg-white/[0.08] border border-[var(--line)] rounded-[10px] text-white font-[family-name:var(--font-body)] text-[14px] outline-none focus:border-[var(--lime)]/50 transition-colors"
                />
              )}
            </form.Field>
            <form.Field name="email">
              {(field) => (
                <input
                  type="email"
                  placeholder="Your email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-[18px] py-3 bg-white/[0.08] border border-[var(--line)] rounded-[10px] text-white font-[family-name:var(--font-body)] text-[14px] outline-none focus:border-[var(--lime)]/50 transition-colors"
                />
              )}
            </form.Field>
          </div>
          <form.Field name="message">
            {(field) => (
              <textarea
                placeholder="What's on your mind?"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={3}
                className="w-full mt-3 px-[18px] py-3 bg-white/[0.08] border border-[var(--line)] rounded-[10px] text-white font-[family-name:var(--font-body)] text-[14px] outline-none resize-none focus:border-[var(--lime)]/50 transition-colors"
              />
            )}
          </form.Field>
          <button
            type="submit"
            disabled={contact.isPending}
            className={`w-full mt-3 px-[18px] py-3 rounded-[10px] border-none flex items-center justify-center gap-2 font-bold transition-colors duration-300 ${contact.isSuccess ? "bg-[var(--olive)]" : "bg-[var(--lime)]"} text-[var(--ink)] cursor-pointer disabled:opacity-60`}
          >
            {contact.isPending ? "Sending…" : "Send message"}
            <Send size={16} aria-hidden="true" />
          </button>
        </form>
        {/* Foot */}
        <div className="flex justify-between items-center gap-[18px] flex-wrap mt-[90px] pt-[26px] border-t border-[var(--line)] text-[14px] text-[var(--fg3)] font-medium">
          <span>© {year} Hicham Kamani</span>
          <div className="flex gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                data-cursor="→"
                className="text-[var(--fg2)] transition-colors duration-300 hover:text-[var(--lime)]"
              >
                {s.name}
              </a>
            ))}
          </div>
          {/* <span>Local — {time}</span> */}
        </div>
      </div>
    </footer>
  );
}
