import * as React from "react";

export interface LaikaProps {
  feature: string;
  uri: string;
  env: string;
  onTrue: React.ReactElement | false;
  onFalse: React.ReactElement | false;
}

export function getFeatureStatus(feature: string, uri: string, env: string): Promise<boolean>;

export default function(prop: LaikaProps): React.ReactElement<LaikaProps>;
