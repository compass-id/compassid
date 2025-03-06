// import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// create the main function
const EventList = () => {
  // create the useState
  const [events, setEvents] = useState([]); // state for Event list
  const [search, setSearch] = useState(""); // state for search
  const [isLoading, setIsLoading] = useState(true); // state for loading
  const [isEmpty, setIsEmpty] = useState(false);

  const limit = events.length;

  // setting up useNavigate
  const navigat = useNavigate();

  const navigate = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigat(val);
  };

  // create currency format function
  function formatCurrency(number) {
    // define options for formatting
    const options = {
      style: "currency", // set currency
      currency: "IDR", // set currency code for Indonesian Rupiah (IDR)
      minimumFractionDigits: 2, // set minimum decimal places to 2
      maximumFractionDigits: 2, // set maximum decimal places to 2
    };

    // use toLocaleString() with the defined options
    return new Intl.NumberFormat("id-ID", options).format(number);
  }

  useEffect(() => {
    // create book loader callback function
    const getEvents = async () => {
      try {
        if (!search) {
          const url = `https://seg-server.vercel.app/api/events`; // modify URL based on backend
          const datas = await axios.get(url); // get datas from URL with axios
          datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          setEvents(datas.data);
          setIsLoading(false);
        } else {
          const url = `https://seg-server.vercel.app/api/events/key/${search}`; // modify URL based on backend
          const datas = await axios.get(url); // get datas from URL with axios
          datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          setEvents(datas.data);
          setIsLoading(false);
        }
      } catch (error) {
        window.alert(error.message); // display error message
      }
    };

    getEvents();
  }, [search]); // dependency array with only `getEvents`

  function formatTime(dateString) {
    // Create a new Date object from the provided dateString
    const date = new Date(dateString);

    // Define arrays for day names and month names
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the day of the week, month, day, and year from the Date object
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Get the hours and minutes from the Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time as "HH.MM"
    const time = `${hours < 10 ? "0" : ""}${hours}.${
      minutes < 10 ? "0" : ""
    }${minutes}`;

    // Return the formatted date string
    return `${dayOfWeek}, ${day} ${month} ${year}. ${time} WIB`;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleEvent = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/event-join/${val}`);
  };

  // render the display
  return (
    <>
      <Helmet>
        <title>Events | Compass Publishing Indonesia</title>
        <meta
          name="description"
          content="List of events in Compass Publishing Indonesia"
        />
        <meta
          property="og:url"
          content={`https://www.compasspubindonesia.com/events`}
        />
        <meta
          property="og:title"
          content={`Events | Compass Publishing Indonesia`}
        />
        <meta
          property="og:description"
          content={`List of events in Compass Publishing Indonesia`}
        />
        <meta
          property="og:image"
          content={`https://www.compasspubindonesia.com/logo192.png`}
        />
        <link
          rel="canonical"
          href={`https://www.compasspubindonesia.com/events`}
        />
      </Helmet>
      <div className="container">
        <div className="section headline">
          <h4>Event List</h4>
          <button onClick={() => navigate(`/`)} className="btn">
            See Home
          </button>
          <div className="section">
            <input
              type="text"
              autoComplete="on"
              className="input"
              value={search} // set value from search state
              onInput={handleSearch} // update search state on change
              placeholder="Search Events..."
            />
          </div>
          <p style={{ fontSize: "11pt", float: "left", display: "block" }}>
            Result: {limit} Events
          </p>
        </div>
        {isLoading === true ? (
          <div className="section loading">Loading Event Database...</div> // display status when loading
        ) : isEmpty ? (
          <div className="section empty">No data...</div> // display status when loading
        ) : (
          // display table after loading
          <div className="section">
            <div className="section">
              {events.map((event, index) => (
                <div
                  className="event"
                  key={index}
                  onClick={() => handleEvent(event._id)}
                >
                  {event.img !== "" ? (
                    <>
                      <img loading="lazy" src={event.img} alt={event.img} />
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="section caption">
                    {event.title !== "" ? (
                      <>
                        <h3
                          title={event.title}
                          style={{ textTransform: "uppercase" }}
                        >
                          {event.title}
                        </h3>
                      </>
                    ) : (
                      <></>
                    )}

                    {event.start !== "" ? (
                      <>
                        <p>
                          <strong>Date:</strong> {formatTime(event.start)}
                        </p>
                      </>
                    ) : (
                      <></>
                    )}

                    {event.model !== "" ? (
                      <>
                        <p title={event.model}>
                          <strong>Role:</strong> {event.model}
                        </p>
                      </>
                    ) : (
                      <></>
                    )}

                    {event.address !== "" ? (
                      <>
                        <p title={event.address}>
                          <strong>Location:</strong> {event.address}
                        </p>
                      </>
                    ) : (
                      <>
                        <p title={event.address}>
                          <strong>Location:</strong> -
                        </p>
                      </>
                    )}

                    {event.price !== "" ? (
                      <>
                        <p>
                          <strong>Price:</strong> {formatCurrency(event.price)}
                        </p>
                      </>
                    ) : (
                      <></>
                    )}

                    <button
                      onClick={() => navigate(`/event-join/${event._id}`)}
                      className="btn"
                    >
                      JOIN THIS EVENT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="section"></div>
      <div className="section"></div>
    </>
  );
};

// export the main function
export default EventList;
