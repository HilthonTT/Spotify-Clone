"use client";

import uniqid from "uniqid";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/use-user";
import { useModal } from "@/hooks/use-modal-store";

import { Input } from "@/components/input";
import { Modal } from "@/components/modals/modal";
import { Button } from "@/components/button";

export const UploadModal = () => {
  const router = useRouter();

  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "upload";

  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        return toast.error("Missing fields.");
      }

      const uniqueID = uniqid();

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setLoading(false);
        console.log(songError);
        return toast.error("Failed song upload.");
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setLoading(false);
        console.log(imageError);
        return toast.error("Failed image upload.");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      toast.success("Song created!");
      reset();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={isModalOpen}
      onChange={onChange}>
      <form onSubmit={handleSubmit(onSubmit)} className="gap-y-4 flex flex-col">
        <Input
          id="title"
          disabled={loading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={loading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={loading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={loading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={loading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};
