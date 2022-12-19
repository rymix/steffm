import contextFactoryGlobalApp from "contexts/contextFactoryGlobalApp";
import useMixcloudContextState from "contexts/mixcloud/useMixcloudContextState";

const { Provider, useContext } = contextFactoryGlobalApp(
  useMixcloudContextState
);

export { Provider as SessionProvider, useContext as useMixcloud };
