import Home from "./views/Home";
import { getJobs } from "./services/getJobs";

export default async  function App() {
  let data=  await getJobs("https://api.infojobs.net/api/9/offer?q=java&teleworking=teletrabajo-posible&teleworking=no-se-sabe-no-esta-decidido");
  return (
    <>
    { data &&
      <Home data ={data.data}/>
    }
    </>
  );
}
