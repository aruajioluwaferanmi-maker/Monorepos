import React, { useState } from "react";
import BaseModal from "./BaseModal";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import FormTextarea from "../ui/FormTextarea";
import PricingCards from "../ui/PricingCards";
import { WorkModalFormData, WorkModalConfig } from "../../types/hero.types";

interface DeliverProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onError?: () => void;
  config: WorkModalConfig;
}

type Step = "pricing" | "form";

const initialForm: WorkModalFormData = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

const DeliverProjectModal: React.FC<DeliverProjectModalProps> = ({
  open,
  onClose,
  onSubmit,
  onError,
  config,
}) => {
  const [step, setStep] = useState<Step>("pricing");
  const [selectedTier, setSelectedTier] = useState("");
  const [tierError, setTierError] = useState(false);
  const [form, setForm] = useState<WorkModalFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<WorkModalFormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTierContinue = () => {
    if (!selectedTier) {
      setTierError(true);
      return;
    }
    setTierError(false);
    setStep("form");
  };

  const validate = (): boolean => {
    const newErrors: Partial<WorkModalFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.projectType)
      newErrors.projectType = "Please select a project type";
    if (!form.budget) newErrors.budget = "Please select a budget range";
    if (!form.message.trim())
      newErrors.message = "Please describe your project";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      onError?.();
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    onSubmit?.();
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      resetAll();
      onClose();
    }, 3000);
  };

  const resetAll = () => {
    setStep("pricing");
    setSelectedTier("");
    setTierError(false);
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose} maxWidth="max-w-2xl">
      <div className="p-8">
        {/* Success State */}
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Brief Sent!</h3>
            <p className="text-gray-500">
              Thanks! I will review your project brief and get back within 24
              hours.
            </p>
          </div>
        ) : step === "pricing" ? (
          <>
            {/* Header */}
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🚀</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  {config.title}
                </h2>
              </div>
              <p className="text-gray-500 text-sm">{config.subtitle}</p>
            </div>

            {/* Pricing Cards */}
            <PricingCards
              tiers={config.pricing}
              selectedTier={selectedTier}
              onSelect={(tier) => {
                setSelectedTier(tier);
                setTierError(false);
              }}
            />

            {tierError && (
              <p className="text-red-500 text-xs mt-2">
                Please select a plan to continue
              </p>
            )}

            {/* Continue Button */}
            <button
              onClick={handleTierContinue}
              className="
                w-full mt-6 py-4 rounded-xl
                bg-blue-600 hover:bg-blue-700
                text-white font-bold text-sm
                transition-all duration-200
                hover:shadow-lg hover:-translate-y-0.5
              "
            >
              Continue with {selectedTier || "a Plan"} →
            </button>
          </>
        ) : (
          <>
            {/* Back Button */}
            <button
              onClick={() => setStep("pricing")}
              className="
                flex items-center gap-2
                text-sm text-gray-400
                hover:text-blue-600
                transition-colors mb-6
                bg-transparent border-none
                cursor-pointer
              "
            >
              ← Back to plans
            </button>

            {/* Selected Tier Pill */}
            <div
              className="
              flex items-center gap-2 mb-6
            "
            >
              <div className="flex items-center gap-3 pr-8">
                <span className="text-2xl">🚀</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  {config.title}
                </h2>
              </div>
              <span
                className="
                ml-auto
                bg-blue-100 text-blue-700
                text-xs font-bold
                px-3 py-1 rounded-full
                whitespace-nowrap
              "
              >
                {selectedTier} Plan
              </span>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              <FormInput
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="John Doe"
                required
                error={errors.name}
              />
              <FormInput
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="john@example.com"
                required
                error={errors.email}
              />
              <FormSelect
                label="Project Type"
                value={form.projectType}
                onChange={(v) => setForm({ ...form, projectType: v })}
                options={config.projectTypes}
                placeholder="Select project type"
                required
                error={errors.projectType}
              />
              <FormSelect
                label="Budget Range"
                value={form.budget}
                onChange={(v) => setForm({ ...form, budget: v })}
                options={config.budgets}
                placeholder="Select budget range"
                required
                error={errors.budget}
              />
              <FormTextarea
                label="Describe Your Project"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                placeholder="Tell me about your goals, timeline and any specific requirements..."
                required
                error={errors.message}
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`
                  w-full py-4 rounded-xl font-bold
                  text-white text-sm transition-all duration-200
                  ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
                  }
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  config.submitLabel
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
};

export default DeliverProjectModal;
