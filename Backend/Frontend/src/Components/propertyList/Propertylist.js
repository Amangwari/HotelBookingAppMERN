import "./propertylist.css";
import React from "react";
import useFetch from "../../hooks/useFetch";

const Propertylist = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");
  console.log(data);

  const images = [
    "https://q-xx.bstatic.com/xdata/images/region/300x240/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=",
    "https://q-xx.bstatic.com/xdata/images/city/300x240/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=",
    "https://r-xx.bstatic.com/xdata/images/city/300x240/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=",
    "https://q-xx.bstatic.com/xdata/images/region/300x240/68606.jpg?k=4b43b9128b79beaab4ca2e8c038ddf5709b0b90608afbca222cfbe08fabda7d2&o=",
    "https://r-xx.bstatic.com/xdata/images/city/300x240/684657.jpg?k=66dc5035b43e9bb86b756e381e4fec2558064af4a63a8af17836725a854c03ee&o=",
    "https://q-xx.bstatic.com/xdata/images/city/300x240/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Propertylist;
