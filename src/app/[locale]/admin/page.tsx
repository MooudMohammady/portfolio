"use client";

import { getAllFiles } from "@/lib/actions";
import { File as PrismaFile } from "@prisma/client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";

export default function AdminPage() {
  const [files, setFiles] = useState<PrismaFile[]>();

  const { data: session, status } = useSession();
  const router = useRouter();

  const getAllImages = async () => {
    const files = await getAllFiles();
    setFiles(files);
  };

  const deleteImage = async (fileId: string | number) => {
    try {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileId,
        }),
      });
      setFiles((prv) => prv?.filter((f) => f.id !== fileId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      //@ts-ignore
      (session && session.user.role !== "admin")
    ) {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to Admin Page</h1>
      <p>You are logged in as {session?.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
      <Upload getAllImages={getAllImages} />
      <div className="flex gap-2 p-2">
        {files &&
          files.map((f) => (
            <div className="relative group" key={f.id}>
              <img src={f.url} className="rounded-md w-32 h-32 object-cover" />
              <button
                className="hidden items-center justify-center rounded-md bg-red-500/20 border border-red-500/50 text-white p-2 text-xl absolute group-hover:flex bottom-2 left-2 hover:bg-red-500/50 transition-all"
                onClick={() => {
                  deleteImage(f.id);
                }}>
                <FaTrash />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

function Upload({ getAllImages }: { getAllImages: () => Promise<void> }) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    // درخواست به API برای دریافت URL امضا شده
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
    });

    const { uploadURL } = await response.json();

    // آپلود فایل به S3
    const uploadResponse = await fetch(uploadURL, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (uploadResponse.ok) {
      console.log("File uploaded successfully");
      await getAllImages();
    } else {
      console.error("File upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
