import React, { useState, useEffect } from "react";
import HeroSection from "../components/hero/HeroSection";
import DeliverProjectModal from "../components/modals/DeliveryProjectModal";
import MentorMeModal from "../components/modals/MentorMeModal";
import CoffeeWithMeModal from "../components/modals/CoffeeWithMeModal";
import FifteenMinChatModal from "../components/modals/FifteenMinChatModal";
import AuditWebsiteModal from "../components/modals/AuditWebsiteModal";
import TechCatchUpModal from "../components/modals/TechCatchUpModal";
import { HeroConfig } from "../types/hero.types";
import { usePageView, useAnalytics } from "../hooks/useAnalytics";

const HomePage: React.FC = () => {
  const [config, setConfig] = useState<HeroConfig | null>(null);

  // Work With Me modal states
  const [deliverOpen, setDeliverOpen] = useState(false);
  const [mentorOpen, setMentorOpen] = useState(false);
  const [coffeeOpen, setCoffeeOpen] = useState(false);

  // Help Me Free modal states
  const [fifteenOpen, setFifteenOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [catchUpOpen, setCatchUpOpen] = useState(false);

  // Slice 11 — Page view on mount
  usePageView("home_page");

  const {
    logWorkWithMeClick,
    logHelpMeFreeClick,
    logDeliverProjectClick,
    logMentorMeClick,
    logCoffeeWithMeClick,
    logModalOpen,
    logModalClose,
    logModalSubmit,
    logFormError,
  } = useAnalytics();

  useEffect(() => {
    import("../config/hero.json").then((data) => {
      setConfig(data.default as HeroConfig);
    });
  }, []);

  // Close all modals
  const closeAll = () => {
    setDeliverOpen(false);
    setMentorOpen(false);
    setCoffeeOpen(false);
    setFifteenOpen(false);
    setAuditOpen(false);
    setCatchUpOpen(false);
  };

  // ── Work With Me handlers ──

  // Slice 6
  const handleWorkWithMeClick = () => {
    logWorkWithMeClick();
  };

  // Slice 8
  const handleDeliverProject = () => {
    closeAll();
    logDeliverProjectClick();
    logModalOpen("modal_deliver_project");
    setDeliverOpen(true);
  };

  // Slice 9
  const handleMentorMe = () => {
    closeAll();
    logMentorMeClick();
    logModalOpen("modal_mentor_me");
    setMentorOpen(true);
  };

  // Slice 10
  const handleCoffeeWithMe = () => {
    closeAll();
    logCoffeeWithMeClick();
    logModalOpen("modal_coffee_with_me");
    setCoffeeOpen(true);
  };

  // ── Help Me Free handlers ──

  // Slice 7
  const handleHelpMeFreeClick = () => {
    logHelpMeFreeClick();
  };

  // Slice 5A
  const handleFifteenMinChat = () => {
    closeAll();
    logModalOpen("modal_fifteen_min_chat");
    setFifteenOpen(true);
  };

  // Slice 5B
  const handleAuditWebsite = () => {
    closeAll();
    logModalOpen("modal_audit_website");
    setAuditOpen(true);
  };

  // Slice 5C
  const handleTechCatchUp = () => {
    closeAll();
    logModalOpen("modal_tech_catch_up");
    setCatchUpOpen(true);
  };

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        onWorkWithMeClick={handleWorkWithMeClick}
        onDeliverProject={handleDeliverProject}
        onMentorMe={handleMentorMe}
        onCoffeeWithMe={handleCoffeeWithMe}
        onHelpMeFreeClick={handleHelpMeFreeClick}
        onFifteenMinChat={handleFifteenMinChat}
        onAuditWebsite={handleAuditWebsite}
        onTechCatchUp={handleTechCatchUp}
      />

      {/* ── Work With Me Modals ── */}
      {config && (
        <DeliverProjectModal
          open={deliverOpen}
          onClose={() => {
            logModalClose("modal_deliver_project");
            setDeliverOpen(false);
          }}
          onSubmit={() => logModalSubmit("modal_deliver_project")}
          onError={() => logFormError("modal_deliver_project")}
          config={config.modals.deliverProject}
        />
      )}

      {config && (
        <MentorMeModal
          open={mentorOpen}
          onClose={() => {
            logModalClose("modal_mentor_me");
            setMentorOpen(false);
          }}
          onSubmit={() => logModalSubmit("modal_mentor_me")}
          onError={() => logFormError("modal_mentor_me")}
          config={config.modals.mentorMe}
        />
      )}

      {config && (
        <CoffeeWithMeModal
          open={coffeeOpen}
          onClose={() => {
            logModalClose("modal_coffee_with_me");
            setCoffeeOpen(false);
          }}
          onSubmit={() => logModalSubmit("modal_coffee_with_me")}
          onError={() => logFormError("modal_coffee_with_me")}
          config={config.modals.coffeeWithMe}
        />
      )}

      {/* ── Help Me Free Modals ── */}
      {config && (
        <FifteenMinChatModal
          open={fifteenOpen}
          onClose={() => {
            logModalClose("modal_fifteen_min_chat");
            setFifteenOpen(false);
          }}
          onSubmit={() => logModalSubmit("modal_fifteen_min_chat")}
          onError={() => logFormError("modal_fifteen_min_chat")}
          config={config.modals.fifteenMinChat}
        />
      )}

      {config && (
        <AuditWebsiteModal
          open={auditOpen}
          onClose={() => {
            logModalClose("modal_audit_website");
            setAuditOpen(false);
          }}
          onSubmit={() => logModalSubmit("modal_audit_website")}
          onError={() => logFormError("modal_audit_website")}
          config={config.modals.auditWebsite}
        />
      )}

      {config && (
        <TechCatchUpModal
          open={catchUpOpen}
          onClose={() => {
            logModalClose("modal_tech_catch_up");
            setCatchUpOpen(false);
          }}
          onSubmit={() => logModalSubmit("modal_tech_catch_up")}
          onError={() => logFormError("modal_tech_catch_up")}
          config={config.modals.techCatchUp}
        />
      )}
    </main>
  );
};

export default HomePage;
