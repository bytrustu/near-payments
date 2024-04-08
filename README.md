<br />

<div align="center">
  <img src="https://github.com/bytrustu/near-payments/assets/39726717/32bf7adc-c7d6-486d-a2d8-c3896100519e" width="300px" alt="Near Payments 로고" />
</div>

<br />

# Near Payments
> Next Step `최종 미션`에 활용되는 React 페이먼츠 애플리케이션입니다.
- [Near Payments 체험하기](https://near-payments.vercel.app/)

<br />

> 이슈 및 개선사항 요청이 있는 경우, 아래 링크를 통해 이슈를 등록해주세요. 
- [이슈 등록하기](https://github.com/bytrustu/near-payments/issues)

<br />

미션 진행에 도움이 되셨다면, ⭐️ `Star` 부탁드립니다. 😁 

---

## Requirements
```bash
"node": ">=20"
```
```bash
"peerDependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```


## Install
```bash
# with Yarn
yarn install near-payments

# with Npm
npm install near-payments

# with Pnpm
pnpm install near-payments
```

<br />

## Usage

### 1. OverlayProvider 적용

> OverlayProvider를 사용하여 Near Payments 애플리케이션을 렌더링합니다.  `<App />`을 OverlayProvider로 감싸주세요.

```tsx
import { OverlayProvider } from 'near-payments';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OverlayProvider>
      <App />
    </OverlayProvider>
  </React.StrictMode>,
);
```

<br />

### 2. useLoadNearPayments

> useLoadNearPayments Hook을 사용하여 원하는 시점에 결제 화면을 열 수 있습니다.


<b>📗 useLoadNearPayments 옵션</b>

| 속성명     | 타입     | 필수 여부 | 설명                          |
| ---------- | -------- | --------- |-----------------------------|
| `clientId` | `string` | 필수      | Payment Client Id로 활용되는 식별자 |

```tsx
import { useLoadNearPayments } from 'near-payments';

const App = () => {
  const loadNearPayments = useLoadNearPayments({
    clientId: 'CLIENT_ID',
  });
}
```

<br />

<b>📗 loadNearPayments 옵션</b>

| 속성명             | 타입                                             | 필수 여부 | 설명            |
| ------------------ | ------------------------------------------------ | --------- |---------------|
| `orderId`          | `string`                                         | 필수      | 주문 번호         |
| `totalAmount`      | `number`                                         | 필수      | 총 결제 금액       |
| `onPaymentComplete`| `(paymentResult: PaymentResult) => void`         | 필수      | 결제 완료 시 콜백 함수 |
| `onPaymentCancel`  | `(paymentCancel: PaymentCancel) => void`         | 필수      | 결제 취소 시 콜백 함수 |

<br />

```tsx
import { PaymentCancel, PaymentResult, useLoadNearPayments } from 'near-payments';

const App = () => {
  const loadNearPayments = useLoadNearPayments({
    clientId: 'CLIENT_ID',
  });

  const openPayments = async () => {
    try {
      await loadNearPayments({
        orderId: '1234567890',
        totalAmount: 10000,
        onPaymentComplete: (paymentResult: PaymentResult) => {
          // 결제 완료 시 처리
          console.log('paymentResult:', paymentResult)
        },
        onPaymentCancel: (paymentCancel: PaymentCancel) => {
          // 결제 취소 시 처리 
          console.log('paymentCancel:', paymentCancel);
        },
      });
    } catch (error) {
      // 결제 중 발생한 에러 처리
      console.error('Payment error:', error);
    }
  };

  return (
    <button onClick={openPayments}>결제하기</button>
  );
};
```

<br />

<b>📘 PaymentResult 타입</b>

```ts
export type PaymentResult = {
  success: boolean; // 결제 성공 여부
  message: string; // 결제 메시지
  orderId: string; // 주문 번호
  totalAmount: number; // 총 결제 금액
  cardNumber: string; // 결제 카드 번호
  paymentTimestamp: number; // 결제 시간
};
```

<br />

<b>📘 PaymentCancel 타입</b>

```ts
export type PaymentCancel = {
  success: boolean; // 결제 성공 여부
  message: string; // 결제 메시지
  orderId: string; // 주문 번호
};
```

<br />

<b>🔴 에러 코드</b>

| 에러 코드                               | 에러 메시지                                 |
| --------------------------------------- | ------------------------------------------- |
| `INVALID_CLIENT_ID`                     | 유효하지 않은 CLIENT ID입니다.              |
| `INVALID_ORDER_ID`                      | 유효하지 않은 주문 번호입니다.              |
| `INVALID_AMOUNT`                        | 유효하지 않은 금액입니다.                   |
| `INVALID_OWNER_CARDS`                   | 유효하지 않은 카드 정보입니다.              |
| `INVALID_PAYMENT_COMPLETE_CALLBACK`     | 결제 완료 콜백 함수가 유효하지 않습니다.    |
| `INVALID_PAYMENT_CANCEL_CALLBACK`       | 결제 취소 콜백 함수가 유효하지 않습니다.    |
| `PAYMENT_PROCESS_ERROR`                 | 결제 프로세스 중 오류가 발생했습니다.       |

