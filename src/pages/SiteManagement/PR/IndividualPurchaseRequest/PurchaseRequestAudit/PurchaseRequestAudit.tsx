import React from "react";
import "./PurchaseRequestAudit.css";

interface PurchaseRequestAuditProps {
  title: string;
  text: string;
  isRight?: boolean;
  isFullWidth?: boolean;
  fontSize?: number;
  subtitle?: string;
}

const PurchaseRequestAudit: React.FC<PurchaseRequestAuditProps> = ({
  text,
  title,
  isRight = false,
  isFullWidth,
  fontSize = 12,
  subtitle,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div
      className={`flex flex-col mt-[4px] ${
        isFullWidth ? "w-full" : "w-[50%]"
      } ${isRight && "text-right items-end"}`}
    >
      <div className={`font-light text-[${fontSize}px] opacity-70`}>
        {title}
      </div>
      {subtitle && (
        <div className={`font-light text-[10px] opacity-70`}>{subtitle}</div>
      )}
      <div className={`font-semibold text-[${fontSize}px] opacity-70`}>
        {text}
      </div>
    </div>
  );
};

export default PurchaseRequestAudit;
