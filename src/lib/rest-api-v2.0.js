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
   * Generic function to make a call to the V2.0 REST API
   * wrapper for all REST API calls.  Specific calls should set up the parameters and call this function.
   * @param endpoint The rest endpoint (after the 2.0/) to call.
   * @param httpVerb The form of the call, e.g. GET, POST, DELETE, etc.
   * @param apiRequestObject The data to pass with the request. Let undefined for GET and HEAD.
   */
  async restApiCallV2(endpoint, httpVerb, apiRequestObject) {
    const publicApiUrl = "api/rest/2.0/";

    let msg = `calling endpoint ${endpoint} with verb ${httpVerb}`;
    if (apiRequestObject) {
      msg += ` and data ${JSON.stringify(apiRequestObject)}`;
    }

    console.log(msg);

    const apiFullEndpoint = this.tsURL + "/" + publicApiUrl + endpoint;

    // if an empty body is passed, set it to undefined.
    if (apiRequestObject && Object.keys(apiRequestObject).length === 0) {
      apiRequestObject = undefined;
    }

    // Set up the header.
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (this.bearerToken) {
      headers["Authorization"] = `Bearer ${this.bearerToken}`;
    }

    return await fetch(apiFullEndpoint, {
      method: httpVerb.toUpperCase(),
      headers: headers,
      credentials: "include",
      body: apiRequestObject ? JSON.stringify(apiRequestObject) : undefined,
    })
      .then((response) => {
        if (response.status === 204) {  // no content, so don't try to parse it.
          return response.ok;
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .catch((error) => {
        console.error(`Error calling ${endpoint} response: ${error}`);
        throw error;
      });
  }


  /**
   * Returns the information about the ThoughtSpot instance.
   * @returns {Promise<boolean>}
   */
  async system() {
    const endpoint = `system`;
    return this.restApiCallV2(endpoint, "GET");
  }

  async searchData(queryString, logicalTableIdentifier, dataFormat = 'COMPACT',
                   recordOffset = 0, recordSize = -1) {
    const endpoint = `searchdata`;
    if (!queryString || !logicalTableIdentifier) {
      throw new Error(`searchData requires a query string and table identifier (usually worksheet).`);
    }
    return this.restApiCallV2(endpoint, "POST", {
      query_string: queryString,
      logical_table_identifier: logicalTableIdentifier,
      data_format: dataFormat,
      record_offset: recordOffset,
      record_size: recordSize
    })
  }
}