import { loadableReady } from '@loadable/component';
import React from 'react';
import { hydrate } from 'react-dom';
import App from "#/components/App";

loadableReady(() => {
  hydrate(<App/>, document.getElementById('app'));
}).catch((e) => {
  console.error('Render app failed', e);
});
