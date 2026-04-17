import React, { useState } from "react";
import BaseModal from "./BaseModal";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import FormTextarea from "../ui/FormTextarea";
import { TechCatchUpFormData, TechCatchUpConfig } from "../../types/hero.types";

interface TechCatchUpModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onError?: () => void;
  config: TechCatchUpConfig;
}

const initialForm: TechCatchUpFormData = {
  name: "",
  email: "",
  catchUpTopic: "",
  groupSize: "",
  message: "",
};

const TechCatchUpModal: React.FC<TechCatchUpModalProps> = ({
  open,
  onClose,
  onSubmit,
  onError,
  config,
}) => {
  const [form, setForm] = useState<TechCatchUpFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<TechCatchUpFormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<TechCatchUpFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.catchUpTopic) newErrors.catchUpTopic = "Please select a topic";
    if (!form.groupSize) newErrors.groupSize = "Please select a group size";
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
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">👥</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">You're In!</h3>
            <p className="text-gray-500">
              Excited to have you at the catch up. I will send details shortly!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">👥</span>
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
                label="Catch Up Topic"
                value={form.catchUpTopic}
                onChange={(v) => setForm({ ...form, catchUpTopic: v })}
                options={config.catchUpTopics}
                placeholder="Select a topic"
                required
                error={errors.catchUpTopic}
              />
              <FormSelect
                label="Preferred Group Size"
                value={form.groupSize}
                onChange={(v) => setForm({ ...form, groupSize: v })}
                options={config.groupSizes}
                placeholder="Select group size"
                required
                error={errors.groupSize}
              />
              <FormTextarea
                label="What Do You Hope to Get Out of This?"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                placeholder="Tell me what you are hoping to learn or discuss in the session..."
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
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5"
                  }
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Joining...
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

export default TechCatchUpModal;
