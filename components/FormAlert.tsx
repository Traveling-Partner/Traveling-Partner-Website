// app/components/FormAlert.tsx
"use client";

import React from "react";
import { Alert, AlertTitle } from "@mui/material";

interface FormAlertProps {
  status: "success" | "error" | null;
}

const FormAlert: React.FC<FormAlertProps> = ({ status }) => {
  if (!status) return null;

  return (
    <div className="fixed top-5 right-5 z-50 animate-fade-in">
      <Alert severity={status} className="shadow-lg">
        <AlertTitle>{status === "success" ? "Success" : "Error"}</AlertTitle>
        {status === "success" 
          ? "Your message has been sent successfully!" 
          : "There was an error sending your message. Please try again."}
      </Alert>
    </div>
  );
};

export default FormAlert;