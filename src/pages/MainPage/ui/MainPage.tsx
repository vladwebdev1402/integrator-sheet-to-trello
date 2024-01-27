import { useGoogleAuth, useTrelloAuth } from "@/features/auth";

const MainPage = () => {
  useGoogleAuth();
  useTrelloAuth();

  return <div>MainPage</div>;
};

export default MainPage;
