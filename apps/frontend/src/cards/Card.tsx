import React from "react";
import { Button } from "@mui/material";

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button variant="contained" color="primary" onClick={onClick} fullWidth>
        Learn More
      </Button>
    </div>
  );
};

export default Card;
