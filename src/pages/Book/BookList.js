// import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// create the main function
const BookList = () => {
  // create the useState
  const [books, setBooks] = useState([]); // state for book list
  const [search, setSearch] = useState(""); // state for search
  const [isLoading, setIsLoading] = useState(true); // state for loading
  const [isEmpty, setIsEmpty] = useState(false);

  const limit = books.length;

  // setting up useNavigate
  const navigat = useNavigate();

  const navigate = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigat(val);
  };

  useEffect(() => {
    // create book loader callback function
    const getbooks = async () => {
      try {
        if (!search) {
          const url = `https://seg-server.vercel.app/api/booked`; // modify URL based on backend
          const datas = await axios.get(url); // get datas from URL with axios
          datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          setBooks(datas.data);
          setIsLoading(false);
        } else {
          const url = `https://seg-server.vercel.app/api/booked/key/${search}`; // modify URL based on backend
          const datas = await axios.get(url); // get datas from URL with axios
          datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          setBooks(datas.data);
          setIsLoading(false);
        }
      } catch (error) {
        window.alert(error.message); // display error message
      }
    };

    getbooks();
  }, [search]); // dependency array with only `getbooks`

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handlebook = (val) => {
    window.open(val, "_blank");
  };

  // render the display
  return (
    <>
      <Helmet>
        <title>Books | Compass Publishing Indonesia</title>
        <meta
          name="description"
          content="List of books in Compass Publishing Indonesia"
        />
        <meta
          property="og:url"
          content={`https://www.compasspubindonesia.com/books`}
        />
        <meta
          property="og:title"
          content={`Books | Compass Publishing Indonesia`}
        />
        <meta
          property="og:description"
          content={`List of books in Compass Publishing Indonesia`}
        />
        <meta
          property="og:image"
          content={`https://www.compasspubindonesia.com/logo192.png`}
        />
        <link
          rel="canonical"
          href="https://www.compasspubindonesia.com/books"
        />
      </Helmet>
      <div className="container">
        <div className="section headline">
          <h4>Book List</h4>
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
              placeholder="Search books..."
            />
          </div>
          <p style={{ fontSize: "11pt", float: "left", display: "block" }}>
            Result: {limit} Books
          </p>
        </div>
        {isLoading === true ? (
          <div className="section loading">Loading book Database...</div> // display status when loading
        ) : isEmpty ? (
          <div className="section empty">No data...</div> // display status when loading
        ) : (
          // display table after loading
          <div className="section">
            {books.map((book, index) => (
              <div className="bog" key={index}>
                <div className="cover">
                  {book.img !== "" ? (
                    <>
                      <img loading="lazy" src={book.src} alt={book.src} />
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
        )}
      </div>
      <div className="section"></div>
      <div className="section"></div>
    </>
  );
};

// export the main function
export default BookList;
