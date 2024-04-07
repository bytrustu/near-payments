import { PaymentCancel, PaymentResult } from './PaymentResult.type';

export type PaymentForm = {
  orderId: string;
  totalAmount: number;
  onPaymentCancel: (paymentCancel: PaymentCancel) => void;
  onPaymentComplete: (paymentResult: PaymentResult) => void;
};
