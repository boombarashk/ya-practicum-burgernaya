import PropTypes from 'prop-types'

export const ingredientFullInfoPropType = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    type: PropTypes.oneOf(["bun", "sauce", "main"]),
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    fat: PropTypes.number,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    proteins: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
  });

export const ingredientPropType = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
});

export const ingredientDetailsPropType = PropTypes.shape({
    name: PropTypes.string,
    image_large: PropTypes.string,
    fat: PropTypes.number,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    proteins: PropTypes.number,
})
