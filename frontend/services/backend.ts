// export const getToken = (): string | null => {
//   const userStr: string | null = localStorage.getItem("userDetails");
//   const userObject = userStr ? JSON.parse(userStr) : {};
//   return userObject.token;
// };

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const baseService = async (
  path: string,
  data?: object,
  method?: string
) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/${path}`, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return { status: response.status, result: json };
  } catch (error) {
    console.warn(error);
    return null;
  }
};
