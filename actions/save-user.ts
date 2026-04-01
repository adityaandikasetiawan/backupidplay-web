'use server';

import { cookies } from 'next/headers';

export interface UserCookieType {
  id: number;
  email: string;
  is_email_verified: number;
  full_name: string;
  last_login: string;
  task_id: string[];
  total_points: number;
  total_ads_watched: number;
  login_day_streak: number;
  subscription_status: string;
  token: string;
}

export const saveUser = async (user: UserCookieType) => {
  const { set } = await cookies();
  set('user', JSON.stringify(user));

  return true;
};
