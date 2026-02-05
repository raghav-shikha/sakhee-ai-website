/**
 * Sakhee Design System Constants
 * Shared across all Sakhee product pages for consistency
 * Reference: sakhee-teacher-coach design (Figma/Canva)
 */

// Sakhee brand colors - warm, teacher-friendly palette
export const SAKHEE_COLORS = {
  // Primary colors
  primary: "#c56665", // Terracotta - main brand color
  primaryLight: "#FDF5F4",
  primarySoft: "#FAEAE8", // Soft for backgrounds

  // Accent colors
  purpleBlue: "#7B88C3", // For subheadings
  navy: "#2D3748", // Dark navy for badges

  // Background colors
  cream: "#f6f4f5", // Hero/odd sections background
  ivory: "#FDF8F4",
  white: "#FFFFFF",

  // Text colors
  text: "#000000", // Primary text (black per design)
  textMuted: "#000000", // Body text
  textLight: "#8A857B", // Light/secondary text

  // Feedback colors
  good: "#22C55E", // Green for positive
  improve: "#F97316", // Orange for areas to improve

  // Sand for borders
  sand: "#E8E4DD",
} as const;

// Sakhee product definitions - ordered by teacher journey flow
export const SAKHEE_PRODUCTS = [
  // Step 1: Subject & Pedagogy expertise (foundation)
  {
    id: "subject-expert",
    name: "Sakhee Subject Expert",
    shortName: "Subject Expert",
    tagline: "Deepen content knowledge in minutes",
    description: "Get explanations, examples, and misconceptions for any topic you teach. Sakhee helps you brush up, broaden and deepen content knowledge in minutes.",
    icon: "🧠",
    href: "/sakhee-subject-expert",
    landingHref: "/sakhee-subject-expert",
    appHref: "/bot/expert",
    status: "active" as const,
    color: "#3BB77E", // Shikha Teal
  },
  {
    id: "pedagogy-expert",
    name: "Sakhee Pedagogy Expert",
    shortName: "Pedagogy Expert",
    tagline: "Innovative strategies for any concept",
    description: "Get innovative, student centered pedagogical ideas and research backed teaching strategies for any concept you plan to teach.",
    icon: "💡",
    href: "/sakhee-pedagogy-expert",
    landingHref: "/sakhee-pedagogy-expert",
    appHref: "/tools/pedagogy-expert",
    status: "active" as const,
    color: "#3BB77E", // Shikha Teal
  },
  // Step 2: Planning (goals → unit → lesson)
  {
    id: "learning-goals",
    name: "Sakhee Learning Goals Creator",
    shortName: "Learning Goals Creator",
    tagline: "Extract clear, measurable outcomes",
    description: "Extract clear, measurable learning outcomes based on topics, standards, and even textbook content.",
    icon: "🎯",
    href: "/sakhee-learning-goals",
    landingHref: "/sakhee-learning-goals",
    appHref: "/journey/learninggoals",
    status: "active" as const,
    color: "#29ABE2", // Shikha Blue
  },
  {
    id: "unit-plan",
    name: "Sakhee Unit Plan Creator",
    shortName: "Unit Plan Creator",
    tagline: "Structure coherent multi-week units",
    description: "Logically structure coherent multi-week units with lesson progression and descriptions.",
    icon: "📚",
    href: "/sakhee-unit-plan",
    landingHref: "/sakhee-unit-plan",
    appHref: "/journey/unit-plan",
    status: "active" as const,
    color: "#29ABE2", // Shikha Blue
  },
  {
    id: "lesson-plan",
    name: "Sakhee Lesson Plan Creator",
    shortName: "Lesson Plan Creator",
    tagline: "Minute-by-minute plans tailored to you",
    description: "Generate practical, minute-by-minute lesson plans tailored to your students and resources.",
    icon: "📝",
    href: "/sakhee-lesson-plan",
    landingHref: "/sakhee-lesson-plan",
    appHref: "/journey/lesson-plan",
    status: "active" as const,
    color: "#29ABE2", // Shikha Blue
  },
  // Step 3: Assessment creation
  {
    id: "assessment",
    name: "Sakhee Assessment Creator",
    shortName: "Assessment Creator",
    tagline: "Quizzes and rubrics aligned to goals",
    description: "Create high-quality quizzes, worksheets, rubrics, and performance tasks aligned to your learning goals.",
    icon: "📋",
    href: "/sakhee-assessment",
    landingHref: "/sakhee-assessment",
    appHref: "/journey/assessment",
    status: "active" as const,
    color: "#29ABE2", // Shikha Blue
  },
  {
    id: "exam-generator",
    name: "Sakhee Exam Generator",
    shortName: "Exam Generator",
    tagline: "Professional exam papers in minutes",
    description: "Generate exam papers with multiple question types, proper formatting, and answer schemes.",
    icon: "📄",
    href: "/sakhee-exam-generator",
    landingHref: "/sakhee-exam-generator",
    appHref: "/journey/examination",
    status: "active" as const,
    color: "#29ABE2", // Shikha Blue
  },
  // Step 4: Practice (coming soon)
  {
    id: "simulator",
    name: "Sakhee Classroom Simulator",
    shortName: "Classroom Simulator",
    tagline: "Rehearse with AI students",
    description: "Rehearse your lesson in a virtual classroom with AI student bots before facing real students.",
    icon: "🎮",
    href: "/sakhee-simulator",
    landingHref: "/sakhee-simulator",
    appHref: "/tools/simulator",
    status: "active" as const,
    color: "#29ABE2", // Shikha Blue
  },
  // Step 5: Post-class feedback & grading
  {
    id: "assessment-checker",
    name: "Sakhee Assessment Checker",
    shortName: "Assessment Checker",
    tagline: "Reliable scoring and feedback",
    description: "Reduce marking time with reliable scoring and feedback suggestions, while controlling all final scores.",
    icon: "✅",
    href: "/sakhee-assessment-checker",
    landingHref: "/sakhee-assessment-checker",
    appHref: "/assessment-checker",
    status: "active" as const,
    color: "#F8A049", // Shikha Orange
  },
  {
    id: "instructional-coach",
    name: "Sakhee Instructional Coach",
    shortName: "Instructional Coach",
    tagline: "Your personal teaching coach",
    description: "Get personalized feedback and support on your teaching practice with evidence from your own class.",
    icon: "🎯",
    href: "/sakhee-teacher-coach",
    landingHref: "/sakhee-teacher-coach",
    appHref: "/tools/teacher-coach",
    status: "active" as const,
    color: "#F8A049", // Shikha Orange
  },
  // Step 6: Analytics (coming soon)
  {
    id: "dashboard",
    name: "Sakhee Student Data Analyser",
    shortName: "Student Data Analyser",
    tagline: "Visual insights from student scores",
    description: "Turn sheets of student scores into visual, meaningful insights about learning gaps and growth.",
    icon: "📊",
    href: "/sakhee-dashboard",
    landingHref: "/sakhee-dashboard",
    appHref: "/dashboard",
    status: "active" as const,
    color: "#F8A049", // Shikha Orange
  },
] as const;

