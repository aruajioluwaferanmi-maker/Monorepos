import { useEffect, useCallback } from "react";
import {
  trackPageView,
  trackCTAClick,
  trackModalOpen,
  trackModalClose,
  trackModalSubmit,
  trackFormError,
} from "../utils/analyticsTracker";

// Hook for page view tracking
export const usePageView = (pageName?: string) => {
  useEffect(() => {
    trackPageView(pageName ? { page_name: pageName } : undefined);
  }, [pageName]);
};

// Hook for all analytics actions
export const useAnalytics = () => {
  const logCTAClick = useCallback((ctaId: string) => {
    trackCTAClick(ctaId);
  }, []);

  const logModalOpen = useCallback((modalId: string) => {
    trackModalOpen(modalId);
  }, []);

  const logModalClose = useCallback((modalId: string) => {
    trackModalClose(modalId);
  }, []);

  const logFormSubmit = useCallback((modalId: string) => {
    trackModalSubmit(modalId);
  }, []);

  const logFormError = useCallback((modalId: string) => {
    trackFormError(modalId);
  }, []);

  return {
    logCTAClick,
    logModalOpen,
    logModalClose,
    logFormSubmit,
    logFormError,
  };
};
