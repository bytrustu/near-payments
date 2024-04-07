import { useModal } from '../../../../shared';
import { isValidateNumber } from '../../../../shared/utils/isValidateNumber';
import { PaymentForm } from '../../../types';
import { isValidateCardState } from '../../../utils';
import { CardPayments } from '../CardPayments';

const ERROR_CODES = {
  INVALID_CLIENT_ID: 'INVALID_CLIENT_ID',
  INVALID_ORDER_ID: 'INVALID_ORDER_ID',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  INVALID_OWNER_CARDS: 'INVALID_OWNER_CARDS',
  INVALID_PAYMENT_COMPLETE_CALLBACK: 'INVALID_PAYMENT_COMPLETE_CALLBACK',
  INVALID_PAYMENT_CANCEL_CALLBACK: 'INVALID_PAYMENT_CANCEL_CALLBACK',
  PAYMENT_PROCESS_ERROR: 'PAYMENT_PROCESS_ERROR',
} as const;

const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_CLIENT_ID]: '유효하지 않은 CLIENT ID입니다.',
  [ERROR_CODES.INVALID_ORDER_ID]: '유효하지 않은 주문 번호입니다.',
  [ERROR_CODES.INVALID_AMOUNT]: '유효하지 않은 금액입니다.',
  [ERROR_CODES.INVALID_OWNER_CARDS]: '유효하지 않은 카드 정보입니다.',
  [ERROR_CODES.INVALID_PAYMENT_COMPLETE_CALLBACK]: '결제 완료 콜백 함수가 유효하지 않습니다.',
  [ERROR_CODES.INVALID_PAYMENT_CANCEL_CALLBACK]: '결제 취소 콜백 함수가 유효하지 않습니다.',
  [ERROR_CODES.PAYMENT_PROCESS_ERROR]: '결제 프로세스 중 오류가 발생했습니다.',
};

const createError = (code: keyof typeof ERROR_CODES, error?: unknown) => ({
  code,
  message: ERROR_MESSAGES[code],
  error,
});

type UseLoadNearPaymentsProps = {
  clientId: string;
};

export const useLoadNearPayments = ({ clientId }: UseLoadNearPaymentsProps) => {
  const showModal = useModal();
  const cardStorageKey = `near-payments-${clientId}`;
  const ownerCards = JSON.parse(localStorage.getItem(cardStorageKey) ?? '[]');

  return ({ orderId, totalAmount, onPaymentComplete, onPaymentCancel }: PaymentForm) => {
    if (!clientId || clientId.trim() === '') {
      throw createError(ERROR_CODES.INVALID_CLIENT_ID);
    }

    if (!orderId || orderId.trim() === '') {
      throw createError(ERROR_CODES.INVALID_ORDER_ID);
    }

    if (Number.isNaN(totalAmount) || !isValidateNumber(String(totalAmount)) || totalAmount <= 0) {
      throw createError(ERROR_CODES.INVALID_AMOUNT);
    }

    if (ownerCards.length > 0 && !ownerCards.every((card: any) => isValidateCardState(card))) {
      throw createError(ERROR_CODES.INVALID_OWNER_CARDS);
    }

    if (typeof onPaymentComplete !== 'function') {
      throw createError(ERROR_CODES.INVALID_PAYMENT_COMPLETE_CALLBACK);
    }

    if (typeof onPaymentCancel !== 'function') {
      throw createError(ERROR_CODES.INVALID_PAYMENT_CANCEL_CALLBACK);
    }

    try {
      return showModal(
        <CardPayments
          cardStorageKey={cardStorageKey}
          orderId={orderId}
          totalAmount={totalAmount}
          initialOwnerCards={ownerCards}
          onPaymentComplete={onPaymentComplete}
          onPaymentCancel={onPaymentCancel}
        />,
      );
    } catch (error) {
      throw createError(ERROR_CODES.PAYMENT_PROCESS_ERROR, error);
    }
  };
};