// Active products for navigation dropdown
export const ACTIVE_PRODUCTS = SAKHEE_PRODUCTS.filter(p => p.status === "active");

// Typography constants
export const SAKHEE_TYPOGRAPHY = {
  // Font families
  heading: "font-caveat", // Script/handwritten for main headings
  nav: "font-montserrat", // Sans-serif for navigation/buttons
  body: "font-poppins", // Clean sans-serif for body text
} as const;

// Section typography styles - DRY pattern matching Hero section
export const SAKHEE_SECTION_STYLES = {
  // Main heading: matches Hero h1 style
  heading: "font-caveat text-[52px] leading-[58px] md:text-[80px] md:leading-[90px]",
  // Smaller section heading variant (for non-hero sections)
  headingSection: "font-caveat text-4xl md:text-6xl leading-tight",
  // Subheading: matches Hero subtitle style  
  subheading: "font-montserrat text-lg md:text-2xl font-bold uppercase tracking-wide",
  // Body text
  body: "font-poppins text-lg md:text-xl leading-relaxed",
} as const;

// Border radius - unified across Sakhee pages
export const SAKHEE_RADIUS = {
  sm: "8px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  full: "9999px",
} as const;

// Section background pattern
export const SECTION_BACKGROUNDS = {
  cream: SAKHEE_COLORS.cream,
  white: SAKHEE_COLORS.white,
} as const;
