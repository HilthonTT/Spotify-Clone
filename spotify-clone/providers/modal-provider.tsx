"use client";

import { useEffect, useState } from "react";

import { AuthModal } from "@/components/modals/auth-modal";
import { UploadModal } from "@/components/modals/upload-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};
