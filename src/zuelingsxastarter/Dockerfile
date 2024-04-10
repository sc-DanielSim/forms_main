FROM node:18

ARG PUBLIC_URL="https://corporate-dev.zuelligpharma.com"
ARG JSS_EDITING_SECRET=""
ARG SITECORE_API_KEY="TDFxR1Z0VlhIcjE5LzRHNHJ0MG9jNWMyUmhvUmdDdldjMS9LbzZoNnJYQT18enVlbGxpZ3BoYXI5YjM0LXpwY21zLXRlc3QtZmNmOQ=="
ARG SITECORE_API_HOST="https://edge.sitecorecloud.io/api/graphql/v1"
ARG GRAPH_QL_ENDPOINT="https://edge.sitecorecloud.io/api/graphql/v1"
ARG DEFAULT_LANGUAGE=""
ARG JSS_APP_NAME="Corporate"
ARG FETCH_WITH="GraphQL"
ARG DISABLE_SSG_FETCH=""
ARG NEXT_PUBLIC_CDP_TARGET_URL=""
ARG NEXT_PUBLIC_CDP_CLIENT_KEY=""
ARG NEXT_PUBLIC_PERSONALIZE_SCOPE=""
ARG NEXT_PUBLIC_CDP_POINTOFSALE=""
ARG PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT=""
ARG PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT=""

USER node
COPY --chown=node . /home/node
WORKDIR /home/node/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN  npm run build

EXPOSE 3000
CMD ["npm","run","next:start"]