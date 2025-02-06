import PropTypes from 'prop-types'
const buttonPropType = PropTypes.shape({
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    htmlType: PropTypes.string,
    isSecondary: PropTypes.bool
})

const fieldPropType = PropTypes.shape({
    inputType: PropTypes.oneOf(['text', 'email', 'password']).isRequired,
    inputName: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    icon: PropTypes.string
})

export const formPropType = PropTypes.shape({
    formName: PropTypes.string.isRequired,
    title: PropTypes.string,
    fields: PropTypes.arrayOf(fieldPropType).isRequired,
    buttons: PropTypes.arrayOf(buttonPropType),
    children: PropTypes.node,
    initialValues: PropTypes.shape(PropTypes.object),
    formClassName: PropTypes.string,
    setEdited: PropTypes.func
})

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
