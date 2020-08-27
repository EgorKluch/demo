import {stringify} from 'query-string';
import useSelector from "#/hooks/useSelector";
import {getCurrentUser} from "#/api/user/userSelectors";

export type Options = Omit<RequestInit, 'body'> & {
    showNotifyOnError?: boolean,
    preventNotifyOn400?: boolean,
    query?: Record<string, any>,
    body?: Record<string, any> | string
}

export enum ApiMethod {
  get = 'get',
  post = 'post',
}

const useApiRequest = () => {
    const user = useSelector(getCurrentUser);

    return async <TResponse = any>(method: ApiMethod, url: string, options: Options = {}): Promise<TResponse> => {
        const {showNotifyOnError = true, preventNotifyOn400, ...requestOptions} = options;

        const body = options.body ? (
            typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
        ) : undefined;

        const query = options.query ? stringify(options.query, {
            skipNull: true,
            skipEmptyString: true,
        }) : undefined;

        try {
            requestOptions.mode = 'cors';
            requestOptions.credentials = 'include';
            requestOptions.headers = {
                'Content-Type': 'application/json',
            };


            const response = await fetch(`${url}${query ? `?${query}` : ''}`, {
                ...requestOptions,
                method,
                body
            });

            if (!user && response.status === 403) {
                // showErrorNotify(
                //     intlCommon('sessionExpired'),
                //     intlCommon('signInAgain'),
                // );
            }

            const responseJSON = await response.json();

            if (!responseJSON.status) {
                throw new Error('Incorrect API response');
            }

            if (response.status === 400 && showNotifyOnError && !preventNotifyOn400) {
                // showErrorNotify(
                //     intlCommon('error'),
                //     intlError(_.get(responseJSON, 'result.0.message', 'error')),
                // );
            }

            if (responseJSON.status !== 'success') {
                throw responseJSON;
            }

            return responseJSON.data;
        } catch (err) {
            if (err.stack && showNotifyOnError) {
                // showErrorNotify(
                //     intlCommon('error'),
                //     intlError('something_wrong')
                // );
            }

            throw err;
        }
    };
};

export default useApiRequest;
