"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    BarChart3,
    CheckCircle,
    FileText,
    Layers,
    Loader2,
    MessageSquare,
    Sparkles,
    Target,
    Upload,
    Users
} from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Mobile-Optimized Interactive Demos
 * Purpose-built for phone mockup (~260px width)
 * Each demo shows: Initial → Processing → Complete states
 */

// ==================== LESSON PLAN MOBILE DEMO ====================
export function LessonPlanMobileDemo({ color = "#F8A049" }: { color?: string }) {
    const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (state === "processing") {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setState("complete"), 200);
                        return 100;
                    }
                    return prev + 4;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [state]);

    const reset = () => {
        setState("initial");
        setProgress(0);
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {state === "initial" && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        {/* Mini Form */}
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <p className="text-[10px] font-medium text-gray-500 mb-2">TOPIC</p>
                            <p className="text-xs font-semibold text-gray-800">Quadratic Equations</p>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">GRADE</p>
                                <p className="text-xs font-semibold text-gray-800">8</p>
                            </div>
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">TIME</p>
                                <p className="text-xs font-semibold text-gray-800">45 min</p>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setState("processing")}
                            className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2"
                            style={{ backgroundColor: color }}
                        >
                            <Sparkles className="w-4 h-4" />
                            Generate Lesson Plan
                        </motion.button>
                    </motion.div>
                )}

                {state === "processing" && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="w-8 h-8" style={{ color }} />
                        </motion.div>
                        <p className="text-sm font-medium mt-3" style={{ color }}>
                            Crafting lesson plan...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                            <motion.div
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: color, width: `${progress}%` }}
                            />
                        </div>
                    </motion.div>
                )}

                {state === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold" style={{ color }}>Lesson Timeline</p>
                            <button onClick={reset} className="text-[10px] text-gray-400 hover:text-gray-600">↺ Reset</button>
                        </div>

                        {/* Horizontal Timeline Bar */}
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] text-gray-500">0 min</span>
                                <span className="text-[10px] font-medium text-gray-700">45 min total</span>
                            </div>

                            {/* The timeline bar */}
                            <div className="flex h-8 rounded-lg overflow-hidden border border-gray-200">
                                {[
                                    { name: "Hook", duration: 5, color: "#10B981" },
                                    { name: "Explain", duration: 15, color: "#F8A049" },
                                    { name: "Practice", duration: 15, color: "#6366F1" },
                                    { name: "Exit", duration: 10, color: "#EC4899" },
                                ].map((seg, i) => (
                                    <motion.div
                                        key={seg.name}
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: i * 0.12, duration: 0.3 }}
                                        className="flex items-center justify-center origin-left"
                                        style={{
                                            width: `${(seg.duration / 45) * 100}%`,
                                            backgroundColor: seg.color,
                                        }}
                                    >
                                        <span className="text-[8px] font-bold text-white truncate px-1">{seg.name}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Time markers */}
                            <div className="flex justify-between mt-1">
                                <span className="text-[8px] text-gray-400">5m</span>
                                <span className="text-[8px] text-gray-400">20m</span>
                                <span className="text-[8px] text-gray-400">35m</span>
                                <span className="text-[8px] text-gray-400">45m</span>
                            </div>
                        </div>

                        {/* Activity Details */}
                        <div className="space-y-2">
                            {[
                                { name: "Hook", time: "5 min", desc: "Real-world connection question", color: "#10B981" },
                                { name: "Explain", time: "15 min", desc: "Direct instruction + examples", color: "#F8A049" },
                                { name: "Practice", time: "15 min", desc: "Guided problems in pairs", color: "#6366F1" },
                                { name: "Exit Ticket", time: "10 min", desc: "3 quick check questions", color: "#EC4899" },
                            ].map((act, i) => (
                                <motion.div
                                    key={act.name}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.08 }}
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ backgroundColor: act.color }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-semibold text-gray-800">{act.name}</span>
                                            <span className="text-[10px] text-gray-500">{act.time}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 truncate">{act.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ==================== EXAM GENERATOR MOBILE DEMO ====================
