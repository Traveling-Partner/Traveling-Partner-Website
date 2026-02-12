// app/components/ContactUsForm.tsx
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";
import Image from "next/image";
import FormAlert from "./FormAlert";
import CircularIndeterminate from "./loader";
import BasicModal from "./Modal";

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
        "https://api.traveling-partner.com/api/contact",
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
      // Reset form
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

  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/duubabjk7/image/upload/v1770875922/tp-Imgs/map_v8tji2.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative mx-auto grid min-h-[750px] max-w-7xl grid-cols-2 items-center gap-16 px-6 py-20 max-lg:grid-cols-1">
        {/* LEFT SIDE */}
        <div className="text-white max-lg:text-center">
          <h1 className="font-poppins text-6xl font-bold uppercase tracking-wide max-md:text-4xl">
            CONTACT US
          </h1>

          <p className="mt-6 max-w-md text-lg text-gray-200 max-lg:mx-auto">
            Have questions or need assistance? Fill out the form and our team
            will get back to you as soon as possible.
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full">
          <div className="relative w-full rounded-2xl bg-white p-10 shadow-2xl max-md:p-6">
            {/* Loader Overlay - Only show when loading */}
            {loading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 rounded-2xl">
                <CircularIndeterminate />
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-6 relative">
              {/* Name */}
              <input
                type="text"
                name="Name"
                placeholder="Name"
                required
                disabled={loading}
                className="w-full border-0 border-b border-gray-300 bg-transparent py-4 text-base text-gray-700 placeholder-gray-400 outline-none transition focus:border-black disabled:opacity-50"
              />

              {/* Subject */}
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                disabled={loading}
                className="w-full border-0 border-b border-gray-300 bg-transparent py-4 text-base text-gray-700 placeholder-gray-400 outline-none transition focus:border-black disabled:opacity-50"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={loading}
                className="w-full border-0 border-b border-gray-300 bg-transparent py-4 text-base text-gray-700 placeholder-gray-400 outline-none transition focus:border-black disabled:opacity-50"
              />

              {/* Phone */}
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                disabled={loading}
                className="w-full border-0 border-b border-gray-300 bg-transparent py-4 text-base text-gray-700 placeholder-gray-400 outline-none transition focus:border-black disabled:opacity-50"
              />

              {/* Message */}
              <textarea
                name="message"
                placeholder="Message"
                required
                rows={3}
                disabled={loading}
                className="w-full resize-none border-0 border-b border-gray-300 bg-transparent py-4 text-base text-gray-700 placeholder-gray-400 outline-none transition focus:border-black disabled:opacity-50"
              />

              {/* Upload + Submit */}
              <div className="flex items-center justify-between pt-6">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={loading}
                    className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IoCloudUploadOutline className="text-xl" />
                    Upload
                  </button>

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
                    <span className="text-xs text-gray-600 max-w-[150px] truncate">
                      {selectedFile}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-gradient-to-b from-[#fce001] to-[#fdb813] px-8 py-3 text-sm font-medium text-black transition hover:shadow-lg hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

              {/* File Preview */}
              {filePreview && (
                <div className="flex items-center gap-4 pt-4">
                  <div
                    className="relative h-[100px] w-[100px] cursor-pointer overflow-hidden rounded-lg border"
                    onClick={handleOpen}
                  >
                    <Image
                      src={filePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="100px"
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
                    className="text-xs text-red-500 hover:text-red-700 underline"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
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
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;