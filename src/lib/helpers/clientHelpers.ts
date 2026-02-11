'use client'
import imageCompression from 'browser-image-compression';
/**
 * @file clientHelpers.ts
 * @author Kylee Brown
 * @description File to hold all helper client functions
 * CLIENT HELPERS
 */

/**
 * a function that compresses files over 1MB
 * @param files
 * @returns a list representing the files after compression
 */

export const compressFiles = async (files: File[]): Promise<File[]> => {
    //Max Size
    const maxSizeInBytes = 1048576; // 1MB
    // options to pass to the imageCompression func
    const options = {
        maxSizeMB: 1,
        useWebWorker: true
    }
    // list to hold the compressed files
    const compressedFiles: File[] = [];

    try {
        // map through the file list
        await Promise.all(files.map(async (file) => {
            // if file size is less than 1MB
            if (file.size > maxSizeInBytes) {
                try {
                    // compress the file
                    const compressedFile: File = await imageCompression(file, options)
                    // log the file size
                    console.log(compressedFile.name)
                    // add to new list
                    compressedFiles.push(compressedFile)
                } catch (e) {
                    // handle error
                    throw new Error(e.message);
                }
            } else {
                //ELSE
                // add the file directly to the list
                compressedFiles.push(file)
            }
        }));
        // return the compressed list
        return compressedFiles;

    } catch (err) {
        // handle error
        throw err;
    }
}