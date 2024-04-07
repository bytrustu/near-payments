import {
  PropsWithChildren,
  useContext,
  createContext,
  useMemo,
  useRef,
  RefObject,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
  FocusEvent,
  forwardRef,
} from 'react';
import { styleToken } from '../../styles';
import { StyleProps } from '../../types';
import { Box } from '../Box';
import { HStack } from '../HStack';
import { Label } from '../Label';
import { TextField } from '../TextField';
import { Typography } from '../Typography';
import { useInputFieldsValues, useInputRefs } from './hooks';
import { INPUT_COLOR, INPUT_FONT_SIZE, INPUT_FONT_WEIGHT } from './Input.constant.ts';
import { InputType, UpdateValueProps } from './Input.type.ts';
import { findComponentsInChildren, isValidateInputValueByType, isValidInputRef } from './utils';

export type FormatInputContextValue = {
  id: string;
  values: string[];
  inputElementCount: number;
  updateValue: ({ index, value, inputRefs, maxLength, focus }: UpdateValueProps) => void;
  inputRefs: RefObject<HTMLInputElement | null>[];
  type: InputType;
  mask: boolean;
  separator: string | ReactElement;
  showCompletedSeparator?: boolean;
  error: boolean;
};

type FormatInputProps = Partial<FormatInputContextValue> & {
  value: string[];
  pattern?: RegExp;
  onValueChange?: (payload: { values: string[] }) => void;
  onValueComplete?: (payload: { values: string[] }) => void;
};

const FormatInputContext = createContext<FormatInputContextValue | null>(null);

export const FormatInput = ({
  children,
  id = '',
  value,
  type = 'alphanumeric',
  mask = false,
  separator = '',
  showCompletedSeparator = false,
  pattern,
  onValueChange,
  onValueComplete,
  ...props
}: PropsWithChildren<FormatInputProps & StyleProps>) => {
  const formatFields = findComponentsInChildren(children, FormatField.name);
  const inputElementCount = formatFields.length;

  const inputFields = useInputFieldsValues({ values: value, pattern, onValueChange, onValueComplete });
  const inputRefs = useInputRefs(inputElementCount);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (containerRef.current && !containerRef.current.contains(event.relatedTarget as Node)) {
      inputFields.validate();
    }
  };

  const contextValue = useMemo(
    () => ({
      id,
      values: inputFields.value,
      updateValue: inputFields.update,
      inputElementCount,
      inputRefs,
      type,
      mask,
      separator,
      showCompletedSeparator,
      error: inputFields.error,
    }),
    [
      id,
      inputFields.value,
      inputFields.update,
      inputElementCount,
      inputRefs,
      type,
      mask,
      separator,
      showCompletedSeparator,
      inputFields.error,
    ],
  );

  return (
    <FormatInputContext.Provider value={contextValue}>
      <Box onBlur={handleBlur} ref={containerRef} {...props}>
        {children}
      </Box>
    </FormatInputContext.Provider>
  );
};

type FormatFieldProps = StyleProps &
  InputHTMLAttributes<HTMLInputElement> & {
    index: number;
    readOnly?: boolean;
    mask?: boolean;
    maxLength?: number;
    pattern?: RegExp;
    validateInput?: (value: string) => boolean;
  };

