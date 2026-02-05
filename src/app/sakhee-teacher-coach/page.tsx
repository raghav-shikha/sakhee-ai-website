"use client";

import { BlurFade, Float } from "@/components/home/animations";
import { SHIKHA, UNIFIED_RADIUS } from "@/components/home/ui";
import { SAKHEE_COLORS } from "@/components/shared/sakhee-design";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  Lightbulb,
  Mail,
  Menu,
  MessageSquare,
  Mic,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Upload,
  Users,
  X
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

// Sakhee Teacher Coach brand colors - using shared constants for consistency
const SAKHEE_COACH = SAKHEE_COLORS;

// Step data for "How Sakhee Works" section - 3 line descriptions per Canva/Figma
const STEPS = [
  {
    number: 1,
    title: "RECORD",
    description:
      "While teaching your class, place your phone in your pocket or use a lanyard to record your voice.",
    icon: Mic,
  },
  {
    number: 2,
    title: "UPLOAD",
    description:
      "Describe your class to Sakhee Instructional Coach and upload your recording and a lesson plan if you have one.",
    icon: Upload,
  },
  {
    number: 3,
    title: "ANALYSE",
    description:
      "Sakhee Instructional Coach will analyse your recording using our evidence-based, high quality teaching framework.",
    icon: BarChart3,
  },
  {
    number: 4,
    title: "GET FEEDBACK",
    description:
      "Sakhee Instructional Coach will highlight instructional strengths and areas for improvement with evidence from your own class.",
    icon: Lightbulb,
  },
  {
    number: 5,
    title: "DISCUSS",
    description:
      "Chat with Sakhee Instructional Coach to understand your feedback, clarify doubts, and delve deeper into each recommendation.",
    icon: MessageSquare,
  },
  {
    number: 6,
    title: "CREATE",
    description:
      "Sakhee Instructional Coach will guide you to co-create specific instructional goals for your next class.",
    icon: Target,
  },
  {
    number: 7,
    title: "TRACK",
    description:
      "Continue this coaching cycle across multiple classes to track your growth over time.",
    icon: TrendingUp,
  },
  {
    number: 8,
    title: "MASTER",
    description:
      "Over time, practice your instruction to form lifelong high performance teaching habits.",
    icon: Award,
  },
];

// Value propositions for "Every Teacher" section - consistent 2-line descriptions
const VALUE_PROPS = [
  {
    icon: Clock,
    title: "Available 24/7",
    description: "Get coaching support whenever you need it, day or night.",
  },
  {
    icon: Users,
    title: "Personalized",
    description:
      "Tailored to your students, subject, and unique classroom context.",
  },
  {
    icon: Sparkles,
    title: "Evidence-Based",
    description:
      "Feedback grounded in what you actually said and did in class.",
  },
  {
    icon: Star,
    title: "Non-Judgmental",
    description:
      "A safe space to reflect and grow without criticism or pressure.",
  },
];

// Modern World-Class Arrow Component - elegant flowing connectors
function StepArrow({ direction = "right", id }: { direction?: "right" | "left" | "down"; id?: string }) {
  // Use provided id or generate a deterministic one based on direction
  const gradientId = id || `arrow-gradient-${direction}`;

  if (direction === "down") {
    return (
      <div className="flex justify-center items-center h-8 md:h-10 my-1">
        <svg
          width="28"
          height="32"
          viewBox="0 0 28 32"
          fill="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="14" y1="0" x2="14" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.2" />
              <stop offset="50%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.6" />
              <stop offset="100%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Elegant curved flowing line */}
          <path
            d="M14 2C14 2 14 12 14 22"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Modern chevron arrowhead */}
          <path
            d="M8 22L14 28L20 22"
            stroke={SAKHEE_COACH.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.8"
          />
          {/* Subtle glow dot at tip */}
          <circle cx="14" cy="28" r="2" fill={SAKHEE_COACH.primary} opacity="0.4" />
        </svg>
      </div>
    );
  }

  if (direction === "left") {
    return (
      <div className="flex items-center justify-center w-8 md:w-12 flex-shrink-0">
        <svg
          width="40"
          height="20"
          viewBox="0 0 40 20"
          fill="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="40" y1="10" x2="0" y2="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.2" />
              <stop offset="50%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.5" />
              <stop offset="100%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          {/* Elegant flowing line with slight curve */}
          <path
            d="M38 10C30 10 20 10 10 10"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Modern tapered chevron arrowhead */}
          <path
            d="M12 5L5 10L12 15"
            stroke={SAKHEE_COACH.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
          />
          {/* Subtle accent dot */}
          <circle cx="5" cy="10" r="1.5" fill={SAKHEE_COACH.primary} opacity="0.5" />
        </svg>
      </div>
    );
  }

  // Right arrow (default)
  return (
    <div className="flex items-center justify-center w-8 md:w-12 flex-shrink-0">
      <svg
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="10" x2="40" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.2" />
            <stop offset="50%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.5" />
            <stop offset="100%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {/* Elegant flowing line with slight curve */}
        <path
          d="M2 10C10 10 20 10 30 10"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Modern tapered chevron arrowhead */}
        <path
          d="M28 5L35 10L28 15"
          stroke={SAKHEE_COACH.primary}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />
        {/* Subtle accent dot */}
        <circle cx="35" cy="10" r="1.5" fill={SAKHEE_COACH.primary} opacity="0.5" />
      </svg>
    </div>
  );
}

