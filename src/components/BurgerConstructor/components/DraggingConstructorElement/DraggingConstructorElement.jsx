import PropTypes from 'prop-types'
import { useRef } from "react"
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { sortIngredients, deleteIngredient } from '../../../../services/reducers/burgerConstructor'
import styles from '../../BurgerConstructor.module.css'

const ingredientPropType = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  });

DraggingConstructorElement.propTypes = {
    ingredient: ingredientPropType.isRequired,
    index: PropTypes.number.isRequired,
}

export default function DraggingConstructorElement({ingredient, index}) {
    const ingredientRef = useRef(null)
    const dispatch = useDispatch()

    /* https://react-dnd.github.io/react-dnd/examples/sortable/simple */
    const [{ isDragging }, drag] = useDrag({
            type: 'filling',
            item: () => {
                return { id: ingredient._id, index }
              },
            collect: monitor => ({
                isDragging: monitor.isDragging()
            })
        })

    const [, drop] = useDrop({
        accept: 'filling',
        hover: (item, monitor) => {
            if (!ingredientRef.current) return

            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ingredientRef.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)/2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            // dragging down
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            // dragging up
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            dispatch(sortIngredients({dragIndex, hoverIndex}))

            item.index = hoverIndex
        }
    })

    drag(drop(ingredientRef))

    const opacity = isDragging ? 0 : 1

    return <section ref={ingredientRef} className={styles.section} style={{opacity}}>
        <span className={styles.icon}><DragIcon/></span>
        
        <ConstructorElement
            text={ingredient.label}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={() => {
                dispatch(deleteIngredient({
                    id: ingredient.id,
                    price: ingredient.price,
                    key_id: ingredient._id
                }))
            }}
        />
    </section>
}