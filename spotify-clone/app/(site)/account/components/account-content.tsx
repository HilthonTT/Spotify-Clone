"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@/hooks/use-user";
import { postData } from "@/lib/helpers";
import { Button } from "@/components/button";

export const AccountContent = () => {
  const router = useRouter();
  const { onOpen } = useModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    try {
      setLoading(true);

      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });

      window.location.assign(url);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-7 px-6">
      {!subscription ? (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button onClick={() => onOpen("subscribe")} disabled={isLoading}>
            Subscribe
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the{" "}
            <b>{subscription?.prices?.products?.name} plan</b>
          </p>
          <Button
            className="w-[300px]"
            disabled={isLoading}
            onClick={redirectToCustomerPortal}>
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
};
