import '../src/assets/styles/typography.scss';
import './storybook.scss';
import { useTranslations } from '../src/translations/';

useTranslations();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
