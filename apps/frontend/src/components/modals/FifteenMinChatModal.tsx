import React, { useState } from "react";
import BaseModal from "./BaseModal";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import FormTextarea from "../ui/FormTextarea";
import {
  FifteenMinChatFormData,
  FifteenMinChatConfig,
} from "../../types/hero.types";

interface FifteenMinChatModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onError?: () => void;
  config: FifteenMinChatConfig;
}

const initialForm: FifteenMinChatFormData = {
  name: "",
  email: "",
  topic: "",
  availability: "",
  message: "",
};

const FifteenMinChatModal: React.FC<FifteenMinChatModalProps> = ({
  open,
  onClose,
  onSubmit,
  onError,
  config,
}) => {
  const [form, setForm] = useState<FifteenMinChatFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FifteenMinChatFormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FifteenMinChatFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.topic) newErrors.topic = "Please select a topic";
    if (!form.availability)
      newErrors.availability = "Please select your availability";
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
      setForm(initialForm);
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <div className="p-8">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">⏱️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Call Booked!</h3>
            <p className="text-gray-500">
              Your 15 minute chat is booked. See you soon!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⏱️</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  {config.title}
                </h2>
              </div>
              <p className="text-gray-500 text-sm">{config.subtitle}</p>
            </div>

            <div className="flex flex-col gap-4">
              <FormInput
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Your name"
                required
                error={errors.name}
              />
              <FormInput
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="your@email.com"
                required
                error={errors.email}
              />
              <FormSelect
                label="What Would You Like to Discuss?"
                value={form.topic}
                onChange={(v) => setForm({ ...form, topic: v })}
                options={config.topics}
                placeholder="Select a topic"
                required
                error={errors.topic}
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
                label="Anything Else to Share?"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                placeholder="Tell me a bit about what you need help with..."
                required
                rows={3}
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

export default FifteenMinChatModal;
