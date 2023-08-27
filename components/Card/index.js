//import { cardStyles } from "utils/styles";
import Image from "next/image";

const Card = ({ recipe }) => {
  const baseUrl = process.env.NEXT_PUBLIC_WP_URL;

  //bg-beige-400 relative hover:bg-beige-700 w-[85%] md:w-[300px] shadow-md shadow-gray-500/50

  return (
    <div
      className="bg-beige-400 hover:bg-beige-700 sm:w-[85%]  md:w-[300px] shadow-md shadow-gray-500/50" >
      <Image
        alt="image"
        src={baseUrl.concat(recipe?.images?.defaultImage.path)}
        width={250}
        height={300}
        className="h-[250px] w-[100%] object-cover object-center"
      />
      <div className="mt-5 w-[90%] my-8 px-4 flex flex-col items-center">
        <h2 className="text-lg font-bold mb-2 uppercase">{recipe.title}</h2>
        <p>{recipe.description}</p>
      </div>
    </div>
  );
};

export default Card;
