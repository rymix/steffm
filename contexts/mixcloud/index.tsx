import contextFactory from "contexts/contextFactory";
import useMixcloudContextState from "contexts/mixcloud/useMixcloudContextState";

const { Provider, useContext } = contextFactory(useMixcloudContextState);

export { Provider as MixcloudProvider, useContext as useMixcloud };
