import { useDispatch } from "react-redux";
import { cartActions } from "../../../../store";
import css from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const dispatch = useDispatch();
  const price = `$${props.price.toFixed(2)}`;

  const onAddToCartHandler = (amount) => {
    dispatch(
      cartActions.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      })
    );
  };

  return (
    <li className={css.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={css.description}>{props.description}</div>
        <div className={css.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAdd={onAddToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
