import React, { useState } from "react";
import BaseModal from "./BaseModal";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import FormTextarea from "../ui/FormTextarea";
import {
  AuditWebsiteFormData,
  AuditWebsiteConfig,
} from "../../types/hero.types";

interface AuditWebsiteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onError?: () => void;
  config: AuditWebsiteConfig;
}

const initialForm: AuditWebsiteFormData = {
  name: "",
  email: "",
  websiteUrl: "",
  websiteType: "",
  auditArea: "",
  message: "",
};

const AuditWebsiteModal: React.FC<AuditWebsiteModalProps> = ({
  open,
  onClose,
  onSubmit,
  onError,
  config,
}) => {
  const [form, setForm] = useState<AuditWebsiteFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<AuditWebsiteFormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<AuditWebsiteFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.websiteUrl.trim())
      newErrors.websiteUrl = "Please enter your website URL";
    if (!form.websiteType)
      newErrors.websiteType = "Please select a website type";
    if (!form.auditArea) newErrors.auditArea = "Please select an audit area";
    if (!form.message.trim())
      newErrors.message = "Please tell me about your website";
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
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              Audit Requested!
            </h3>
            <p className="text-gray-500">
              I will review your website and get back to you with honest
              feedback soon.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔍</span>
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
              <FormInput
                label="Website URL"
                value={form.websiteUrl}
                onChange={(v) => setForm({ ...form, websiteUrl: v })}
                placeholder="https://yourwebsite.com"
                required
                error={errors.websiteUrl}
              />
              <FormSelect
                label="Website Type"
                value={form.websiteType}
                onChange={(v) => setForm({ ...form, websiteType: v })}
                options={config.websiteTypes}
                placeholder="Select website type"
                required
                error={errors.websiteType}
              />
              <FormSelect
                label="What Would You Like Audited?"
                value={form.auditArea}
                onChange={(v) => setForm({ ...form, auditArea: v })}
                options={config.auditAreas}
                placeholder="Select audit area"
                required
                error={errors.auditArea}
              />
              <FormTextarea
                label="Tell Me About Your Website"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                placeholder="What is the purpose of your website? What are your main concerns or goals?"
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
                      ? "bg-purple-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5"
                  }
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
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

export default AuditWebsiteModal;
