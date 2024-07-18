"use client";

import { createNewProject, getAllFiles } from "@/lib/actions";
import { File as PrismaFile } from "@prisma/client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { Button, Input, Select, Tag } from "antd";
import type { SelectProps } from "antd";

type TagRender = SelectProps["tagRender"];
type LabelRender = SelectProps["labelRender"];

export default function AdminPage() {
  const [files, setFiles] = useState<PrismaFile[]>();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const getAllImages = async () => {
    const files = await getAllFiles();
    setFiles(files);
  };

  const deleteImage = async (fileId: string | number) => {
    setIsDeleting(true);
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
    setIsDeleting(false);
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
              <Button
                className="!hidden items-center justify-center rounded-md !bg-red-500/20 !border !border-red-500/50 !text-white p-2 text-xl !absolute group-hover:!flex !bottom-2 !left-2 hover:!bg-red-500/50 transition-all"
                onClick={() => {
                  deleteImage(f.id);
                }}
                disabled={isDeleting}
                loading={isDeleting}>
                <FaTrash />
              </Button>
            </div>
          ))}
      </div>
      <Projects files={files!} />
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

const labelImageRender: LabelRender = (props) => {
  const { label, value } = props;

  if (label) {
    return value;
  }
  return <img src={value as string} className="w-8 h-8 rounded" />;
};
const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value && (value as string).split(",")[2]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginInlineEnd: 4,
        color: value && (value as string).split(",")[1],
      }}>
      {label}
    </Tag>
  );
};
function Projects({ files }: { files: PrismaFile[] }) {
  const [images, setImages] = useState<{ value: string }[]>();
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [status, setStatus] = useState("");
  const [Technologies, setTechnologies] = useState<string[]>([]);

  const tSamples = [
    {
      value: "Next.js,#000,#fff",
      label: "Next.js",
    },
    {
      value: "React.js,#fff,#0af",
      label: "React.js",
    },
    {
      value: "Three.js,#fff,#000",
      label: "Three.js",
    },
    {
      value: "Tailwind,#fff,#0cf",
      label: "Tailwind",
    },
    {
      value: "TypeScript,#fff,#00f",
      label: "TypeScript",
    },
    {
      value: "FramerMotion,#fff,#f0f",
      label: "FramerMotion",
    },
    {
      value: "MUI,#fff,#06f",
      label: "MUI",
    },
    {
      value: "Shadcn UI,#fff,#000",
      label: "Shadcn UI",
    },
    {
      value: "DnD,#fff,#4b0082",
      label: "DnD",
    },
    {
      value: "Swiper,#fff,#40c5ef",
      label: "Swiper",
    },
    {
      value: "Particles.TS,#fff,#4b0082",
      label: "Particles.TS",
    },
    {
      value: "Node.js,#fff,#008000",
      label: "Node.js",
    },
    {
      value: "MongoDB,#fff,#50c878",
      label: "MongoDB",
    },
    {
      value: "Electron.js,#fff,#333",
      label: "Electron.js",
    },
    {
      value: "Sass,#fff,#f0f",
      label: "Sass",
    },
    {
      value: "JavaScript,#000,#ff0",
      label: "JavaScript",
    },
    {
      value: "Jquery,#00f,#fff",
      label: "Jquery",
    },
    {
      value: "Socket.io,#000,#fff",
      label: "Socket.io",
    },
  ];

  useEffect(() => {
    (async () => {
      files &&
        setImages(() => {
          return files.map((img) => {
            return {
              value: img.url,
            };
          });
        });
    })();
  }, [files]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await createNewProject({
          title,
          progress,
          thumbnail,
          status,
          Technologies,
        });
      }}
      className="flex flex-col gap-2 ">
      <Input
        placeholder="Title"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        value={progress}
        onChange={(e) => setProgress(+e.target.value)}
        type="number"
        placeholder="Progress"
        id="progress"
        name="progress"
      />
      <Select
        options={images}
        labelRender={labelImageRender}
        //@ts-ignore
        optionRender={labelImageRender}
        onChange={(v) => setThumbnail(v)}
        size="large"
      />
      <Select
        options={[
          {
            value: "متوقف شده",
          },
          {
            value: "تکمیل شده",
          },
          {
            value: "درحال پیشرفت",
          },
        ]}
        onChange={(v) => setStatus(v)}
      />
      <Select
        mode="multiple"
        tagRender={tagRender}
        options={tSamples}
        onChange={(v) => setTechnologies(v)}
      />
      <Button htmlType="submit">Submit Project</Button>
    </form>
  );
}
