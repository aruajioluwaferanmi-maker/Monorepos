import React, { useEffect, useState } from "react";
import DynamicRenderer from "../components/DynamicRenderer";
import Modal from "../components/modals/Modal";

interface DashboardConfig {
  id: number;
  componentType: string;
  title: string;
  description?: string;
  content?: string;
  onClickType?: string;
}

const DashboardPage: React.FC = () => {
  const [sections, setSections] = useState<DashboardConfig[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    import("../config/dashboard.json").then((data) => {
      setSections(data.default);
    });
  }, []);

  const handleSectionClick = (section: DashboardConfig) => {
    if (section.onClickType === "modal") {
      setModalContent({
        title: section.title,
        content: section.description || "",
      });
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Dynamically rendered from JSON config
        </p>
      </div>

      {/* Dynamic Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <DynamicRenderer
            key={section.id}
            componentName={section.componentType}
            props={{
              ...section,
              onClick:
                section.onClickType === "modal"
                  ? () => handleSectionClick(section)
                  : undefined,
            }}
          />
        ))}
      </div>

      {/* Dynamic Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        content={modalContent.content}
      />
    </div>
  );
};

export default DashboardPage;
