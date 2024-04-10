import { FocusEvent, useEffect } from 'react';
import ArrowLeft from 'src/assets/arrow-left.png';
import Close from 'src/assets/close.png';
import {
  useFunnel,
  useInputValues,
  useInputRefs,
  useModal,
  CardBrandSelectBottomSheet,
  AppDisplay,
  Flex,
  Button,
  Typography,
  styleToken,
  VStack,
  Box,
  FormatInput,
  HStack,
  Tooltip,
  Circle,
  PinInput,
} from '../../shared';
import { CardDisplay } from '../components/CardDisplay/CardDisplay';
import {
  CARD_BRANDS,
  CARD_EXPIRATION_DATE_ID,
  CARD_NUMBER_DEFAULT_VALUE,
  CARD_NUMBER_ID,
  CARD_NUMBER_LABEL,
  CARD_PASSWORD_ID,
  CARD_SECURITY_CODE_ID,
  CardPageIndex,
  EXPIRATION_DATE_DEFAULT_VALUE,
  EXPIRATION_DATE_LABEL,
  OWNER_NAME_DEFAULT_VALUE,
  OWNER_NAME_LABEL,
  PASSWORD_DEFAULT_VALUE,
  PASSWORD_LABEL,
  SECURITY_CODE_DEFAULT_VALUE,
  SECURITY_CODE_LABEL,
} from '../constants';
import { useSelectCardBrand } from '../hooks';
import { useCard } from '../providers';
import { CardBrand } from '../types';
import { cardValueTransformers, isValidateCardModule, isValidateCardState, isValidateMonthInput } from '../utils';

