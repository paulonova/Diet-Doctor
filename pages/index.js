// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { debounce } from "lodash";
import { LIST_RECIPES } from "utils/queries/list-recipes";
import client from "../client";
import Card from "components/Card";
import Loading from "components/Loading";

import { useTranslation } from 'next-i18next';

// Define the Home component
const Home = ({ defaultData }) => {

  // Internationalization
  const { t } = useTranslation();

  // State variables
  const [loadRecipes, setLoadRecipes] = useState(
    defaultData.listRecipes.recipes
  );
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch recipes query using useLazyQuery
  const [fetchRecipes, { loading, fetchMore }] = useLazyQuery(LIST_RECIPES, {
    client,
    onCompleted: (data) => setLoadRecipes(data?.listRecipes.recipes),
  });

  // Function to fetch more recipes
  const fetchMoreRecipes = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newRecipe = Array.from({ length: 0 }, (_, index) => ({
        id: `new-${loadRecipes.length + index + 1}`,
        name: `New Recipe ${loadRecipes.length + index + 1}`,
      }));
      setLoadRecipes((prevItems) => [...prevItems, ...newRecipe]);
      setRecipes((prevItems) => [...prevItems, ...newRecipe]);
      setIsLoading(false);
    }, 1000);
  };

  // Scroll event handler using debounce
  const handleScroll = debounce(() => {
    if (
      window.scrollY === document.body.offsetHeight - window.innerHeight &&
      !loading
    ) {
      fetchMore({
        variables: {
          input: {
            pageSize: 3,
            page: Math.ceil(loadRecipes.length / 3) + 1,
          },
        },
      });
    }
  });

  // Search event handler using debounce
  const handleSearch = debounce((newSearchTerm) => {
    setSearchTerm(newSearchTerm);

    if (!newSearchTerm.trim()) {
      setRecipes([]);
    } else {
      fetchRecipes({
        variables: { input: { query: newSearchTerm } },
      });
    }
  }, 300);

  // Initial fetch and scroll event listener setup
  useEffect(() => {
    fetchMoreRecipes();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render the component
  return (
    <section>
      {/* Search input */}
      <div className="w-[100%] bg-green-700 flex justify-center items-center">
        <input
          type="text"
          placeholder={t('Search recipes...')}
          onChange={(e) => handleSearch(e.target.value)}
          className="focus:border-green-600 focus:outline-none mt-5 p-2 border w-[80%] md:w-[50%] lg:w-[30%] mb-5"
        />
      </div>

      {/* Recipe display section */}
      <section className="flex flex-w items-center justify-center pt-5 max-w-[1000px] centering ">
        {recipes.length > 0 ? (
          <div>
            <div className="flex flex-wrap justify-center gap-5">
              {recipes.map((recipe) => (
                <Card key={recipe.id} recipe={recipe} />
              ))}
            </div>
            {isLoading && <Loading color="fill-red-500" isLoading={loading} />}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5 ">
            {loadRecipes?.map((recipe) => (
              <Card
                key={recipe.id}
                recipe={recipe}
              />
            ))}
          </div>
        )}
        {isLoading && <Loading color="fill-green-600" isLoading={loading} />}
      </section>
    </section>
  );
};

// Fetch initial data using getStaticProps
export async function getStaticProps() {
  const { data } = await client.query({
    query: LIST_RECIPES,
    variables: {
      input: {
        pageSize: 6,
        page: 1,
      },
    },
  });

  return {
    props: {
      defaultData: data,
    },
  };
}

// Export the Home component as the default export
export default Home;
