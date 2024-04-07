import { Meta, StoryObj } from '@storybook/react';
import { AppDisplay, OverlayProvider } from '../..';
import { CardAddForm, CardCompleteForm, CardListForm, CardPageIndex, CardProvider, CardState } from '../../../payments';
import { Funnel } from './Funnel';

const cards: CardState[] = [
  {
    cardNumber: '0000 0000 0000 0000',
    expirationDate: '00 00',
    ownerName: '홍길동',
    securityCode: '000',
    password: '0000',
    label: '우리카드',
    color: 'blue',
    description: '우리카드',
    createdTimestamp: 0,
  },
  {
    cardNumber: '1111 1111 1111 1111',
    expirationDate: '11 11',
    ownerName: '홍길동',
    securityCode: '111',
    password: '1111',
    label: '신한카드',
    color: 'red',
    description: '신한카드',
    createdTimestamp: 1,
  },
  {
    cardNumber: '2222 2222 2222 2222',
    expirationDate: '10 22',
    ownerName: '홍길동',
    securityCode: '222',
    password: '2222',
    label: '국민카드',
    color: 'green',
    description: '국민카드',
    createdTimestamp: 2,
  },
  {
    cardNumber: '3333 3333 3333 3333',
    expirationDate: '11 33',
    ownerName: '홍길동',
    securityCode: '333',
    password: '3333',
    label: '하나카드',
    color: 'yellow',
    description: '하나카드',
    createdTimestamp: 3,
  },
  {
    cardNumber: '4444 4444 4444 4444',
    expirationDate: '12 44',
    ownerName: '홍길동',
    securityCode: '444',
    password: '4444',
    label: '롯데카드',
    color: 'purple',
    description: '롯데카드',
    createdTimestamp: 4,
  },
];

const cardStorageKey = 'near-payments-9999';

const meta: Meta<typeof Funnel> = {
  title: 'Components/Funnel',
  component: Funnel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <CardProvider cardStorageKey="near-payments-9999" initialOwnerCards={cards}>
        <OverlayProvider>
          <Story />
        </OverlayProvider>
      </CardProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Funnel>;

export const Primary: Story = {
  render: () => (
    <AppDisplay.Root>
      <OverlayProvider>
        <CardProvider cardStorageKey={cardStorageKey} initialOwnerCards={cards}>
          <Funnel.Root>
            <Funnel.Step index={CardPageIndex.CardPayment}>
              <CardListForm />
            </Funnel.Step>
            <Funnel.Step index={CardPageIndex.CardList}>
              <CardListForm />
            </Funnel.Step>
            <Funnel.Step index={CardPageIndex.CardAdd}>
              <CardAddForm />
            </Funnel.Step>
            <Funnel.Step index={CardPageIndex.CardComplete}>
              <CardCompleteForm />
            </Funnel.Step>
          </Funnel.Root>
        </CardProvider>
      </OverlayProvider>
    </AppDisplay.Root>
  ),
};
