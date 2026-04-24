import React, { useState } from "react";
import BaseModal from "./BaseModal";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import FormTextarea from "../ui/FormTextarea";
import PricingCards from "../ui/PricingCards";
import { CoffeeModalFormData, CoffeeModalConfig } from "../../types/hero.types";

interface CoffeeWithMeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onError?: () => void;
  config: CoffeeModalConfig;
}

type Step = "pricing" | "form";

const initialForm: CoffeeModalFormData = {
  name: "",
  email: "",
  topic: "",
  preferredTime: "",
  message: "",
};

const CoffeeWithMeModal: React.FC<CoffeeWithMeModalProps> = ({
  open,
  onClose,
  onSubmit,
  onError,
  config,
}) => {
  const [step, setStep] = useState<Step>("pricing");
  const [selectedTier, setSelectedTier] = useState("");
  const [tierError, setTierError] = useState(false);
  const [form, setForm] = useState<CoffeeModalFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<CoffeeModalFormData>>({});
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
    const newErrors: Partial<CoffeeModalFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.topic) newErrors.topic = "Please select a topic";
    if (!form.preferredTime)
      newErrors.preferredTime = "Please select a preferred time";
    if (!form.message.trim()) newErrors.message = "Please add a message";
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
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">☕</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Coffee Booked!</h3>
            <p className="text-gray-500">
              Looking forward to our chat. See you soon!
            </p>
          </div>
        ) : step === "pricing" ? (
          <>
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">☕</span>
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
                bg-amber-500 hover:bg-amber-600
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
              <span className="text-2xl">☕</span>
              <h2 className="text-2xl font-bold text-gray-800">
                {config.title}
              </h2>
              <span className="ml-auto bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                {selectedTier} Plan
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <FormInput
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Alex Smith"
                required
                error={errors.name}
              />
              <FormInput
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="alex@example.com"
                required
                error={errors.email}
              />
              <FormSelect
                label="What Would You Like to Chat About?"
                value={form.topic}
                onChange={(v) => setForm({ ...form, topic: v })}
                options={config.topics}
                placeholder="Select a topic"
                required
                error={errors.topic}
              />
              <FormSelect
                label="Preferred Time"
                value={form.preferredTime}
                onChange={(v) => setForm({ ...form, preferredTime: v })}
                options={config.preferredTimes}
                placeholder="Select preferred time"
                required
                error={errors.preferredTime}
              />
              <FormTextarea
                label="Anything Else to Share?"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                placeholder="Tell me a bit about yourself..."
                required
                rows={3}
                error={errors.message}
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white text-sm transition-all duration-200 ${loading ? "bg-amber-400 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5"}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Booking...
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

export default CoffeeWithMeModal;
