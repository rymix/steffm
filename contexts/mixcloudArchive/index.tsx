import contextFactory from "contexts/contextFactory";
import useMixcloudContextState from "contexts/mixcloudArchive/useMixcloudContextState";

const { Provider, useContext } = contextFactory(useMixcloudContextState);

export { Provider as MixcloudProvider, useContext as useMixcloudArchive };
