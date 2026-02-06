"use client";

import { BlurFade, Float } from "@/components/home/animations";
import { SHIKHA, UNIFIED_RADIUS } from "@/components/home/ui";
import {
  ACTIVE_PRODUCTS,
  SAKHEE_COLORS,
  SAKHEE_PRODUCTS,
  SAKHEE_SECTION_STYLES
} from "@/components/shared/sakhee-design";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronDown,
  ClipboardCheck,
  Clock,
  FileText,
  Lightbulb,
  Mail,
  Menu,
  MessageSquare,
  Sparkles,
  Star,
  Target,
  Users,
  X
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Value propositions for "Why Sakhee" section
const VALUE_PROPS = [
  {
    icon: Clock,
    title: "Save 90% Time",
    description: "Create lesson plans in minutes, not hours. Focus on teaching, not paperwork.",
  },
  {
    icon: Users,
    title: "Teacher-First Design",
    description: "Built by teachers, for teachers. We understand Indian classrooms.",
  },
  {
    icon: Sparkles,
    title: "Curriculum Aligned",
    description: "Works with CBSE, ICSE, State Boards, and international curricula.",
  },
  {
    icon: Star,
    title: "Always Improving",
    description: "AI that learns and improves with every interaction.",
  },
];

// Product category groupings - 3-phase teaching workflow
const PRODUCT_PHASES = [
  {
    title: "RESEARCH",
    description: "Understand the subject deeply and choose the right ways to teach it",
    products: ["subject-expert", "pedagogy-expert"],
    color: "#3BB77E", // Shikha Teal
  },
  {
    title: "PLAN",
    description: "Translate understanding into learning goals, units, lessons, and assessments",
    products: ["learning-goals", "unit-plan", "lesson-plan", "assessment", "simulator"],
    color: "#29ABE2", // Shikha Blue
  },
  {
    title: "ASSESS",
    description: "Analyse what students actually learned and how our teaching must improve",
    products: ["assessment-checker", "dashboard", "instructional-coach"],
    color: "#F8A049", // Shikha Orange
  },
];

// Logo mapping for products (from /public/Sakhee logos/)
const PRODUCT_LOGOS: Record<string, string> = {
  "instructional-coach": "/Sakhee logos/Sakhee Instruction Coach.svg",
  "lesson-plan": "/Sakhee logos/Sakhee LP Gen.svg",
  "unit-plan": "/Sakhee logos/Sakhee Unit Plan Gen.svg",
  "learning-goals": "/Sakhee logos/Sakhee Learning Goals Gen.svg",
  "assessment": "/Sakhee logos/Sakhee Assessment creator.svg",
  "exam-generator": "/Sakhee logos/Sakhee Assessment creator.svg",
  "assessment-checker": "/Sakhee logos/Sakhee assessment checker.svg",
  "subject-expert": "/Sakhee logos/Sakhee Subject Expert.svg",
  "pedagogy-expert": "/Sakhee logos/Sakhee Pedagogy Expert.svg",
  "simulator": "/Sakhee logos/Sakhee classroom sim.svg",
  "dashboard": "/Sakhee logos/Sakhee SIS.svg",
};

// Product numbering in teaching flow order
const PRODUCT_ORDER = [
  "subject-expert", // 1
  "pedagogy-expert", // 2
  "learning-goals", // 3
  "unit-plan", // 4
  "lesson-plan", // 5
  "assessment", // 6
  "simulator", // 7
  "assessment-checker", // 8
  "dashboard", // 9
  "instructional-coach", // 10
];

// Icon mapping for products (fallback)
const PRODUCT_ICONS: Record<string, React.ElementType> = {
  "instructional-coach": Target,
  "lesson-plan": FileText,
  "unit-plan": BookOpen,
  "learning-goals": Target,
  "assessment": ClipboardCheck,
  "exam-generator": FileText,
  "assessment-checker": CheckCircle,
  "subject-expert": Brain,
  "pedagogy-expert": Lightbulb,
  "simulator": MessageSquare,
  "dashboard": BarChart3,
};

// Helper to determine grid span
function getGridSpan(totalItems: number, index: number) {
  if (totalItems === 2) return "md:col-span-3"; // 2 items = 50% each
  if (totalItems === 3) return "md:col-span-2"; // 3 items = 33% each
  if (totalItems === 5) {
    // 5 items: First 3 are 33%, Next 2 are 50%
    return index < 3 ? "md:col-span-2" : "md:col-span-3";
  }
  return "md:col-span-2"; // Default fallback
}

