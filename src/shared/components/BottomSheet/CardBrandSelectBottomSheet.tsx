import { CardBrand } from '../../../payments/types';
import { styleToken } from '../../styles';
import { Button } from '../Button';
import { Circle } from '../Circle';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import { BottomSheet } from './BottomSheet.tsx';

type CardBrandSelectBottomSheetProps = {
  onSubmit?: (submitResult: CardBrand) => void;
  values: CardBrand[];
};

export const CardBrandSelectBottomSheet = ({ onSubmit, values }: CardBrandSelectBottomSheetProps) => {
  const sliceValues = values.slice(0, 8);

  return (
    <BottomSheet>
      {sliceValues.map(({ label, color }) => (
        <CardBrandSelectButton
          key={`card-select-${label}`}
          color={color}
          label={label}
          onClick={() => {
            onSubmit?.({ label, color });
          }}
        />
      ))}
    </BottomSheet>
  );
};

type CardSelectButtonProps = {
  onClick: () => void;
} & CardBrand;

const CardBrandSelectButton = ({ color, label, ...props }: CardSelectButtonProps) => (
  <Button variant="ghost" backgroundColor={styleToken.color.white} width="100%" padding="0" {...props}>
    <VStack width="100%" justifyContent="center" alignItems="center" spacing="10px">
      <Circle backgroundColor={color} width="36px" height="36px" />
      <Typography variant="caption" color={styleToken.color.black}>
        {label}
      </Typography>
    </VStack>
  </Button>
);

CardBrandSelectBottomSheet.displayName = 'CardBrandSelectBottomSheet';
