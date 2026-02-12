// app/components/Modal.tsx
"use client";

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { MdCancelPresentation } from "react-icons/md";
import Image from "next/image";

interface BasicModalProps {
  imgSrc: string | null;
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC<BasicModalProps> = ({ imgSrc, open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="relative">
        <Button
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8, minWidth: "auto", p: 0 }}
        >
          <MdCancelPresentation
            style={{
              color: "red",
              fontSize: "20px",
              marginTop: "-10px",
            }}
          />
        </Button>
        {imgSrc && (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "90vh",
              display: "block",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <Image
              src={imgSrc}
              alt="Preview"
              width={500}
              height={500}
              className="w-full h-auto max-h-[90vh] object-contain"
              style={{ display: "block", margin: "0 auto" }}
            />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default BasicModal;