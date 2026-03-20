import React, { useState } from "react";
import BaseModal from "./BaseModal";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import FormTextarea from "../ui/FormTextarea";
import { ConnectModalFormData } from "../../types/hero.types";

interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onError?: () => void;
  config: {
    title: string;
    subtitle: string;
    submitLabel: string;
    platforms: string[];
  };
}

const initialForm: ConnectModalFormData = {
  name: "",
  email: "",
  platform: "",
  message: "",
};

const ConnectModal: React.FC<ConnectModalProps> = ({
  open,
  onClose,
  onSubmit,
  onError,
  config,
}) => {
  const [form, setForm] = useState<ConnectModalFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<ConnectModalFormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ConnectModalFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.platform) newErrors.platform = "Please select a platform";
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
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
        {/* Success State */}
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Connected!</h3>
            <p className="text-gray-500">
              Great connecting with you. I'll reach out shortly!
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🤝</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  {config.title}
                </h2>
              </div>
              <p className="text-gray-500 text-sm">{config.subtitle}</p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              <FormInput
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Your Name"
                required
                error={errors.name}
              />

              <FormInput
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="Your email address"
                required
                error={errors.email}
              />

              <FormSelect
                label="Preferred Platform"
                value={form.platform}
                onChange={(v) => setForm({ ...form, platform: v })}
                options={config.platforms}
                placeholder="Select platform"
                required
                error={errors.platform}
              />

              <FormTextarea
                label="Your Message"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                placeholder="Say hello, share what you're working on, or just reach out..."
                required
                rows={3}
                error={errors.message}
              />

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`
                  w-full py-4 rounded-xl
                  font-bold text-white text-sm
                  transition-all duration-200
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

export default ConnectModal;
