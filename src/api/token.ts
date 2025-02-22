const AUTH_MUTATION = `
mutation {
  register {
    _id
    token
    cartId
  }
}`;

export const getToken = async () => {
  const response = await fetch("https://take-home-be.onrender.com/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: AUTH_MUTATION,
    }),
  });

  const { data } = await response.json();
  return data?.register?.token as string;
};
