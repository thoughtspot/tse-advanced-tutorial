import {constants} from "$lib/constants.js";

/**
 * Gets a token for the given user.
 */
export const getAuthToken = async (user) => {
  const endpoint = `${constants.tokenServer}/token?username=${user}&passcode=${constants.passcode}`;
  console.log("token endpoint: " + endpoint);

  const response = await fetch(endpoint);

  const token = await response.json();
  console.log("token == " + token);

  return token;
};