/**
 * @file user.ts
 * @author Kylee Brown
 * @description File that handles fetching the API for USER Data
 *
 */

import { User } from "@/Lib/types/Types";

/**
 * @name createUser
 * @description - Function that retrieves the current user object via API fetch
 * @async
 */

export const handleCreateUser = async (userObject:User) => {
  // send a request to create a user
  const response = await fetch(`/api/user`, {
    method: "POST",
    body: JSON.stringify(userObject),
  });

  // get the response as json
  const data = await response.json();

  return data
}
/**
 * @name getUser
 * @description - Function that retrieves the current user object via API fetch
 * @async
 */

export const getUser = async () => {
    const response = await fetch("/api/user", {
      method: "GET",
    });
  
    const user = await response.json();
  

    return user;
  };