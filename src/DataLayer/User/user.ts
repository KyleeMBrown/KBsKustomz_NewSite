/**
 * @file user.ts
 * @author Kylee Brown
 * @description File that handles fetching the API for USER Data
 *
 */

/**
 * @name getUser
 * @description - Function that retrieves the current user object via API fetch
 * @async
 */

export const getUser = async () => {
    const response = await fetch(`${process.env.LOCAL_API_URL}/api/user`, {
      method: "GET",
    });
  
    const user = await response.json();

    return user;
  };