import {useEffect} from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

import { authGoogleWithCode } from "@/entities/user-google";
import { useAppDispatch } from "@/shared/hooks";
import { routerPaths } from "@/shared/constants";

export const useGoogleAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const code = queryParams.get("code");

    return useEffect(() => {
        if (code !== null) {
            dispatch(authGoogleWithCode(code));
            navigate(routerPaths.profile);
          }
    }, [code, dispatch, navigate])
}