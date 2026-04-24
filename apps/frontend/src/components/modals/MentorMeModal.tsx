import React, { useState } from "react";
import BaseModal from "./BaseModal";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import FormTextarea from "../ui/FormTextarea";
import PricingCards from "../ui/PricingCards";
import { MentorModalFormData, MentorModalConfig } from "../../types/hero.types";

interface MentorMeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onError?: () => void;
  config: MentorModalConfig;
}

type Step = "pricing" | "form";

const initialForm: MentorModalFormData = {
  name: "",
  email: "",
  mentoringArea: "",
  availability: "",
  goals: "",
};

const MentorMeModal: React.FC<MentorMeModalProps> = ({
  open,
  onClose,
  onSubmit,
  onError,
  config,
}) => {
  const [step, setStep] = useState<Step>("pricing");
  const [selectedTier, setSelectedTier] = useState("");
  const [tierError, setTierError] = useState(false);
  const [form, setForm] = useState<MentorModalFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<MentorModalFormData>>({});
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
    const newErrors: Partial<MentorModalFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.mentoringArea)
      newErrors.mentoringArea = "Please select a mentoring area";
    if (!form.availability)
      newErrors.availability = "Please select your availability";
    if (!form.goals.trim()) newErrors.goals = "Please share your goals";
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
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎓</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Request Sent!</h3>
            <p className="text-gray-500">
              Excited to work with you. I will be in touch shortly!
            </p>
          </div>
        ) : step === "pricing" ? (
          <>
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎓</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  {config.title}
                </h2>
              </div>
              <p className="text-gray-500 text-sm">{config.subtitle}</p>
            </div>

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
            <button
              onClick={() => setStep("pricing")}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-600 transition-colors mb-6 bg-transparent border-none cursor-pointer"
            >
              ← Back to plans
            </button>

            <div className="flex items-center gap-3 mb-6 pr-8">
              <span className="text-2xl">🎓</span>
              <h2 className="text-2xl font-bold text-gray-800">
                {config.title}
              </h2>
              <span className="ml-auto bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                {selectedTier} Plan
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <FormInput
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Jane Doe"
                required
                error={errors.name}
              />
              <FormInput
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="jane@example.com"
                required
                error={errors.email}
              />
              <FormSelect
                label="Mentoring Area"
                value={form.mentoringArea}
                onChange={(v) => setForm({ ...form, mentoringArea: v })}
                options={config.mentoringAreas}
                placeholder="Select area of focus"
                required
                error={errors.mentoringArea}
              />
              <FormSelect
                label="Your Availability"
                value={form.availability}
                onChange={(v) => setForm({ ...form, availability: v })}
                options={config.availability}
                placeholder="Select availability"
                required
                error={errors.availability}
              />
              <FormTextarea
                label="Your Goals"
                value={form.goals}
                onChange={(v) => setForm({ ...form, goals: v })}
                placeholder="What do you want to achieve through mentorship?"
                required
                error={errors.goals}
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white text-sm transition-all duration-200 ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"}`}
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

export default MentorMeModal;
