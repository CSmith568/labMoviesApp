import { useParams } from "react-router-dom";

export const ActorDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Actor ID: {id}</h1>
      <p>Actor bio and details will go here</p>
    </div>
  );
};
