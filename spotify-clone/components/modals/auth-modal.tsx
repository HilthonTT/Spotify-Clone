"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Modal } from "@/components/modals/modal";
import { useModal } from "@/hooks/use-modal-store";

export const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();

  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "auth";

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isModalOpen}
      onChange={onChange}>
      <Auth
        theme="dark"
        magicLink
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};
