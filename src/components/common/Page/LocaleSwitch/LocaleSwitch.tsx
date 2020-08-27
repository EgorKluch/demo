import React, {FC, useCallback} from 'react';
import {createCn} from 'bem-react-classname';
import './LocaleSwitch.scss';
import {changeIntlLocale} from "#/redux/intl/intlActions";
import useDispatch from "#/hooks/useDispatch";
import {Locale} from "#/types/common";
import useLoadIntlMessagesApi from "#/api/common/useLoadIntlMessagesApi";
import useSelector from "#/hooks/useSelector";
import {getIntlLocale} from "#/redux/intl/intlSelectors";
import {useCookies} from "react-cookie";

const cn = createCn('LocaleSwitch');

type Props = {};

const LocaleSwitch: FC<Props> = () => {
  const dispatch = useDispatch();
  const [, changeMessagesApi] = useLoadIntlMessagesApi();
  const locale = useSelector(getIntlLocale);
  const [, setCookies] = useCookies(['locale']);

  const changeLocale = useCallback((locale: Locale) => {
    dispatch(changeIntlLocale(locale));
    changeMessagesApi({ locale });
    setCookies('locale', locale);
  }, []);

  return (
    <div className={cn()}>
      <div className={cn('locale', {selected: locale === Locale.ru})} onClick={() => changeLocale(Locale.ru)}>ru</div>
      <div className={cn('locale', {selected: locale === Locale.en})} onClick={() => changeLocale(Locale.en)}>en</div>
    </div>
  );
};

export default LocaleSwitch;
