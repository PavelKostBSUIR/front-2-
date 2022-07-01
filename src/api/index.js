import qs from "query-string";

export const ENDPOINT = "http://localhost:8100";

class ApiCall {
  constructor(domain) {
    this.domain = domain;
  }

  async perform(url, data, config, access) {
    const response = await fetch(`${this.domain}${url}`, {
      ...config,
      body: JSON.stringify(data),
      headers:
        access === undefined
          ? { "Content-Type": "application/json" }
          : {
              "Content-Type": "application/json",
              Authorization: "Bearer " + access,
            },
    }).catch((err) => {
      console.log(err);
    });
    return response;
  }

  async get(path, payload, searchParams, access) {
    return await this.perform(
      `${path}?${searchParams ? qs.stringify(searchParams) : ""}`,
      payload,
      {
        method: "GET",
      },
      access
    );
  }

  async post(path, payload, access) {
    return await this.perform(
      path,
      payload,
      {
        method: "POST",
      },
      access
    );
  }

  async put(path, payload, access) {
    return await this.perform(
      path,
      payload,
      {
        method: "PUT",
      },
      access
    );
  }

  async delete(path, access) {
    return await this.perform(
      path,
      null,
      {
        method: "DELETE",
      },
      access
    );
  }
}

export default new ApiCall(ENDPOINT);
