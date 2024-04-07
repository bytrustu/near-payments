export type PaymentResult = {
  success: boolean;
  message: string;
  orderId: string;
  totalAmount: number;
  cardNumber: string;
  cardBrandName: string;
  paymentTimestamp: number;
};

export type PaymentCancel = Pick<PaymentResult, 'success' | 'message' | 'orderId'>;
