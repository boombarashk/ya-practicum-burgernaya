export const DATA_URL = "https://norma.nomoreparties.space/api/ingredients"
export const ORDER_URL = "https://norma.nomoreparties.space/api/orders"

export const TYPE_INGREDIENT = [
    {title: "Булки", param: "bun"},
    {title: "Соусы", param: "sauce"},
    {title: "Начинки", param: "main"}
]

export const TAB_SELECTOR = '[data-ref]'

export const VIEW_MODAL_DETAILS = 'details'
export const VIEW_MODAL_ORDER = 'order'
export const VIEW_MODAL_TITLES = {
  [VIEW_MODAL_DETAILS]: 'Детали ингридиента',
  [VIEW_MODAL_ORDER]: ''
}