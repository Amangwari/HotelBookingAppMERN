import "./header.css";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";

import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [Options, setOptions] = useState({
    adult: 1,
    childrens: 0,
    rooms: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? Options[name] + 1 : Options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, Options } });
    navigate("/hotels", { state: { destination, dates, Options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem ">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            {" "}
            <h1 className="headerTitle">Find your next stay</h1>
            <p className="headerDesc">
              Search deals on hotels, homes, and much more..
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${Options.adult} adults . ${Options.childrens} Children . ${Options.rooms} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItems">
                      <span className="optionText">Adult</span>
                      <div className="optionCount">
                        <button
                          disabled={Options.adult <= 1}
                          className="optionCoutnerButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {Options.adult}
                        </span>
                        <button
                          className="optionCoutnerButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItems">
                      <span className="optionText">Childrens</span>
                      <div className="optionCount">
                        <button
                          disabled={Options.childrens <= 1}
                          className="optionCoutnerButton"
                          onClick={() => handleOption("childrens", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {Options.childrens}
                        </span>
                        <button
                          className="optionCoutnerButton"
                          onClick={() => handleOption("childrens", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItems">
                      <span className="optionText">Rooms</span>
                      <div className="optionCount">
                        <button
                          disabled={Options.rooms <= 1}
                          className="optionCoutnerButton"
                          onClick={() => handleOption("rooms", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {Options.rooms}
                        </span>
                        <button
                          className="optionCoutnerButton"
                          onClick={() => handleOption("rooms", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
