const API_BASE_URL : string = "https://terminal.diegohernandezramirez.dev/api";

const SIGN_IN : string = API_BASE_URL + "/users/login"
const SIGN_OUT : string = API_BASE_URL + "/users/logout"
const SIGN_UP : string = API_BASE_URL + "/users"
const SESSION_TEST : string = API_BASE_URL + "/users/session_test"

const GET_BUCKETS : string = API_BASE_URL + "/buckets"
const SHARE_BUCKET : string = API_BASE_URL + "/buckets/share"
const GET_REQUESTS : string = API_BASE_URL + "/requests/"

const BUCKET_WS_URL : string = 'wss://terminal.diegohernandezramirez.dev/api/socket/buckets';
const USER_SEARCH_WS_URL : string = 'wss://terminal.diegohernandezramirez.dev/api/socket/user-search'
const DOMAIN : string= "terminal.diegohernandezramirez.dev";

const subdomainUrl = (subdomain: string): string => {
  return `https://${subdomain}.${DOMAIN}`;
}

const fetchBucketRequests = (subdomain: string): string => {
  return `${API_BASE_URL}/requests/${subdomain}`
}

const GIT_REPO : string = "https://github.com/synapse-hq";

const routes = {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SESSION_TEST,
  GET_BUCKETS,
  GET_REQUESTS,
  SHARE_BUCKET,
  DOMAIN,
  subdomainUrl,
  fetchBucketRequests,
  BUCKET_WS_URL,
  USER_SEARCH_WS_URL,
  GIT_REPO,
}

export default routes;