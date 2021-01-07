import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }
  let mycategories = [];
  for (let cat of categories) {
    if (cat._id == parentId) {
      mycategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategories(
                parentId,
                [
                  ...cat.children,
                  {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children,
                  },
                ],
                category
              )
            : [],
      });
    } else {
      mycategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategories(parentId, cat.children, category)
            : [],
      });
    }
  }
  return mycategories;
};
export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        categories: action.payload.categories,
      });
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      console.log(
        buildNewCategories(
          action.payload.category.parentId,
          state.categories,
          action.payload.category
        )
      );
      return (state = {
        ...state,
        loading: false,
        categories: buildNewCategories(
          action.payload.category.parentId,
          state.categories,
          action.payload.category
        ),
      });
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      return (state = {
        ...state,
        loading: false,
        error: action.payload.error,
      });
  }
  return state;
};
