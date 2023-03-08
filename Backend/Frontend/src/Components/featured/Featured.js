import "./featured.css";
import React from "react";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error, reFetch } = useFetch(
    "/hotels/countByCity?cities=Mumbai,Uttrakhand,Delhi"
  );

  // console.log(data)

  return (
    <div className="featured">
      {loading ? (
        "loading please wait"
      ) : (
        <>
          {" "}
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
              alt=""
            />
            <div className="featureTitles">
              <h1>Mumbai</h1>
              <h1>{data[0]} Properties</h1>
            </div>
          </div>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://cf.bstatic.com/xdata/images/city/600x600/684730.jpg?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o="
              alt=""
            />
            <div className="featureTitles">
              <h1>Uttrakhand</h1>
              <h1>{data[1]} Properties</h1>
            </div>
          </div>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://cf.bstatic.com/xdata/images/city/600x600/684657.jpg?k=66dc5035b43e9bb86b756e381e4fec2558064af4a63a8af17836725a854c03ee&o="
              alt=""
            />
            <div className="featureTitles">
              <h1>Delhi</h1>
              <h1>{data[2]} Properties</h1>
            </div>  
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Featured;
