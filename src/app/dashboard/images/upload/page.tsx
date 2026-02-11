"use client";

/**
 * @route /dashboard/images/upload
 * Page used to upload new images to the website
 * @author Kylee Brown
 */

import { useDropzone } from "react-dropzone";
import { useCallback, useState, Dispatch, SetStateAction } from "react";
import { cn } from "@/Styling configs/utils";
import ImagePreview from "@/components/ImagePreview";
import { generateLocalURL } from "@/Lib/helpers/serverHelpers";
import ModalPopup from "@/components/ModalPopup";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { uploadImage } from "@/ServerActions/Images/images";
import { compressFiles } from "@/Lib/helpers/clientHelpers";

interface supabaseError extends Error {
  code: string;
}

const page = () => {
  // manages local image file list state
  const [filesToUpload, setFilesToUpload]: [
    File[],
    Dispatch<SetStateAction<File[]>>
  ] = useState<File[]>([]);
  // manages modal popup state
  const [dialogOpen, setDialogOpen]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState<boolean>(false);
  // handles tooltip state
  const [toolOpen, setToolOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  // handles error objects
  const [error, setError]: [
    supabaseError,
    Dispatch<SetStateAction<supabaseError>>
  ] = useState(null);
  // handles loading state
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [success, setSuccess]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);

  // callback for adding files to list on Drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFilesToUpload((prev) => [...prev, ...acceptedFiles]);
    // Do something with the files
    acceptedFiles.map((file) => console.log(file));
  }, []);

  // Drop zone config
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 10,
  });

  /* Function to handle uploading each file */
  const handleUpload = async (): Promise<void> => {
    try {
      setLoading(true);

      //TODO: Compress images before requesting to upload
      const compressedFiles = await compressFiles(filesToUpload);

      // upload each file
      await Promise.all(
        compressedFiles.map(async (file) => {
          try {
            // upload using uploadImage server action
            await uploadImage(file);
          } catch (e) {
            // handle errors
            throw new Error(e.message);
          }
        })
      );

      setSuccess(true);
      setFilesToUpload([]);
    } catch (e) {
      setLoading(false);
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-amber-950 w-full h-[92vh] max-[830px]:h-[94.5vh] max-[768px]:h-screen">
      {/* Images to upload */}
      <section className="h-[70%]  max-[768px]:h-[80%] overflow-y-scroll w-full bg-[#240d01] text-white">
        {filesToUpload.length > 0 ? (
          <div className="w-full pt-4 pl-4">
            <Button
              onClick={() => setFilesToUpload([])}
              className="bg-white text-amber-900 uppercase cursor-pointer hover:scale-102 transition-all ease-in"
            >
              Clear All
            </Button>{" "}
          </div>
        ) : null}
        {filesToUpload.length > 0 ? (
          <div className="grid grid-cols-5 gap-4 max-[768px]:flex-wrap max-[768px]:flex max-[768px]:gap-4 max-[768px]:items-center max-[768px]:justify-center max-[768px]:pt-[1em] z-0 p-8 max-[768px]:p-1 overflow-hidden w-full">
            {filesToUpload.map((file, index) => (
              <ImagePreview
                handleDelete={() => {
                  setFilesToUpload(
                    filesToUpload.filter((item) => item !== file)
                  );
                }}
                src={generateLocalURL(file)}
                key={index}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>No Images Chosen</p>
            {/** Tool Tip */}
            <Tooltip open={toolOpen} onOpenChange={setToolOpen}>
              <TooltipTrigger className="cursor-help">
                <svg
                  onClick={() => {
                    setToolOpen(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="ml-3 bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-black">
                Selected images will appear here
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </section>
      {/* DROP ZONE */}
      <section className="h-[30%] max-[768px]:h-[20%] z-9 p-[1em] text-white w-full flex items-center justify-center ">
        <div
          {...getRootProps()}
          className={cn(
            isDragActive && "bg-[#ffffff1f]",
            "hover:bg-[#ffffff1f] flex items-center justify-center w-full h-full border-2 border-dotted"
          )}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="absolute z-99">Drop File(s) here</p>
          ) : (
            <p className="absolute z-0 max-[768px]:text-[0.75em]">
              Drag File(s) or click to select the file(s)
            </p>
          )}
        </div>
      </section>
      {/* Upload button */}
      {filesToUpload.length > 0 ? (
        <div className="w-full h-auto flex items-center pl-[1em] pr-[1em] justify-center">
          <a
            onClick={() => {
              console.log(filesToUpload),
                setDialogOpen(true),
                setError(null),
                setSuccess(false);
            }}
            className="cursor-pointer p-[0.25em] rounded w-full mb-4 text-center bg-white text-amber-950"
          >
            Upload
          </a>
        </div>
      ) : null}
      <ModalPopup
        className="bg-white max-[768px]:backdrop-blur-xl max-[768px]:text-white"
        open={dialogOpen}
        setOpen={setDialogOpen}
        description={
          error ? (
            <span className="text-red-500">
              {error.message}
              <br></br>
              {error.code}
            </span>
          ) : !success ? (
            <span className="text-black">
              {loading
                ? "Loading..."
                : "Are you sure you want to upload these images?"}
            </span>
          ) : (
            <span className="text-green-500">
              Success! Images have been uploaded
            </span>
          )
        }
        customClose={
          success ? (
            <span></span>
          ) : !loading ? (
            <Button variant="outline" className="text-black cursor-pointer">
              {error ? "Cancel" : "No"}
            </Button>
          ) : null
        }
        footer={
          success ? (
            <Button
              onClick={() => {
                setDialogOpen(false);
              }}
              variant="outline"
              className="cursor-pointer hover:scale-102 active-scale:100 text-green-500 outline-green-500 hover:bg-green-500 hover:text-white"
            >
              Ok
            </Button>
          ) : !loading ? (
            !error ? (
              <Button
                variant="outline"
                className="bg-green-500 cursor-pointer text-white"
                /* Invoke the server action uloadImages() */
                onClick={() => {
                  handleUpload();
                }}
              >
                Yes
              </Button>
            ) : null
          ) : null
        }
      />
    </div>
  );
};

export default page;
