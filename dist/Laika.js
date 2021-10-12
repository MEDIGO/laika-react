import { bool, func, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { getFeatureStatus } from './utils';
export { getFeatureStatus };
export function Laika(props) {
    const [loading, setLoading] = React.useState(false);
    const [fetched, setFetched] = React.useState(false);
    const [status, setStatus] = React.useState(false);
    const { feature, uri, env, onTrue, onFalse } = props;
    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const s = await getFeatureStatus(feature, uri, env);
                setStatus(s);
            }
            catch (err) {
                setStatus(false);
            }
            finally {
                setLoading(false);
                setFetched(true);
            }
        }
        fetchData();
    }, [env, feature, uri]);
    const children = status ? onTrue : onFalse;
    return React.createElement(React.Fragment, null, !loading && fetched && children);
}
Laika.propTypes = {
    uri: string.isRequired,
    env: string.isRequired,
    feature: string.isRequired,
    onTrue: oneOfType([func, shape({}), bool]).isRequired,
    onFalse: oneOfType([func, shape({}), bool]).isRequired,
};
