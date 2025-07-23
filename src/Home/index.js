import {useState, useEffect} from 'react'
import Header from '../Header'
import Item from '../Item'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [restaurantName, setRestaurantName] = useState('')

  const [cartItems, setCartItems] = useState([])

  const addItemToCart = dish => {
    const isalreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (!isalreadyExists) {
      const newItem = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newItem])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const removeItemFromCart = item => {
    const isalreadyExists = cartItems.find(each => each.dishId === item.dishId)
    if (isalreadyExists) {
      setCartItems(prev =>
        prev
          .map(each =>
            each.dishId === item.dishId
              ? {...each, quantity: each.quantity - 1}
              : each,
          )
          .filter(each => each.quantity > 0),
      )
    }
  }
  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachItem => ({
        dishId: eachItem.dish_id,
        dishName: eachItem.dish_name,
        dishPrice: eachItem.dish_price,
        dishImage: eachItem.dish_image,
        dishCurrency: eachItem.dish_currency,
        dishCalories: eachItem.dish_calories,
        dishDescription: eachItem.dish_description,
        dishAvailability: eachItem.dish_Availability,
        dishType: eachItem.dish_Type,
        addonCat: eachItem.addonCat,
      })),
    }))

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const api =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const apiResponse = await fetch(api)
      const data = await apiResponse.json()
      const updatedData = getUpdatedData(data[0].table_menu_list)
      setRestaurantName(data[0].restaurant_name)
      setResponse(updatedData)
      setActiveCategoryId(updatedData[0].menuCategoryId)
      setIsLoading(false)
    }

    fetchRestaurantData()
  }, [])

  const onUpdatedActiveCategory = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const renderTabMenuList = () =>
    response.map(eachCategory => {
      const onClickHandler = () =>
        onUpdatedActiveCategory(eachCategory.menuCategoryId)

      return (
        <li
          className={`each-tab-item ${
            eachCategory.menuCategoryId === activeCategoryId
              ? 'active-tab-item'
              : ''
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickHandler}
        >
          <button type="button" className="tab-category-btn">
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(eachDish => (
          <Item
            key={eachDish.dishId}
            dishDetails={eachDish}
            cartItems={cartItems}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    )
  }

  const renderSpinner = () => (
    <div className="spinner-con">
      <div className="spinner-border" role="status" />
    </div>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <div className="background">
      <Header cartItems={cartItems} restaurantName={restaurantName} />
      <ul className="tab-container">{renderTabMenuList()}</ul>
      {renderDishes()}
    </div>
  )
}

export default Home
