import React from "react";

interface InfoPanelProps {
  title: string;
  content: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ title, content }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default InfoPanel;