export function ExamGeneratorMobileDemo({ color = "#E45B5B" }: { color?: string }) {
    const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (state === "processing") {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setState("complete"), 200);
                        return 100;
                    }
                    return prev + 3;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [state]);

    const reset = () => {
        setState("initial");
        setProgress(0);
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {state === "initial" && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <p className="text-[10px] font-medium text-gray-500 mb-2">SUBJECT</p>
                            <p className="text-xs font-semibold text-gray-800">Mathematics</p>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">CLASS</p>
                                <p className="text-xs font-semibold text-gray-800">10</p>
                            </div>
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">MARKS</p>
                                <p className="text-xs font-semibold text-gray-800">80</p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setState("processing")}
                            className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2"
                            style={{ backgroundColor: color }}
                        >
                            <FileText className="w-4 h-4" />
                            Generate Exam Paper
                        </motion.button>
                    </motion.div>
                )}

                {state === "processing" && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="w-8 h-8" style={{ color }} />
                        </motion.div>
                        <p className="text-sm font-medium mt-3" style={{ color }}>
                            Generating exam...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                            <motion.div
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: color, width: `${progress}%` }}
                            />
                        </div>
                    </motion.div>
                )}

                {state === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold" style={{ color }}>Exam Paper (80 marks)</p>
                            <button onClick={reset} className="text-[10px] text-gray-400">↺ Reset</button>
                        </div>

                        {/* Question Previews */}
                        {[
                            {
                                num: 1,
                                type: "MCQ",
                                tag: "Recall",
                                tagColor: "#22C55E",
                                marks: 2,
                                question: "Which of the following is NOT a quadratic equation?",
                                options: ["x² + 5x = 0", "2x³ - x = 1", "x² = 4"]
                            },
                            {
                                num: 2,
                                type: "Short",
                                tag: "Analyse",
                                tagColor: "#F59E0B",
                                marks: 4,
                                question: "Solve by factorization: x² - 7x + 12 = 0"
                            },
                            {
                                num: 3,
                                type: "Long",
                                tag: "Predict",
                                tagColor: "#8B5CF6",
                                marks: 6,
                                question: "A rectangular field has area 600 m². If length exceeds breadth by 5 m, find dimensions."
                            },
                        ].map((q, i) => (
                            <motion.div
                                key={q.num}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.12 }}
                                className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <span
                                            className="text-[9px] px-1.5 py-0.5 rounded font-bold text-white"
                                            style={{ backgroundColor: color }}
                                        >
                                            Q{q.num}
                                        </span>
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                                            {q.type}
                                        </span>
                                        <span
                                            className="text-[8px] px-1.5 py-0.5 rounded font-medium text-white"
                                            style={{ backgroundColor: q.tagColor }}
                                        >
                                            {q.tag}
                                        </span>
                                    </div>
                                    <span className="text-[9px] text-gray-500">{q.marks}m</span>
                                </div>
                                <p className="text-[11px] text-gray-800 leading-snug mb-2">{q.question}</p>
                                {q.options && (
                                    <div className="flex flex-wrap gap-1">
                                        {q.options.map((opt, j) => (
                                            <span key={j} className="text-[9px] px-1.5 py-0.5 bg-gray-50 rounded text-gray-600 border border-gray-100">
                                                {String.fromCharCode(65 + j)}) {opt}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {/* Summary footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-between pt-2 border-t border-gray-100"
                        >
                            <span className="text-[10px] text-gray-500">+ 17 more questions</span>
                            <span className="text-[10px] font-medium" style={{ color }}>View Full Paper →</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ==================== UNIT PLAN MOBILE DEMO ====================
export function UnitPlanMobileDemo({ color = "#6B5CA5" }: { color?: string }) {
    const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (state === "processing") {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setState("complete"), 200);
                        return 100;
                    }
                    return prev + 3;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [state]);

    const reset = () => {
        setState("initial");
        setProgress(0);
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {state === "initial" && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <p className="text-[10px] font-medium text-gray-500 mb-2">UNIT TOPIC</p>
                            <p className="text-xs font-semibold text-gray-800">Introduction to Algebra</p>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">GRADE</p>
                                <p className="text-xs font-semibold text-gray-800">7</p>
                            </div>
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">WEEKS</p>
                                <p className="text-xs font-semibold text-gray-800">3</p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setState("processing")}
                            className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2"
                            style={{ backgroundColor: color }}
                        >
                            <Layers className="w-4 h-4" />
                            Generate Unit Plan
                        </motion.button>
                    </motion.div>
                )}

                {state === "processing" && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="w-8 h-8" style={{ color }} />
                        </motion.div>
                        <p className="text-sm font-medium mt-3" style={{ color }}>
                            Planning unit...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                            <motion.div
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: color, width: `${progress}%` }}
                            />
                        </div>
                    </motion.div>
                )}

                {state === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold" style={{ color }}>3-Week Unit Plan</p>
                            <button onClick={reset} className="text-[10px] text-gray-400">↺ Reset</button>
                        </div>

                        {/* Timeline Strip */}
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            {/* Week Headers */}
                            <div className="flex mb-3">
                                {[1, 2, 3].map((week) => (
                                    <div key={week} className="flex-1 text-center">
                                        <span
                                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: `${color}15`, color }}
                                        >
                                            Week {week}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Timeline with dots and connecting line */}
                            <div className="relative">
                                {/* Connecting line */}
                                <div className="absolute top-3 left-4 right-4 h-0.5 bg-gray-200" />

                                {/* Lesson dots */}
                                <div className="flex justify-between px-2 relative">
                                    {[
                                        { num: 1, week: 1 },
                                        { num: 2, week: 1 },
                                        { num: 3, week: 2 },
                                        { num: 4, week: 2 },
                                        { num: 5, week: 3 },
                                    ].map((lesson, i) => (
                                        <motion.div
                                            key={lesson.num}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.1 + i * 0.08 }}
                                            className="flex flex-col items-center"
                                        >
                                            <div
                                                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
                                                style={{ backgroundColor: color }}
                                            >
                                                {lesson.num}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Lesson Details */}
                        <div className="space-y-2">
                            {[
                                { num: 1, title: "Intro to Variables", mode: "Direct" },
                                { num: 2, title: "Writing Expressions", mode: "Guided" },
                                { num: 3, title: "Solving Equations", mode: "Group" },
                                { num: 4, title: "Word Problems", mode: "Practice" },
                                { num: 5, title: "Unit Assessment", mode: "Assessment" },
                            ].map((lesson, i) => (
                                <motion.div
                                    key={lesson.num}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.06 }}
                                    className="flex items-center gap-2 py-1"
                                >
                                    <span
                                        className="text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold text-white shrink-0"
                                        style={{ backgroundColor: color }}
                                    >
                                        {lesson.num}
                                    </span>
                                    <span className="text-[11px] font-medium text-gray-800 flex-1 truncate">{lesson.title}</span>
                                    <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">{lesson.mode}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ==================== LEARNING GOALS MOBILE DEMO ====================
export function LearningGoalsMobileDemo({ color = "#29ABE2" }: { color?: string }) {
    const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (state === "processing") {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setState("complete"), 200);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [state]);

    const reset = () => {
        setState("initial");
        setProgress(0);
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {state === "initial" && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <p className="text-[10px] font-medium text-gray-500 mb-2">TOPIC</p>
                            <p className="text-xs font-semibold text-gray-800">Climate Change</p>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">SUBJECT</p>
                                <p className="text-xs font-semibold text-gray-800">Science</p>
                            </div>
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">GRADE</p>
                                <p className="text-xs font-semibold text-gray-800">9</p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setState("processing")}
                            className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2"
                            style={{ backgroundColor: color }}
                        >
                            <Target className="w-4 h-4" />
                            Generate Goals
                        </motion.button>
                    </motion.div>
                )}

                {state === "processing" && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="w-8 h-8" style={{ color }} />
                        </motion.div>
                        <p className="text-sm font-medium mt-3" style={{ color }}>
                            Creating goals...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                            <motion.div
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: color, width: `${progress}%` }}
                            />
                        </div>
                    </motion.div>
                )}

                {state === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-bold" style={{ color }}>Learning Goals</p>
                            <button onClick={reset} className="text-[10px] text-gray-400">↺ Reset</button>
                        </div>

                        {/* CK - Conceptual Knowledge */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="rounded-lg overflow-hidden border border-purple-200 bg-purple-50"
                        >
                            <div className="px-3 py-2 bg-purple-100 border-b border-purple-200">
                                <span className="text-[10px] font-bold text-purple-700">CK · Conceptual Knowledge</span>
                            </div>
                            <div className="p-3 space-y-2">
                                {["Define the greenhouse effect and its role in climate", "Explain the carbon cycle and human impact"].map((goal, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.15 }}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="text-purple-500 text-[10px] mt-0.5">•</span>
                                        <p className="text-[11px] text-purple-900 leading-snug">{goal}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* DP - Disciplinary Practices */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="rounded-lg overflow-hidden border border-blue-200 bg-blue-50"
                        >
                            <div className="px-3 py-2 bg-blue-100 border-b border-blue-200">
                                <span className="text-[10px] font-bold text-blue-700">DP · Disciplinary Practices</span>
                            </div>
                            <div className="p-3 space-y-2">
                                {["Analyze temperature data trends using graphs", "Construct arguments using scientific evidence"].map((goal, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + i * 0.15 }}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="text-blue-500 text-[10px] mt-0.5">•</span>
                                        <p className="text-[11px] text-blue-900 leading-snug">{goal}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CA - Core Aptitudes */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="rounded-lg overflow-hidden border border-green-200 bg-green-50"
                        >
                            <div className="px-3 py-2 bg-green-100 border-b border-green-200">
                                <span className="text-[10px] font-bold text-green-700">CA · Core Aptitudes</span>
                            </div>
                            <div className="p-3 space-y-2">
                                {["Evaluate the effectiveness of climate policies", "Propose sustainable solutions for the community"].map((goal, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.1 + i * 0.15 }}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="text-green-500 text-[10px] mt-0.5">•</span>
                                        <p className="text-[11px] text-green-900 leading-snug">{goal}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ==================== ASSESSMENT MOBILE DEMO ====================
export function AssessmentMobileDemo({ color = "#3BB77E" }: { color?: string }) {
    const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (state === "processing") {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setState("complete"), 200);
                        return 100;
                    }
                    return prev + 4;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [state]);

    const reset = () => {
        setState("initial");
        setProgress(0);
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {state === "initial" && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <p className="text-[10px] font-medium text-gray-500 mb-2">TOPIC</p>
                            <p className="text-xs font-semibold text-gray-800">Fractions</p>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">TYPE</p>
                                <p className="text-xs font-semibold text-gray-800">Quiz</p>
                            </div>
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">QUESTIONS</p>
                                <p className="text-xs font-semibold text-gray-800">10</p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setState("processing")}
                            className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2"
                            style={{ backgroundColor: color }}
                        >
                            <CheckCircle className="w-4 h-4" />
                            Generate Assessment
                        </motion.button>
                    </motion.div>
                )}

                {state === "processing" && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="w-8 h-8" style={{ color }} />
                        </motion.div>
                        <p className="text-sm font-medium mt-3" style={{ color }}>
                            Creating questions...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                            <motion.div
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: color, width: `${progress}%` }}
                            />
                        </div>
                    </motion.div>
                )}

                {state === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold" style={{ color }}>Quiz Ready</p>
                            <button onClick={reset} className="text-[10px] text-gray-400">↺ Reset</button>
                        </div>

                        {[
                            { type: "MCQ", count: 4, difficulty: "Easy" },
                            { type: "Short", count: 4, difficulty: "Medium" },
                            { type: "Word Problem", count: 2, difficulty: "Hard" },
                        ].map((q, i) => (
                            <motion.div
                                key={q.type}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-lg p-2.5 shadow-sm border-l-2"
                                style={{ borderColor: color }}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-800">{q.type}</p>
                                        <p className="text-[10px] text-gray-500">{q.count} questions</p>
                                    </div>
                                    <span
                                        className="text-[10px] px-2 py-0.5 rounded-full"
                                        style={{ backgroundColor: `${color}20`, color }}
                                    >
                                        {q.difficulty}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ==================== SUBJECT EXPERT MOBILE DEMO (Chat-style) ====================
export function SubjectExpertMobileDemo({ color = "#FFCA28" }: { color?: string }) {
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', text: string }>>([]);
    const [isTyping, setIsTyping] = useState(false);



    const handleQuestionClick = (question: string) => {
        // Add user message
        setMessages(prev => [...prev, { role: 'user', text: question }]);
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            setIsTyping(false);
            const response = getSubjectExpertResponse(question);
            setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        }, 1500);
    };

    const getSubjectExpertResponse = (q: string) => {
        if (q.includes("photosynthesis")) return "**Concept:** Photosynthesis\n\n**Explanation:**\nPlants use sunlight, water, and CO2 to create oxygen and energy (sugar). It's essentially how plants 'cook' their own food using light energy!\n\n**Key Sources:**\n1. National Geographic\n2. Britannica Science";
        if (q.includes("mitosis")) return "**Concept:** Mitosis\n\n**Explanation:**\nCell division where one cell splits into two identical daughter cells, crucial for growth and repair.\n\n**Key Sources:**\n1. Biology Dictionary\n2. Khan Academy";
        if (q.includes("Newton")) return "**Concept:** Newton's 1st Law\n\n**Explanation:**\nAn object stays at rest or in motion unless acted upon by a force. (Inertia).\n\n**Key Sources:**\n1. Physics Classroom\n2. NASA Education";
        return "**Answer:**\nThat's a great question! Here is a breakdown of the key concepts and an explanation based on verified sources...";
    };

    return (
        <div className="w-full flex flex-col h-full">
            {/* Header Card - Only show if no messages */}
            {messages.length === 0 && (
                <div
                    className="rounded-xl p-3 shadow-sm mb-3 flex-shrink-0"
                    style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                            style={{ backgroundColor: color }}
                        >
                            🧠
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-800">Subject Expert</p>
                            <p className="text-[10px] text-gray-500">Deep knowledge at your fingertips</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Area */}
            {messages.length > 0 && (
                <div className="flex-1 space-y-3 mb-3">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'user' ? (
                                <div
                                    className="max-w-[85%] rounded-2xl rounded-br-sm px-4 py-3 text-xs text-white"
                                    style={{ backgroundColor: color }}
                                >
                                    {msg.text}
                                </div>
                            ) : (
                                <div className="max-w-[90%] bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm p-3 space-y-2">
                                    {/* Render structured response */}
                                    {msg.text.split('\n\n').map((section, idx) => {
                                        if (section.startsWith('**') && section.includes(':**')) {
                                            const [header, ...content] = section.split('\n');
                                            const headerText = header.replace(/\*\*/g, '').replace(':', '');
                                            return (
                                                <div key={idx}>
                                                    <p className="text-[10px] font-bold text-gray-700 mb-1">{headerText}</p>
                                                    {content.map((line, li) => (
                                                        <p key={li} className="text-[11px] text-gray-600 leading-snug">{line}</p>
                                                    ))}
                                                </div>
                                            );
                                        }
                                        if (section.includes('1.') || section.includes('2.')) {
                                            return (
                                                <div key={idx} className="flex flex-wrap gap-1">
                                                    {section.split('\n').filter(s => s.trim()).map((src, si) => (
                                                        <span key={si} className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">
                                                            {src.replace(/^\d+\.\s*/, '')}
                                                        </span>
                                                    ))}
                                                </div>
                                            );
                                        }
                                        return <p key={idx} className="text-[11px] text-gray-700 leading-snug">{section}</p>;
                                    })}
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-gray-100 rounded-2xl px-3 py-2 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75" />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
                            </div>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Suggested Questions */}
            {!isTyping && (
                <div className="space-y-2 flex-shrink-0">
                    <p className="text-[10px] font-medium text-gray-400 uppercase">
                        {messages.length === 0 ? "Try asking..." : "Follow up..."}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {(messages.length === 0
                            ? ["How does photosynthesis work?", "Explain mitosis", "Newton's laws"]
                            : ["Tell me more", "Give an example", "Why is this important?"]
                        ).filter(q => !messages.find(m => m.text === q)).slice(0, 3).map((question) => (
                            <motion.button
                                key={question}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleQuestionClick(question)}
                                className="bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100 text-left hover:border-gray-200 transition-colors"
                            >
                                <p className="text-[10px] text-gray-700">{question}</p>
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ==================== PEDAGOGY EXPERT MOBILE DEMO (Chat-style) ====================
export function PedagogyExpertMobileDemo({ color = "#8B5CF6" }: { color?: string }) {
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', text: string }>>([]);
    const [isTyping, setIsTyping] = useState(false);



    const handleTopicClick = (topic: string) => {
        // Add user message
        setMessages(prev => [...prev, { role: 'user', text: `Tell me about ${topic.toLowerCase()}` }]);
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            setIsTyping(false);
            const response = getPedagogyExpertResponse(topic);
            setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        }, 1500);
    };

    const getPedagogyExpertResponse = (topic: string) => {
        if (topic.includes("Differentiated")) return "**Strategy:** Differentiation\n\n**Implementation:**\nTailor instruction to student needs by varying:\n1. Content (What)\n2. Process (How)\n3. Product (Demonstration)\n\n**Example:**\nProvide reading materials at different levels for the same topic.";
        if (topic.includes("Formative")) return "**Strategy:** Formative Assessment\n\n**Implementation:**\nLow-stakes checks for understanding *during* the lesson.\n\n**Quick Techniques:**\n• Exit Tickets\n• Think-Pair-Share\n• Hand Signals";
        if (topic.includes("engagement")) return "**Strategy:** Active Engagement\n\n**Implementation:**\nShift from passive listening to active doing.\n\n**Techniques:**\n• Gamification\n• Real-world specific examples\n• Movement-based learning";
        return "**Strategy:**\nHere is a research-backed teaching strategy to help you implement this effectively in your classroom...";
    };

    return (
        <div className="w-full flex flex-col h-full">
            {/* Header Card - Only show if no messages */}
            {messages.length === 0 && (
                <div
                    className="rounded-xl p-3 shadow-sm mb-3 flex-shrink-0"
                    style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                            style={{ backgroundColor: color }}
                        >
                            📚
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-800">Pedagogy Expert</p>
                            <p className="text-[10px] text-gray-500">Teaching strategies & methods</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Area */}
            {messages.length > 0 && (
                <div className="flex-1 space-y-3 mb-3">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'user' ? (
                                <div
                                    className="max-w-[85%] rounded-2xl rounded-br-sm px-4 py-3 text-xs text-white"
                                    style={{ backgroundColor: color }}
                                >
                                    {msg.text}
                                </div>
                            ) : (
                                <div className="max-w-[90%] bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm p-3 space-y-2">
                                    {/* Render structured response with steps */}
                                    {msg.text.split('\n\n').map((section, idx) => {
                                        if (section.startsWith('**Strategy:**')) {
                                            const strategyName = section.replace('**Strategy:**', '').trim();
                                            return (
                                                <div key={idx} className="flex items-center gap-2 pb-1 border-b border-gray-100">
                                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">STRATEGY</span>
                                                    <span className="text-[11px] font-semibold text-gray-800">{strategyName}</span>
                                                </div>
                                            );
                                        }
                                        if (section.startsWith('**Implementation:**') || section.startsWith('**Techniques:**')) {
                                            const [header, ...lines] = section.split('\n');
                                            const headerType = header.includes('Techniques') ? 'TECHNIQUES' : 'HOW TO';
                                            return (
                                                <div key={idx}>
                                                    <p className="text-[9px] font-bold text-gray-500 mb-1">{headerType}</p>
                                                    <div className="space-y-1">
                                                        {lines.filter(l => l.trim()).map((line, li) => {
                                                            const isNumbered = /^\d+\./.test(line);
                                                            const isBullet = line.startsWith('•');
                                                            const content = line.replace(/^[\d+\.\s•]+/, '').trim();
                                                            return (
                                                                <div key={li} className="flex items-start gap-1.5">
                                                                    <span
                                                                        className="text-[9px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                                                        style={{ backgroundColor: `${color}20`, color }}
                                                                    >
                                                                        {isNumbered ? line.match(/^\d+/)?.[0] : isBullet ? '•' : '→'}
                                                                    </span>
                                                                    <span className="text-[10px] text-gray-700">{content}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        if (section.startsWith('**Example:**')) {
                                            const example = section.replace('**Example:**', '').trim();
                                            return (
                                                <div key={idx} className="bg-green-50 border border-green-100 rounded-lg p-2">
                                                    <p className="text-[9px] font-bold text-green-700 mb-0.5">💡 EXAMPLE</p>
                                                    <p className="text-[10px] text-green-800">{example}</p>
                                                </div>
                                            );
                                        }
                                        return <p key={idx} className="text-[11px] text-gray-700 leading-snug">{section}</p>;
                                    })}
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-gray-100 rounded-2xl px-3 py-2 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75" />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
                            </div>
                        </motion.div>
                    )}

                </div>
            )}

            {/* Suggested Topics */}
            {!isTyping && (
                <div className="space-y-2 flex-shrink-0">
                    <p className="text-[10px] font-medium text-gray-400 uppercase">
                        {messages.length === 0 ? "Ask about..." : "Explore more..."}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {(messages.length === 0
                            ? ["Differentiated instruction", "Formative assessment", "Student engagement"]
                            : ["How do I start?", "Show me an example", "Common mistakes"]
                        ).filter(topic => !messages.find(m => m.text.includes(topic.toLowerCase()))).slice(0, 3).map((topic) => (
                            <motion.button
                                key={topic}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleTopicClick(topic)}
                                className="bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100 text-left hover:border-gray-200 transition-colors"
                            >
                                <p className="text-[10px] text-gray-700">{topic}</p>
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ==================== ASSESSMENT CHECKER MOBILE DEMO ====================
export function AssessmentCheckerMobileDemo({ color = "#F97316" }: { color?: string }) {
    const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (state === "processing") {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setState("complete"), 200);
                        return 100;
                    }
                    return prev + 4;
                });
            }, 40);
            return () => clearInterval(interval);
        }
    }, [state]);

    const reset = () => {
        setState("initial");
        setProgress(0);
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {state === "initial" && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <p className="text-[10px] font-medium text-gray-500 mb-2">TEST</p>
                            <p className="text-xs font-semibold text-gray-800">Unit 3: Trigonometry</p>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">PAPERS</p>
                                <p className="text-xs font-semibold text-gray-800">28</p>
                            </div>
                            <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <p className="text-[10px] font-medium text-gray-500 mb-1">RUBRIC</p>
                                <p className="text-xs font-semibold text-gray-800">Standard</p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setState("processing")}
                            className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2"
                            style={{ backgroundColor: color }}
                        >
                            <Upload className="w-4 h-4" />
                            Grade All Papers
                        </motion.button>
                    </motion.div>
                )}

                {state === "processing" && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="w-8 h-8" style={{ color }} />
                        </motion.div>
                        <p className="text-sm font-medium mt-3" style={{ color }}>
                            Grading papers...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                            <motion.div
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: color, width: `${progress}%` }}
                            />
                        </div>
                    </motion.div>
                )}

                {state === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold" style={{ color }}>Grading Complete</p>
                            <button onClick={reset} className="text-[10px] text-gray-400">↺ Reset</button>
                        </div>

                        {/* Summary Card */}
                        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 mb-2 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-gray-500">CLASS AVERAGE</p>
                                <p className="text-sm font-bold text-gray-800">76%</p>
                            </div>
                            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-50">
                                <BarChart3 className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {[
                            { name: "Aarav P.", score: "18/20", grade: "A" },
                            { name: "Priya S.", score: "19/20", grade: "A+" },
                            { name: "Rohan K.", score: "14/20", grade: "B" },
                            { name: "Sneha M.", score: "16/20", grade: "A-" },
                        ].map((s, i) => (
                            <motion.div
                                key={s.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-lg p-2.5 shadow-sm border-l-2 flex items-center justify-between"
                                style={{ borderColor: color }}
                            >
                                <span className="text-xs font-medium text-gray-800">{s.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-gray-500">{s.score}</span>
                                    <span
                                        className="text-[10px] px-1.5 py-0.5 rounded text-white font-bold"
                                        style={{ backgroundColor: color }}
                                    >
                                        {s.grade}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ==================== SIMULATOR MOBILE DEMO (AI Student Practice) ====================
export function SimulatorMobileDemo({ color = "#5283b7" }: { color?: string }) {
    const [state, setState] = useState<"initial" | "practicing" | "feedback">("initial");
    const [studentMessages, setStudentMessages] = useState<string[]>([]);

    const startPractice = () => {
        setState("practicing");
        setStudentMessages([]);

        // Simulate AI student asking questions
        setTimeout(() => {
            setStudentMessages(["Teacher, I don't understand why we multiply first..."]);
        }, 800);
        setTimeout(() => {
            setStudentMessages(prev => [...prev, "Can you give a real-life example?"]);
        }, 2500);
        setTimeout(() => {
            setState("feedback");
        }, 4000);
    };

    const reset = () => {
        setState("initial");
        setStudentMessages([]);
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {state === "initial" && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
                            <div
                                className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${color}15` }}
                            >
                                <Users className="w-6 h-6" style={{ color }} />
                            </div>
                            <p className="text-xs font-semibold text-gray-800 mb-1">Virtual Classroom</p>
                            <p className="text-[10px] text-gray-500">Practice teaching with AI students</p>
                        </div>

                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <p className="text-[10px] font-medium text-gray-500 mb-2">LESSON TOPIC</p>
                            <p className="text-xs font-semibold text-gray-800">Order of Operations (BODMAS)</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={startPractice}
                            className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2"
                            style={{ backgroundColor: color }}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Start Practice Session
                        </motion.button>
                    </motion.div>
                )}

                {state === "practicing" && (
                    <motion.div
                        key="practicing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-medium text-green-600">Live Session</span>
                            </div>
                            <span className="text-[10px] text-gray-400">3 students</span>
                        </div>

                        {/* AI Student Messages */}
                        <div className="space-y-2">
                            {studentMessages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-start gap-2"
                                >
                                    <div
                                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                        style={{ backgroundColor: i === 0 ? "#22C55E" : "#F59E0B" }}
                                    >
                                        S{i + 1}
                                    </div>
                                    <div className="bg-gray-100 rounded-lg rounded-tl-sm px-3 py-2 flex-1">
                                        <p className="text-[11px] text-gray-700">{msg}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {studentMessages.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex gap-1"
                            >
                                {["Explain simply", "Use example", "Ask back"].map((opt, i) => (
                                    <button
                                        key={opt}
                                        className="flex-1 text-[9px] py-1.5 px-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {state === "feedback" && (
                    <motion.div
                        key="feedback"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold" style={{ color }}>Session Complete</p>
                            <button onClick={reset} className="text-[10px] text-gray-400">↺ Reset</button>
                        </div>

                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="text-2xl font-bold"
                                    style={{ color }}
                                >
                                    85%
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-800">Great Session!</p>
                                    <p className="text-[10px] text-gray-500">Clear explanations observed</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {[
                                    { label: "Clarity", score: 90, color: "#22C55E" },
                                    { label: "Engagement", score: 80, color: "#F59E0B" },
                                    { label: "Pacing", score: 85, color: "#8B5CF6" },
                                ].map((metric) => (
                                    <div key={metric.label}>
                                        <div className="flex justify-between text-[10px] mb-1">
                                            <span className="text-gray-600">{metric.label}</span>
                                            <span className="font-medium" style={{ color: metric.color }}>{metric.score}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${metric.score}%` }}
                                                transition={{ delay: 0.3, duration: 0.5 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: metric.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ==================== DASHBOARD MOBILE DEMO (Student Data Analyser) ====================
export function DashboardMobileDemo({ color = "#fea226" }: { color?: string }) {
    const [state, setState] = useState<"initial" | "processing" | "complete">("initial");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (state === "processing") {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setState("complete"), 200);
                        return 100;
                    }
                    return prev + 4;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [state]);

    const reset = () => {
        setState("initial");
        setProgress(0);
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {state === "initial" && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <p className="text-[10px] font-medium text-gray-500 mb-2">DATA SOURCE</p>
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${color}15` }}
                                >
                                    <BarChart3 className="w-4 h-4" style={{ color }} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-800">Class 8A Scores</p>
                                    <p className="text-[10px] text-gray-500">32 students • Math Unit Test</p>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setState("processing")}
                            className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2"
                            style={{ backgroundColor: color }}
                        >
                            <Sparkles className="w-4 h-4" />
                            Analyse Data
                        </motion.button>
                    </motion.div>
                )}

                {state === "processing" && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="w-8 h-8" style={{ color }} />
                        </motion.div>
                        <p className="text-sm font-medium mt-3" style={{ color }}>
                            Analysing patterns...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                            <motion.div
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: color, width: `${progress}%` }}
                            />
                        </div>
                    </motion.div>
                )}

                {state === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold" style={{ color }}>Insights Ready</p>
                            <button onClick={reset} className="text-[10px] text-gray-400">↺ Reset</button>
                        </div>

                        {/* Performance Bar Chart */}
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <p className="text-[10px] font-medium text-gray-500 mb-2">PERFORMANCE DISTRIBUTION</p>
                            <div className="flex items-end justify-between h-16 gap-1">
                                {[
                                    { label: "A", value: 20, color: "#22C55E" },
                                    { label: "B", value: 35, color: "#3B82F6" },
                                    { label: "C", value: 25, color: "#F59E0B" },
                                    { label: "D", value: 15, color: "#EF4444" },
                                    { label: "F", value: 5, color: "#6B7280" },
                                ].map((bar, i) => (
                                    <div key={bar.label} className="flex-1 flex flex-col items-center">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${bar.value * 1.5}px` }}
                                            transition={{ delay: i * 0.1, duration: 0.4 }}
                                            className="w-full rounded-t"
                                            style={{ backgroundColor: bar.color }}
                                        />
                                        <span className="text-[8px] text-gray-500 mt-1">{bar.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Key Insights */}
                        <div className="space-y-2">
                            {[
                                { type: "gap", text: "20% struggling with fractions", color: "#EF4444" },
                                { type: "strength", text: "85% mastered basic operations", color: "#22C55E" },
                            ].map((insight, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border border-gray-100"
                                >
                                    <div
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ backgroundColor: insight.color }}
                                    />
                                    <span className="text-[11px] text-gray-700">{insight.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
