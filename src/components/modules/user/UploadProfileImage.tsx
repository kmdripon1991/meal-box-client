"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { UploadImage } from "@/services/Auth/authServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "sonner";

const ChangeProfileImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  const handleChangeProfileImage = async () => {
    const toastId = toast.loading("Profile image updated", { duration: 3000 });
    if (files.length === 0) {
      toast.error("You must select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const result = await UploadImage(formData);
      if (result?.success) {
        toast.success(result.message || "Profile image updated!", {
          duration: 3000,
          id: toastId,
        });
        router.push("/dashboard/user/view-profile");
      } else {
        toast.error(result?.message || "Something went wrong.", {
          duration: 3000,
          id: toastId,
        });
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(err.message || "Failed to upload image.");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <FaCamera className="text-4xl p-2 cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Profile Image</DialogTitle>
          </DialogHeader>
          <div className="w-full my-5 max-w-4xl mx-auto min-h-10 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
            <FileUpload onChange={handleFileUpload} />
          </div>
          <Button type="button" onClick={handleChangeProfileImage}>
            Submit Change
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeProfileImage;