// Product Card Component - Vertical Layout (Variable Width)
// Product Card Component - Vertical Layout (Variable Width)
function ProductCard({
  product,
  phaseColor,
  className
}: {
  product: typeof SAKHEE_PRODUCTS[number];
  phaseColor: string;
  className?: string;
}) {
  const router = useRouter();
  const logoSrc = PRODUCT_LOGOS[product.id];

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.15)" }}
      onClick={() => router.push(product.href)}
      className={`rounded-2xl md:rounded-3xl overflow-hidden transition-all relative flex flex-col cursor-pointer h-full ${className}`}
      style={{
        backgroundColor: `${phaseColor}15`, // Slightly stronger tint for full card
        border: `1px solid ${phaseColor}30`,
      }}
    >
      {/* Subtle Explore Arrow - Top Right */}
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-40 group-hover:opacity-70 transition-opacity z-10">
        <ArrowRight className="w-4 h-4" style={{ color: phaseColor }} />
      </div>

      {/* Content Container - Flex Column with tight spacing */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-5 text-center">

        {/* Logo */}
        {logoSrc && (
          <img
            src={logoSrc}
            alt={product.shortName}
            className="h-14 w-auto object-contain mb-2" // Reduced height and margin-bottom
          />
        )}

        {/* Title - Tighter spacing */}
        <p
          className="font-montserrat font-bold text-sm text-center uppercase tracking-wide leading-tight px-2 mb-3" // Reduced margin-bottom
          style={{ color: phaseColor }}
        >
          {product.shortName}
        </p>

        {/* Description - Full visibility (No Truncation) */}
        <p className="text-xs text-gray-600 font-poppins leading-relaxed">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
}

