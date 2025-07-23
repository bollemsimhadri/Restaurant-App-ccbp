import './index.css'

const Item = ({dishDetails, cartItems, removeItemFromCart, addItemToCart}) => {
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    addonCat,
  } = dishDetails

  const onIncrese = () => addItemToCart(dishDetails)
  const onDecrease = () => removeItemFromCart(dishDetails)

  const getQuantity = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const renderControllBtn = () => (
    <div className="controler-con">
      <button className="btn" type="button" onClick={onDecrease}>
        -
      </button>

      <p className="quantity">{getQuantity()}</p>

      <button className="btn" type="button" onClick={onIncrese}>
        +
      </button>
    </div>
  )

  return (
    <li className="dish_item_con">
      <div className={`border ${dishType === 1 ? 'non-veg-border' : ''}`}>
        <div className={`round ${dishType === 1 ? 'non-veg-round' : ''}`} />
      </div>
      <div className="dish-details-con">
        <h1 className="dish_name">{dishName}</h1>
        <p className="dish-current-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="description">{dishDescription}</p>
        {dishAvailability && renderControllBtn()}

        {addonCat.length !== 0 && (
          <p className="add-on-availa">Customizations available</p>
        )}

        {!dishAvailability && (
          <p className="non-availa text-gander">Not available</p>
        )}
      </div>
      <p className="dish-calories">{dishCalories} calories</p>
      <img className="dish-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default Item
