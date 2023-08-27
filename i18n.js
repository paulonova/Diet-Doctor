import { i18n } from 'next-i18next';
import path from 'path';

export default i18n;

i18n.init({
  localePath: path.resolve('./public/locales'),
});