import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";



export const isLoggedInVar: any = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn: any = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut: any = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

export const darkModeVar: any = makeVar(false);

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
