"use client";

import { BlurFade, Float } from "@/components/home/animations";
import { SHIKHA, UNIFIED_RADIUS } from "@/components/home/ui";
import { SAKHEE_COLORS } from "@/components/shared/sakhee-design";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Mail,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PhoneMockup } from "./phone-mockup";

// Product page props interface
export interface ProductPageProps {
  productName: string;
  productTagline: string;
  productDescription: string;
  productColor: string;
  appHref: string;
  icon: React.ReactNode;
  productType?: "generator" | "chat" | "expert"; // Type of product for phone mockup display
  interactiveDemo?: React.ReactNode; // Optional interactive demo component
  features: {
    title: string;
    description: string;
    icon: React.ElementType;
  }[];
  howItWorks: {
    step: number;
    title: string;
    description: string;
  }[];
  benefits: string[];
}

// Value Prop Card Component
function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
      className="bg-white p-6 text-center transition-all"
      style={{
        borderRadius: UNIFIED_RADIUS,
        border: `1px solid ${SHIKHA.sand}`,
      }}
    >
      <div
        className="w-14 h-14 mx-auto mb-4 flex items-center justify-center"
        style={{
          backgroundColor: `${color}15`,
          borderRadius: "50%",
          border: `2px solid ${color}`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color }} strokeWidth={1.5} />
      </div>
      <h4
        className="font-montserrat font-bold text-base mb-2"
        style={{ color: SAKHEE_COLORS.text }}
      >
        {title}
      </h4>
      <p
        className="text-sm font-poppins leading-relaxed"
        style={{ color: SAKHEE_COLORS.textMuted }}
      >
        {description}
      </p>
    </motion.div>
  );
}

// Step Card Component
function StepCard({
  step,
  title,
  description,
  color,
}: {
  step: number;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white px-6 py-5 transition-all relative text-center shadow-lg"
      style={{ borderRadius: UNIFIED_RADIUS }}
    >
      {/* Number badge */}
      <div
        className="absolute flex items-center justify-center rounded-full size-8 top-[-12px] left-[-12px] overflow-hidden"
        style={{ backgroundColor: "#050a30" }}
      >
        <span className="text-white font-bold text-sm">{step}</span>
      </div>
      <h3
        className="font-montserrat text-base font-bold mb-2"
        style={{ color }}
      >
        {title}
      </h3>
      <p
        className="font-poppins text-sm leading-relaxed"
        style={{ color: SAKHEE_COLORS.textMuted }}
      >
        {description}
      </p>
    </motion.div>
  );
}