// Value Prop Card Component - Sleek Mobile Horizontal Layout
function ValuePropCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.12)" }}
      className="bg-white p-4 md:p-10 transition-all flex flex-row md:flex-col items-center md:items-center md:justify-center h-full md:min-h-[250px] gap-4 md:gap-0"
      style={{
        borderRadius: "16px",
        border: `1px solid ${SHIKHA.sand}`,
      }}
    >
      <div
        className="w-12 h-12 md:w-16 md:h-16 md:mx-auto md:mb-6 flex items-center justify-center shrink-0"
        style={{
          backgroundColor: SAKHEE_COLORS.primarySoft,
          borderRadius: "50%",
          border: `2px solid ${SAKHEE_COLORS.primary}`,
        }}
      >
        <Icon
          className="w-5 h-5 md:w-7 md:h-7"
          style={{ color: SAKHEE_COLORS.primary }}
          strokeWidth={1.5}
        />
      </div>
      <div className="flex-1 md:text-center">
        <h4
          className="font-montserrat font-bold text-sm md:text-base mb-1 md:mb-2"
          style={{ color: SAKHEE_COLORS.text }}
        >
          {title}
        </h4>
        <p
          className="text-xs md:text-sm font-poppins leading-relaxed"
          style={{ color: SAKHEE_COLORS.textMuted }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Products Dropdown Component
function ProductsDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-[600px] bg-white shadow-xl z-50 p-6"
            style={{
              borderRadius: UNIFIED_RADIUS,
              border: `1px solid ${SHIKHA.sand}`,
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Active Products */}
              <div>
                <p
                  className="font-montserrat text-xs font-bold uppercase tracking-wide mb-3"
                  style={{ color: SAKHEE_COLORS.textLight }}
                >
                  Products
                </p>
                <div className="space-y-1">
                  {ACTIVE_PRODUCTS.map((product) => {
                    const Icon = PRODUCT_ICONS[product.id] || Sparkles;
                    return (
                      <button
                        key={product.id}
                        onClick={() => {
                          router.push(product.href);
                          onClose();
                        }}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${product.color}15` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: product.color }} />
                        </div>
                        <div>
                          <p className="font-montserrat font-medium text-sm" style={{ color: SAKHEE_COLORS.text }}>
                            {product.shortName}
                          </p>
                          <p className="font-poppins text-xs" style={{ color: SAKHEE_COLORS.textLight }}>
                            {product.tagline}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Featured - Instructional Coach */}
              <div>
                <div
                  className="p-4"
                  style={{
                    backgroundColor: SAKHEE_COLORS.primarySoft,
                    borderRadius: "12px",
                  }}
                >
                  <p
                    className="font-montserrat font-bold text-sm mb-1"
                    style={{ color: SAKHEE_COLORS.primary }}
                  >
                    Featured: Instructional Coach
                  </p>
                  <p className="font-poppins text-xs mb-3" style={{ color: SAKHEE_COLORS.textMuted }}>
                    Your personal instructional coach for teaching feedback.
                  </p>
                  <button
                    onClick={() => {
                      router.push("/sakhee-teacher-coach");
                      onClose();
                    }}
                    className="font-montserrat text-xs font-medium flex items-center gap-1"
                    style={{ color: SAKHEE_COLORS.primary }}
                  >
                    Learn More <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Waitlist Modal Component
function WaitlistModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    location: "",
    phone: "",
    designation: "",
    remarks: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist/sakhee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          schoolName: formData.school,
          location: formData.location,
          phoneNumber: formData.phone,
          designation: formData.designation,
          remarks: formData.remarks,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to join waitlist");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          school: "",
          location: "",
          phone: "",
          designation: "",
          remarks: "",
        });
        onClose();
      }, 3000);
    } catch {
      setErrorMessage("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white shadow-2xl mx-4 my-4 md:my-8 flex flex-col"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              maxHeight: "80vh"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative header gradient */}
            <div
              className="h-2 w-full flex-shrink-0"
              style={{
                background: `linear-gradient(90deg, ${SAKHEE_COLORS.primary}, #F59E0B, ${SAKHEE_COLORS.good})`,
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-gray-100 z-10"
              style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
            >
              <X className="w-5 h-5" style={{ color: SAKHEE_COLORS.textMuted }} />
            </button>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 min-h-0">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div
                    className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#DCFCE7" }}
                  >
                    <CheckCircle className="w-7 h-7" style={{ color: SAKHEE_COLORS.good }} />
                  </div>
                  <h3 className="font-caveat text-2xl mb-2" style={{ color: SAKHEE_COLORS.text }}>
                    You&apos;re on the list!
                  </h3>
                  <p className="font-poppins text-sm" style={{ color: SAKHEE_COLORS.textMuted }}>
                    We&apos;ll reach out when Sakhee is ready for you.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <img src="/Sakhee logo.svg" alt="Sakhee" className="w-10 h-10" />
                      <h3 className="font-caveat text-3xl" style={{ color: SAKHEE_COLORS.text }}>
                        Join Waitlist
                      </h3>
                    </div>
                    <p
                      className="font-montserrat text-sm font-medium"
                      style={{ color: SAKHEE_COLORS.primary }}
                    >
                      Be among the first to experience Sakhee
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide" style={{ color: SAKHEE_COLORS.textMuted }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Priya Sharma"
                        className="w-full px-4 py-3 font-poppins text-base transition-all focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: SAKHEE_COLORS.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COLORS.text,
                        }}
                      />
                    </div>

                    <div>
                      <label className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide" style={{ color: SAKHEE_COLORS.textMuted }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g., priya@school.edu.in"
                        className="w-full px-4 py-3 font-poppins text-base transition-all focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: SAKHEE_COLORS.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COLORS.text,
                        }}
                      />
                    </div>

                    <div>
                      <label className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide" style={{ color: SAKHEE_COLORS.textMuted }}>
                        School Name *
                      </label>
                      <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Delhi Public School"
                        className="w-full px-4 py-3 font-poppins text-base transition-all focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: SAKHEE_COLORS.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COLORS.text,
                        }}
                      />
                    </div>

                    <div>
                      <label className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide" style={{ color: SAKHEE_COLORS.textMuted }}>
                        Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Mumbai, Maharashtra"
                        className="w-full px-4 py-3 font-poppins text-base transition-all focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: SAKHEE_COLORS.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COLORS.text,
                        }}
                      />
                    </div>

                    <div>
                      <label className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide" style={{ color: SAKHEE_COLORS.textMuted }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g., +91 98765 43210"
                        className="w-full px-4 py-3 font-poppins text-base transition-all focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: SAKHEE_COLORS.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COLORS.text,
                        }}
                      />
                    </div>

                    <div>
                      <label className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide" style={{ color: SAKHEE_COLORS.textMuted }}>
                        Designation
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="e.g., Science Teacher, Principal"
                        className="w-full px-4 py-3 font-poppins text-base transition-all focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: SAKHEE_COLORS.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COLORS.text,
                        }}
                      />
                    </div>

                    <div>
                      <label className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide" style={{ color: SAKHEE_COLORS.textMuted }}>
                        Which apps interest you most?
                      </label>
                      <div
                        className="grid grid-cols-2 gap-2 p-3"
                        style={{
                          backgroundColor: SAKHEE_COLORS.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                        }}
                      >
                        {[
                          { id: "subject-expert", label: "Subject Expert" },
                          { id: "pedagogy-expert", label: "Pedagogy Expert" },
                          { id: "learning-goals", label: "Learning Goals" },
                          { id: "unit-plan", label: "Unit Planner" },
                          { id: "lesson-plan", label: "Lesson Planner" },
                          { id: "assessment", label: "Assessment Creator" },
                          { id: "assessment-checker", label: "Assessment Checker" },
                          { id: "instructional-coach", label: "Instructional Coach" },
                        ].map((app) => (
                          <label
                            key={app.id}
                            className="flex items-center gap-2 cursor-pointer text-sm font-poppins hover:bg-white/50 p-1.5 rounded-lg transition-colors"
                            style={{ color: SAKHEE_COLORS.text }}
                          >
                            <input
                              type="checkbox"
                              name={`app_${app.id}`}
                              className="w-4 h-4 rounded border-2 border-gray-300 text-[#c56665] focus:ring-[#c56665] focus:ring-offset-0 cursor-pointer"
                              style={{ accentColor: SAKHEE_COLORS.primary }}
                            />
                            <span className="text-xs">{app.label}</span>
                          </label>
                        ))}
                        <label
                          className="flex items-center gap-2 cursor-pointer text-sm font-poppins hover:bg-white/50 p-1.5 rounded-lg transition-colors col-span-2 font-bold"
                          style={{ color: SAKHEE_COLORS.primary }}
                        >
                          <input
                            type="checkbox"
                            name="app_all"
                            className="w-4 h-4 rounded border-2 border-gray-300 text-[#c56665] focus:ring-[#c56665] focus:ring-offset-0 cursor-pointer"
                            style={{ accentColor: SAKHEE_COLORS.primary }}
                          />
                          <span className="text-xs">🎉 ALL OF THEM!</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide" style={{ color: SAKHEE_COLORS.textMuted }}>
                        Any remarks or questions?
                      </label>
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Tell us anything else you'd like us to know..."
                        className="w-full px-4 py-3 font-poppins text-base transition-all focus:outline-none focus:ring-2 resize-none"
                        style={{
                          backgroundColor: SAKHEE_COLORS.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COLORS.text,
                        }}
                      />
                    </div>

                    {errorMessage && (
                      <div
                        className="p-3 text-sm text-center font-poppins"
                        style={{
                          backgroundColor: "#FEF2F2",
                          color: "#DC2626",
                          borderRadius: "10px",
                          border: "1px solid #FECACA",
                        }}
                      >
                        {errorMessage}
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full py-3.5 font-montserrat text-base font-bold text-white transition-all flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: isSubmitting ? SAKHEE_COLORS.textMuted : SAKHEE_COLORS.primary,
                        borderRadius: "10px",
                        boxShadow: isSubmitting ? "none" : "0 4px 14px -4px rgba(197, 102, 101, 0.5)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Joining...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>JOIN WAITLIST</span>
                        </>
                      )}
                    </motion.button>
                  </form>

                  <p
                    className="mt-4 text-center font-poppins text-xs"
                    style={{ color: SAKHEE_COLORS.textLight }}
                  >
                    Your information is safe with us. No spam, ever.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SakheeAILandingPage() {
  const router = useRouter();
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const openWaitlist = () => setIsWaitlistOpen(true);
  const closeWaitlist = () => setIsWaitlistOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden font-poppins"
      style={{ backgroundColor: SAKHEE_COLORS.cream }}
    >
      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={closeWaitlist} />

      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: 8, top: 15, duration: 7 },
          { left: 85, top: 25, duration: 9 },
          { left: 15, top: 60, duration: 6 },
          { left: 75, top: 45, duration: 8 },
          { left: 45, top: 80, duration: 7.5 },
        ].map((particle, i) => (
          <Float key={i} duration={particle.duration} distance={15}>
            <div
              className="absolute w-2 h-2 rounded-full opacity-20"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                backgroundColor: SAKHEE_COLORS.primary,
              }}
            />
          </Float>
        ))}
      </div>

      {/* Navigation */}
      <BlurFade delay={0.1} direction="down">
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-0">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center cursor-pointer -ml-5"
                onClick={() => router.push("/")}
              >
                <Image
                  src="/shikha-labs-logo.svg"
                  alt="Shikha Labs"
                  className="h-20 w-[120px] object-cover"
                  width={120}
                  height={80}
                />
              </motion.div>

              {/* Nav Links - Desktop */}
              <div className="hidden md:flex items-center gap-8">
                {/* Products Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                    className="flex items-center gap-1 text-black font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                  >
                    PRODUCTS
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isProductsDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <ProductsDropdown
                    isOpen={isProductsDropdownOpen}
                    onClose={() => setIsProductsDropdownOpen(false)}
                  />
                </div>

                <button
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-black font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                >
                  FEATURES
                </button>

                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-black font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                >
                  ABOUT
                </button>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openWaitlist}
                  className="font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                  style={{ color: SAKHEE_COLORS.primary }}
                >
                  JOIN WAITLIST
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: SAKHEE_COLORS.text }}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t overflow-hidden"
                style={{
                  borderColor: SHIKHA.sand,
                  backgroundColor: "rgba(251, 247, 242, 0.98)",
                }}
              >
                <div className="px-4 py-4 space-y-3">
                  <p className="text-xs font-montserrat font-bold uppercase tracking-wide mb-2" style={{ color: SAKHEE_COLORS.textLight }}>
                    Products
                  </p>
                  {ACTIVE_PRODUCTS.slice(0, 5).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        router.push(product.href);
                        closeMobileMenu();
                      }}
                      className="block w-full text-left py-2 text-sm font-poppins"
                      style={{ color: SAKHEE_COLORS.text }}
                    >
                      {product.shortName}
                    </button>
                  ))}

                  <hr style={{ borderColor: SHIKHA.sand }} />

                  <button
                    onClick={() => {
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-sm font-montserrat font-medium"
                    style={{ color: SAKHEE_COLORS.text }}
                  >
                    FEATURES
                  </button>

                  <button
                    onClick={() => {
                      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-sm font-montserrat font-medium"
                    style={{ color: SAKHEE_COLORS.text }}
                  >
                    ABOUT
                  </button>

                  <button
                    onClick={() => {
                      openWaitlist();
                      closeMobileMenu();
                    }}
                    className="w-full py-3 text-sm font-montserrat font-bold text-white mt-2"
                    style={{
                      backgroundColor: SAKHEE_COLORS.primary,
                      borderRadius: UNIFIED_RADIUS,
                    }}
                  >
                    JOIN WAITLIST
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </BlurFade>

      {/* Main Content */}
      <div className="relative z-10 mt-20">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto flex items-center justify-center py-16 md:py-24 px-6 md:px-0">
          <div className="w-full flex flex-col items-center text-center">
            <BlurFade delay={0.2}>
              <h1
                className="font-caveat text-[52px] leading-[58px] md:text-[80px] md:leading-[90px] mb-4"
                style={{ color: SAKHEE_COLORS.text }}
              >
                Hey Educators!
              </h1>
            </BlurFade>

            <BlurFade delay={0.3}>
              <p
                className="font-montserrat text-lg md:text-2xl font-bold uppercase tracking-wide mb-6"
                style={{ color: SAKHEE_COLORS.primary }}
              >
                MEET YOUR NEW BEST FRIEND
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="flex items-center justify-center mb-8">
                <motion.img
                  src="/Sakhee logo.svg"
                  alt="Sakhee"
                  className="size-28 md:size-40 object-contain"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </BlurFade>

            <BlurFade delay={0.5}>
              <p
                className="font-poppins text-lg md:text-xl leading-relaxed max-w-2xl mb-4"
                style={{ color: SAKHEE_COLORS.textMuted }}
              >
                Sakhee is one AI platform that helps you plan, research,
                create, assess and improve your teaching.
              </p>
              <p
                className="font-poppins text-lg md:text-xl leading-relaxed max-w-2xl mb-8"
                style={{ color: SAKHEE_COLORS.textMuted }}
              >
                Designed <span className="font-bold">FOR</span> teachers <span className="font-bold">BY</span> teachers.
              </p>
            </BlurFade>

            <BlurFade delay={0.6}>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={openWaitlist}
                className="px-10 py-4 text-white font-montserrat text-lg font-bold transition-all"
                style={{
                  backgroundColor: SAKHEE_COLORS.primary,
                  borderRadius: UNIFIED_RADIUS,
                }}
              >
                JOIN WAITLIST
              </motion.button>
            </BlurFade>
          </div>
        </section>
        {/* Combined Story + Value Props Section */}
        <section id="features" className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">

            {/* Story Content Wrapper - Constrained Width */}
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <BlurFade delay={0.1}>
                  <h2 className={`${SAKHEE_SECTION_STYLES.headingSection} mb-4`} style={{ color: SAKHEE_COLORS.text }}>
                    Teaching is Challenging. Let Sakhee help.
                  </h2>
                </BlurFade>
                <BlurFade delay={0.2}>
                  <p className={`${SAKHEE_SECTION_STYLES.subheading}`} style={{ color: SAKHEE_COLORS.primary }}>
                    DESIGNED BY TEACHERS FOR TEACHERS
                  </p>
                </BlurFade>
              </div>

              {/* Story Content */}
              <div className="space-y-8 mb-16">
                {/* Quote 1 - Simple & Subtle */}
                <BlurFade delay={0.3}>
                  <div className="flex items-start gap-4">
                    <div className="w-1 bg-gradient-to-b from-orange-400 to-orange-200 rounded-full shrink-0 self-stretch" />
                    <p className="font-poppins italic text-lg md:text-xl text-gray-800 leading-relaxed">
                      "When we designed Sakhee, we began with the teacher, not the technology."
                    </p>
                  </div>
                </BlurFade>

                <BlurFade delay={0.35}>
                  <p className="font-poppins text-base md:text-lg text-gray-600 leading-relaxed pl-5">
                    We mapped the real journey a teacher walks every day: understanding the subject, choosing the right pedagogy, defining learning goals, planning units and lessons, teaching in a live classroom, assessing students and continuously improving practice.
                  </p>
                </BlurFade>

                {/* Quote 2 - Simple & Subtle */}
                <BlurFade delay={0.4}>
                  <div className="flex items-start gap-4 justify-end">
                    <p className="font-poppins italic text-lg md:text-xl text-gray-800 leading-relaxed text-right">
                      "Teachers and AI are naturally best friends, not competitors."
                    </p>
                    <div className="w-1 bg-gradient-to-b from-blue-400 to-blue-200 rounded-full shrink-0 self-stretch" />
                  </div>
                </BlurFade>

                <BlurFade delay={0.45}>
                  <p className="font-poppins text-base md:text-lg text-gray-600 leading-relaxed pr-5 text-right">
                    Sakhee's apps are built by teachers who have lived the same challenges: overloaded syllabi, limited planning time, and the pressure to finish portions. Each app acts like a thoughtful colleague sitting beside you.
                  </p>
                </BlurFade>
              </div>
            </div>

            {/* Value Props Grid - 1 per row on mobile, sleek horizontal layout */}
            <BlurFade delay={0.5}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
                {VALUE_PROPS.map((prop, index) => (
                  <ValuePropCard
                    key={index}
                    icon={prop.icon}
                    title={prop.title}
                    description={prop.description}
                  />
                ))}
              </div>
            </BlurFade>

            {/* Stats Row - Sleek horizontal on mobile */}
            <BlurFade delay={0.6}>
              <div
                className="p-4 md:p-8 flex flex-row md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible"
                style={{
                  background: `linear-gradient(135deg, ${SAKHEE_COLORS.primarySoft}, ${SAKHEE_COLORS.cream})`,
                  borderRadius: "16px",
                }}
              >
                <div className="text-center flex-1 min-w-[90px]">
                  <div className="font-montserrat text-2xl md:text-5xl font-bold" style={{ color: SAKHEE_COLORS.primary }}>
                    90%
                  </div>
                  <p className="font-poppins text-[10px] md:text-sm mt-1 md:mt-2 leading-tight" style={{ color: SAKHEE_COLORS.textMuted }}>
                    Time saved on planning
                  </p>
                </div>
                <div className="text-center flex-1 min-w-[90px] border-l border-r md:border-0" style={{ borderColor: `${SAKHEE_COLORS.primary}20` }}>
                  <div className="font-montserrat text-2xl md:text-5xl font-bold" style={{ color: SAKHEE_COLORS.primary }}>
                    5 min
                  </div>
                  <p className="font-poppins text-[10px] md:text-sm mt-1 md:mt-2 leading-tight" style={{ color: SAKHEE_COLORS.textMuted }}>
                    Avg lesson plan
                  </p>
                </div>
                <div className="text-center flex-1 min-w-[90px]">
                  <div className="font-montserrat text-2xl md:text-5xl font-bold" style={{ color: SAKHEE_COLORS.primary }}>
                    100%
                  </div>
                  <p className="font-poppins text-[10px] md:text-sm mt-1 md:mt-2 leading-tight" style={{ color: SAKHEE_COLORS.textMuted }}>
                    Curriculum aligned
                  </p>
                </div>
              </div>
            </BlurFade>

          </div>
        </section>

        {/* Product Flow Section - Separate */}
        <section id="products" className="py-12 md:py-16" style={{ backgroundColor: "#F9FAFB" }}>
          <div className="max-w-4xl mx-auto px-6 md:px-0">
            {/* Section Header */}
            <div className="text-center mb-16">
              <BlurFade delay={0.2}>
                <h2 className={`${SAKHEE_SECTION_STYLES.headingSection} mb-4`} style={{ color: SAKHEE_COLORS.text }}>
                  Elevate your Teaching at Every Step
                </h2>
                <p className={`${SAKHEE_SECTION_STYLES.subheading}`} style={{ color: SAKHEE_COLORS.primary }}>
                  YOUR AI-POWERED TEACHING TOOLKIT
                </p>
              </BlurFade>
            </div>

            {/* 3-Phase Product Grid */}
            {PRODUCT_PHASES.map((phase, phaseIndex) => (
              <BlurFade key={phase.title} delay={0.3 + phaseIndex * 0.1}>
                <div className={`mb-16 last:mb-0 ${phaseIndex > 0 ? 'pt-8' : ''}`}>
                  {/* Phase Header */}
                  <div className="mb-8 border-l-4 pl-6" style={{ borderColor: phase.color }}>
                    <h3
                      className="font-montserrat text-3xl md:text-4xl font-black uppercase tracking-tight mb-2"
                      style={{ color: SAKHEE_COLORS.text }}
                    >
                      {phase.title}
                    </h3>
                    <p className="font-poppins italic text-base md:text-lg text-gray-600">
                      {phase.description}
                    </p>
                  </div>

                  {/* Phase Products Grid */}
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-6">
                    {phase.products.map((productId, index) => {
                      const product = SAKHEE_PRODUCTS.find(p => p.id === productId);
                      if (!product) return null;

                      const spanClass = getGridSpan(phase.products.length, index);

                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          phaseColor={phase.color!}
                          className={spanClass}
                        />
                      );
                    })}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* Section: Who Are We? */}
        <section id="about" className="bg-white">
          <div className="max-w-6xl mx-auto flex flex-col space-y-[19px] md:space-y-[38px] justify-center items-center text-center px-6 md:px-0 py-[40px]">
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <BlurFade delay={0.2}>
                <h2
                  className="font-caveat text-[46px] leading-[52px] md:text-[72px] md:leading-[86px] text-black"
                  style={{ color: SAKHEE_COLORS.text }}
                >
                  Who Are We?
                </h2>
              </BlurFade>
              <BlurFade delay={0.3}>
                <p
                  className="font-montserrat font-bold text-[18px] leading-snug md:text-[26px] md:leading-tight md:tracking-[0.079px] uppercase"
                  style={{ color: SAKHEE_COLORS.primary }}
                >
                  AN INTRODUCTION TO SHIKHA LABS
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.4}>
              <p
                className="font-poppins text-base leading-relaxed md:text-lg font-normal md:leading-[26px] md:tracking-[-0.122px]"
                style={{
                  color: SAKHEE_COLORS.textMuted,
                }}
              >
                Shikha Labs is an AI based educational technology company that
                is uniquely founded within the{" "}
                <br className="hidden md:block" />ecosystem of an educational
                research organization called the Shikha Institute and its
                partner high <br className="hidden md:block" />performance K-12
                experimental school called the Shikha Academy in Mumbai, India.
              </p>

              {/* Three Logos */}
              <div className="flex flex-row md:flex-row items-center justify-center my-5 md:my-0 gap-3 md:gap-10">
                {/* Shikha Institute */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex items-center justify-center cursor-pointer"
                >
                  <img
                    src="/SIE.png"
                    alt="Shikha Institute of Education"
                    className="size-[85px] md:size-[189px] object-contain"
                  />
                </motion.div>

                {/* Shikha Academy */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex items-center justify-center cursor-pointer pl-0 md:pl-2.5"
                >
                  <img
                    src="/shikha-academy.png"
                    alt="Shikha Academy"
                    className="size-[100px] md:w-[239px] md:h-[237px] object-contain"
                  />
                </motion.div>

                {/* Shikha Labs */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex items-center justify-center cursor-pointer"
                >
                  <img
                    src="/SLL.png"
                    alt="Shikha Labs"
                    className="size-[80px] md:size-[171px] object-contain"
                  />
                </motion.div>
              </div>

              {/* Bottom text */}
              <p
                className="font-poppins text-base leading-relaxed md:text-lg font-normal md:leading-[26px] md:tracking-[-0.122px]"
                style={{
                  color: SAKHEE_COLORS.textMuted,
                }}
              >
                The Shikha Institute works to systemically elevate schools
                through research and development{" "}
                <br className="hidden md:block" />covering all aspects of
                instructional design. Shikha Academy follows the international
                Cambridge <br className="hidden md:block" />board and
                exclusively serves low income students in Mumbai. The three
                organizations are co-located <br className="hidden md:block" />{" "}
                and work deeply together to create a constant, positive spiral
                of educational innovation.
              </p>
            </BlurFade>
          </div>
        </section>

        {/* Section: I'm In! - CTA */}
        <section style={{ backgroundColor: SAKHEE_COLORS.cream }}>
          <div className="max-w-6xl mx-auto flex flex-col justify-center items-center text-center px-6 md:px-0 py-[40px]">
            <div className="flex flex-col justify-center items-center gap-[5px] mb-[18px] md:mb-[36px]">
              <BlurFade delay={0.2}>
                {/* Heading: BLACK */}
                <h2
                  className="font-caveat text-[46px] leading-[52px] md:text-[72px] md:leading-[86px] text-black"
                  style={{ color: SAKHEE_COLORS.text }}
                >
                  I'm In!
                </h2>
              </BlurFade>

              <BlurFade delay={0.3}>
                <p
                  className="font-montserrat font-bold text-[18px] leading-snug md:text-[26px] md:leading-tight md:tracking-[0.21px] uppercase"
                  style={{ color: SAKHEE_COLORS.primary }}
                >
                  NEXT STEPS
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.4}>
              <div className="space-y-[20.5px] mb-[34px] md:mb-[68px]">
                <p
                  className="font-poppins text-base leading-relaxed md:text-lg font-normal md:leading-[26px] md:tracking-[-0.122px]"
                  style={{
                    color: SAKHEE_COLORS.textMuted,
                  }}
                >
                  Sakhee is currently in beta testing with multiple schools and
                  organizations across India.
                </p>
                <p
                  className="font-poppins text-base leading-relaxed md:text-lg font-normal md:leading-[26px] md:tracking-[-0.122px]"
                  style={{
                    color: SAKHEE_COLORS.textMuted,
                  }}
                >
                  As we prepare for a wider launch, we're inviting a small group
                  of teachers to be among the first to try{" "}
                  <br className="hidden md:block" />Sakhee when the app becomes
                  available. If you're curious, reflective, and serious about
                  improving <br className="hidden md:block" />your teaching—and
                  you want AI tools that understand your classroom—fill out the
                  form below.
                </p>
                <p
                  className="font-poppins text-base leading-relaxed md:text-lg font-normal md:leading-[26px] md:tracking-[-0.122px]"
                  style={{
                    color: SAKHEE_COLORS.textMuted,
                  }}
                >
                  This is your chance to shape the future of AI-assisted teaching,
                  and grow alongside Sakhee from the start.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.5}>
              <div className="flex flex-col items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openWaitlist}
                  className={`px-10 h-[56.8px] text-white font-montserrat text-lg font-bold leading-[22px] transition-all rounded-2xl`}
                  style={{ backgroundColor: SAKHEE_COLORS.primary }}
                >
                  JOIN WAITLIST
                </motion.button>

                {/* Privacy info pill */}
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: `1px solid ${SAKHEE_COLORS.primary}20`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={SAKHEE_COLORS.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span
                    className="text-[11px] sm:text-xs font-poppins font-medium"
                    style={{ color: SAKHEE_COLORS.textMuted }}
                  >
                    Your data is private to your school · Never shared without consent
                  </span>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-8 border-t"
          style={{
            backgroundColor: SAKHEE_COLORS.cream,
            borderColor: SHIKHA.sand,
          }}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <img src="/shikha labs logo.png" alt="Shikha Labs" className="h-8 w-auto" />
                <span className="text-sm font-poppins" style={{ color: SAKHEE_COLORS.textLight }}>
                  Sakhee by Shikha Labs
                </span>
              </div>

              <div className="flex items-center gap-6 text-sm font-poppins" style={{ color: SAKHEE_COLORS.textLight }}>
                <a
                  href="https://www.notion.so/rudraghav/Sakhee-Privacy-Policy-22b1dab7b879803187d0ed41750a83fe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  Privacy
                </a>
                <a
                  href="https://www.notion.so/rudraghav/Sakhee-terms-of-service-1911dab7b87980e9bc14d19c1e86102a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  Terms
                </a>
                <a
                  href="mailto:raghav.mulpuru@shikha.ai"
                  className="hover:opacity-70 transition-opacity"
                >
                  Contact
                </a>
              </div>
            </div>

            <p
              className="text-center text-xs font-poppins mt-6"
              style={{ color: "#B0ACA5" }}
            >
              © 2026 Shikha Learning Labs Pvt Ltd. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
