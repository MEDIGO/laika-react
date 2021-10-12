import React from 'react';
import { getFeatureStatus } from './utils';
export { getFeatureStatus };
export interface LaikaProps {
    feature: string;
    uri: string;
    env: string;
    onTrue: React.ReactElement | false;
    onFalse: React.ReactElement | false;
}
export declare function Laika(props: LaikaProps): JSX.Element;
export declare namespace Laika {
    var propTypes: {
        uri: import("prop-types").Validator<string>;
        env: import("prop-types").Validator<string>;
        feature: import("prop-types").Validator<string>;
        onTrue: import("prop-types").Validator<import("prop-types").InferProps<{}>>;
        onFalse: import("prop-types").Validator<import("prop-types").InferProps<{}>>;
    };
}
//# sourceMappingURL=Laika.d.ts.map