// Waitlist Modal Component
function WaitlistModal({
  isOpen,
  onClose,
  productName,
}: {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    location: "",
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
          remarks: `Interested in ${productName}`,
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
        setFormData({ name: "", email: "", school: "", location: "" });
        onClose();
      }, 3000);
    } catch {
      setErrorMessage("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            className="relative w-full max-w-md bg-white shadow-2xl"
            style={{ borderRadius: "20px", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-2 w-full"
              style={{
                background: `linear-gradient(90deg, ${SAKHEE_COLORS.primary}, #F59E0B, ${SAKHEE_COLORS.good})`,
              }}
            />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" style={{ color: SAKHEE_COLORS.textMuted }} />
            </button>

            <div className="p-8">
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
                    We&apos;ll reach out when {productName} is ready.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="font-caveat text-3xl" style={{ color: SAKHEE_COLORS.text }}>
                      Join Waitlist
                    </h3>
                    <p
                      className="font-montserrat text-sm font-medium"
                      style={{ color: SAKHEE_COLORS.primary }}
                    >
                      Be among the first to try {productName}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name *"
                      className="w-full px-4 py-3 font-poppins rounded-lg"
                      style={{
                        backgroundColor: SAKHEE_COLORS.cream,
                        border: `1px solid ${SHIKHA.sand}`,
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address *"
                      className="w-full px-4 py-3 font-poppins rounded-lg"
                      style={{
                        backgroundColor: SAKHEE_COLORS.cream,
                        border: `1px solid ${SHIKHA.sand}`,
                      }}
                    />
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      required
                      placeholder="School Name *"
                      className="w-full px-4 py-3 font-poppins rounded-lg"
                      style={{
                        backgroundColor: SAKHEE_COLORS.cream,
                        border: `1px solid ${SHIKHA.sand}`,
                      }}
                    />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="Location *"
                      className="w-full px-4 py-3 font-poppins rounded-lg"
                      style={{
                        backgroundColor: SAKHEE_COLORS.cream,
                        border: `1px solid ${SHIKHA.sand}`,
                      }}
                    />

                    {errorMessage && (
                      <div className="p-3 text-sm text-center text-red-600 bg-red-50 rounded-lg">
                        {errorMessage}
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full py-3.5 font-montserrat font-bold text-white flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: isSubmitting ? "#9CA3AF" : SAKHEE_COLORS.primary,
                        borderRadius: "10px",
                      }}
                    >
                      {isSubmitting ? "Joining..." : (
                        <>
                          <Mail className="w-4 h-4" />
                          JOIN WAITLIST
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main Product Page Layout Component
export function SakheeProductPage({
  productName,
  productTagline,
  productDescription,
  productColor,
  appHref,
  icon,
  productType = "generator",
  interactiveDemo,
  features,
  howItWorks,
  benefits,
}: ProductPageProps) {
  const router = useRouter();
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openWaitlist = () => setIsWaitlistOpen(true);
  const closeWaitlist = () => setIsWaitlistOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden font-poppins"
      style={{ backgroundColor: SAKHEE_COLORS.cream }}
    >
      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={closeWaitlist}
        productName={productName}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: 8, top: 15, duration: 7 },
          { left: 85, top: 25, duration: 9 },
          { left: 15, top: 60, duration: 6 },
          { left: 75, top: 45, duration: 8 },
        ].map((particle, i) => (
          <Float key={i} duration={particle.duration} distance={15}>
            <div
              className="absolute w-2 h-2 rounded-full opacity-20"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                backgroundColor: productColor,
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
              {/* Logo - Routes to main Sakhee page */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center cursor-pointer -ml-5"
                onClick={() => router.push("/sakhee-ai")}
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
              <div className="hidden md:flex items-center gap-10">
                <button
                  onClick={() => router.push("/sakhee-ai")}
                  className="font-montserrat text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: SAKHEE_COLORS.textLight }}
                >
                  All Products
                </button>
                <button
                  onClick={() =>
                    document.getElementById("what")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-black font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                >
                  WHAT
                </button>
                <button
                  onClick={() =>
                    document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-black font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                >
                  HOW
                </button>
                <button
                  onClick={() =>
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-black font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                >
                  FEATURES
                </button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openWaitlist}
                  className="font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                  style={{ color: productColor }}
                >
                  JOIN WAITLIST
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t overflow-hidden"
                style={{ borderColor: SHIKHA.sand, backgroundColor: "rgba(251, 247, 242, 0.98)" }}
              >
                <div className="px-4 py-4 space-y-3">
                  {/* All Products link */}
                  <button
                    onClick={() => {
                      router.push("/sakhee-ai");
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-xs font-montserrat font-medium"
                    style={{ color: SAKHEE_COLORS.textLight }}
                  >
                    All Products
                  </button>
                  <hr style={{ borderColor: SHIKHA.sand }} />
                  <button
                    onClick={() => {
                      document.getElementById("what")?.scrollIntoView({ behavior: "smooth" });
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-sm font-montserrat font-medium"
                  >
                    WHAT
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("how")?.scrollIntoView({ behavior: "smooth" });
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-sm font-montserrat font-medium"
                  >
                    HOW
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-sm font-montserrat font-medium"
                  >
                    FEATURES
                  </button>
                  <button
                    onClick={() => {
                      openWaitlist();
                      closeMobileMenu();
                    }}
                    className="w-full py-3 text-sm font-montserrat font-bold text-white mt-2"
                    style={{ backgroundColor: productColor, borderRadius: UNIFIED_RADIUS }}
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
        {/* Hero Section - Matching sakhee-teacher-coach layout */}
        <section className="max-w-6xl mx-auto flex items-center justify-center py-[40px] px-6 md:px-0">
          <div className="w-full h-full flex flex-col md:flex-row gap-12 md:gap-0 items-center justify-between md:mx-20">
            {/* Left Side - Text - constrained width for proper gap */}
            <div className="flex flex-col items-center justify-center max-w-md">
              <div className="flex flex-col items-center justify-center mb-[10.5px] md:mb-[21px]">
                <BlurFade delay={0.2}>
                  <h1
                    className="font-caveat text-[46px] leading-[52px] md:text-[72px] md:leading-[86px]"
                    style={{ color: SAKHEE_COLORS.text }}
                  >
                    Hey Teachers!
                  </h1>
                </BlurFade>

                <BlurFade delay={0.3}>
                  <p
                    className="font-montserrat text-[18px] leading-snug md:text-[26px] md:leading-tight font-bold text-center md:text-left"
                    style={{ color: productColor }}
                  >
                    MEET YOUR NEW BEST FRIEND
                  </p>
                </BlurFade>
              </div>

              {/* Sakhee Logo - Larger */}
              <BlurFade delay={0.35}>
                <div className="flex flex-col items-center">
                  <motion.img
                    src="/Sakhee logo.svg"
                    alt="Sakhee"
                    className="size-24 sm:size-32 md:size-[177px] object-contain"
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Product name label - matching sakhee-teacher-coach pattern */}
                  <h2
                    className="font-montserrat text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide mt-1 mb-[21px] md:mb-[42px]"
                    style={{ color: SAKHEE_COLORS.purpleBlue }}
                  >
                    {productName.replace("Sakhee ", "")}
                  </h2>
                </div>
              </BlurFade>

              <BlurFade delay={0.5}>
                <p className="text-center text-black font-poppins text-xl font-normal leading-7 tracking-normal mb-3 md:mb-6 max-w-sm">
                  {productDescription}
                </p>
              </BlurFade>

              <BlurFade delay={0.6}>
                <div className="flex items-center justify-center">
                  {/* GET EARLY ACCESS - Single hero CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openWaitlist}
                    className="px-10 h-[56.8px] text-white font-montserrat text-lg font-bold leading-[22px] transition-all rounded-2xl"
                    style={{ backgroundColor: productColor }}
                  >
                    JOIN WAITLIST
                  </motion.button>
                </div>
              </BlurFade>
            </div>

            {/* Right Side - Phone Mockup with Demo */}
            {interactiveDemo && (
              <BlurFade delay={0.5}>
                <PhoneMockup
                  productName={productName.replace("Sakhee ", "")}
                  productType={productType}
                  productColor={productColor}
                >
                  {interactiveDemo}
                </PhoneMockup>
              </BlurFade>
            )}
          </div>
        </section>

        {/* What Section */}
        <section id="what" className="bg-white py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6 md:px-0 text-center">
            <BlurFade delay={0.2}>
              <h2
                className="font-caveat text-4xl md:text-6xl mb-4"
                style={{ color: SAKHEE_COLORS.text }}
              >
                What is {productName}?
              </h2>
              <p
                className="font-montserrat text-lg font-bold uppercase mb-8"
                style={{ color: productColor }}
              >
                YOUR AI-POWERED TEACHING ASSISTANT
              </p>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="space-y-6 max-w-3xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 text-left">
                    <CheckCircle
                      className="w-6 h-6 flex-shrink-0 mt-0.5"
                      style={{ color: SAKHEE_COLORS.good }}
                    />
                    <p className="font-poppins text-base" style={{ color: SAKHEE_COLORS.textMuted }}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how" style={{ backgroundColor: SAKHEE_COLORS.cream }} className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6 md:px-0">
            <BlurFade delay={0.2}>
              <div className="text-center mb-12">
                <h2
                  className="font-caveat text-4xl md:text-6xl mb-4"
                  style={{ color: SAKHEE_COLORS.text }}
                >
                  How It Works
                </h2>
                <p
                  className="font-montserrat text-lg font-bold uppercase"
                  style={{ color: productColor }}
                >
                  SIMPLE STEPS TO GET STARTED
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorks.map((step) => (
                  <StepCard
                    key={step.step}
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    color={productColor}
                  />
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6 md:px-0">
            <BlurFade delay={0.2}>
              <div className="text-center mb-12">
                <h2
                  className="font-caveat text-4xl md:text-6xl mb-4"
                  style={{ color: SAKHEE_COLORS.text }}
                >
                  Why Teachers Love It
                </h2>
                <p
                  className="font-montserrat text-lg font-bold uppercase"
                  style={{ color: productColor }}
                >
                  KEY FEATURES
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    color={productColor}
                  />
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: SAKHEE_COLORS.cream }} className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-0 text-center">
            <BlurFade delay={0.2}>
              <h2
                className="font-caveat text-4xl md:text-6xl mb-4"
                style={{ color: SAKHEE_COLORS.text }}
              >
                Ready to Get Started?
              </h2>
              <p
                className="font-poppins text-lg mb-8"
                style={{ color: SAKHEE_COLORS.textMuted }}
              >
                Join thousands of teachers using {productName} to save time and improve outcomes.
              </p>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openWaitlist}
                  className="px-12 py-4 text-white font-montserrat text-lg font-bold transition-all"
                  style={{ backgroundColor: productColor, borderRadius: UNIFIED_RADIUS }}
                >
                  JOIN WAITLIST
                </motion.button>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-8 border-t"
          style={{ backgroundColor: "white", borderColor: SHIKHA.sand }}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <img src="/shikha labs logo.png" alt="Shikha Labs" className="h-8 w-auto" />
                <span className="text-sm font-poppins" style={{ color: SAKHEE_COLORS.textLight }}>
                  Sakhee by Shikha Labs
                </span>
              </div>
              <div
                className="flex items-center gap-6 text-sm font-poppins"
                style={{ color: SAKHEE_COLORS.textLight }}
              >
                <a href="https://www.notion.so/rudraghav/Sakhee-Privacy-Policy-22b1dab7b879803187d0ed41750a83fe" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                  Privacy
                </a>
                <a href="https://www.notion.so/rudraghav/Sakhee-terms-of-service-1911dab7b87980e9bc14d19c1e86102a" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                  Terms
                </a>
                <a href="mailto:raghav.mulpuru@shikha.ai" className="hover:opacity-70">
                  Contact
                </a>
              </div>
            </div>
            <p className="text-center text-xs font-poppins mt-6" style={{ color: "#B0ACA5" }}>
              © 2026 Shikha Learning Labs Pvt Ltd. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
