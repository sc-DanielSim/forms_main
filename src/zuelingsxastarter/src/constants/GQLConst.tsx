type RequestBody = {
  query: string;
  variables: object;
};

export const headers = {
  'content-type': 'application/json',
  'X-GQL-Token': process.env.SITECORE_API_KEY,
};

export const fetchOptions = (requestBody: RequestBody) => {
  return {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  };
};
