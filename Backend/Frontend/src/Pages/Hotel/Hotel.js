import "./hotel.css";
import React, { useContext, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Maillists from "../../Components/maillists/Maillists";
import Footer from "../../Components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../Components/reserve/Reserve";

const Hotel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false); //slider modal
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const { dates, Options } = useContext(SearchContext);
  console.log(dates);
  console.log(Options);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  // const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const days = dates?.[0]?.endDate
    ? dayDifference(dates[0].endDate, dates[0].startDate)
    : 0;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNubmer;

    if (direction === "l") {
      newSlideNubmer = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNubmer = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNubmer);
  };
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="closebtn"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="slderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faAngleRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent Location - {data.distance}
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over {data.cheapestPrice} at this property and get a
              free airport taxi
            </span>

            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night Stay</h1>
                <span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Molestias ipsa accusamus voluptas? Voluptate omnis architecto
                  accusamus sapiente, ullam laborum vel.
                </span>
                <h2>
                  <b>₹{days * data.cheapestPrice * Options.rooms}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <Maillists />
          <Footer />
        </div>
      )}

      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
