'use server';

import { cookies } from 'next/headers';

export const saveToken = async (token: string) => {
  const { set } = await cookies();
  set('token', token);

  return true;
};
