"use client";

import { ExamGeneratorMobileDemo } from "@/components/shared/sakhee-mobile-demos";
import { SakheeProductPage } from "@/components/shared/sakhee-product-page";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, FileText, Layers } from "lucide-react";

export default function SakheeExamGeneratorPage() {
  return (
    <SakheeProductPage
      productName="Sakhee Exam Generator"
      productTagline="PROFESSIONAL EXAM PAPERS"
      productDescription="Generate complete examination papers with multiple sections, proper formatting, comprehensive marking schemes, and model answers ready for board-pattern exams."
      productColor="#E45B5B"
      appHref="/journey/examination"
      icon={
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#E45B5B15", border: "3px solid #E45B5B" }}
        >
          <FileText className="w-12 h-12 md:w-16 md:h-16" style={{ color: "#E45B5B" }} />
        </motion.div>
      }
      interactiveDemo={<ExamGeneratorMobileDemo color="#E45B5B" />}
      features={[
        {
          title: "Board Pattern",
          description: "Follows CBSE, ICSE, and State Board exam patterns exactly.",
          icon: CheckCircle,
        },
        {
          title: "Multiple Sections",
          description: "Section A, B, C with appropriate question types and marks.",
          icon: Layers,
        },
        {
          title: "Complete Papers",
          description: "Full exam with instructions, questions, and marking scheme.",
          icon: FileText,
        },
        {
          title: "Model Answers",
          description: "Detailed answer key with step-by-step solutions.",
          icon: BookOpen,
        },
      ]}
      howItWorks={[
        {
          step: 1,
          title: "Select Board",
          description: "Choose exam board and paper pattern (term, annual, etc.).",
        },
        {
          step: 2,
          title: "Define Syllabus",
          description: "Specify chapters, topics, and mark distribution.",
        },
        {
          step: 3,
          title: "Generate Paper",
          description: "AI creates complete exam paper with all sections.",
        },
        {
          step: 4,
          title: "Export",
          description: "Download question paper and marking scheme as PDF.",
        },
      ]}
      benefits={[
        "Professional exam papers matching board patterns",
        "Balanced coverage of all syllabus topics",
        "Section-wise question distribution with marks",
        "Comprehensive marking scheme with model answers",
        "Ready for printing with proper formatting",
        "Multiple paper variants for different sets",
      ]}
    />
  );
}
