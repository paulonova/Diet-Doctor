import { gql } from "@apollo/client";

export const LIST_RECIPES = gql`
  query ListRecipes($input: ListRecipesInput) {
    listRecipes(input: $input) {
      recipes {
        id
        title
        createdAt
        modifiedAt
        description
        descriptionHtml
        isMealplanReady
        rating
        collectionIds
        isMembersOnly
        isHighProtein
        slug
        satietyScore
        images {
          defaultImage {
            path
            width
            height
          }
        }
      }
    }
  }
`;