// Step Card Component - matching Figma design with top-left edge number badge
function StepCard({ step }: { step: (typeof STEPS)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white px-4 py-4 md:px-[34px] md:py-5 transition-all duration-300 relative text-center shadow-lg cursor-pointer w-[140px] h-[130px] md:w-[220px] md:h-[150px] flex flex-col justify-center items-center gap-2"
      style={{ borderRadius: "12px" }}
    >
      {/* Navy number circle with diagonal grid pattern - matching Canva design */}
      <div
        className="absolute flex items-center justify-center rounded-full size-[28px] md:size-[32px] top-[-10px] left-[-10px] md:top-[-12px] md:left-[-12px] overflow-hidden"
        style={{
          backgroundColor: '#050a30',
        }}
      >
        {/* Diagonal grid pattern inside circle */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.15) 49%, rgba(255,255,255,0.15) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.15) 49%, rgba(255,255,255,0.15) 51%, transparent 52%)
            `,
            backgroundSize: '12px 12px',
          }}
        />
        {/* Number with bold styling - centered */}
        <span
          className="absolute inset-0 z-10 text-white font-bold flex items-center justify-center text-sm md:text-base"
        >
          {step.number}
        </span>
      </div>
      {/* Title: Centered */}
      <h3
        className="font-montserrat text-sm md:text-base font-bold text-center"
        style={{ color: SAKHEE_COACH.primary }}
      >
        {step.title}
      </h3>
      {/* Description */}
      <p
        className="font-poppins text-[10px] md:text-xs font-normal tracking-[-0.035px] text-center leading-tight md:max-w-[170px]"
        style={{ color: SAKHEE_COACH.textMuted }}
      >
        {step.description}
      </p>
    </motion.div>
  );
}

// Modern Curved Turn Arrow for row transitions
function TurnArrow({ position, id }: { position: "right" | "left"; id?: string }) {
  const gradientId = id || `turn-gradient-${position}`;

  // Simple down arrow positioned on the right or left side - no curve needed
  return (
    <div className={`flex ${position === "right" ? "justify-end pr-[110px] lg:pr-[105px]" : "justify-start pl-[110px] lg:pl-[105px]"} my-2`}>
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
        <defs>
          <linearGradient id={gradientId} x1="14" y1="0" x2="14" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={SAKHEE_COACH.primary} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Simple straight down line */}
        <path
          d="M14 2V26"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Modern arrowhead pointing down */}
        <path
          d="M8 22L14 32L20 22"
          stroke={SAKHEE_COACH.primary}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />
        {/* Accent dot */}
        <circle cx="14" cy="32" r="2" fill={SAKHEE_COACH.primary} opacity="0.5" />
      </svg>
    </div>
  );
}

// Steps Grid Component with modern arrow connectors
function StepsGridWithArrows() {
  return (
    <div className="w-full">
      {/* Desktop/Tablet Layout (md and above): 4 columns with horizontal arrows */}
      <div className="hidden md:block">
        {/* Row 1: Steps 1-4 (left to right) */}
        <div className="flex items-center justify-center gap-0 mb-2">
          <StepCard step={STEPS[0]} />
          <StepArrow direction="right" id="arrow-desktop-r1" />
          <StepCard step={STEPS[1]} />
          <StepArrow direction="right" id="arrow-desktop-r2" />
          <StepCard step={STEPS[2]} />
          <StepArrow direction="right" id="arrow-desktop-r3" />
          <StepCard step={STEPS[3]} />
        </div>

        {/* Elegant curved turn arrow from row 1 to row 2 */}
        <TurnArrow position="right" id="turn-desktop" />

        {/* Row 2: Steps 5-8 (right to left flow) - Cards in correct order, arrows point left */}
        <div className="flex items-center justify-center gap-0">
          <StepCard step={STEPS[7]} />
          <StepArrow direction="left" id="arrow-desktop-l1" />
          <StepCard step={STEPS[6]} />
          <StepArrow direction="left" id="arrow-desktop-l2" />
          <StepCard step={STEPS[5]} />
          <StepArrow direction="left" id="arrow-desktop-l3" />
          <StepCard step={STEPS[4]} />
        </div>
      </div>

      {/* Mobile Layout: 2 columns with elegant flow */}
      <div className="md:hidden px-4">
        {/* Row 1: Steps 1-2 (left to right) */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <StepCard step={STEPS[0]} />
          <StepArrow direction="right" id="arrow-mobile-r1" />
          <StepCard step={STEPS[1]} />
        </div>

        {/* Down arrow positioned right - aligned with step 2 */}
        <div className="flex justify-center pr-0 mb-2">
          <div className="w-[140px]" /> {/* Spacer for step 1 */}
          <div className="w-8" /> {/* Spacer for arrow */}
          <div className="w-[140px] flex justify-center">
            <StepArrow direction="down" id="arrow-mobile-d1" />
          </div>
        </div>

        {/* Row 2: Steps 3-4 (right to left flow) */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <StepCard step={STEPS[3]} />
          <StepArrow direction="left" id="arrow-mobile-l1" />
          <StepCard step={STEPS[2]} />
        </div>

        {/* Down arrow positioned left - aligned with step 4 */}
        <div className="flex justify-center pl-0 mb-2">
          <div className="w-[140px] flex justify-center">
            <StepArrow direction="down" id="arrow-mobile-d2" />
          </div>
          <div className="w-8" /> {/* Spacer for arrow */}
          <div className="w-[140px]" /> {/* Spacer for step 3 */}
        </div>

        {/* Row 3: Steps 5-6 (left to right) */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <StepCard step={STEPS[4]} />
          <StepArrow direction="right" id="arrow-mobile-r2" />
          <StepCard step={STEPS[5]} />
        </div>

        {/* Down arrow positioned right - aligned with step 6 */}
        <div className="flex justify-center pr-0 mb-2">
          <div className="w-[140px]" /> {/* Spacer for step 5 */}
          <div className="w-8" /> {/* Spacer for arrow */}
          <div className="w-[140px] flex justify-center">
            <StepArrow direction="down" id="arrow-mobile-d3" />
          </div>
        </div>

        {/* Row 4: Steps 7-8 (right to left flow) */}
        <div className="flex items-center justify-center gap-2">
          <StepCard step={STEPS[7]} />
          <StepArrow direction="left" id="arrow-mobile-l2" />
          <StepCard step={STEPS[6]} />
        </div>
      </div>
    </div>
  );
}

// Interactive Phone Mockup Component with auto-scroll + user-controlled scrolling
function PhoneMockup() {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isUserControlled, setIsUserControlled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll function - scrolls down then up in a loop
  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) return;

    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current && !isUserControlled) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollHeight - container.clientHeight;

        if (scrollDirection === "down") {
          if (container.scrollTop >= maxScroll - 2) {
            // Reached bottom, switch to scrolling up
            setScrollDirection("up");
          } else {
            container.scrollTop += 1;
          }
        } else {
          if (container.scrollTop <= 2) {
            // Reached top, switch to scrolling down
            setScrollDirection("down");
          } else {
            container.scrollTop -= 1;
          }
        }
      }
    }, 40);
  }, [isUserControlled, scrollDirection]);

  // Stop auto-scroll
  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }, []);

  // Handle user interaction - pause auto-scroll temporarily
  const handleUserInteraction = useCallback(() => {
    setIsUserControlled(true);
    setIsAutoScrolling(false);
    stopAutoScroll();

    // Clear existing timeout
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }

    // Resume auto-scroll after 5 seconds of no interaction
    userInteractionTimeoutRef.current = setTimeout(() => {
      setIsUserControlled(false);
      setIsAutoScrolling(true);
    }, 5000);
  }, [stopAutoScroll]);

  // Start auto-scroll on mount and restart when direction changes
  useEffect(() => {
    if (isAutoScrolling && !isUserControlled) {
      stopAutoScroll(); // Stop existing interval before starting new one
      startAutoScroll();
    }
    return () => {
      stopAutoScroll();
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, [isAutoScrolling, isUserControlled, scrollDirection, startAutoScroll, stopAutoScroll]);

  return (
    <div className="relative">
      {/* Phone Frame - Responsive sizing */}
      <div
        className="relative w-56 sm:w-64 md:w-72 lg:w-80 bg-gray-900 p-1.5 sm:p-2 shadow-2xl"
        style={{ borderRadius: "28px" }}
      >
        {/* Screen - Responsive height */}
        <div
          className="bg-white overflow-hidden relative"
          style={{ borderRadius: "22px", height: "clamp(420px, 60vw, 620px)" }}
        >
          {/* Status Bar */}
          <div className="bg-white px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-10">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-gray-800 rounded-sm" />
            </div>
          </div>

          {/* Chat Header with Sakhee Logo */}
          <div
            className="px-4 py-3 border-b sticky top-8 z-10 bg-white"
            style={{ borderColor: SHIKHA.sand }}
          >
            <div className="flex items-center gap-3">
              <img
                src="/Sakhee logo.svg"
                alt="Sakhee"
                className="w-9 h-9 object-contain"
              />
              <div>
                <h4
                  className="font-montserrat font-semibold text-sm"
                  style={{ color: SAKHEE_COACH.text }}
                >
                  Instructional-Coach
                </h4>
                <p
                  className="text-xs font-poppins"
                  style={{ color: SAKHEE_COACH.textLight }}
                >
                  Your feedback is ready
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Scrollable Content Container with Grid Background */}
          <div
            className="relative"
            style={{ height: "clamp(340px, 50vw, 540px)" }}
          >
            {/* Grid Background - More subtle per user request */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.25,
                backgroundImage: `
                  linear-gradient(to right, #D0CBC5 1px, transparent 1px),
                  linear-gradient(to bottom, #D0CBC5 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Interactive Scrollable Feedback Area */}
            <div
              ref={scrollContainerRef}
              onMouseEnter={handleUserInteraction}
              onTouchStart={handleUserInteraction}
              onWheel={handleUserInteraction}
              className="absolute inset-0 overflow-y-auto pb-14 cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: `${SAKHEE_COACH.primary}40 transparent`,
              }}
            >
              <div className="px-4 py-3 space-y-4 relative z-10">
                {/* Card 1: GOOD WAIT TIME (green) */}
                <div
                  className="p-4 bg-white"
                  style={{
                    borderRadius: "12px",
                    borderLeft: `4px solid ${SAKHEE_COACH.good}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <p
                    className="font-montserrat font-semibold text-sm mb-3"
                    style={{ color: SAKHEE_COACH.good }}
                  >
                    GOOD WAIT TIME
                  </p>
                  <p
                    className="text-xs font-poppins mb-2"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">EVIDENCE</span>
                    <br />
                    After asking, 'What makes this a quadratic equation?', you
                    paused for about 4 seconds before calling on Akash.
                  </p>
                  <p
                    className="text-xs font-poppins"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">RECOMMENDATION</span>
                    <br />
                    Keep doing this. Waiting a few seconds gives students time to
                    think and leads to better answers.
                  </p>
                </div>

                {/* Card 2: NOT ENOUGH CHECKS FOR UNDERSTANDING (salmon/improve) */}
                <div
                  className="p-4 bg-white"
                  style={{
                    borderRadius: "12px",
                    borderLeft: `4px solid ${SAKHEE_COACH.improve}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <p
                    className="font-montserrat font-semibold text-sm mb-3"
                    style={{ color: SAKHEE_COACH.improve }}
                  >
                    NOT ENOUGH CHECKS FOR UNDERSTANDING
                  </p>
                  <p
                    className="text-xs font-poppins mb-2"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">EVIDENCE:</span>
                    <br />
                    After explaining the quadratic equation, you moved on to the
                    next activity without asking any checks for understanding
                    questions.
                  </p>
                  <p
                    className="text-xs font-poppins"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">RECOMMENDATION:</span>
                    <br />
                    Pause to ask one or two quick questions like, "Help me
                    identify this?" or "What is the first step?" This helps you
                    see if students are following.
                  </p>
                </div>

                {/* Card 3: POSITIVE REINFORCEMENT (green) */}
                <div
                  className="p-4 bg-white"
                  style={{
                    borderRadius: "12px",
                    borderLeft: `4px solid ${SAKHEE_COACH.good}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <p
                    className="font-montserrat font-semibold text-sm mb-3"
                    style={{ color: SAKHEE_COACH.good }}
                  >
                    POSITIVE REINFORCEMENT
                  </p>
                  <p
                    className="text-xs font-poppins mb-2"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">EVIDENCE</span>
                    <br />
                    When Priya gave a partial answer, you said "That's a great
                    start! Can you think about what happens when x is negative?"
                  </p>
                  <p
                    className="text-xs font-poppins"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">RECOMMENDATION</span>
                    <br />
                    Keep using this growth mindset approach - it encourages
                    students to keep trying and builds confidence.
                  </p>
                </div>

                {/* Card 4: LEARNING OBJECTIVES (salmon) */}
                <div
                  className="p-4 bg-white"
                  style={{
                    borderRadius: "12px",
                    borderLeft: `4px solid ${SAKHEE_COACH.improve}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <p
                    className="font-montserrat font-semibold text-sm mb-3"
                    style={{ color: SAKHEE_COACH.improve }}
                  >
                    LEARNING OBJECTIVES
                  </p>
                  <p
                    className="text-xs font-poppins mb-2"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">EVIDENCE</span>
                    <br />
                    The lesson started directly with the activity without stating
                    any learning goals for students.
                  </p>
                  <p
                    className="text-xs font-poppins"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">RECOMMENDATION</span>
                    <br />
                    Share 2-3 clear learning objectives at the start so students
                    know what success looks like.
                  </p>
                </div>

                {/* Card 5: ACTIVE ENGAGEMENT (green) */}
                <div
                  className="p-4 bg-white"
                  style={{
                    borderRadius: "12px",
                    borderLeft: `4px solid ${SAKHEE_COACH.good}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <p
                    className="font-montserrat font-semibold text-sm mb-3"
                    style={{ color: SAKHEE_COACH.good }}
                  >
                    ACTIVE ENGAGEMENT
                  </p>
                  <p
                    className="text-xs font-poppins mb-2"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">EVIDENCE</span>
                    <br />
                    You used think-pair-share 3 times, engaging 85% of the class
                    in active discussion.
                  </p>
                  <p
                    className="text-xs font-poppins"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">RECOMMENDATION</span>
                    <br />
                    Keep using collaborative learning strategies - they deepen
                    understanding and build confidence.
                  </p>
                </div>

                {/* Card 6: LESSON PACING (salmon) */}
                <div
                  className="p-4 bg-white"
                  style={{
                    borderRadius: "12px",
                    borderLeft: `4px solid ${SAKHEE_COACH.improve}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <p
                    className="font-montserrat font-semibold text-sm mb-3"
                    style={{ color: SAKHEE_COACH.improve }}
                  >
                    LESSON PACING
                  </p>
                  <p
                    className="text-xs font-poppins mb-2"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">EVIDENCE</span>
                    <br />
                    The first half of the lesson took 35 minutes, leaving only 10
                    minutes for practice.
                  </p>
                  <p
                    className="text-xs font-poppins"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    <span className="font-bold">RECOMMENDATION</span>
                    <br />
                    Set time markers for each section and use a visible timer to
                    stay on track.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Chat Input - Fixed at bottom with higher z-index so cards scroll under */}
          <div
            className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center gap-2 border-t bg-white z-20"
            style={{ borderColor: SHIKHA.sand }}
          >
            <div
              className="flex-1 h-9 flex items-center px-4"
              style={{
                backgroundColor: SAKHEE_COACH.cream,
                borderRadius: "20px",
              }}
            >
              <span
                className="text-xs font-poppins"
                style={{ color: SAKHEE_COACH.textLight }}
              >
                Ask about this feedback...
              </span>
            </div>
            <div
              className="w-9 h-9 flex items-center justify-center"
              style={{
                backgroundColor: SAKHEE_COACH.primary,
                borderRadius: "50%",
              }}
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Value Prop Card Component
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
      whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
      className="bg-white p-5 text-center transition-all"
      style={{
        borderRadius: UNIFIED_RADIUS,
        border: `1px solid ${SHIKHA.sand}`,
      }}
    >
      <div
        className="w-12 h-12 mx-auto mb-3 flex items-center justify-center"
        style={{
          backgroundColor: SAKHEE_COACH.primarySoft,
          borderRadius: "50%",
          border: `2px solid ${SAKHEE_COACH.primary}`,
        }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: SAKHEE_COACH.primary }}
          strokeWidth={1.5}
        />
      </div>
      <h4
        className="font-montserrat font-semibold text-base mb-1"
        style={{ color: SAKHEE_COACH.text }}
      >
        {title}
      </h4>
      <p
        className="text-sm font-poppins leading-relaxed"
        style={{ color: SAKHEE_COACH.textMuted }}
      >
        {description}
      </p>
    </motion.div>
  );
}

// Waitlist Modal Component - World class modern design
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
        setErrorMessage(data.error || "Failed to get early access");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset after 3 seconds
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
              maxHeight: "70vh"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative header gradient */}
            <div
              className="h-2 w-full flex-shrink-0"
              style={{
                background: `linear-gradient(90deg, ${SAKHEE_COACH.primary}, #F59E0B, ${SAKHEE_COACH.good})`,
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-gray-100 z-10"
              style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
            >
              <X
                className="w-5 h-5"
                style={{ color: SAKHEE_COACH.textMuted }}
              />
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
                    <CheckCircle
                      className="w-7 h-7"
                      style={{ color: SAKHEE_COACH.good }}
                    />
                  </div>
                  <h3
                    className="font-script text-2xl mb-2"
                    style={{ color: SAKHEE_COACH.text }}
                  >
                    You're on the list!
                  </h3>
                  <p
                    className="font-poppins text-sm"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    We'll reach out when Sakhee Instructional Coach is ready for you.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <img
                        src="/Sakhee logo.svg"
                        alt="Sakhee"
                        className="w-12 h-12"
                      />
                      <h3
                        className="font-caveat text-3xl md:text-4xl"
                        style={{ color: SAKHEE_COACH.text }}
                      >
                        Get Early Access
                      </h3>
                    </div>
                    <p
                      className="font-montserrat text-sm md:text-base font-medium"
                      style={{ color: SAKHEE_COACH.primary }}
                    >
                      Be among the first to experience Sakhee Instructional Coach
                    </p>
                  </div>

                  {/* Form - Single Column Layout */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label
                        className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide"
                        style={{ color: SAKHEE_COACH.textMuted }}
                      >
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
                          backgroundColor: SAKHEE_COACH.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COACH.text,
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide"
                        style={{ color: SAKHEE_COACH.textMuted }}
                      >
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
                          backgroundColor: SAKHEE_COACH.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COACH.text,
                        }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide"
                        style={{ color: SAKHEE_COACH.textMuted }}
                      >
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
                          backgroundColor: SAKHEE_COACH.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COACH.text,
                        }}
                      />
                    </div>

                    {/* School Name */}
                    <div>
                      <label
                        className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide"
                        style={{ color: SAKHEE_COACH.textMuted }}
                      >
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
                          backgroundColor: SAKHEE_COACH.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COACH.text,
                        }}
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label
                        className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide"
                        style={{ color: SAKHEE_COACH.textMuted }}
                      >
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
                          backgroundColor: SAKHEE_COACH.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COACH.text,
                        }}
                      />
                    </div>

                    {/* Designation */}
                    <div>
                      <label
                        className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide"
                        style={{ color: SAKHEE_COACH.textMuted }}
                      >
                        Designation
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="e.g., Math Teacher, Head of Department"
                        className="w-full px-4 py-3 font-poppins text-base transition-all focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: SAKHEE_COACH.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COACH.text,
                        }}
                      />
                    </div>

                    {/* Remarks */}
                    <div>
                      <label
                        className="block font-montserrat text-xs font-medium uppercase mb-1.5 tracking-wide"
                        style={{ color: SAKHEE_COACH.textMuted }}
                      >
                        Remarks (optional)
                      </label>
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Any questions or comments?"
                        className="w-full px-4 py-3 font-poppins text-base transition-all focus:outline-none focus:ring-2 resize-none"
                        style={{
                          backgroundColor: SAKHEE_COACH.cream,
                          borderRadius: "10px",
                          border: `1px solid ${SHIKHA.sand}`,
                          color: SAKHEE_COACH.text,
                        }}
                      />
                    </div>

                    {/* Error Message */}
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

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full py-3.5 font-montserrat text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: isSubmitting
                          ? SAKHEE_COACH.textMuted
                          : SAKHEE_COACH.primary,
                        borderRadius: "10px",
                        boxShadow: isSubmitting
                          ? "none"
                          : "0 4px 14px -4px rgba(230, 90, 80, 0.5)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
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

                  {/* Privacy note */}
                  <p
                    className="mt-4 text-center font-poppins text-xs md:text-sm"
                    style={{ color: SAKHEE_COACH.textLight }}
                  >
                    🔒 Your information is safe with us. No spam, ever.
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

