const AUTH_MUTATION = `
mutation {
  register {
    _id
    token
    cartId
  }
}`;

export const getToken = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: AUTH_MUTATION,
    }),
  });

  const { data } = await response.json();
  return data?.register?.token as string;
};
