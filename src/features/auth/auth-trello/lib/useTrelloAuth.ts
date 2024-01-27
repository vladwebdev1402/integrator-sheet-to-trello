import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { saveTrelloToken } from "@/entities/user-trello";
import { useAppDispatch } from "@/shared/hooks";
import { routerPaths } from "@/shared/constants";

export const useTrelloAuth = () => {

    const navigate = useNavigate();
    const trelloToken = window.location.hash.split("=").at(-1);
    const dispatch = useAppDispatch(); 

    return useEffect(() => {
        if (trelloToken) {
          dispatch(saveTrelloToken(trelloToken));
          navigate(routerPaths.profile);
        }
      }, [trelloToken, dispatch, navigate]);
}