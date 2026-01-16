/**
 * Author: Kylee Brown
 * Description: File to hold all helper functions
 */


/**
 * Generates a local url from the client uploaded file
 * @param file
 * @returns a string representing the lcoal url path of that file
 */

export const generateLocalURL = (file: File):string => { 
    const url = URL.createObjectURL(file);
    return url;
}