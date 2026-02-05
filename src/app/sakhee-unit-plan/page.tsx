"use client";

import { UnitPlanMobileDemo } from "@/components/shared/sakhee-mobile-demos";
import { SakheeProductPage } from "@/components/shared/sakhee-product-page";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Layers, Lightbulb, Target } from "lucide-react";

export default function SakheeUnitPlanPage() {
  return (
    <SakheeProductPage
      productName="Sakhee Unit Plan"
      productTagline="COMPREHENSIVE UNIT DESIGN"
      productDescription="Design complete unit plans with structured lessons, big questions, key takeaways, and learning progressions that guide student understanding over weeks."
      productColor="#6B5CA5"
      appHref="/journey/unit-plan"
      icon={
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#6B5CA515", border: "3px solid #6B5CA5" }}
        >
          <BookOpen className="w-12 h-12 md:w-16 md:h-16" style={{ color: "#6B5CA5" }} />
        </motion.div>
      }
      interactiveDemo={<UnitPlanMobileDemo color="#6B5CA5" />}
      features={[
        {
          title: "Multi-Week Planning",
          description: "Plan entire units spanning 2-4 weeks with coherent learning progressions.",
          icon: Calendar,
        },
        {
          title: "Big Questions",
          description: "Essential questions that drive inquiry and deeper understanding.",
          icon: Lightbulb,
        },
        {
          title: "Structured Lessons",
          description: "Each unit breaks down into organized, sequenced daily lessons.",
          icon: Layers,
        },
        {
          title: "Learning Goals",
          description: "Clear objectives for each lesson tied to unit outcomes.",
          icon: Target,
        },
      ]}
      howItWorks={[
        {
          step: 1,
          title: "Define Unit",
          description: "Enter your unit topic, grade level, and duration.",
        },
        {
          step: 2,
          title: "Set Objectives",
          description: "Specify key learning outcomes and curriculum standards.",
        },
        {
          step: 3,
          title: "Generate Structure",
          description: "AI creates a complete unit with lessons and assessments.",
        },
        {
          step: 4,
          title: "Expand Lessons",
          description: "Generate detailed lesson plans for each session.",
        },
      ]}
      benefits={[
        "Complete unit overview with big ideas and essential questions",
        "Sequenced lessons that build understanding progressively",
        "Assessment milestones and check-points throughout the unit",
        "Resources and materials organized by lesson",
        "Differentiation strategies for diverse learners",
        "Easy export and sharing with colleagues",
      ]}
    />
  );
}
