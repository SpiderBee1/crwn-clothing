import { loadStripe } from "@stripe/stripe-js";

//pass publishable key to loadstripe
export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  
);
