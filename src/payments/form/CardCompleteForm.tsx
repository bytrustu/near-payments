import { ChangeEvent, useState } from 'react';
import { AppDisplay, Button, HStack, removeAllSpaces, TextField, Typography, useFunnel, VStack } from '../../shared';
import { CardDisplay } from '../components/CardDisplay';
import { CardPageIndex } from '../constants';
import { useCard } from '../providers';

const CARD_DESCRIPTION_MAX_LENGTH = 10;

export const CardCompleteForm = () => {
  const { goToIndex } = useFunnel();
  const { card, addCardToOwner, editCardToOwner, isCardExist } = useCard();
  const {
    label: cardBrandName,
    color: cardBrandColor,
    cardNumber,
    expirationDate: cardExpirationDate,
    ownerName: cardOwnerName,
    description,
  } = card;

  const [cardDescriptionInputValue, setCardDescriptionInputValue] = useState(description ?? '');

  const handleCardDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardDescriptionInputValue(e.target.value.trim());
  };

  const completeCardRegistry = () => {
    const description = removeAllSpaces(cardDescriptionInputValue) ? cardDescriptionInputValue : cardBrandName;

    if (isCardExist(card)) {
      editCardToOwner({ ...card, description });
    } else {
      addCardToOwner({ ...card, description });
    }
    goToIndex(CardPageIndex.CardList);
  };

  return (
    <>
      <AppDisplay.Header />
      <AppDisplay.Body>
        <VStack spacing="20px" marginTop="20px">
          <Typography variant="headline" textAlign="center" margin="40px 0">
            카드 등록이 완료되었습니다.
          </Typography>
          <VStack justifyContent="center" alignItems="center">
            <CardDisplay
              size="big"
              label={cardBrandName}
              color={cardBrandColor}
              cardNumber={cardNumber}
              expirationDate={cardExpirationDate}
              ownerName={cardOwnerName}
            />
          </VStack>
          <HStack padding="0 40px">
            <TextField
              variant="flushed"
              maxLength={CARD_DESCRIPTION_MAX_LENGTH}
              autoFocus
              value={cardDescriptionInputValue}
              onChange={handleCardDescriptionChange}
              textAlign="center"
            />
          </HStack>
        </VStack>
      </AppDisplay.Body>
      <AppDisplay.Footer>
        <HStack justifyContent="flex-end">
          <Button variant="solid" color="teal" fontSize="100px" onClick={completeCardRegistry}>
            완료
          </Button>
        </HStack>
      </AppDisplay.Footer>
    </>
  );
};
