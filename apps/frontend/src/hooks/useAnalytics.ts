import { useEffect, useCallback } from "react";
import {
  trackPageView,
  trackCTAClick,
  trackModalOpen,
  trackModalClose,
  trackModalSubmit,
  trackFormError,
} from "../utils/analyticsTracker";

// Page view hook — fires on mount
export const usePageView = (pageName?: string) => {
  useEffect(() => {
    trackPageView(pageName ? { page_name: pageName } : undefined);
  }, [pageName]);
};

// Full analytics hook
export const useAnalytics = () => {
  // Slice 8 — Work With Me CTA click
  const logWorkWithMeClick = useCallback(() => {
    trackCTAClick("cta_work_with_me");
  }, []);

  // Slice 9 — Help Me Free CTA click
  const logHelpMeFreeClick = useCallback(() => {
    trackCTAClick("cta_help_me_free");
  }, []);

  // Slice 10 — Deliver Project journey click
  const logDeliverProjectClick = useCallback(() => {
    trackCTAClick("cta_work_deliver_project");
  }, []);

  // Slice 11 — Mentor Me journey click
  const logMentorMeClick = useCallback(() => {
    trackCTAClick("cta_work_mentor_me");
  }, []);

  // Slice 12 — Coffee With Me journey click
  const logCoffeeWithMeClick = useCallback(() => {
    trackCTAClick("cta_coffee_with_me");
  }, []);

  // General CTA click
  const logCTAClick = useCallback((ctaId: string) => {
    trackCTAClick(ctaId);
  }, []);

  // Modal events
  const logModalOpen = useCallback((modalId: string) => {
    trackModalOpen(modalId);
  }, []);

  const logModalClose = useCallback((modalId: string) => {
    trackModalClose(modalId);
  }, []);

  const logModalSubmit = useCallback((modalId: string) => {
    trackModalSubmit(modalId);
  }, []);

  const logFormError = useCallback((modalId: string) => {
    trackFormError(modalId);
  }, []);

  return {
    // Slice-specific CTA loggers
    logWorkWithMeClick,
    logHelpMeFreeClick,
    logDeliverProjectClick,
    logMentorMeClick,
    logCoffeeWithMeClick,
    // General loggers
    logCTAClick,
    logModalOpen,
    logModalClose,
    logModalSubmit,
    logFormError,
  };
};
