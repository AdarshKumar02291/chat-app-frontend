export const BASE_URL = "http://localhost:3000/api";

export const postRequest = async (url: any, body: any) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await res.json();

  if (!res.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return {error:true,message};
  }
  return data;
};
