import { fetchOptions } from 'src/constants/GQLConst';
import { GET_ARTICLES } from 'src/constants/queryGQLConst';

export const getArticles = async () => {
  const variables = { pageSize: 1000, after: null };
  const requestBody = {
    query: GET_ARTICLES,
    variables,
  };
  const options = fetchOptions(requestBody);
  const response = await (
    await fetch(process.env.GRAPH_QL_ENDPOINT || '', options as RequestInit)
  ).json();
  return response;
};
