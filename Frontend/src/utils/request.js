import serverClient from "./serverClient";

export default async function Fetch(url) {
  let mainResponse = await serverClient.get(url);
  if (mainResponse.status === 423) {
    const res = await serverClient.get("/auth/refreshToken");
    if (res.statusText.toUpperCase() !== "OK") {
      return res;
    }
    return await serverClient.get(url);
  }
  return mainResponse;
}

export async function postFetch(url, data) {
  let mainResponse = await serverClient.post(url, data);
  if (status === 423) {
    const res = await serverClient.get("/auth/refreshToken");
    if (res.status > 399) {
      return res;
    }
    return await serverClient.get(url);
  }
  return mainResponse;
}

export async function Fetchdelete(url) {
  let mainResponse = await serverClient.delete(url);
  if (mainResponse.status === 423) {
    const res = await serverClient.get("/auth/refreshToken");
    if (res.statusText.toUpperCase() !== "OK") {
      return res;
    }
    return await serverClient.get(url);
  }
  return mainResponse;
}

export async function updateFetch(url, data) {
  let mainResponse = await serverClient.put(url, data);
  if (status === 423) {
    const res = await serverClient.get("/auth/refreshToken");
    if (res.status > 399) {
      return res;
    }
    return await serverClient.get(url);
  }
  return mainResponse;
}
