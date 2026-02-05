"use client";

import { PedagogyExpertMobileDemo } from "@/components/shared/sakhee-mobile-demos";
import { SakheeProductPage } from "@/components/shared/sakhee-product-page";
import { motion } from "framer-motion";
import { Lightbulb, MessageSquare, Sparkles, Target, Users } from "lucide-react";

export default function SakheePedagogyExpertPage() {
  return (
    <SakheeProductPage
      productName="Sakhee Pedagogy Expert"
      productTagline="TEACHING STRATEGIES"
      productDescription="Access AI-powered teaching strategies, instructional guidance, and pedagogical best practices tailored to your subject and classroom context."
      productColor="#7B88C3"
      productType="chat"
      appHref="/tools/pedagogy-expert"
      icon={
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#7B88C315", border: "3px solid #7B88C3" }}
        >
          <Lightbulb className="w-12 h-12 md:w-16 md:h-16" style={{ color: "#7B88C3" }} />
        </motion.div>
      }
      interactiveDemo={<PedagogyExpertMobileDemo color="#7B88C3" />}
      features={[
        {
          title: "Teaching Strategies",
          description: "Evidence-based methods like think-pair-share, Socratic questioning, and more.",
          icon: Sparkles,
        },
        {
          title: "Classroom Management",
          description: "Tips for engagement, behavior, and creating positive learning environments.",
          icon: Users,
        },
        {
          title: "Differentiation",
          description: "Strategies for mixed-ability classrooms and diverse learners.",
          icon: Target,
        },
        {
          title: "Ask Anything",
          description: "Chat interface for any teaching challenge or question.",
          icon: MessageSquare,
        },
      ]}
      howItWorks={[
        {
          step: 1,
          title: "Describe Challenge",
          description: "Tell us about your teaching situation or question.",
        },
        {
          step: 2,
          title: "Get Strategies",
          description: "Receive practical, actionable teaching advice.",
        },
        {
          step: 3,
          title: "Ask More",
          description: "Clarify, get examples, or explore variations.",
        },
        {
          step: 4,
          title: "Apply & Reflect",
          description: "Try strategies in class and refine your approach.",
        },
      ]}
      benefits={[
        "Research-backed teaching strategies explained simply",
        "Advice specific to your grade level and subject",
        "Help with difficult classroom situations",
        "Ideas for engaging reluctant learners",
        "Strategies for differentiated instruction",
        "Support for new teachers learning the craft",
      ]}
    />
  );
}
