/**
 * This file contains functions for working with the REST API v2.0.
 */

export class TSAPIv2 {

  /**
   * Create a new API wrapper for making calls.
   * @param {sting *} tsURL The URL to use for calls.
   * @param {string *} bearerToken token to use for calls.
   */
  constructor(tsURL, bearerToken) {
    if (tsURL && bearerToken) {
      this.tsURL = tsURL.endsWith("/") ? tsURL.slice(0, -1) : tsURL; // strip any trailing /
      this.bearerToken = bearerToken;
    } else {
      throw new Error(`A TS URL and bearer token is required to call the APIs.`);
    }
  }

  /**
   * Returns the users details.
   */
  async authSessionUser() {
    const endpoint = `${this.tsURL}/api/rest/2.0/auth/session/user`;
  }
}