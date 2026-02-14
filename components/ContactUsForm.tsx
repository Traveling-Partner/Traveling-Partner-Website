// app/components/ContactUsForm.tsx
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { IoCloudUploadOutline, IoClose } from "react-icons/io5";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import axios from "axios";
import Image from "next/image";
import FormAlert from "./FormAlert";
import CircularIndeterminate from "./loader";
import BasicModal from "./Modal";
import { motion } from "framer-motion";

interface SubmissionStatus {
  type: "success" | "error" | null;
  message: string;
}

const ContactUsForm: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    type: null,
    message: "",
  });
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const submitHandler = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData();
    formData.append(
      "name",
      (form.elements.namedItem("Name") as HTMLInputElement).value,
    );
    formData.append(
      "email",
      (form.elements.namedItem("email") as HTMLInputElement).value,
    );
    formData.append(
      "message",
      (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    );
    formData.append(
      "subject",
      (form.elements.namedItem("subject") as HTMLInputElement).value,
    );
    formData.append(
      "phoneNumber",
      (form.elements.namedItem("phoneNumber") as HTMLInputElement).value,
    );

    if (file) {
      formData.append("photo", file);
    }

    try {
      const response = await axios.post(
        "https://api.traveling-partner.com/api/contact ",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);
      setSubmissionStatus({
        type: "success",
        message: "Form submitted successfully!",
      });
      setAlertVisible(true);
      setLoading(false);
      form.reset();
      setSelectedFile("");
      setFile(null);
      setFilePreview(null);
    } catch (error) {
      console.error(error);
      setSubmissionStatus({
        type: "error",
        message: "Failed to submit form. Please try again.",
      });
      setAlertVisible(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alertVisible]);

  const handleUploadClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setSelectedFile(selectedFile.name);
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const contactInfo = [
    { icon: MdLocationOn, label: "Address", value: "Islamabad, Pakistan" },
    { icon: MdEmail, label: "Email", value: "info@traveling-partner.com" },
    { icon: MdPhone, label: "Phone", value: "+92 300 1234567" },
  ];

  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/duubabjk7/image/upload/v1770875922/tp-Imgs/map_v8tji2.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 lg:py-20">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-[#FCE001] to-[#FDB813] rounded-full text-xs font-bold text-black uppercase tracking-wider mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
            Contact <span className="text-[#FCE001]">Us</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FCE001] to-[#FDB813] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-lg:max-w-xl max-lg:mx-auto">
          {/* LEFT SIDE - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Have questions or need assistance? Our team is here to help you with any inquiries about our services.
            </p>

            {/* Contact Cards */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FCE001] to-[#FDB813] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
              {/* Decorative Corner */}
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#FCE001] to-[#FDB813] rounded-xl -z-10 opacity-30 blur-lg" />

              {/* Loader Overlay */}
              {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl">
                  <CircularIndeterminate />
                </div>
              )}

              <form onSubmit={submitHandler} className="space-y-4 relative">
                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="Name"
                      placeholder="Your Name"
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#FDB813] focus:ring-2 focus:ring-[#FDB813]/20 disabled:opacity-50"
                    />
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#FDB813] focus:ring-2 focus:ring-[#FDB813]/20 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#FDB813] focus:ring-2 focus:ring-[#FDB813]/20 disabled:opacity-50"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#FDB813] focus:ring-2 focus:ring-[#FDB813]/20 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={3}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#FDB813] focus:ring-2 focus:ring-[#FDB813]/20 resize-none disabled:opacity-50"
                  />
                </div>

                {/* Upload & Submit Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  {/* Upload Section */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      type="button"
                      onClick={handleUploadClick}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-sm font-medium text-gray-600 hover:border-[#FDB813] hover:text-[#FDB813] hover:bg-[#FDB813]/5 transition-all duration-300 disabled:opacity-50"
                    >
                      <IoCloudUploadOutline className="text-lg" />
                      Attach File
                    </motion.button>

                    <input
                      ref={fileInputRef}
                      className="hidden"
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                    
                    {selectedFile && (
                      <span className="text-xs text-gray-600 max-w-[100px] truncate bg-gray-100 px-2 py-1 rounded">
                        {selectedFile}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FCE001] to-[#FDB813] text-black font-bold text-sm shadow-lg shadow-[#FDB813]/30 hover:shadow-xl hover:shadow-[#FDB813]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* File Preview */}
                {filePreview && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 pt-2"
                  >
                    <div
                      className="relative h-14 w-14 cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 hover:border-[#FDB813] transition-colors"
                      onClick={handleOpen}
                    >
                      <Image
                        src={filePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setFilePreview(null);
                        setSelectedFile("");
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                      disabled={loading}
                    >
                      <IoClose className="w-4 h-4" />
                      Remove
                    </button>
                  </motion.div>
                )}
              </form>

              {/* Alerts */}
              {alertVisible && <FormAlert status={submissionStatus.type} />}

              {/* Modal */}
              <BasicModal
                imgSrc={filePreview}
                open={open}
                handleClose={handleClose}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;