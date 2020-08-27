import {useRef, useEffect} from 'react';

const useLastRef = <TValue>(value: TValue) => {
  const ref = useRef<TValue>(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref;
};

export default useLastRef;
