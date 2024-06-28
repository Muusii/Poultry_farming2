import { AuthClient } from '@dfinity/auth-client';

let authClient: AuthClient;

export const initAuthClient = async () => {
  authClient = await AuthClient.create();
};

export const login = async () => {
  await authClient.login({
    identityProvider: `https://${process.env.REACT_APP_II_CANISTER_ID}.ic0.app`,
    onSuccess: () => {
      window.location.reload();
    },
  });
};

export const logout = async () => {
  await authClient.logout();
  window.location.reload();
};

export const getIdentity = () => {
  return authClient.getIdentity();
};

export const isAuthenticated = async () => {
  return await authClient.isAuthenticated();
};
