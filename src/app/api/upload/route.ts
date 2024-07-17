import { NextRequest, NextResponse } from "next/server";
import { S3 } from "aws-sdk";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileName, fileType } = await request.json();

  // تنظیمات S3
  const s3 = new S3({
    endpoint: process.env.LIARA_ENDPOINT,
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
    s3ForcePathStyle: true, // لازم است برای Liara
    signatureVersion: "v4",
  });

  // پارامترهای S3
  const s3Params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read",
  };

  try {
    // ایجاد URL امضا شده
    const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);

    // ذخیره اطلاعات فایل در پایگاه داده
    const savedFile = await prisma.file.create({
      data: {
        url: `https://${process.env.LIARA_BUCKET_NAME}.storage.iran.liara.space/${fileName}`,
        filename: fileName,
        mimetype: fileType,
        size: 0, // اینجا برای آپلود اولیه، اندازه فایل مهم نیست
      },
    });

    return NextResponse.json({ uploadURL, fileId: savedFile.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error generating signed URL" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileId } = await request.json();

  try {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // تنظیمات S3
    const s3 = new S3({
      endpoint: process.env.LIARA_ENDPOINT,
      accessKeyId: process.env.LIARA_ACCESS_KEY,
      secretAccessKey: process.env.LIARA_SECRET_KEY,
      s3ForcePathStyle: true, // لازم است برای Liara
      signatureVersion: "v4",
    });

    // حذف فایل از S3
    await s3
      .deleteObject({
        Bucket: process.env.LIARA_BUCKET_NAME!,
        Key: file.filename,
      })
      .promise();

    // حذف رکورد فایل از پایگاه داده
    await prisma.file.delete({
      where: { id: fileId },
    });

    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
  }
}
