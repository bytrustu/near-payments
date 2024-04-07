import { PaymentCancel, PaymentResult, useLoadNearPayments } from './payments';
import { Box, Button } from './shared';

const App = () => {
  const loadNearPayments = useLoadNearPayments({
    clientId: '1234',
  });

  const openPayments = async () => {
    try {
      await loadNearPayments({
        orderId: '1234',
        totalAmount: 1234,
        onPaymentComplete: (paymentResult: PaymentResult) => {
          console.log(paymentResult);
        },
        onPaymentCancel: (paymentCancel: PaymentCancel) => {
          console.log('결제 취소', paymentCancel);
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box width="100%" height="100vh">
      <Button onClick={openPayments}>열기</Button>
    </Box>
  );
};
export default App;
