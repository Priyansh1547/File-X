"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { ref, deleteObject } from "firebase/storage";
import { useState, useEffect } from "react";

// Define the type for your document
interface Document {
  id: string;
  fileName: string;
  fullName: string;
  size: string;
  type: string;
  downloadURL: string;
}

export default function Tables() {
  const { user } = useUser();
  const id = user?.id;
  const [docs, setDocs] = useState<Document[]>([]);

  useEffect(() => {
    if (!id) return;

    const collectionRef = collection(db, `users/${id}/files`);
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Document[];
      setDocs(docs);
    });

    return () => unsubscribe();
  }, [id]);

  const handleDelete = async (fileId: string, fileName: string) => {
    try {
      // Delete the file from Firestore
      await deleteDoc(doc(db, `users/${id}/files`, fileId));

      // Delete the file from Firebase Storage
      const fileRef = ref(storage, `users/${id}/files/${fileId}`);
      await deleteObject(fileRef);

      console.log(`File ${fileName} deleted successfully`);
    } catch (error) {
      console.error("Error deleting file: ", error);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Download</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {docs?.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="max-w-xs">{doc.fileName}</TableCell>
              <TableCell>
                {Number(doc.size) > 1024 * 1024
                  ? Math.round(Number(doc.size) / (1024 * 1024)) + " MB"
                  : Math.round(Number(doc.size) / 1024) + " KB"}
              </TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    window.open(doc.downloadURL, "_blank");
                    console.log(doc.downloadURL);
                  }}
                >
                  Download
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(doc.id, doc.fileName)}
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
