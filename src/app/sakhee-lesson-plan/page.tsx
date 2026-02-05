"use client";

import { LessonPlanMobileDemo } from "@/components/shared/sakhee-mobile-demos";
import { SakheeProductPage } from "@/components/shared/sakhee-product-page";
import { motion } from "framer-motion";
import { BookOpen, Clock, FileText, Lightbulb, Target } from "lucide-react";

export default function SakheeLessonPlanPage() {
  return (
    <SakheeProductPage
      productName="Sakhee Lesson Plan"
      productTagline="AI-POWERED LESSON PLANNING"
      productDescription="Create detailed, pedagogically-sound lesson plans with timed activities in minutes, not hours. Designed for Indian classrooms with curriculum alignment built-in."
      productColor="#F8A049"
      appHref="/journey/lesson-plan"
      icon={
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#F8A04915", border: "3px solid #F8A049" }}
        >
          <FileText className="w-12 h-12 md:w-16 md:h-16" style={{ color: "#F8A049" }} />
        </motion.div>
      }
      interactiveDemo={<LessonPlanMobileDemo color="#F8A049" />}
      features={[
        {
          title: "Save 90% Time",
          description: "Create complete lesson plans in under 5 minutes instead of hours.",
          icon: Clock,
        },
        {
          title: "Curriculum Aligned",
          description: "Works with CBSE, ICSE, State Boards, and international curricula.",
          icon: Target,
        },
        {
          title: "Timed Activities",
          description: "Every activity comes with suggested timing for perfect pacing.",
          icon: BookOpen,
        },
        {
          title: "Pedagogy Built-In",
          description: "Best practices and teaching strategies included automatically.",
          icon: Lightbulb,
        },
      ]}
      howItWorks={[
        {
          step: 1,
          title: "Enter Topic",
          description: "Tell us what you want to teach - subject, grade, and topic.",
        },
        {
          step: 2,
          title: "Set Context",
          description: "Specify duration, student level, and any special requirements.",
        },
        {
          step: 3,
          title: "Generate Plan",
          description: "AI creates a complete lesson plan with activities and timing.",
        },
        {
          step: 4,
          title: "Customize & Use",
          description: "Edit as needed and export or use directly in class.",
        },
      ]}
      benefits={[
        "Complete lesson plans with hook, instruction, practice, and assessment activities",
        "Suggested materials and resources for each activity",
        "Learning objectives aligned to curriculum standards",
        "Differentiation strategies for mixed-ability classrooms",
        "Exit ticket and assessment suggestions included",
        "Export to PDF or Word for easy printing and sharing",
      ]}
    />
  );
}
