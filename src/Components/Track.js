import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import Food from "./Food";

const Track = () => {
  const loggedData = useContext(UserContext);

  const [foodItems, setFoodItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const [food, setFood] = useState(null);

  useEffect(() => {
    if (inputValue) return;
    fetch(`https://nutrition-app-backend.vercel.app/foods`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loggedData.loggedUser.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFoodItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [inputValue]);

  function searchFood(event) {
    setInputValue(event.target.value);

    if (event.target.value.length !== 0) {
      fetch(`https://nutrition-app-backend.vercel.app/foods/${event.target.value}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loggedData.loggedUser.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === undefined) {
            setFoodItems(data);
          } else {
            setFoodItems([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFoodItems([]);
    }
  }

  const handleOptionClick = (item) => {
    setInputValue(item.name);
    setFood(item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className="track-container container-c">
        <div className="custom-dropdown search">
          <input
            className="search-inp"
            type="search"
            placeholder="Search Food Item"
            value={inputValue}
            onChange={searchFood}
            onFocus={toggleDropdown}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          />
          {isOpen &&
            (foodItems.length !== 0 ? (
              <div className="search-results options">
                {foodItems.map((item) => {
                  return (
                    <p
                      className="item"
                      onClick={() => handleOptionClick(item)}
                      key={item._id}
                    >
                      {item.name}
                    </p>
                  );
                })}
              </div>
            ) : (
              "No Such Food Available"
            ))}
        </div>
        {food !== null ? <Food food={food} /> : null}
      </section>
    </>
  );
};

// Example usage:

export default Track;
