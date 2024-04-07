import { HTMLProps, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { DefaultStyled, letterSpacingValue } from '../../styles';
import { AsProps, StyleProps } from '../../types';
import { Typography, TypographyVariant, typographyVariantStyle } from '../Typography';

type LabelProps = PropsWithChildren<
  StyleProps &
    AsProps &
    HTMLProps<HTMLInputElement> & {
      variant?: TypographyVariant;
    }
>;

const Root = styled(DefaultStyled)<LabelProps>``;

export const Label = ({ children, ...props }: LabelProps) => {
  const { as, variant = 'caption', fontSize, fontWeight, color, letterSpacing, whiteSpace, ...restProps } = props;

  const typographyProps = {
    variant,
    fontWeight,
    color,
    letterSpacing: letterSpacing || letterSpacingValue(typographyVariantStyle[variant].fontSize, -8.5),
  };

  return (
    <Root as="label" {...restProps}>
      <Typography {...typographyProps}>{children}</Typography>
    </Root>
  );
};

Label.displayName = 'Label';
