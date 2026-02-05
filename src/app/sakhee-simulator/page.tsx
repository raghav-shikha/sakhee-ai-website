"use client";

import { SimulatorMobileDemo } from "@/components/shared/sakhee-mobile-demos";
import { SakheeProductPage } from "@/components/shared/sakhee-product-page";
import { motion } from "framer-motion";
import { MessageSquare, Target, TrendingUp, Users } from "lucide-react";

export default function SakheeSimulatorPage() {
    return (
        <SakheeProductPage
            productName="Sakhee Classroom Simulator"
            productTagline="AI-POWERED TEACHING PRACTICE"
            productDescription="Rehearse your lessons in a safe virtual classroom with AI students before facing real students. Get instant feedback on your teaching approach."
            productColor="#5283b7"
            appHref="/tools/simulator"
            icon={
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
                >
                    <img
                        src="/Sakhee logos/Sakhee Classroom.svg"
                        alt="Classroom Simulator"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            // Fallback to icon if SVG not found
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </motion.div>
            }
            interactiveDemo={<SimulatorMobileDemo color="#5283b7" />}
            features={[
                {
                    title: "Safe Practice Space",
                    description: "Make mistakes and learn without real classroom consequences.",
                    icon: Target,
                },
                {
                    title: "AI Student Responses",
                    description: "Students ask real questions, express confusion, and challenge you.",
                    icon: MessageSquare,
                },
                {
                    title: "Instant Feedback",
                    description: "Get actionable suggestions on clarity, pacing, and engagement.",
                    icon: TrendingUp,
                },
                {
                    title: "Multiple Scenarios",
                    description: "Practice with different class sizes, ability levels, and situations.",
                    icon: Users,
                },
            ]}
            howItWorks={[
                {
                    step: 1,
                    title: "Choose Topic",
                    description: "Select the lesson you want to practice teaching.",
                },
                {
                    step: 2,
                    title: "Start Session",
                    description: "Enter the virtual classroom with AI student bots.",
                },
                {
                    step: 3,
                    title: "Practice Teaching",
                    description: "Explain concepts and respond to student questions.",
                },
                {
                    step: 4,
                    title: "Review Feedback",
                    description: "Get detailed feedback on your teaching performance.",
                },
            ]}
            benefits={[
                "Build confidence before stepping into real classrooms",
                "Practice handling difficult questions and common misconceptions",
                "Improve explanation clarity with targeted feedback",
                "Experiment with different teaching approaches risk-free",
                "Perfect timing and pacing before the real lesson",
                "Reduce first-day anxiety with thorough preparation",
            ]}
        />
    );
}
