"use client";

import { SHIKHA, UNIFIED_RADIUS } from "@/components/home/ui";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  ClipboardCheck,
  FileText,
  Loader2,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  Brain,
  Lightbulb,
  Send,
  Mic,
} from "lucide-react";
import { useState, useEffect } from "react";

// Shared processing hook for smooth progress animation
function useProcessing(
  state: string,
  processingState: string,
  completeState: string,
  setState: (s: string) => void
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === processingState) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setState(completeState), 300);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
    }
    return () => clearInterval(interval);
  }, [state, processingState, completeState, setState]);

  return progress;
}

// ==================== SUBJECT EXPERT DEMO ====================
export function SubjectExpertDemo({ color = "#FFCA28" }: { color?: string }) {
  const [state, setState] = useState<"initial" | "typing" | "response">("initial");
  const [displayText, setDisplayText] = useState("");
  const fullResponse = "Photosynthesis occurs in two stages:\n\n1. Light Reactions (Thylakoid): Chlorophyll absorbs sunlight, splitting water molecules (H₂O) to produce ATP and NADPH. Oxygen is released.\n\n2. Calvin Cycle (Stroma): ATP and NADPH power the conversion of CO₂ into glucose (C₆H₁₂O₆).\n\nOverall: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂";

  useEffect(() => {
    if (state === "typing") {
      let i = 0;
      const interval = setInterval(() => {
        if (i < fullResponse.length) {
          setDisplayText(fullResponse.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setState("response");
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [state]);

  const handleAsk = () => {
    setDisplayText("");
    setState("typing");
  };
  const handleRefresh = () => setState("initial");

  return (
    <div className="w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          borderRadius: UNIFIED_RADIUS,
          border: `2px solid ${color}30`,
        }}
      >
        {/* Header with icon - More spacious */}
        <div className="p-5 md:p-6 border-b" style={{ borderColor: `${color}20` }}>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white"
              style={{
                background: `linear-gradient(135deg, ${color}, ${SHIKHA.orange})`,
                borderRadius: "14px",
              }}
            >
              <Brain className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg" style={{ color: SHIKHA.charcoal }}>
                Subject Expert
              </h3>
              <p className="text-xs md:text-sm" style={{ color: "#8A857B" }}>
                Deep knowledge at your fingertips
              </p>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="p-4 min-h-[180px]">
          <AnimatePresence mode="wait">
            {state === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {/* Sample question bubbles - More spacious */}
                <div className="flex flex-wrap gap-3 mb-2">
                  {["How does photosynthesis work?", "Explain mitosis", "Newton's laws"].map((q, i) => (
                    <motion.button
                      key={q}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={handleAsk}
                      className="px-4 py-2.5 text-sm font-medium bg-white hover:bg-gray-50 transition-all duration-200"
                      style={{
                        borderRadius: "24px",
                        border: `1.5px solid ${color}30`,
                        color: "#4A5568",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      }}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>

                {/* Input area - Modern minimalistic design */}
                <div className="flex gap-3 mt-6">
                  <div
                    className="flex-1 flex items-center gap-3 px-5 py-4"
                    style={{
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.8)",
                      border: `1.5px solid ${color}20`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Ask any subject question..."
                      className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
                      style={{ color: "#4A5568" }}
                      readOnly
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAsk}
                    className="px-5 py-4 text-white flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.orange})`,
                      borderRadius: "16px",
                      minWidth: "56px",
                    }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {(state === "typing" || state === "response") && (
              <motion.div
                key="response"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* User question */}
                <div className="flex justify-end">
                  <div
                    className="px-5 py-3 text-sm text-white max-w-[85%] shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.orange})`,
                      borderRadius: "20px 20px 6px 20px",
                    }}
                  >
                    How does photosynthesis work?
                  </div>
                </div>

                {/* AI response */}
                <div className="flex gap-3">
                  <div
                    className="w-9 h-9 flex-shrink-0 flex items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.orange})`,
                      borderRadius: "12px",
                    }}
                  >
                    <Brain className="w-5 h-5" />
                  </div>
                  <div
                    className="flex-1 px-5 py-4 text-sm bg-white whitespace-pre-line shadow-sm"
                    style={{
                      borderRadius: "6px 20px 20px 20px",
                      color: "#4A5568",
                      border: `1.5px solid ${color}15`,
                      lineHeight: "1.6",
                    }}
                  >
                    {displayText}
                    {state === "typing" && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        style={{ color: color }}
                      >
                        |
                      </motion.span>
                    )}
                  </div>
                </div>

                {state === "response" && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleRefresh}
                    className="flex items-center gap-2 text-sm font-medium mx-auto mt-4 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                    style={{ color: "#4A5568" }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Ask another question
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== PEDAGOGY EXPERT DEMO ====================
export function PedagogyExpertDemo({ color = "#7B88C3" }: { color?: string }) {
  const [state, setState] = useState<"initial" | "typing" | "response">("initial");
  const [displayText, setDisplayText] = useState("");
  const fullResponse = "Here are proven strategies for engaging quiet students:\n\n✓ Think-Pair-Share: Give time to think, discuss with a partner, then share\n\n✓ Written First: Have students write responses before verbal sharing\n\n✓ Small Groups: Create safe 3-4 person discussion groups\n\n✓ Wait Time: Allow 5-7 seconds after questions\n\n✓ Private Channels: Use exit tickets or chat for participation";

  useEffect(() => {
    if (state === "typing") {
      let i = 0;
      const interval = setInterval(() => {
        if (i < fullResponse.length) {
          setDisplayText(fullResponse.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setState("response");
        }
      }, 12);
      return () => clearInterval(interval);
    }
  }, [state]);

  const handleAsk = () => {
    setDisplayText("");
    setState("typing");
  };
  const handleRefresh = () => setState("initial");

  return (
    <div className="w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          borderRadius: UNIFIED_RADIUS,
          border: `2px solid ${color}30`,
        }}
      >
        {/* Header - More spacious */}
        <div className="p-5 md:p-6 border-b" style={{ borderColor: `${color}20` }}>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white"
              style={{
                background: `linear-gradient(135deg, ${color}, ${SHIKHA.purple})`,
                borderRadius: "14px",
              }}
            >
              <Lightbulb className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg" style={{ color: SHIKHA.charcoal }}>
                Pedagogy Expert
              </h3>
              <p className="text-xs md:text-sm" style={{ color: "#8A857B" }}>
                Teaching strategies & best practices
              </p>
            </div>
          </div>
        </div>

        {/* Chat area - More spacious */}
        <div className="p-6 md:p-8 min-h-[240px]">
          <AnimatePresence mode="wait">
            {state === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {/* Sample questions - More spacious */}
                <div className="flex flex-wrap gap-3 mb-2">
                  {["Engage quiet students?", "Differentiation tips", "Classroom management"].map((q, i) => (
                    <motion.button
                      key={q}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={handleAsk}
                      className="px-4 py-2.5 text-sm font-medium bg-white hover:bg-gray-50 transition-all duration-200"
                      style={{
                        borderRadius: "24px",
                        border: `1.5px solid ${color}30`,
                        color: "#4A5568",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      }}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>

                {/* Input - Modern minimalistic design */}
                <div className="flex gap-3 mt-6">
                  <div
                    className="flex-1 flex items-center gap-3 px-5 py-4"
                    style={{
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.8)",
                      border: `1.5px solid ${color}20`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Ask about teaching strategies..."
                      className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
                      style={{ color: "#4A5568" }}
                      readOnly
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAsk}
                    className="px-5 py-4 text-white flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.purple})`,
                      borderRadius: "16px",
                      minWidth: "56px",
                    }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {(state === "typing" || state === "response") && (
              <motion.div
                key="response"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* User question */}
                <div className="flex justify-end">
                  <div
                    className="px-5 py-3 text-sm text-white max-w-[85%] shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.purple})`,
                      borderRadius: "20px 20px 6px 20px",
                    }}
                  >
                    How to engage quiet students?
                  </div>
                </div>

                {/* AI response */}
                <div className="flex gap-3">
                  <div
                    className="w-9 h-9 flex-shrink-0 flex items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.purple})`,
                      borderRadius: "12px",
                    }}
                  >
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div
                    className="flex-1 px-5 py-4 text-sm bg-white whitespace-pre-line shadow-sm"
                    style={{
                      borderRadius: "6px 20px 20px 20px",
                      color: "#4A5568",
                      border: `1.5px solid ${color}15`,
                      lineHeight: "1.6",
                    }}
                  >
                    {displayText}
                    {state === "typing" && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        style={{ color: color }}
                      >
                        |
                      </motion.span>
                    )}
                  </div>
                </div>

                {state === "response" && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleRefresh}
                    className="flex items-center gap-2 text-sm font-medium mx-auto mt-4 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                    style={{ color: "#4A5568" }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Ask another question
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== LEARNING GOALS DEMO ====================
export function LearningGoalsDemo({ color = "#29ABE2" }: { color?: string }) {
  const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
  const progress = useProcessing(state, "processing", "complete", setState as (s: string) => void);

  const handleGenerate = () => setState("processing");
  const handleRefresh = () => setState("initial");

  const goals = [
    { level: "Remember", goal: "Define the greenhouse effect and identify its main causes" },
    { level: "Understand", goal: "Explain how human activities contribute to climate change" },
    { level: "Apply", goal: "Calculate carbon footprints for different daily activities" },
    { level: "Analyze", goal: "Compare climate data trends across different decades" },
    { level: "Evaluate", goal: "Assess the effectiveness of various mitigation strategies" },
    { level: "Create", goal: "Design an action plan to reduce school's carbon footprint" },
  ];

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {state === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={handleGenerate}
              className="cursor-pointer overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              {/* Header - More spacious */}
              <div className="p-5 md:p-6 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.teal})`,
                      borderRadius: "14px",
                    }}
                  >
                    <Target className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg" style={{ color: SHIKHA.charcoal }}>
                      Learning Goals Generator
                    </h3>
                    <p className="text-xs" style={{ color: "#8A857B" }}>
                      Bloom&apos;s taxonomy aligned objectives
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="bg-white p-4 mb-4" style={{ borderRadius: "12px" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-xs font-medium" style={{ color: SHIKHA.charcoal }}>
                      Topic: Climate Change & Global Warming
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[10px]" style={{ color: "#8A857B" }}>
                    <span className="px-2 py-1 bg-gray-50 rounded-full">Grade 9</span>
                    <span className="px-2 py-1 bg-gray-50 rounded-full">Environmental Science</span>
                    <span className="px-2 py-1 bg-gray-50 rounded-full">NGSS Aligned</span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center gap-2 py-3 px-6 text-white font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.teal})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Learning Goals</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {state === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="p-6"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="text-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-3"
                >
                  <Loader2 className="w-8 h-8" style={{ color }} />
                </motion.div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: SHIKHA.charcoal }}>
                  Aligning to Bloom&apos;s Taxonomy
                </h3>
                <p className="text-xs" style={{ color: "#8A857B" }}>
                  Creating objectives for each cognitive level...
                </p>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {state === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}10, white)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-5 md:p-6 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" style={{ color: SHIKHA.teal }} />
                  <span className="font-semibold text-base md:text-lg" style={{ color: SHIKHA.charcoal }}>
                    6 Learning Goals Generated
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6 space-y-3 max-h-[280px] overflow-y-auto">
                {goals.map((item, i) => (
                  <motion.div
                    key={item.level}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 p-3 md:p-4 bg-white rounded-lg"
                  >
                    <span
                      className="text-xs font-bold px-3 py-1.5 h-fit text-white"
                      style={{ backgroundColor: color, borderRadius: "8px" }}
                    >
                      {item.level}
                    </span>
                    <span className="text-sm" style={{ color: "#4A5568" }}>
                      {item.goal}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t" style={{ borderColor: `${color}20` }}>
                <motion.button
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.teal})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate for Another Topic
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== UNIT PLAN DEMO ====================
export function UnitPlanDemo({ color = "#6B5CA5" }: { color?: string }) {
  const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
  const progress = useProcessing(state, "processing", "complete", setState as (s: string) => void);

  const handleGenerate = () => setState("processing");
  const handleRefresh = () => setState("initial");

  const weeks = [
    { week: 1, title: "Foundations & Variables", lessons: 5, activities: ["Intro to variables", "Expressions", "Evaluating"] },
    { week: 2, title: "Equations & Operations", lessons: 5, activities: ["One-step equations", "Two-step", "Word problems"] },
    { week: 3, title: "Application & Review", lessons: 5, activities: ["Real-world", "Problem solving", "Assessment"] },
  ];

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {state === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={handleGenerate}
              className="cursor-pointer overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.blue})`,
                      borderRadius: "10px",
                    }}
                  >
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: SHIKHA.charcoal }}>
                      Unit Plan Creator
                    </h3>
                    <p className="text-xs" style={{ color: "#8A857B" }}>
                      Complete unit with lesson flow
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="bg-white p-4 mb-4" style={{ borderRadius: "12px" }}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-xs font-medium" style={{ color: SHIKHA.charcoal }}>
                        Introduction to Algebra
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SHIKHA.blue }} />
                      <span className="text-xs" style={{ color: "#8A857B" }}>
                        Grade 7 • 15 Lessons • 3 Weeks
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center gap-2 py-3 px-6 text-white font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.blue})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Unit Plan</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {state === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="p-6"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="text-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-3"
                >
                  <Loader2 className="w-8 h-8" style={{ color }} />
                </motion.div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: SHIKHA.charcoal }}>
                  Structuring Your Unit
                </h3>
                <p className="text-xs" style={{ color: "#8A857B" }}>
                  Creating lessons, activities, and assessments...
                </p>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {state === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}10, white)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" style={{ color: SHIKHA.teal }} />
                    <span className="font-semibold text-sm" style={{ color: SHIKHA.charcoal }}>
                      Unit Plan Ready
                    </span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full" style={{ color: "#8A857B" }}>
                    15 Lessons
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {weeks.map((w, i) => (
                  <motion.div
                    key={w.week}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-white p-3 rounded-lg"
                    style={{ border: `1px solid ${SHIKHA.sand}` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 text-white"
                        style={{ backgroundColor: color, borderRadius: "6px" }}
                      >
                        Week {w.week}
                      </span>
                      <span className="text-[10px]" style={{ color: "#8A857B" }}>
                        {w.lessons} lessons
                      </span>
                    </div>
                    <p className="text-xs font-medium mb-1" style={{ color: SHIKHA.charcoal }}>
                      {w.title}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {w.activities.map((a) => (
                        <span
                          key={a}
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${color}15`, color }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t" style={{ borderColor: `${color}20` }}>
                <motion.button
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.blue})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Create Another Unit
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== LESSON PLAN DEMO ====================
export function LessonPlanDemo({ color = "#F8A049" }: { color?: string }) {
  const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
  const progress = useProcessing(state, "processing", "complete", setState as (s: string) => void);

  const handleGenerate = () => setState("processing");
  const handleRefresh = () => setState("initial");

  const lessonParts = [
    { phase: "Hook", duration: "5 min", activity: "Real-world quadratic problem", icon: "🎯" },
    { phase: "Instruction", duration: "15 min", activity: "Factoring method with examples", icon: "📖" },
    { phase: "Practice", duration: "20 min", activity: "Guided → Independent work", icon: "✏️" },
    { phase: "Wrap-up", duration: "5 min", activity: "Exit ticket & reflection", icon: "📝" },
  ];

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {state === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={handleGenerate}
              className="cursor-pointer overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.coral})`,
                      borderRadius: "10px",
                    }}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: SHIKHA.charcoal }}>
                      Lesson Plan Builder
                    </h3>
                    <p className="text-xs" style={{ color: "#8A857B" }}>
                      Complete lesson with timing & activities
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="bg-white p-4 mb-4" style={{ borderRadius: "12px" }}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-xs font-medium" style={{ color: SHIKHA.charcoal }}>
                        Topic: Quadratic Equations
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SHIKHA.coral }} />
                      <span className="text-xs" style={{ color: "#8A857B" }}>
                        Grade 8 • Mathematics • 45 minutes
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center gap-2 py-3 px-6 text-white font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.coral})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Lesson Plan</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {state === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="p-6"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="text-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-3"
                >
                  <Loader2 className="w-8 h-8" style={{ color }} />
                </motion.div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: SHIKHA.charcoal }}>
                  Crafting Your Lesson
                </h3>
                <p className="text-xs" style={{ color: "#8A857B" }}>
                  Designing activities, timing, and materials...
                </p>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {state === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}10, white)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" style={{ color: SHIKHA.teal }} />
                    <span className="font-semibold text-sm" style={{ color: SHIKHA.charcoal }}>
                      Lesson Plan Ready
                    </span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full" style={{ color: "#8A857B" }}>
                    45 min
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                {lessonParts.map((part, i) => (
                  <motion.div
                    key={part.phase}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-white p-3 rounded-lg"
                    style={{ border: `1px solid ${SHIKHA.sand}` }}
                  >
                    <span className="text-lg">{part.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold" style={{ color: SHIKHA.charcoal }}>
                          {part.phase}
                        </span>
                        <span
                          className="text-[10px] px-2 py-0.5 text-white"
                          style={{ backgroundColor: color, borderRadius: "10px" }}
                        >
                          {part.duration}
                        </span>
                      </div>
                      <p className="text-[11px]" style={{ color: "#8A857B" }}>
                        {part.activity}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t" style={{ borderColor: `${color}20` }}>
                <motion.button
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.coral})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate Another Lesson
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== ASSESSMENT DEMO ====================
export function AssessmentDemo({ color = "#3BB77E" }: { color?: string }) {
  const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
  const progress = useProcessing(state, "processing", "complete", setState as (s: string) => void);

  const handleGenerate = () => setState("processing");
  const handleRefresh = () => setState("initial");

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {state === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={handleGenerate}
              className="cursor-pointer overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.teal})`,
                      borderRadius: "10px",
                    }}
                  >
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: SHIKHA.charcoal }}>
                      Assessment Generator
                    </h3>
                    <p className="text-xs" style={{ color: "#8A857B" }}>
                      Tests with rubrics & answer keys
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="bg-white p-4 mb-4" style={{ borderRadius: "12px" }}>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { type: "MCQ", count: 10 },
                      { type: "Short", count: 5 },
                      { type: "Essay", count: 2 },
                    ].map((q) => (
                      <div key={q.type} className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold" style={{ color }}>{q.count}</div>
                        <div className="text-[10px]" style={{ color: "#8A857B" }}>{q.type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center gap-2 py-3 px-6 text-white font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.teal})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Assessment</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {state === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="p-6"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="text-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-3"
                >
                  <Loader2 className="w-8 h-8" style={{ color }} />
                </motion.div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: SHIKHA.charcoal }}>
                  Creating Questions
                </h3>
                <p className="text-xs" style={{ color: "#8A857B" }}>
                  Generating varied difficulty levels...
                </p>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {state === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}10, white)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" style={{ color: SHIKHA.teal }} />
                  <span className="font-semibold text-sm" style={{ color: SHIKHA.charcoal }}>
                    Assessment Ready
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: SHIKHA.sand }}>
                  <span className="text-xs" style={{ color: "#8A857B" }}>Total Questions</span>
                  <span className="text-sm font-bold" style={{ color: SHIKHA.charcoal }}>17</span>
                </div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: SHIKHA.sand }}>
                  <span className="text-xs" style={{ color: "#8A857B" }}>Total Marks</span>
                  <span className="text-sm font-bold" style={{ color: SHIKHA.charcoal }}>60</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs" style={{ color: "#8A857B" }}>Difficulty Mix</span>
                  <div className="flex gap-1">
                    {[
                      { label: "Easy", color: SHIKHA.teal },
                      { label: "Med", color: SHIKHA.orange },
                      { label: "Hard", color: SHIKHA.coral },
                    ].map((d) => (
                      <span
                        key={d.label}
                        className="text-[10px] px-2 py-0.5 text-white"
                        style={{ backgroundColor: d.color, borderRadius: "10px" }}
                      >
                        {d.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="flex-1 p-2 bg-gray-50 rounded-lg text-center">
                    <div className="text-lg">📋</div>
                    <div className="text-[10px]" style={{ color: "#8A857B" }}>Question Paper</div>
                  </div>
                  <div className="flex-1 p-2 bg-gray-50 rounded-lg text-center">
                    <div className="text-lg">✅</div>
                    <div className="text-[10px]" style={{ color: "#8A857B" }}>Answer Key</div>
                  </div>
                  <div className="flex-1 p-2 bg-gray-50 rounded-lg text-center">
                    <div className="text-lg">📊</div>
                    <div className="text-[10px]" style={{ color: "#8A857B" }}>Rubric</div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t" style={{ borderColor: `${color}20` }}>
                <motion.button
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.teal})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate Another
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== EXAM GENERATOR DEMO ====================
export function ExamGeneratorDemo({ color = "#E45B5B" }: { color?: string }) {
  const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
  const progress = useProcessing(state, "processing", "complete", setState as (s: string) => void);

  const handleGenerate = () => setState("processing");
  const handleRefresh = () => setState("initial");

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {state === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={handleGenerate}
              className="cursor-pointer overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.orange})`,
                      borderRadius: "10px",
                    }}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: SHIKHA.charcoal }}>
                      Exam Paper Generator
                    </h3>
                    <p className="text-xs" style={{ color: "#8A857B" }}>
                      Board-pattern papers with marking scheme
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="bg-white p-4 mb-4" style={{ borderRadius: "12px" }}>
                  <div className="text-xs mb-3" style={{ color: SHIKHA.charcoal }}>
                    <span className="font-bold">CBSE Class 10</span> • Mathematics
                  </div>
                  <div className="space-y-1 text-[10px]" style={{ color: "#8A857B" }}>
                    <div className="flex justify-between">
                      <span>Section A: MCQs</span>
                      <span>20 marks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Section B: Short Answer</span>
                      <span>10 marks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Section C: Long Answer</span>
                      <span>30 marks</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center gap-2 py-3 px-6 text-white font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.orange})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Exam Paper</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {state === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="p-6"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="text-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-3"
                >
                  <Loader2 className="w-8 h-8" style={{ color }} />
                </motion.div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: SHIKHA.charcoal }}>
                  Creating Exam Paper
                </h3>
                <p className="text-xs" style={{ color: "#8A857B" }}>
                  Following board pattern & guidelines...
                </p>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {state === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}10, white)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" style={{ color: SHIKHA.teal }} />
                  <span className="font-semibold text-sm" style={{ color: SHIKHA.charcoal }}>
                    Exam Paper Ready
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold" style={{ color }}>31</div>
                    <div className="text-[10px]" style={{ color: "#8A857B" }}>Questions</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold" style={{ color }}>60</div>
                    <div className="text-[10px]" style={{ color: "#8A857B" }}>Marks</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold" style={{ color }}>3h</div>
                    <div className="text-[10px]" style={{ color: "#8A857B" }}>Duration</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-white rounded-lg text-center" style={{ border: `1px solid ${SHIKHA.sand}` }}>
                    <FileText className="w-5 h-5 mx-auto mb-1" style={{ color }} />
                    <div className="text-[10px] font-medium" style={{ color: SHIKHA.charcoal }}>Question Paper</div>
                  </div>
                  <div className="flex-1 p-3 bg-white rounded-lg text-center" style={{ border: `1px solid ${SHIKHA.sand}` }}>
                    <CheckCircle className="w-5 h-5 mx-auto mb-1" style={{ color: SHIKHA.teal }} />
                    <div className="text-[10px] font-medium" style={{ color: SHIKHA.charcoal }}>Model Answers</div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t" style={{ borderColor: `${color}20` }}>
                <motion.button
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.orange})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate Another Exam
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== ASSESSMENT CHECKER DEMO ====================
export function AssessmentCheckerDemo({ color = "#F97316" }: { color?: string }) {
  const [state, setState] = useState<"initial" | "processing" | "feedback">("initial");
  const progress = useProcessing(state, "processing", "feedback", setState as (s: string) => void);

  const handleSubmit = () => setState("processing");
  const handleRefresh = () => setState("initial");

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {state === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={handleSubmit}
              className="cursor-pointer overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.coral})`,
                      borderRadius: "10px",
                    }}
                  >
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: SHIKHA.charcoal }}>
                      Assessment Checker
                    </h3>
                    <p className="text-xs" style={{ color: "#8A857B" }}>
                      AI-powered grading & feedback
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div
                  className="bg-white p-4 mb-4 border-2 border-dashed"
                  style={{ borderRadius: "12px", borderColor: `${color}40` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 flex items-center justify-center"
                      style={{ backgroundColor: `${color}15`, borderRadius: "10px" }}
                    >
                      <FileText className="w-6 h-6" style={{ color }} />
                    </div>
                    <div>
                      <div className="text-xs font-medium" style={{ color: SHIKHA.charcoal }}>
                        Student_Submissions.pdf
                      </div>
                      <div className="text-[10px]" style={{ color: "#8A857B" }}>
                        25 answer sheets ready to grade
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center gap-2 py-3 px-6 text-white font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.coral})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start AI Grading</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {state === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="p-6"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="text-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-3"
                >
                  <Loader2 className="w-8 h-8" style={{ color }} />
                </motion.div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: SHIKHA.charcoal }}>
                  Grading Submissions
                </h3>
                <p className="text-xs mb-2" style={{ color: "#8A857B" }}>
                  Analyzing answers and providing feedback...
                </p>
                <span className="text-xs font-medium" style={{ color }}>
                  {Math.round(progress / 4)} of 25 graded
                </span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {state === "feedback" && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}10, white)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b text-center" style={{ borderColor: `${color}20` }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle className="w-12 h-12 mx-auto mb-2" style={{ color: SHIKHA.teal }} />
                </motion.div>
                <h3 className="font-bold text-lg" style={{ color: SHIKHA.charcoal }}>
                  Grading Complete!
                </h3>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold" style={{ color: SHIKHA.teal }}>78%</div>
                    <div className="text-[10px]" style={{ color: "#8A857B" }}>Class Average</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold" style={{ color }}>25</div>
                    <div className="text-[10px]" style={{ color: "#8A857B" }}>Papers Graded</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 bg-white rounded-lg" style={{ border: `1px solid ${SHIKHA.sand}` }}>
                    <span style={{ color: "#8A857B" }}>Highest Score</span>
                    <span className="font-bold" style={{ color: SHIKHA.teal }}>95%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-white rounded-lg" style={{ border: `1px solid ${SHIKHA.sand}` }}>
                    <span style={{ color: "#8A857B" }}>Lowest Score</span>
                    <span className="font-bold" style={{ color: SHIKHA.coral }}>52%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t" style={{ borderColor: `${color}20` }}>
                <motion.button
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.coral})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Grade More Submissions
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== INSTRUCTIONAL COACH DEMO ====================
export function InstructionalCoachDemo({ color = "#c56665" }: { color?: string }) {
  const [state, setState] = useState<"initial" | "processing" | "feedback">("initial");
  const progress = useProcessing(state, "processing", "feedback", setState as (s: string) => void);

  const handleAnalyze = () => setState("processing");
  const handleRefresh = () => setState("initial");

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {state === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={handleAnalyze}
              className="cursor-pointer overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: `${color}20` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${SHIKHA.teal})`,
                      borderRadius: "10px",
                    }}
                  >
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: SHIKHA.charcoal }}>
                      Instructional Coach
                    </h3>
                    <p className="text-xs" style={{ color: "#8A857B" }}>
                      AI-powered teaching feedback
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                {/* Animated sound wave visualization */}
                <div className="flex items-end justify-center gap-1 h-16 mb-4">
                  {[...Array(25)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full"
                      style={{ backgroundColor: color }}
                      animate={{
                        height: `${(Math.sin(i * 0.4) + 1) * 35 + 20}%`,
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.03,
                      }}
                    />
                  ))}
                </div>

                <div className="bg-white p-3 mb-4 text-center" style={{ borderRadius: "12px" }}>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Mic className="w-4 h-4" style={{ color }} />
                    <span className="text-xs font-medium" style={{ color: SHIKHA.charcoal }}>
                      Class Session Recorded
                    </span>
                  </div>
                  <p className="text-[10px]" style={{ color: "#8A857B" }}>
                    Grade 8 Mathematics • Quadratic Equations • 45 min
                  </p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center gap-2 py-3 px-6 text-white font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.teal})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get AI Coaching Feedback</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {state === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="p-6"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="text-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-3"
                >
                  <Loader2 className="w-8 h-8" style={{ color }} />
                </motion.div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: SHIKHA.charcoal }}>
                  Analyzing Your Teaching
                </h3>
                <p className="text-xs" style={{ color: "#8A857B" }}>
                  Reviewing engagement, pacing, clarity...
                </p>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {state === "feedback" && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}10, white)`,
                borderRadius: UNIFIED_RADIUS,
                border: `2px solid ${color}30`,
              }}
            >
              <div className="p-4 border-b text-center" style={{ borderColor: `${color}20` }}>
                <div
                  className="inline-flex items-center justify-center w-14 h-14 text-white mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.teal})`,
                    borderRadius: "14px",
                  }}
                >
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-sm" style={{ color: SHIKHA.charcoal }}>
                  Coaching Feedback
                </h3>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className="text-3xl font-bold" style={{ color }}>8.2</span>
                  <span className="text-lg" style={{ color: "#8A857B" }}>/10</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Strengths */}
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${SHIKHA.teal}10`, border: `1px solid ${SHIKHA.teal}30` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4" style={{ color: SHIKHA.teal }} />
                    <span className="text-xs font-bold" style={{ color: SHIKHA.charcoal }}>Strengths</span>
                  </div>
                  <p className="text-[11px]" style={{ color: "#5A564E" }}>
                    Excellent use of real-world examples. Clear explanations with good pacing.
                  </p>
                </div>

                {/* Areas to improve */}
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${SHIKHA.orange}10`, border: `1px solid ${SHIKHA.orange}30` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4" style={{ color: SHIKHA.orange }} />
                    <span className="text-xs font-bold" style={{ color: SHIKHA.charcoal }}>Key Action</span>
                  </div>
                  <p className="text-[11px]" style={{ color: "#5A564E" }}>
                    Increase wait time after questions—aim for 3-5 seconds before calling on students.
                  </p>
                </div>
              </div>

              <div className="p-4 border-t" style={{ borderColor: `${color}20` }}>
                <motion.button
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${SHIKHA.teal})`,
                    borderRadius: UNIFIED_RADIUS,
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Analyze Another Session
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
