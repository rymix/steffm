import { createContext, memo, useContext } from "react";

const contextFactoryGlobalApp = <T,>(
  useContextState: (
    id: string,
    url: string,
    containerRef: React.MutableRefObject<HTMLDivElement | null>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean
  ) => T,
  ContextComponent?: JSX.Element
): {
  Provider: React.MemoExoticComponent<FC>;
  useContext: () => T;
} => {
  const Context = createContext(Object.create(null) as T);

  return {
    Provider: memo<FC>(({ children }) => (
      <Context.Provider value={useContextState()}>
        {children}
        {ContextComponent}
      </Context.Provider>
    )),
    useContext: () => useContext(Context),
  };
};

export default contextFactoryGlobalApp;
