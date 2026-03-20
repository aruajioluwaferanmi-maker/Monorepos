// import React, { useState } from "react";
// import HeroSection from "../components/hero/HeroSection";

// const HomePage: React.FC = () => {
//   const [workModalOpen, setWorkModalOpen] = useState(false);
//   const [connectModalOpen, setConnectModalOpen] = useState(false);

//   return (
//     <main>
//       <HeroSection
//         onWorkClick={() => setWorkModalOpen(true)}
//         onConnectClick={() => setConnectModalOpen(true)}
//       />

//       {/* Modals coming Day 2 */}
//       {workModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
//             <h2 className="text-2xl font-bold mb-4">Work With Me</h2>
//             <p className="text-gray-600 mb-6">Modal coming in Day 2!</p>
//             <button
//               onClick={() => setWorkModalOpen(false)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition w-full"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {connectModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
//             <h2 className="text-2xl font-bold mb-4">Connect With Me</h2>
//             <p className="text-gray-600 mb-6">Modal coming in Day 2!</p>
//             <button
//               onClick={() => setConnectModalOpen(false)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition w-full"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from "react";
import HeroSection from "../components/hero/HeroSection";
import WorkModal from "../components/modals/WorkModal";
import ConnectModal from "../components/modals/ConnectModal";
import { HeroConfig } from "../types/hero.types";
import { usePageView, useAnalytics } from "../hooks/useAnalytics";

const HomePage: React.FC = () => {
  const [config, setConfig] = useState<HeroConfig | null>(null);
  const [workOpen, setWorkOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);

  // Track page view on mount
  usePageView("home_page");

  // Analytics actions
  const {
    logCTAClick,
    logModalOpen,
    logModalClose,
    logFormSubmit,
    logFormError,
  } = useAnalytics();

  useEffect(() => {
    import("../config/hero.json").then((data) => {
      setConfig(data.default as HeroConfig);
    });
  }, []);

  // Work With Me handlers
  const handleWorkClick = () => {
    logCTAClick("cta_work_with_me");
    logModalOpen("modal_work_with_me");
    setConnectOpen(false);
    setWorkOpen(true);
  };

  const handleWorkClose = () => {
    logModalClose("modal_work_with_me");
    setWorkOpen(false);
  };

  const handleWorkSubmit = () => {
    logFormSubmit("modal_work_with_me");
  };

  const handleWorkError = () => {
    logFormError("modal_work_with_me");
  };

  // Connect With Me handlers
  const handleConnectClick = () => {
    logCTAClick("cta_connect_with_me");
    logModalOpen("modal_connect_with_me");
    setWorkOpen(false);
    setConnectOpen(true);
  };

  const handleConnectClose = () => {
    logModalClose("modal_connect_with_me");
    setConnectOpen(false);
  };

  const handleConnectSubmit = () => {
    logFormSubmit("modal_connect_with_me");
  };

  const handleConnectError = () => {
    logFormError("modal_connect_with_me");
  };

  return (
    <main>
      <HeroSection
        onWorkClick={handleWorkClick}
        onConnectClick={handleConnectClick}
      />

      {config && (
        <WorkModal
          open={workOpen}
          onClose={handleWorkClose}
          onSubmit={handleWorkSubmit}
          onError={handleWorkError}
          config={(config as any).modals.work}
        />
      )}

      {config && (
        <ConnectModal
          open={connectOpen}
          onClose={handleConnectClose}
          onSubmit={handleConnectSubmit}
          onError={handleConnectError}
          config={(config as any).modals.connect}
        />
      )}
    </main>
  );
};

export default HomePage;
