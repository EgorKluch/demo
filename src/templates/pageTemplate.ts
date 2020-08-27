import {ReduxState} from "#/types/ReduxState";

const pageTemplate = (content: string, state: ReduxState, styles: string, scripts: string) => `
<!doctype html>
<html>
    <head>
       ${styles}
    </head>
    <body>
        <div id="app">${content}</div>
        <script>window.__STATE__ = ${JSON.stringify(state)}</script>
        ${scripts}
    </body>
</html>`;

export default pageTemplate;
