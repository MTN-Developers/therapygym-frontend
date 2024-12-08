'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function StripeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
