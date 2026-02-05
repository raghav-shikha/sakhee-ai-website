"use client";

import { AssessmentMobileDemo } from "@/components/shared/sakhee-mobile-demos";
import { SakheeProductPage } from "@/components/shared/sakhee-product-page";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardCheck, FileText, Layers, Target } from "lucide-react";

export default function SakheeAssessmentPage() {
  return (
    <SakheeProductPage
      productName="Sakhee Assessment"
      productTagline="SMART ASSESSMENT CREATION"
      productDescription="Build comprehensive assessments with rubrics, answer keys, and varied question types aligned to your learning objectives in minutes."
      productColor="#3BB77E"
      appHref="/journey/assessment"
      icon={
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#3BB77E15", border: "3px solid #3BB77E" }}
        >
          <ClipboardCheck className="w-12 h-12 md:w-16 md:h-16" style={{ color: "#3BB77E" }} />
        </motion.div>
      }
      interactiveDemo={<AssessmentMobileDemo color="#3BB77E" />}
      features={[
        {
          title: "Varied Questions",
          description: "MCQs, short answer, long answer, and application questions.",
          icon: Layers,
        },
        {
          title: "Auto Rubrics",
          description: "Marking schemes and rubrics generated automatically.",
          icon: FileText,
        },
        {
          title: "Goal Aligned",
          description: "Questions mapped to specific learning objectives.",
          icon: Target,
        },
        {
          title: "Difficulty Levels",
          description: "Mix of easy, medium, and hard questions for balanced assessment.",
          icon: CheckCircle,
        },
      ]}
      howItWorks={[
        {
          step: 1,
          title: "Set Context",
          description: "Enter topic, grade, and assessment type (quiz, test, exam).",
        },
        {
          step: 2,
          title: "Choose Format",
          description: "Select question types and difficulty distribution.",
        },
        {
          step: 3,
          title: "Generate",
          description: "AI creates questions with answers and marking scheme.",
        },
        {
          step: 4,
          title: "Review & Export",
          description: "Edit questions and export to PDF with answer key.",
        },
      ]}
      benefits={[
        "Multiple question types in one assessment",
        "Complete marking schemes with point allocations",
        "Questions aligned to curriculum standards",
        "Automatic answer key generation",
        "Difficulty balance across the assessment",
        "Professional PDF export ready for printing",
      ]}
    />
  );
}
