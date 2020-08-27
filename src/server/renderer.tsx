import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {ChunkExtractor} from '@loadable/server';
import { matchRoutes } from 'react-router-config';
import { glob } from 'glob';
import App from '#/components/App';
import pageTemplate from "#/templates/pageTemplate";
import routes from "#/components/App/routes";
import {PageName} from "#/types/PageName";
import store from "#/redux/store";
import {Locale} from "#/types/common";
import * as path from "path";
import {readFileSync} from "fs";
import {changeIntlLocale, setIntlMessages} from "#/redux/intl/intlActions";
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/ru';
import {NextFunction, Request, Response} from "express";
import ssrLoaders from "#/server/ssrLoaders";
import {getIntlMessages} from "#/redux/intl/intlSelectors";

const getStyles = async (hot: boolean, chunkExtractor: ChunkExtractor) => {
  if (hot) {
    return chunkExtractor.getStyleTags();
  }

  const css = await chunkExtractor.getCssString();
  return ReactDOMServer.renderToString(
    <style dangerouslySetInnerHTML={{
      __html: css
    }}/>
  );
};

const getCurrentRoute = (url: string) => {
  const matchedRoutes = matchRoutes(routes, url);
  if (!matchedRoutes.length) {
    return null;
  }
  return matchedRoutes[0].route || null;
};

const translations = glob.sync('assets/intl/*.json')
  .reduce((result, fileName) => {
    const locale = path.basename(fileName, '.json') as Locale;
    result[locale] = JSON.parse(readFileSync(fileName, 'utf8'));
    return result;
  }, {} as Record<Locale, Record<string, string>>);

const renderer = ({clientStats, hot}: any) => (req: Request, res: Response, next: NextFunction) => {
  const handler = async () => {
    const extractorOptions = hot
      ? {stats: clientStats}
      : {statsFile: clientStats};

    const chunkExtractor = new ChunkExtractor(extractorOptions);

    const currentRoute = getCurrentRoute(req.url);
    if (currentRoute) {
      await ssrLoaders[PageName.all](req);
      const loader = ssrLoaders[currentRoute.name];
      if (loader) {
        await loader(req);
      }
    }

    const locale: Locale = req.universalCookies.get('locale') || Locale.ru;
    const messages = translations[locale];
    store.dispatch(changeIntlLocale(locale));
    store.dispatch(setIntlMessages(locale, messages));

    const content = ReactDOMServer.renderToString(chunkExtractor.collectChunks(<App url={req.url}/>));
    const styles = await getStyles(hot, chunkExtractor);
    const scripts = await chunkExtractor.getScriptTags();

    let html = pageTemplate(content, store.getState(), styles, scripts);

    res.send(html);
  };

  handler()
    .catch((e) => {
      throw e;
    });
};

export default renderer;
