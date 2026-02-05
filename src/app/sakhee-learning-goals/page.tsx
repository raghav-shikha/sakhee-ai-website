"use client";

import { LearningGoalsMobileDemo } from "@/components/shared/sakhee-mobile-demos";
import { SakheeProductPage } from "@/components/shared/sakhee-product-page";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Layers, Target } from "lucide-react";

export default function SakheeLearningGoalsPage() {
  return (
    <SakheeProductPage
      productName="Sakhee Learning Goals"
      productTagline="CURRICULUM-ALIGNED OBJECTIVES"
      productDescription="Transform your teaching topics into comprehensive, curriculum-aligned learning objectives with clear success criteria and assessment strategies."
      productColor="#29ABE2"
      appHref="/journey/learninggoals"
      icon={
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#29ABE215", border: "3px solid #29ABE2" }}
        >
          <Target className="w-12 h-12 md:w-16 md:h-16" style={{ color: "#29ABE2" }} />
        </motion.div>
      }
      interactiveDemo={<LearningGoalsMobileDemo color="#29ABE2" />}
      features={[
        {
          title: "Standards Aligned",
          description: "Goals mapped to CBSE, ICSE, State Boards, and international standards.",
          icon: CheckCircle,
        },
        {
          title: "Bloom's Taxonomy",
          description: "Objectives across all cognitive levels from remember to create.",
          icon: Layers,
        },
        {
          title: "Success Criteria",
          description: "Clear indicators of what mastery looks like for each goal.",
          icon: Target,
        },
        {
          title: "Assessment Ideas",
          description: "Suggested ways to measure student achievement of each goal.",
          icon: BookOpen,
        },
      ]}
      howItWorks={[
        {
          step: 1,
          title: "Enter Topic",
          description: "Specify the topic, subject, and grade level.",
        },
        {
          step: 2,
          title: "Select Standards",
          description: "Choose your curriculum board and any specific standards.",
        },
        {
          step: 3,
          title: "Generate Goals",
          description: "AI creates comprehensive learning objectives.",
        },
        {
          step: 4,
          title: "Customize",
          description: "Edit, add, or remove goals to fit your needs.",
        },
      ]}
      benefits={[
        "Clear, measurable learning objectives using action verbs",
        "Multiple objectives across different cognitive levels",
        "Success criteria that define mastery for each goal",
        "Alignment to curriculum standards and frameworks",
        "Ready to use in lesson plans and assessments",
        "Export and share with students and parents",
      ]}
    />
  );
}
