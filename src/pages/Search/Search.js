// import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Search() {
  // create the useState
  const [books, setBooks] = useState([]); // state for book list
  const [events, setEvents] = useState([]); // state for book list
  const [posts, setPosts] = useState([]); // state for book list
  const [search, setSearch] = useState(""); // state for search
  const [lang, setLang] = useState("id");
  const [items, setItem] = useState("books");

  // setting up useNavigate
  const navigat = useNavigate();

  const navigate = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigat(val);
  };

  const handleClick = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/post-view/${lang}/${val}`);
  };

  useEffect(() => {
    // create book loader callback function
    const getStuff = async () => {
      try {
        if (!search) {
          const bookUrl = `https://seg-server.vercel.app/api/booked`; // modify URL based on backend
          const eventUrl = `https://seg-server.vercel.app/api/events`; // modify URL based on backend
          const postUrl = `https://seg-server.vercel.app/api/posts/${lang}`; // modify URL based on backend
          const bookData = await axios.get(bookUrl); // get datas from URL with axios
          const eventData = await axios.get(eventUrl); // get datas from URL with axios
          const postData = await axios.get(postUrl); // get datas from URL with axios
          setBooks(bookData.data);
          setEvents(eventData.data);
          setPosts(postData.data);
        } else {
          const bookUrl = `https://seg-server.vercel.app/api/booked/key/${search}`; // modify URL based on backend
          const eventUrl = `https://seg-server.vercel.app/api/events/key/${search}`; // modify URL based on backend
          const postUrl = `https://seg-server.vercel.app/api/posts/${lang}/key/${search}`; // modify URL based on backend
          const bookData = await axios.get(bookUrl); // get datas from URL with axios
          const eventData = await axios.get(eventUrl); // get datas from URL with axios
          const postData = await axios.get(postUrl); // get datas from URL with axios
          setBooks(bookData.data);
          setEvents(eventData.data);
          setPosts(postData.data);
        }
      } catch (error) {
        window.alert(error.message); // display error message
      }
    };

    getStuff();
  }, [search, lang]); // dependency array with only `getbooks`

  const langSet = (a, b) => {
    setLang(a);
    document.getElementById(a).classList.add("active");
    document.getElementById(b).classList.remove("active");
  };

  const itemSet = (a, b, c) => {
    setItem(a);
    document.getElementById(a).classList.add("active");
    document.getElementById(b).classList.remove("active");
    document.getElementById(c).classList.remove("active");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handlebook = (val) => {
    window.open(val, "_blank");
  };

  const handleEvent = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/event-join/${val}`);
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

  return (
    <>
      <Helmet>
        <title>Search | Compass Publishing Indonesia</title>
        <meta
          name="description"
          content="Find anything in Compass Publishing Indonesia"
        />
        <meta
          property="og:url"
          content={`https://www.compasspubindonesia.com/search`}
        />
        <meta
          property="og:title"
          content={`Search | Compass Publishing Indonesia`}
        />
        <meta
          property="og:description"
          content={`Find anything in Compass Publishing Indonesia`}
        />
        <meta
          property="og:image"
          content={`https://www.compasspubindonesia.com/logo192.png`}
        />
        <link
          rel="canonical"
          href={`https://www.compasspubindonesia.com/search`}
        />
      </Helmet>
      <div className="container">
        <div className="section headline">
          <h4>Search</h4>
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
              placeholder="Search anything..."
            />
          </div>
        </div>
        <div className="section lang">
          <span>Select Item:</span>
          <button
            type="button"
            onClick={() => itemSet("books", "posts", "events")}
            id="books"
            className="active"
          >
            Book
          </button>
          <button
            type="button"
            onClick={() => itemSet("posts", "events", "books")}
            id="posts"
          >
            Post
          </button>
          <button
            type="button"
            onClick={() => itemSet("events", "books", "posts")}
            id="events"
          >
            Event
          </button>
        </div>
        {search === "" ? (
          <>
            <div className="section empty"></div>
          </>
        ) : (
          <div className="section">
            {items === "books" ? (
              <>
                {books.length === 0 ? (
                  <>
                    <div className="section empty"></div>
                  </>
                ) : (
                  <>
                    <div className="section headline">
                      <h4>Book List</h4>
                      <button
                        style={{
                          background: "#fff",
                          color: "#111",
                          border: "1px hidden",
                          verticalAlign: "bottom",
                        }}
                        className="btn"
                      >
                        {books.length} Books
                      </button>
                    </div>
                    <div className="section">
                      {books.map((book, index) => (
                        <div className="bog" key={index}>
                          <div className="cover">
                            {book.img !== "" ? (
                              <>
                                <img
                                  loading="lazy"
                                  src={book.src}
                                  alt={book.src}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </div>

                          <div className="section caption">
                            {book.name !== "" ? (
                              <>
                                <h3 title={book.name}>{book.name}</h3>
                              </>
                            ) : (
                              <></>
                            )}

                            {book.category !== "" ? (
                              <>
                                <p>
                                  <strong>Category:</strong> {book.category}
                                </p>
                              </>
                            ) : (
                              <></>
                            )}

                            {book.cefr !== "" ? (
                              <>
                                <p>
                                  <strong>CEFR Level:</strong> {book.cefr}
                                </p>
                              </>
                            ) : (
                              <></>
                            )}

                            <button
                              onClick={() => handlebook(book.url)}
                              className="btn"
                              style={{ fontWeight: "400", marginRight: "5px" }}
                            >
                              PREVIEW
                            </button>

                            <button
                              onClick={() => navigate(`/book-view/${book._id}`)}
                              className="btn"
                              style={{ fontWeight: "400", marginLeft: "5px" }}
                            >
                              DETAIL
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}

            {items === "posts" ? (
              <>
                {posts.length === 0 ? (
                  <>
                    <div className="section empty"></div>
                  </>
                ) : (
                  <>
                    <div className="section headline">
                      <h4>Post List</h4>
                      <button
                        style={{
                          background: "#fff",
                          color: "#111",
                          border: "1px hidden",
                          verticalAlign: "bottom",
                        }}
                        className="btn"
                      >
                        {posts.length} Posts
                      </button>
                    </div>
                    <div className="section lang">
                      <span>Select Language:</span>
                      <button
                        type="button"
                        onClick={() => langSet("id", "en")}
                        id="id"
                        className="active"
                      >
                        Indonesia
                      </button>
                      <button
                        type="button"
                        onClick={() => langSet("en", "id")}
                        id="en"
                      >
                        English
                      </button>
                    </div>
                    <div className="section">
                      {posts.map((post, index) => (
                        <div
                          onClick={() => handleClick(post._id)}
                          className="event"
                          key={index}
                        >
                          {post.banner !== "" ? (
                            <>
                              <img
                                loading="lazy"
                                src={post.banner}
                                alt={post.banner}
                              />
                            </>
                          ) : (
                            <></>
                          )}

                          <div className="section caption">
                            {post.title !== "" ? (
                              <>
                                <h3 title={post.title}>
                                  {post.title.toUpperCase()}
                                </h3>
                              </>
                            ) : (
                              <></>
                            )}

                            <pre
                              className="dip"
                              dangerouslySetInnerHTML={{ __html: post.body }}
                            />

                            <button
                              onClick={() => handleClick(post._id)}
                              className="btn"
                            >
                              Read This post
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}

            {items === "events" ? (
              <>
                {events.length === 0 ? (
                  <>
                    <div className="section empty"></div>
                  </>
                ) : (
                  <>
                    <div className="section headline">
                      <h4>Event List</h4>
                      <button
                        style={{
                          background: "#fff",
                          color: "#111",
                          border: "1px hidden",
                          verticalAlign: "bottom",
                        }}
                        className="btn"
                      >
                        {events.length} Events
                      </button>
                    </div>
                    <div className="section">
                      {events.map((event, index) => (
                        <div
                          className="event"
                          key={index}
                          onClick={() => handleEvent(event._id)}
                        >
                          {event.img !== "" ? (
                            <>
                              <img
                                loading="lazy"
                                src={event.img}
                                alt={event.img}
                              />
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

                            {event.pic !== "" ? (
                              <>
                                <p title={event.pic}>
                                  <strong>Speaker:</strong> {event.pic}
                                </p>
                              </>
                            ) : (
                              <></>
                            )}

                            {event.start !== "" ? (
                              <>
                                <p>
                                  <strong>Date:</strong>{" "}
                                  {formatTime(event.start)}
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
                              <></>
                            )}

                            {event.price !== "" ? (
                              <>
                                <p>
                                  <strong>Price:</strong>{" "}
                                  {formatCurrency(event.price)}
                                </p>
                              </>
                            ) : (
                              <></>
                            )}

                            <button
                              onClick={() =>
                                navigate(`/event-join/${event._id}`)
                              }
                              className="btn"
                            >
                              JOIN THIS EVENT
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
