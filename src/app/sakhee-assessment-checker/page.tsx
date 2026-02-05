"use client";

import { SakheeProductPage } from "@/components/shared/sakhee-product-page";
import { AssessmentCheckerDemo } from "@/components/shared/sakhee-interactive-demos";
import { Clock, CheckCircle, Target, FileText, Upload, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function SakheeAssessmentCheckerPage() {
  return (
    <SakheeProductPage
      productName="Sakhee Assessment Checker"
      productTagline="AI-POWERED GRADING"
      productDescription="AI-powered grading with detailed feedback for each student, saving hours of marking time while maintaining consistency and quality."
      productColor="#F97316"
      appHref="/assessment-checker"
      icon={
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#F9731615", border: "3px solid #F97316" }}
        >
          <CheckCircle className="w-12 h-12 md:w-16 md:h-16" style={{ color: "#F97316" }} />
        </motion.div>
      }
      interactiveDemo={<AssessmentCheckerDemo color="#F97316" />}
      features={[
        {
          title: "Instant Grading",
          description: "Grade entire class sets in minutes instead of hours.",
          icon: Clock,
        },
        {
          title: "Detailed Feedback",
          description: "Personalized comments and suggestions for each student.",
          icon: FileText,
        },
        {
          title: "Consistent Marking",
          description: "Same rubric applied fairly to all students.",
          icon: Target,
        },
        {
          title: "Analytics",
          description: "Class performance insights and common misconceptions.",
          icon: BarChart3,
        },
      ]}
      howItWorks={[
        {
          step: 1,
          title: "Upload Answers",
          description: "Upload student submissions (photos, PDFs, or typed).",
        },
        {
          step: 2,
          title: "Set Answer Key",
          description: "Upload or create the marking scheme and rubric.",
        },
        {
          step: 3,
          title: "AI Grades",
          description: "AI evaluates each response against the rubric.",
        },
        {
          step: 4,
          title: "Review & Adjust",
          description: "Review grades, adjust if needed, and export results.",
        },
      ]}
      benefits={[
        "Grade 30 students' papers in under 10 minutes",
        "Detailed feedback explaining marks given",
        "Consistent application of marking criteria",
        "Identify common mistakes across the class",
        "Export grades to spreadsheet or report cards",
        "Override AI grades easily when needed",
      ]}
    />
  );
}