export default function SakheeTeacherCoachPage() {
  const router = useRouter();
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openWaitlist = () => setIsWaitlistOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const closeWaitlist = () => setIsWaitlistOpen(false);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden font-poppins"
      style={{ backgroundColor: SAKHEE_COACH.cream }}
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
                backgroundColor: SAKHEE_COACH.primary,
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

              {/* Nav Links - Desktop - per Figma spacing */}
              <div className="hidden md:flex items-center gap-10">
                <button
                  onClick={() => router.push("/sakhee-ai")}
                  className="font-montserrat text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: SAKHEE_COACH.textLight }}
                >
                  All Products
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("what")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-black font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                >
                  WHAT
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("how")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-black font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                >
                  HOW
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("who")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-black font-montserrat text-base font-bold transition-opacity hover:opacity-70"
                >
                  WHO
                </button>
                {/* CTA Button - SIGN UP per Figma */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openWaitlist}
                  className="text-[#C66666] font-montserrat text-base font-bold transition-opacity hover:opacity-70 -mr-6"
                >
                  JOIN WAITLIST
                </motion.button>
              </div>

              {/* Mobile Menu Button Only */}
              <div className="flex items-center md:hidden">
                {/* Hamburger Menu - Mobile Only */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: SAKHEE_COACH.text }}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
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
                  {/* All Products link */}
                  <button
                    onClick={() => {
                      router.push("/sakhee-ai");
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-xs font-montserrat font-medium"
                    style={{ color: SAKHEE_COACH.textLight }}
                  >
                    All Products
                  </button>
                  <hr style={{ borderColor: SHIKHA.sand }} />
                  <button
                    onClick={() => {
                      document
                        .getElementById("what")
                        ?.scrollIntoView({ behavior: "smooth" });
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-sm font-montserrat font-medium tracking-wide"
                    style={{ color: SAKHEE_COACH.text }}
                  >
                    WHAT
                  </button>
                  <button
                    onClick={() => {
                      document
                        .getElementById("how")
                        ?.scrollIntoView({ behavior: "smooth" });
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-sm font-montserrat font-medium tracking-wide"
                    style={{ color: SAKHEE_COACH.text }}
                  >
                    HOW
                  </button>
                  <button
                    onClick={() => {
                      document
                        .getElementById("who")
                        ?.scrollIntoView({ behavior: "smooth" });
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-sm font-montserrat font-medium tracking-wide"
                    style={{ color: SAKHEE_COACH.text }}
                  >
                    WHO
                  </button>
                  {/* Mobile CTA Button */}
                  <button
                    onClick={() => {
                      openWaitlist();
                      closeMobileMenu();
                    }}
                    className="w-full py-3 text-sm font-montserrat font-medium text-white mt-2"
                    style={{
                      backgroundColor: SAKHEE_COACH.primary,
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
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto flex items-center justify-center py-[40px] px-6 md:px-0">
          <div className="w-full h-full flex flex-col md:flex-row gap-12 md:gap-0 items-center justify-between md:mx-20">
            {/* Left Side - Text */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center mb-[10.5px] md:mb-[21px]">
                <BlurFade delay={0.2}>
                  <h1
                    className="font-caveat text-[46px] leading-[52px] md:text-[72px] md:leading-[86px]"
                    style={{ color: SAKHEE_COACH.text }}
                  >
                    Hey Teachers!
                  </h1>
                </BlurFade>

                <BlurFade delay={0.3}>
                  <p
                    className="font-montserrat text-[18px] leading-snug md:text-[26px] md:leading-tight font-bold text-center md:text-left"
                    style={{ color: SAKHEE_COACH.primary }}
                  >
                    MEET YOUR NEW BEST FRIEND
                  </p>
                </BlurFade>
              </div>
              {/* Sakhee Logo - Larger */}
              <BlurFade delay={0.35}>
                <div className="flex flex-col items-center">
                  <motion.img
                    src="/Sakhee logos/Sakhee Instruction Coach.svg"
                    alt="Sakhee Instructional Coach"
                    className="size-28 sm:size-36 md:size-[200px] object-contain"
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Instructional-Coach label - sub header font (Montserrat) */}
                  <h2
                    className="font-montserrat text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide mt-1 mb-[21px] md:mb-[42px]"
                    style={{ color: SAKHEE_COACH.purpleBlue }}
                  >
                    Instructional Coach
                  </h2>
                </div>
              </BlurFade>

              <BlurFade delay={0.5}>
                <p className="text-center text-black font-poppins text-xl font-normal leading-7 tracking-normal mb-3 md:mb-6">
                  The world's first{" "}
                  <br className="hidden md:block" />
                  AI instructional coach,{" "}
                  <br className="hidden md:block" />
                  designed <span className="font-bold">FOR</span> teachers{" "}
                  <span className="font-bold">BY</span> teachers.
                </p>
              </BlurFade>

              <BlurFade delay={0.6}>
                <div className="flex items-center justify-center">
                  {/* JOIN WAITLIST - Single hero CTA per user request */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openWaitlist}
                    className={`px-10 h-[56.8px] text-white font-montserrat text-lg font-bold leading-[22px] transition-all rounded-2xl`}
                    style={{ backgroundColor: SAKHEE_COACH.primary }}
                  >
                    JOIN WAITLIST
                  </motion.button>
                </div>
              </BlurFade>
            </div>

            {/* Right Side - Phone Mockup with Scrolling Feedback */}
            <BlurFade delay={0.5}>
              <PhoneMockup />
            </BlurFade>
          </div>
        </section>

        {/* Section: Every Teacher deserves a Great Coach - matching PDF exactly */}
        <section id="what" className="bg-white">
          <div className="max-w-6xl mx-auto flex flex-col space-y-[13px] md:space-y-[26.12px] justify-center items-center py-[40px] px-6 md:px-0 text-center">
            <BlurFade delay={0.2}>
              <div className="flex flex-col justify-center items-center gap-[5px]">
                {/* Script Heading - proper case per PDF */}
                <h2
                  className="font-caveat text-[46px] leading-[52px] md:text-[72px] md:leading-[86px] text-black"
                  style={{ color: SAKHEE_COACH.text }}
                >
                  Every Teacher deserves a Great Coach
                </h2>
                {/* Subheading: consistent terracotta caption per user - 27px */}
                <p
                  className="font-montserrat font-bold text-[18px] leading-snug md:text-[26px] md:leading-tight md:tracking-[0.158px] uppercase"
                  style={{ color: SAKHEE_COACH.primary }}
                >
                  YOU DON'T HAVE TO TEACH ALONE ANYMORE
                </p>
              </div>
            </BlurFade>

            {/* Text content matching PDF exactly - NO cards */}
            <BlurFade delay={0.2}>
              <div className="text-center space-y-5">
                <p
                  className="font-poppins text-base leading-relaxed md:text-lg font-[410] md:leading-[26px] md:tracking-[-0.122px]"
                  style={{ color: SAKHEE_COACH.textMuted }}
                >
                  As teachers ourselves, we know that teaching can be demanding,
                  exhausting... and often lonely. You're{" "}
                  <br className="hidden md:block" /> expected to improve
                  constantly—but real feedback, thoughtful coaching, or a safe
                  place to reflect is <br className="hidden md:block" />
                  rare. And when you need help now, there's often no one to turn
                  to.
                </p>

                {/* Accent text - regular Poppins per Canva (no bold) */}
                <p
                  className="font-poppins text-base leading-relaxed md:text-lg font-[410] md:leading-[26px] md:tracking-[-0.122px]"
                  style={{ color: SAKHEE_COACH.textMuted }}
                >
                  Sakhee Instructional Coach was created to change that.
                </p>

                <p
                  className="font-poppins text-base leading-relaxed md:text-lg font-[410] md:leading-[26px] md:tracking-[-0.122px]"
                  style={{ color: SAKHEE_COACH.textMuted }}
                >
                  Sakhee Instructional Coach is your instructional partner: available 24/7, always
                  supportive, never judgmental. She helps{" "}
                  <br className="hidden md:block" /> you think through your
                  lessons, reflect on what happened in class, and improve your
                  practice step by <br className="hidden md:block" /> step. The
                  support is personalised to your students, your subject, and
                  your classroom experience. It's{" "}
                  <br className="hidden md:block" /> instant, evidence-based,
                  and focused on what actually helps teachers grow.
                </p>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Section: Elevate your Teaching - How Sakhee Works */}
        <section id="how" style={{ backgroundColor: SAKHEE_COACH.cream }}>
          <div className="max-w-6xl mx-auto flex flex-col space-y-6 md:space-y-[49.85px] justify-center items-center py-[40px] px-6 md:px-0">
            <BlurFade delay={0.2}>
              <div className="flex flex-col justify-center items-center gap-[5px]">
                {/* Heading: BLACK */}
                <h2
                  className="font-caveat text-[46px] leading-[52px] md:text-[72px] md:leading-[86px] text-black"
                  style={{ color: SAKHEE_COACH.text }}
                >
                  Elevate your Teaching
                </h2>
                {/* Caption: 27px per user request */}
                <p
                  className="font-montserrat font-bold text-[18px] leading-snug md:text-[26px] md:leading-tight md:tracking-[0.21px] uppercase"
                  style={{ color: SAKHEE_COACH.primary }}
                >
                  HOW SAKHEE INSTRUCTIONAL COACH WORKS
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <StepsGridWithArrows />
            </BlurFade>
          </div>
        </section>

        {/* Section: Who Are We? */}
        <section id="who" className="bg-white">
          <div className="max-w-6xl mx-auto flex flex-col space-y-[19px] md:space-y-[38px] justify-center items-center text-center px-6 md:px-0 py-[40px]">
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <BlurFade delay={0.2}>
                <h2
                  className="font-caveat text-[46px] leading-[52px] md:text-[72px] md:leading-[86px] text-black"
                  style={{ color: SAKHEE_COACH.text }}
                >
                  Who Are We?
                </h2>
              </BlurFade>
              <BlurFade delay={0.3}>
                <p
                  className="font-montserrat font-bold text-[18px] leading-snug md:text-[26px] md:leading-tight md:tracking-[0.079px] uppercase"
                  style={{ color: SAKHEE_COACH.primary }}
                >
                  AN INTRODUCTION TO SHIKHA LABS
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.4}>
              <p
                className="font-poppins text-base leading-relaxed md:text-lg font-normal md:leading-[26px] md:tracking-[-0.122px]"
                style={{
                  color: SAKHEE_COACH.textMuted,
                }}
              >
                Shikha Labs is an AI based educational technology company that
                is uniquely founded within the{" "}
                <br className="hidden md:block" /> ecosystem of an educational
                research organization called the Shikha Institute and its
                partner high <br className="hidden md:block" /> performance K-12
                experimental school called the Shikha Academy in Mumbai, India.
              </p>

              {/* Three Logos - Simple styling per user */}
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

              {/* Bottom text - simple styling per user */}
              <p
                className="font-poppins text-base leading-relaxed md:text-lg font-normal md:leading-[26px] md:tracking-[-0.122px]"
                style={{
                  color: SAKHEE_COACH.textMuted,
                }}
              >
                The Shikha Institute works to systemically elevate schools
                through research and development{" "}
                <br className="hidden md:block" /> covering all aspects of
                instructional design. Shikha Academy follows the international
                Cambridge <br className="hidden md:block" /> board and
                exclusively serves low income students in Mumbai. The three
                organizations are co-located <br className="hidden md:block" />{" "}
                and work deeply together to create a constant, positive spiral
                of educational innovation.
              </p>
            </BlurFade>
          </div>
        </section>

        {/* Section: I'm In! - CTA */}
        <section style={{ backgroundColor: SAKHEE_COACH.cream }}>
          <div className="max-w-6xl mx-auto flex flex-col justify-center items-center text-center px-6 md:px-0 py-[40px]">
            <div className="flex flex-col justify-center items-center gap-[5px] mb-[18px] md:mb-[36px]">
              <BlurFade delay={0.2}>
                {/* Heading: BLACK */}
                <h2
                  className="font-caveat text-[46px] leading-[52px] md:text-[72px] md:leading-[86px] text-black"
                  style={{ color: SAKHEE_COACH.text }}
                >
                  I'm In!
                </h2>
              </BlurFade>

              <BlurFade delay={0.3}>
                <p
                  className="font-montserrat font-bold text-[18px] leading-snug md:text-[26px] md:leading-tight md:tracking-[0.21px] uppercase"
                  style={{ color: SAKHEE_COACH.primary }}
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
                    color: SAKHEE_COACH.textMuted,
                  }}
                >
                  Sakhee Instructional Coach is currently in beta testing with multiple schools and
                  organizations across Mumbai.
                </p>
                <p
                  className="font-poppins text-base leading-relaxed md:text-lg font-normal md:leading-[26px] md:tracking-[-0.122px]"
                  style={{
                    color: SAKHEE_COACH.textMuted,
                  }}
                >
                  As we prepare for a wider launch, we're inviting a small group
                  of teachers to be among the first to try{" "}
                  <br className="hidden md:block" /> Sakhee Instructional Coach when the app becomes
                  available. If you're curious, reflective, and serious about
                  improving <br className="hidden md:block" /> your teaching—and
                  you want a coach who understands your classroom—fill out the
                  form below.
                </p>
                <p
                  className="font-poppins text-base leading-relaxed md:text-lg font-normal md:leading-[26px] md:tracking-[-0.122px]"
                  style={{
                    color: SAKHEE_COACH.textMuted,
                  }}
                >
                  This is your chance to shape the future of teacher coaching,
                  grow alongside Sakhee Instructional Coach from the start.
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
                  style={{ backgroundColor: SAKHEE_COACH.primary }}
                >
                  JOIN WAITLIST
                </motion.button>

                {/* Privacy info pill */}
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: `1px solid ${SAKHEE_COACH.primary}20`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={SAKHEE_COACH.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span
                    className="text-[11px] sm:text-xs font-poppins font-medium"
                    style={{ color: SAKHEE_COACH.textMuted }}
                  >
                    Audio only · No video · Private to your school · Student data never stored
                  </span>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-6 sm:py-8 border-t"
          style={{
            backgroundColor: "white",
            borderColor: SHIKHA.sand,
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src="/shikha labs logo.png"
                  alt="Shikha Labs"
                  className="h-7 sm:h-8 w-auto"
                />
                <span
                  className="text-xs sm:text-sm font-poppins"
                  style={{ color: SAKHEE_COACH.textLight }}
                >
                  Sakhee by Shikha Labs
                </span>
              </div>
              <div
                className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-poppins"
                style={{ color: SAKHEE_COACH.textLight }}
              >
                <a
                  href="https://www.notion.so/rudraghav/Sakhee-Privacy-Policy-22b1dab7b879803187d0ed41750a83fe?source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  Privacy
                </a>
                <a
                  href="https://www.notion.so/rudraghav/Sakhee-terms-of-service-1911dab7b87980e9bc14d19c1e86102a?source=copy_link"
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
              className="text-center text-[10px] sm:text-xs font-poppins mt-4 sm:mt-6"
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
