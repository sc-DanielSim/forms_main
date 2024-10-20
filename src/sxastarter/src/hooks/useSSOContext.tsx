import { createContext, useContext } from 'react';

const SSOContext = createContext(false);

export const useSSOEnabled = () => {
  return useContext(SSOContext);
};

export const SSOProvider = ({
  enableSSO,
  children,
}: {
  enableSSO: boolean;
  children: React.ReactNode;
}) => {
  return <SSOContext.Provider value={enableSSO}>{children}</SSOContext.Provider>;
};