export const CardAddForm = () => {
  const { goToPrev, goToNext, goToIndex } = useFunnel();
  const { card, setCard, isCardExist } = useCard();
  const selectCardBrand = useSelectCardBrand();
  const showModal = useModal();

  const [cardNumberRef, expirationDateRef, ownerNameRef, securityCodeRef, passwordRef] = useInputRefs(5);

  const cardNumber = useInputValues(CARD_NUMBER_DEFAULT_VALUE, {
    validate: isValidateCardModule.number,
    transform: cardValueTransformers.number,
  });
  const expirationDate = useInputValues(EXPIRATION_DATE_DEFAULT_VALUE, {
    validate: isValidateCardModule.expirationDate,
    transform: cardValueTransformers.expirationDate,
  });
  const ownerName = useInputValues(OWNER_NAME_DEFAULT_VALUE, {
    transform: cardValueTransformers.ownerName,
  });
  const securityCode = useInputValues(SECURITY_CODE_DEFAULT_VALUE, {
    validate: isValidateCardModule.securityCode,
    transform: cardValueTransformers.securityCode,
  });
  const password = useInputValues(PASSWORD_DEFAULT_VALUE, {
    validate: isValidateCardModule.password,
    transform: cardValueTransformers.password,
  });

  const { label: cardBrandName, color: cardBrandColor } = selectCardBrand.value;

  const validCardBrand = isValidateCardModule.brand(cardBrandName);
  const validCardState = [
    validCardBrand,
    cardNumber.valid,
    expirationDate.valid,
    securityCode.valid,
    password.valid,
  ].every(Boolean);

  const showCardSelectBottomSheet = async () => {
    const cardBrand = await showModal<CardBrand>(<CardBrandSelectBottomSheet values={CARD_BRANDS} />, {
      closeOverlayClick: true,
      placement: 'bottom',
    });
    selectCardBrand.select(cardBrand as CardBrand);
    cardNumberRef?.current?.focus();
  };

  const moveCardPaymentForm = () => {
    goToIndex(CardPageIndex.CardPayment);
  };

  const handleFormatExpirationMonthBlur = (e: FocusEvent<HTMLInputElement>) => {
    const month = e.currentTarget.value;

    if (month === '0') {
      updateExpirationDate('');
      return;
    }

    if (/^[1-9]$/.test(month)) {
      updateExpirationDate(month.padStart(2, '0'));
    }
  };

  const updateExpirationDate = (month: string) => {
    const updatedValue = [...expirationDate.value];
    updatedValue[0] = month;
    expirationDate.update({ values: updatedValue });
  };

  const updateCardWithGoToNextPage = () => {
    const newCard = {
      ...card,
      cardNumber: cardNumber.transformedValue,
      expirationDate: expirationDate.transformedValue,
      ownerName: ownerName.transformedValue,
      securityCode: securityCode.transformedValue,
      password: password.transformedValue,
      label: cardBrandName,
      color: cardBrandColor,
      createdTimestamp: Date.now(),
    };

    if (!isValidateCardState(newCard)) {
      alert('카드 정보를 다시 확인해주세요.');
      return;
    }

    if (isCardExist(newCard)) {
      alert('이미 등록된 카드입니다.');
      return;
    }

    setCard(newCard);
    goToNext();
  };

  useEffect(() => {
    showCardSelectBottomSheet();
  }, []);

  return (
    <>
      <AppDisplay.Header>
        <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
          <Button
            variant="ghost"
            color="teal"
            fontSize="20px"
            display="flex"
            alignItems="center"
            width="fit-content"
            padding="10px 0"
            onClick={goToPrev}
          >
            <img src={ArrowLeft} width="20px" height="20px" alt="이전 화면 아이콘" />
            <Typography
              variant="title"
              color={styleToken.color.black}
              fontWeight={styleToken.fontWeight.medium}
              marginLeft="10px"
            >
              카드 추가
            </Typography>
          </Button>
          <Button variant="ghost" padding="0" onClick={moveCardPaymentForm}>
            <img src={Close} width="32px" height="32px" alt="닫기 아이콘" />
          </Button>
        </Flex>
      </AppDisplay.Header>
      <AppDisplay.Body>
        <VStack spacing="18px" marginTop="20px">
          <Box margin="0 auto">
            <CardDisplay
              size="small"
              label={cardBrandName}
              color={cardBrandColor}
              cardNumber={cardNumber.transformedValue}
              expirationDate={expirationDate.transformedValue}
              ownerName={ownerName.transformedValue}
              onClick={showCardSelectBottomSheet}
            />
          </Box>

          <FormatInput.Root
            id={CARD_NUMBER_ID}
            type="numeric"
            value={cardNumber.value}
            separator={
              <Typography variant="headline" color={styleToken.color.black}>
                -
              </Typography>
            }
            pattern={/^\d{4}$/}
            showCompletedSeparator
            onValueChange={cardNumber.update}
            onValueComplete={() => {
              expirationDateRef.current?.focus();
            }}
          >
            <FormatInput.Label>{CARD_NUMBER_LABEL}</FormatInput.Label>
            <FormatInput.Control padding="0 20px" gap="6px">
              <FormatInput.Input index={0} maxLength={4} padding="0 0 0 10px" ref={cardNumberRef} />
              <FormatInput.Input index={1} maxLength={4} padding="0 0 0 10px" />
              <FormatInput.Input
                index={2}
                maxLength={4}
                mask
                padding="0 0 0 10px"
                fontSize="20px"
                letterSpacing="2px"
              />
              <FormatInput.Input
                index={3}
                maxLength={4}
                mask
                padding="0 0 0 10px"
                fontSize="20px"
                letterSpacing="2px"
              />
            </FormatInput.Control>
          </FormatInput.Root>

          <FormatInput.Root
            id={CARD_EXPIRATION_DATE_ID}
            value={expirationDate.value}
            type="numeric"
            separator={
              <Typography variant="headline" color={styleToken.color.black}>
                /
              </Typography>
            }
            pattern={/^\d{2}$/}
            width="140px"
            onValueChange={expirationDate.update}
            onValueComplete={() => {
              ownerNameRef.current?.focus();
            }}
          >
            <FormatInput.Label>{EXPIRATION_DATE_LABEL}</FormatInput.Label>
            <FormatInput.Control padding="0 0 0 32px" gap="6px">
              <FormatInput.Input
                index={0}
                maxLength={2}
                placeholder="MM"
                padding="0"
                width="28px"
                validateInput={isValidateMonthInput}
                onBlur={handleFormatExpirationMonthBlur}
                ref={expirationDateRef}
              />
              <FormatInput.Input index={1} maxLength={2} placeholder="YY" padding="0 0 0 4px" />
            </FormatInput.Control>
          </FormatInput.Root>

          <FormatInput.Root
            id="owner-name"
            value={ownerName.value}
            type="all"
            onValueChange={ownerName.update}
            padding="0"
            onValueComplete={() => {
              securityCodeRef.current?.focus();
            }}
          >
            <FormatInput.Control padding="0" backgroundColor="none">
              <FormatInput.Label>{OWNER_NAME_LABEL}</FormatInput.Label>
              <FormatInput.TextCounter index={0} inputRef={ownerNameRef} />
            </FormatInput.Control>
            <FormatInput.Control padding="0 10px" gap="6px">
              <FormatInput.Input
                index={0}
                maxLength={30}
                placeholder="카드에 표시된 이름과 동일하게 입력하세요."
                padding="0"
                ref={ownerNameRef}
              />
            </FormatInput.Control>
          </FormatInput.Root>

          <FormatInput.Root
            id={CARD_SECURITY_CODE_ID}
            value={securityCode.value}
            type="numeric"
            pattern={/^\d{3}$/}
            padding="0"
            onValueChange={securityCode.update}
            onValueComplete={() => {
              passwordRef?.current?.focus();
            }}
          >
            <FormatInput.Label>{SECURITY_CODE_LABEL}</FormatInput.Label>
            <HStack spacing="10px" alignItems="center">
              <FormatInput.Control width="85px" padding="0 10px" gap="6px">
                <FormatInput.Input
                  index={0}
                  maxLength={3}
                  mask
                  fontSize="20px"
                  padding="0 0 0 10px"
                  letterSpacing="10px"
                  ref={securityCodeRef}
                />
              </FormatInput.Control>
              <Tooltip
                message="보안코드 3자리"
                direction="right"
                icon={
                  <Circle backgroundColor="unset" border={`1px solid ${styleToken.color.gray400}`} cursor="pointer">
                    <Typography
                      color={styleToken.color.gray400}
                      variant="title"
                      fontWeight={styleToken.fontWeight.bold}
                    >
                      ?
                    </Typography>
                  </Circle>
                }
              />
            </HStack>
          </FormatInput.Root>

          <PinInput.Root
            id={CARD_PASSWORD_ID}
            mask
            value={password.value}
            enableVirtualKeyboard
            onValueChange={password.update}
          >
            <PinInput.Label>{PASSWORD_LABEL}</PinInput.Label>
            <PinInput.Control>
              <PinInput.Input index={0} fontSize="20px" ref={passwordRef} />
              <PinInput.Input index={1} fontSize="20px" />
              <PinInput.Input index={2} fontSize="20px" readOnly />
              <PinInput.Input index={3} fontSize="20px" readOnly />
            </PinInput.Control>
          </PinInput.Root>
        </VStack>
      </AppDisplay.Body>
      <AppDisplay.Footer>
        <HStack justifyContent="flex-end">
          {validCardState && (
            <Button variant="solid" color="teal" fontSize="100px" onClick={updateCardWithGoToNextPage}>
              다음
            </Button>
          )}
        </HStack>
      </AppDisplay.Footer>
    </>
  );
};
