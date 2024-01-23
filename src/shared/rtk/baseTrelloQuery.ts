import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "../constants";
import { TokenService } from "../api";

const baseTrelloQuery = fetchBaseQuery({
  baseUrl: "https://api.trello.com/1",
  paramsSerializer: (params) => {
    return (
      new URLSearchParams({
        ...params,
        key: environment.trelloQuery.key,
        token: TokenService.getTrelloToken(),
      }).toString()
    );
  },
});
export { baseTrelloQuery };
