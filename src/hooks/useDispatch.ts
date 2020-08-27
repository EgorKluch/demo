import {useDispatch as useNativeUseDispatch} from "react-redux";
import {ReduxAction} from "#/types/ReduxAction";

const useDispatch = () => useNativeUseDispatch<(action: ReduxAction) => void>();

export default useDispatch;
