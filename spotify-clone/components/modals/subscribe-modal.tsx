"use client";

import { useState } from "react";

import { Modal } from "@/components/modals/modal";
import { Button } from "@/components/button";
import { useModal } from "@/hooks/use-modal-store";
import { Price, ProductWithPrice } from "@/types";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/use-user";
import { postData } from "@/lib/helpers";
import { getStripe } from "@/lib/stripe-client";

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

export const SubscribeModal = ({ products }: SubscribeModalProps) => {
  const { user, isLoading, subscription } = useUser();
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "subscribe";

  const [priceIdLoading, setPriceIdLoading] = useState("");

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading("");
      return toast.error("Must be logged in");
    }

    if (subscription) {
      setPriceIdLoading("");
      return toast("Already subscribed");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return toast.error("Something went wrong.");
    } finally {
      setPriceIdLoading("");
    }
  };

  let content = <div className="text-center">No products available.</div>;

  if (products?.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product?.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }

          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}>
              Subscribe for {formatPrice(price)} a {price.interval}
            </Button>
          ));
        })}
      </div>
    );
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (subscription) {
    content = <div className="text-center">Already subscribed</div>;
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={isModalOpen}
      onChange={onChange}>
      {content}
    </Modal>
  );
};
