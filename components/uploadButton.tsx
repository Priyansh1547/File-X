"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Dropzone from "react-dropzone";
import { Cloud, File } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@clerk/nextjs";
import { db, storage } from "@/firebase";
import { addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const UploadDropzone = () => {
  const [isUploading, setIsUploading] = useState<Boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { user } = useUser();

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  const onDrop = async (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setIsUploading(true);

    const progressInterval = startSimulatedProgress();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearInterval(progressInterval);
    setUploadProgress(100);

    const docRef = await addDoc(collection(db, `users/${user?.id}/files`), {
      userId: user?.id,
      fileName: acceptedFiles[0].name,
      fullName: user?.fullName,
      profileImage: user?.imageUrl,
      size: acceptedFiles[0].size,
      type: acceptedFiles[0].type,
      timeStamp: serverTimestamp(),
    });

    const imgRef = ref(storage, `users/${user?.id}/files/${docRef.id}`);

    uploadBytes(imgRef, acceptedFiles[0]).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imgRef);

      await updateDoc(doc(db, `users/${user?.id}/files/`, docRef.id), {
        downloadURL: downloadURL,
      });
    });
  };

  return (
    <>
      <Dropzone multiple={false} onDrop={onDrop}>
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div {...getRootProps()} className="border h-64 m-4 rounded-lg">
            <div className="flex items-center justify-center h-full w-full">
              <label
                htmlFor=""
                className="flex flex-col items-center justify-center cursor-pointer w-full h-full rounded-lg transition-colors duration-250 bg-black/80 hover:bg-black/50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Cloud className="w-6 h-6 mb-2" />
                  <p className="text-sm text-zinc-300">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  {acceptedFiles && acceptedFiles[0] ? (
                    <div className="max-w-xs mt-4 bg-black/50 flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-800 divide-x divide-zinc-800">
                      <div className="px-3 py-2 h-full grid place-items-center">
                        <File className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="px-3 py-2 h-full text-sm truncate">
                        {acceptedFiles[0].name}
                      </div>
                    </div>
                  ) : null}

                  {isUploading ? (
                    <div className="w-full mt-4 max-w-xs mx-auto">
                      <Progress
                        value={uploadProgress}
                        className="h-1 w-full bg-zinc-800"
                      />
                    </div>
                  ) : null}
                </div>
              </label>
            </div>
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default function UploadButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UploadIcon className="mr-2 h-4 w-4" /> Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="dark text-white">
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
