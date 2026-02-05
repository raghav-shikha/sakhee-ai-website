"use client";

import { SubjectExpertMobileDemo } from "@/components/shared/sakhee-mobile-demos";
import { SakheeProductPage } from "@/components/shared/sakhee-product-page";
import { motion } from "framer-motion";
import { BookOpen, Brain, FileText, Lightbulb, MessageSquare } from "lucide-react";

export default function SakheeSubjectExpertPage() {
  return (
    <SakheeProductPage
      productName="Sakhee Subject Expert"
      productTagline="DEEP SUBJECT KNOWLEDGE"
      productDescription="Deep subject matter expertise at your fingertips. Get detailed explanations, examples, analogies, and content support for any topic you teach."
      productColor="#FFCA28"
      productType="chat"
      appHref="/bot/expert"
      icon={
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#FFCA2815", border: "3px solid #FFCA28" }}
        >
          <Brain className="w-12 h-12 md:w-16 md:h-16" style={{ color: "#FFCA28" }} />
        </motion.div>
      }
      interactiveDemo={<SubjectExpertMobileDemo color="#FFCA28" />}
      features={[
        {
          title: "Any Subject",
          description: "Expert knowledge across Math, Science, Social Studies, Languages, and more.",
          icon: BookOpen,
        },
        {
          title: "Clear Explanations",
          description: "Complex concepts broken down into simple, teachable parts.",
          icon: Lightbulb,
        },
        {
          title: "Real Examples",
          description: "Relevant examples and analogies for Indian classroom context.",
          icon: FileText,
        },
        {
          title: "Chat Interface",
          description: "Ask follow-up questions and go deeper on any topic.",
          icon: MessageSquare,
        },
      ]}
      howItWorks={[
        {
          step: 1,
          title: "Ask Question",
          description: "Type any question about your subject or topic.",
        },
        {
          step: 2,
          title: "Get Explanation",
          description: "Receive detailed, accurate subject knowledge.",
        },
        {
          step: 3,
          title: "Go Deeper",
          description: "Ask follow-up questions to understand more.",
        },
        {
          step: 4,
          title: "Use in Class",
          description: "Apply the knowledge in your teaching.",
        },
      ]}
      benefits={[
        "Expert-level knowledge across all school subjects",
        "Explanations written for teaching, not textbooks",
        "Examples and analogies relevant to Indian students",
        "Quick answers when preparing for class",
        "Help understanding difficult concepts yourself",
        "Ideas for how to explain topics to students",
      ]}
    />
  );
}
