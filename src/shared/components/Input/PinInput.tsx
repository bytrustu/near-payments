import {
  PropsWithChildren,
  useContext,
  createContext,
  FormEvent,
  useMemo,
  RefObject,
  forwardRef,
  useState,
  FocusEvent,
} from 'react';
import { CARD_PASSWORD_NUMBERS } from '../../../payments/constants/cardPasswordNumbers';
import { styleToken } from '../../styles';
import { StyleProps } from '../../types';
import { VirtualKeyboardBottomSheet } from '../BottomSheet';
import { Box } from '../Box';
import { Label } from '../Label';
import { useModal } from '../Overlay';
import { TextField } from '../TextField';
import { useInputFieldsValues, useInputRefs } from './hooks';
import { INPUT_COLOR, INPUT_FONT_SIZE, INPUT_FONT_WEIGHT } from './Input.constant';
import { InputType, UpdateValueProps } from './Input.type';
import { findComponentsInChildren, isValidateInputValueByType, isValidInputRef } from './utils';

type PinInputProps = PropsWithChildren<{
  id?: string;
  type?: InputType;
  mask?: boolean;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  placeholder?: string;
  value?: string[];
  pattern?: RegExp;
  enableVirtualKeyboard?: boolean;
  onValueChange?: (details: { values: string[] }) => void;
  onValueComplete?: (details: { values: string[] }) => void;
}>;

type PinInputContextValue = {
  values: string[];
  inputElementCount: number;
  updateValue: ({ index, value, inputRefs, maxLength, focus }: UpdateValueProps) => void;
  inputRefs: RefObject<HTMLInputElement | null>[];
  type: InputType;
  mask: boolean;
} & Pick<PinInputProps, 'id' | 'placeholder' | 'enableVirtualKeyboard'>;

const PinInputContext = createContext<PinInputContextValue | null>(null);

export const PinInput = ({
  id = '',
  type = 'numeric',
  mask = false,
  placeholder = '*',
  value = [],
  pattern,
  enableVirtualKeyboard,
  onValueChange,
  onValueComplete,
  children,
}: PropsWithChildren<PinInputProps>) => {
  const formatFields = findComponentsInChildren(children, PinInputField.name);
  const inputElementCount = formatFields.length;

  const { value: values, update: updateValue } = useInputFieldsValues({
    values: value,
    pattern,
    onValueChange,
    onValueComplete,
  });
  const inputRefs = useInputRefs(inputElementCount);

  const contextValue = useMemo(
    () => ({
      id,
      values,
      inputElementCount,
      placeholder,
      updateValue,
      inputRefs,
      type,
      mask,
      enableVirtualKeyboard,
    }),
    [id, values, inputElementCount, placeholder, updateValue, type, mask, enableVirtualKeyboard],
  );

  return <PinInputContext.Provider value={contextValue}>{children}</PinInputContext.Provider>;
};

const PinInputLabel = ({ children }: PropsWithChildren) => {
  const context = useContext(PinInputContext);
  if (context === null) {
    throw new Error('FormatInput.Input 컴포넌트는 FormatInput.Root 하위에서 사용되어야 합니다.');
  }
  const { id } = context;

  return (
    <Label htmlFor={`pin-input-${id}-0`} variant="caption" color={styleToken.color.gray700}>
      {children}
    </Label>
  );
};

const PinInputControl = ({ children }: PropsWithChildren) => (
  <Box display="flex" justifyContent="flex-start" marginTop="2px">
    {children}
  </Box>
);

const PinInputField = forwardRef<
  HTMLInputElement,
  {
    index: number;
    readOnly?: boolean;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  } & StyleProps
>(
  (
    {
      index,
      readOnly,
      color = INPUT_COLOR,
      fontSize = INPUT_FONT_SIZE,
      fontWeight = INPUT_FONT_WEIGHT,
      onBlur,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const context = useContext(PinInputContext);
    if (context === null) {
      throw new Error('PinInput.Input 컴포넌트는 PinInput.Root 하위에서 사용되어야 합니다.');
    }

    const showModal = useModal();

    const { id, inputElementCount, placeholder, values, updateValue, inputRefs, type, mask, enableVirtualKeyboard } =
      context;
    const inputRef = ref || inputRefs[index];
    const [error, setError] = useState(false);

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      if (enableVirtualKeyboard) {
        return;
      }
      if (!isValidateInputValueByType(type, inputValue)) {
        return;
      }
      updateValue({
        index,
        value: inputValue,
        inputRefs,
        maxLength: 1,
        focus: true,
      });
      setError(false);
    };

    const isLastInput = index === inputElementCount - 1;
    const inputType = mask ? 'password' : 'text';
    const inputValue = index < inputElementCount ? values[index] : placeholder;
    const marginRight = isLastInput ? '0' : '10px';

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      setError(isValidInputRef(inputRef) && inputRef.current?.value.length === 0);
    };

    const handleFocus = async (e: FocusEvent<HTMLInputElement>) => {
      if (enableVirtualKeyboard) {
        const virtualKeyboardValues = CARD_PASSWORD_NUMBERS.map(String);
        const virtualKeyboardValue = await showModal<string>(
          <VirtualKeyboardBottomSheet values={virtualKeyboardValues} shuffle />,
          {
            closeOverlayClick: true,
            placement: 'bottom',
          },
        );
        if (virtualKeyboardValue) {
          updateValue({
            index,
            value: virtualKeyboardValue,
            inputRefs,
            maxLength: 1,
            focus: true,
          });
        }
      }
      onFocus?.(e);
      setError(false);
    };

    return (
      <TextField
        id={`pin-input-${id}-${index}`}
        type={inputType}
        variant="filled"
        maxLength={1}
        value={inputValue}
        readOnly={readOnly}
        width="43px"
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAlign="center"
        marginRight={marginRight}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...(error && { outline: `2px solid ${styleToken.color.rose}` })}
        {...(isValidInputRef(inputRef) && { ref: inputRef })}
        {...props}
      />
    );
  },
);

PinInput.displayName = 'PinInput';

PinInput.Root = PinInput;
PinInput.Input = PinInputField;
PinInput.Label = PinInputLabel;
PinInput.Control = PinInputControl;
