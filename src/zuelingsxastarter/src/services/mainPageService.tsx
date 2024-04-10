import { fetchOptions } from 'src/constants/GQLConst';
import { GET_MAIN_PAGES } from 'src/constants/queryGQLConst';

export const getMainPages = async () => {
  const variables = { pageSize: 1000, after: null };
  const requestBody = {
    query: GET_MAIN_PAGES,
    variables,
  };
  const options = fetchOptions(requestBody);
  const response = await (
    await fetch(process.env.GRAPH_QL_ENDPOINT || '', options as RequestInit)
  ).json();
  return response;
};
