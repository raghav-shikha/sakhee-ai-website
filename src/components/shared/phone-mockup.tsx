"use client";

import { SHIKHA } from "@/components/home/ui";
import { Send } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SAKHEE_COLORS } from "./sakhee-design";

interface PhoneMockupProps {
  children: React.ReactNode;
  productName: string;
  subtitle?: string;
  productType?: "generator" | "chat" | "expert"; // generator = no input bar, chat/expert = show input bar
  productColor?: string;
}

/**
 * PhoneMockup - Matches sakhee-teacher-coach gold standard sizing
 * Now includes auto-scroll functionality for enhanced interactivity
 * For chat products: shows input bar at bottom
 * For generator products: shows demo content only
 */
export function PhoneMockup({
  children,
  productName,
  subtitle = "Tap to explore",
  productType = "generator",
  productColor = SAKHEE_COLORS.primary
}: PhoneMockupProps) {
  // Auto-scroll logic
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isUserControlled, setIsUserControlled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll function - scrolls down then up in a loop
  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) return;

    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current && !isUserControlled) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollHeight - container.clientHeight;

        // Only scroll if content is actually scrollable
        if (maxScroll <= 0) return;

        if (scrollDirection === "down") {
          if (container.scrollTop >= maxScroll - 2) {
            // Reached bottom, switch to scrolling up
            setScrollDirection("up");
          } else {
            container.scrollTop += 1;
          }
        } else {
          if (container.scrollTop <= 2) {
            // Reached top, switch to scrolling down
            setScrollDirection("down");
          } else {
            container.scrollTop -= 1;
          }
        }
      }
    }, 40);
  }, [isUserControlled, scrollDirection]);

  // Stop auto-scroll
  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }, []);

  // Handle user interaction - pause auto-scroll temporarily
  const handleUserInteraction = useCallback(() => {
    setIsUserControlled(true);
    setIsAutoScrolling(false);
    stopAutoScroll();

    // Clear existing timeout
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }

    // Resume auto-scroll after 5 seconds of no interaction
    userInteractionTimeoutRef.current = setTimeout(() => {
      setIsUserControlled(false);
      setIsAutoScrolling(true);
    }, 5000);
  }, [stopAutoScroll]);

  // Start auto-scroll on mount and restart when direction changes
  useEffect(() => {
    if (isAutoScrolling && !isUserControlled) {
      stopAutoScroll(); // Stop existing interval before starting new one
      startAutoScroll();
    }
    return () => {
      stopAutoScroll();
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, [isAutoScrolling, isUserControlled, scrollDirection, startAutoScroll, stopAutoScroll]);

  return (
    <div className="relative">
      {/* Phone Frame - EXACT match to sakhee-teacher-coach */}
      <div
        className="relative w-56 sm:w-64 md:w-72 lg:w-80 bg-gray-900 p-1.5 sm:p-2 shadow-2xl"
        style={{ borderRadius: "28px" }}
      >
        {/* Screen - Responsive height matching gold standard */}
        <div
          className="bg-white overflow-hidden relative flex flex-col"
          style={{ borderRadius: "22px", height: "clamp(420px, 60vw, 620px)" }}
        >
          {/* Status Bar */}
          <div className="bg-white px-4 py-2 flex items-center justify-between text-xs flex-shrink-0 z-10 relative">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-gray-800 rounded-sm" />
            </div>
          </div>

          {/* Chat Header with Sakhee Logo */}
          <div
            className="px-4 py-3 border-b bg-white flex-shrink-0 z-10 relative"
            style={{ borderColor: SHIKHA.sand }}
          >
            <div className="flex items-center gap-3">
              <img
                src="/Sakhee logo.svg"
                alt="Sakhee"
                className="w-9 h-9 object-contain"
              />
              <div>
                <h4
                  className="font-montserrat font-semibold text-sm"
                  style={{ color: SAKHEE_COLORS.text }}
                >
                  {productName}
                </h4>
                <p
                  className="text-xs font-poppins"
                  style={{ color: SAKHEE_COLORS.textLight }}
                >
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Content Area with Grid Background - Flex grow to fill available space */}
          <div className="relative flex-1 min-h-0">
            {/* Grid Background - subtle */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.15,
                backgroundImage: `
                  linear-gradient(to right, #D0CBC5 1px, transparent 1px),
                  linear-gradient(to bottom, #D0CBC5 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Scrollable Content */}
            <div
              ref={scrollContainerRef}
              onMouseEnter={handleUserInteraction}
              onTouchStart={handleUserInteraction}
              onWheel={handleUserInteraction}
              className="absolute inset-0 overflow-y-auto cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: `${productColor}40 transparent`,
              }}
            >
              <div className="px-3 py-3 relative z-10">
                {children}
              </div>
            </div>
          </div>

          {/* Input Bar for Chat Products - Fixed at bottom */}
          {(productType === "chat" || productType === "expert") && (
            <div
              className="px-3 py-2 border-t bg-white flex-shrink-0 z-10 relative"
              style={{ borderColor: SHIKHA.sand }}
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask any question..."
                  className="flex-1 text-xs px-3 py-2 rounded-full border bg-gray-50"
                  style={{ borderColor: "#E5E5E5" }}
                  readOnly
                />
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: productColor }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
