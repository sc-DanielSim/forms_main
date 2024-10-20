import { useSession as nextUseSession } from 'next-auth/react';
import { useSSOEnabled } from './useSSOContext';

export function useSafeSession() {
  const enableSSO = useSSOEnabled();
  const mockSession = {
    data: {
      user: {
        name: 'example',
        email: 'example@petronas.com.my',
        image: null,
      },
      expires: '',
      idToken: 'token',
      accessToken: 'token',
    },
    status: 'authenticated',
  };

  return enableSSO ? nextUseSession() : mockSession;
}
