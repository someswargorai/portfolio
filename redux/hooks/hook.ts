import { useDispatch, useSelector } from "react-redux";
import { dispath, selector } from "../store/store";

export const useAppDispatch = useDispatch.withTypes<dispath>();
export const useAppSelector = useSelector.withTypes<selector>();
