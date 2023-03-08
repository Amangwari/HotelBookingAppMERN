import "./featureproperties.css";
import React from "react";
import useFetch from "../../hooks/useFetch";

const Featureproperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true");
// console.log(data)
  return (
    <>
      <div className="fp">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {" "}
            {data.map((item) => (
              <div className="fpItem" key={item._id}>
                <img src={item.photos[0]} alt="" className="fpImage" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting form ₹{item.cheapestPrice}</span>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Featureproperties;
