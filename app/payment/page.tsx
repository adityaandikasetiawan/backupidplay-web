import PaymentLayout from './_layouts/payment-layout';
import { cookies } from 'next/headers';

const PaymentPage = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get('token');
  const user = cookieStore.get('user');

  const parsedUser = user ? JSON.parse(user.value) : {};

  return (
    <PaymentLayout
      token={token?.value || ''}
      user={parsedUser}
    />
  );
};

export default PaymentPage;
