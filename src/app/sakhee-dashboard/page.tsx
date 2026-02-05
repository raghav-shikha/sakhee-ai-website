"use client";

import { DashboardMobileDemo } from "@/components/shared/sakhee-mobile-demos";
import { SakheeProductPage } from "@/components/shared/sakhee-product-page";
import { motion } from "framer-motion";
import { BarChart3, Lightbulb, Target, TrendingUp } from "lucide-react";

export default function SakheeDashboardPage() {
    return (
        <SakheeProductPage
            productName="Sakhee Student Data Analyser"
            productTagline="AI-POWERED DATA INSIGHTS"
            productDescription="Turn sheets of student scores into visual, meaningful insights about learning gaps and growth. Make data-driven decisions with ease."
            productColor="#fea226"
            appHref="/dashboard"
            icon={
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
                >
                    <img
                        src="/Sakhee logos/Sakhee Dashboard.svg"
                        alt="Student Data Analyser"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            // Fallback to icon if SVG not found
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </motion.div>
            }
            interactiveDemo={<DashboardMobileDemo color="#fea226" />}
            features={[
                {
                    title: "Visual Insights",
                    description: "Transform raw scores into beautiful, understandable charts.",
                    icon: BarChart3,
                },
                {
                    title: "Learning Gaps",
                    description: "Identify which concepts students struggle with most.",
                    icon: Target,
                },
                {
                    title: "Progress Tracking",
                    description: "See how students improve over time with trend analysis.",
                    icon: TrendingUp,
                },
                {
                    title: "Actionable Reports",
                    description: "Get specific recommendations for intervention.",
                    icon: Lightbulb,
                },
            ]}
            howItWorks={[
                {
                    step: 1,
                    title: "Upload Scores",
                    description: "Import student scores from Excel, CSV, or enter manually.",
                },
                {
                    step: 2,
                    title: "AI Analysis",
                    description: "Our AI identifies patterns, gaps, and trends automatically.",
                },
                {
                    step: 3,
                    title: "View Insights",
                    description: "Explore interactive charts and student-level breakdowns.",
                },
                {
                    step: 4,
                    title: "Plan Actions",
                    description: "Use insights to plan targeted interventions and support.",
                },
            ]}
            benefits={[
                "Understand class-wide performance patterns at a glance",
                "Identify at-risk students before they fall behind",
                "Track improvement over multiple assessments",
                "Generate parent-ready progress reports",
                "Compare performance across sections or terms",
                "Save hours of manual data analysis work",
            ]}
        />
    );
}