const FormatField = forwardRef<HTMLInputElement, FormatFieldProps & StyleProps>(
  (
    {
      index,
      readOnly,
      mask,
      maxLength = Infinity,
      pattern,
      validateInput,
      width = '100%',
      color = INPUT_COLOR,
      fontSize = INPUT_FONT_SIZE,
      fontWeight = INPUT_FONT_WEIGHT,
      textAlign = 'left',
      ...props
    }: FormatFieldProps & StyleProps,
    ref,
  ) => {
    const context = useContext(FormatInputContext);
    if (context === null) {
      throw new Error('FormatInput.Input 컴포넌트는 FormatInput.Root 하위에서 사용되어야 합니다.');
    }

    const { id, inputElementCount, values, updateValue, inputRefs, type, separator, showCompletedSeparator } = context;
    const inputRef = ref || inputRefs[index];

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (pattern && !pattern.test(inputValue)) {
        console.warn('입력 형식이 올바르지 않습니다.');
        return;
      }

      if (validateInput && !validateInput(inputValue)) {
        console.warn('입력 값이 유효하지 않습니다.');
        return;
      }

      if (!isValidateInputValueByType(type, inputValue)) {
        return;
      }

      updateValue({
        index,
        value: inputValue,
        inputRefs,
        maxLength,
        focus: !readOnly,
      });
    };

    const inputType = mask ? 'password' : 'text';
    const inputValue = values[index];

    const validSeparator = index < inputElementCount - 1 && separator && index <= inputElementCount - 1;
    const showSeparator = !showCompletedSeparator || (showCompletedSeparator && maxLength === inputValue?.length);

    return (
      <>
        <TextField
          id={`formatted-input-${id}-${index}`}
          type={inputType}
          variant="unstyled"
          maxLength={maxLength}
          value={inputValue}
          readOnly={readOnly}
          width={width}
          color={color}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAlign={textAlign}
          _placeholder={{
            color: styleToken.color.gray400,
          }}
          onChange={onChange}
          {...(isValidInputRef(inputRef) && { ref: inputRef })}
          {...props}
        />
        {validSeparator && (
          <Box display="flex" justifyContent="center" alignItems="center" minWidth="10px">
            {showSeparator && separator}
          </Box>
        )}
      </>
    );
  },
);

const FormatInputLabel = ({ children }: PropsWithChildren) => {
  const context = useContext(FormatInputContext);
  if (context === null) {
    throw new Error('FormatInput.Input 컴포넌트는 FormatInput.Root 하위에서 사용되어야 합니다.');
  }
  const { id } = context;

  return (
    <Label htmlFor={`formatted-input-${id}-0`} variant="caption" color={styleToken.color.gray700}>
      {children}
    </Label>
  );
};

const FormatInputTextCounter = ({
  index,
  inputRef: propInputRef,
  ...props
}: PropsWithChildren<
  {
    index: number;
    inputRef?: RefObject<HTMLInputElement | null>;
  } & StyleProps
>) => {
  const context = useContext(FormatInputContext);
  if (context === null) {
    throw new Error('FormatInput.Input 컴포넌트는 FormatInput.Root 하위에서 사용되어야 합니다.');
  }
  const { inputRefs } = context;
  const inputRef = propInputRef || inputRefs[index];

  const currentLength = inputRef.current?.value.length ?? 0;
  const maxLength = inputRef.current?.maxLength ?? 0;

  const counterText = `${currentLength} / ${maxLength}`;

  return (
    <Typography variant="caption" color={styleToken.color.gray400} {...props}>
      {counterText}
    </Typography>
  );
};

const FormatInputControl = ({
  children,
  justifyContent = 'space-between',
  gap = '5px',
  backgroundColor = styleToken.color.gray200,
  borderRadius = '7px',
  ...props
}: PropsWithChildren<StyleProps>) => {
  const context = useContext(FormatInputContext);
  if (context === null) {
    throw new Error('FormatInput.Input 컴포넌트는 FormatInput.Root 하위에서 사용되어야 합니다.');
  }
  return (
    <HStack
      justifyContent={justifyContent}
      gap={gap}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      {...(context.error && { outline: `2px solid ${styleToken.color.rose}` })}
      {...props}
    >
      {children}
    </HStack>
  );
};

FormatInput.displayName = 'FormatInput';

FormatInput.Root = FormatInput;
FormatInput.Input = FormatField;
FormatInput.Label = FormatInputLabel;
FormatInput.TextCounter = FormatInputTextCounter;
FormatInput.Control = FormatInputControl;
