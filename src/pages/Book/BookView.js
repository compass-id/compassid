import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function BookView() {
  // Fetches latest Event count for serie generation (Optional)
  const [isLoading, setIsLoading] = useState(true); // state for loading
  const [isEmpty, setIsEmpty] = useState(false);
  const [booki, setBooki] = useState([]);
  const [booked, setBooked] = useState([]);

  const { id } = useParams();

  // Setting up useNavigate
  const navigat = useNavigate();

  const navigate = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigat(val);
  };

  // setting up useEffect to do tasks in real-time
  useEffect(() => {
    // create party loader callback function
    const getBook = async () => {
      try {
        const uri = "https://seg-server.vercel.app/api/booked/key/%201%20";
        const url = `https://seg-server.vercel.app/api/booked/id/${id}`; // modify URL based on backend
        const datas = await axios.get(url); // get datas from URL with axios
        const datap = await axios.get(uri); // get datas from URL with axios
        datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
        setBooked(datas.data);
        setBooki(datap.data);
        setIsLoading(false);
      } catch (error) {
        window.alert(error.message); // display error message
      }
    };

    getBook();
    // dependency array with only `search`
  }, [id, isLoading]); // dependency array with only `getParty`

  const handleCopy = () => {
    const uri = `https://www.compasspubindonesia.com/book-view.php?id=${booked._id}`;
    const copied = navigator.clipboard.writeText(uri);
    if (copied) {
      document.getElementById("fab").classList.add("active");
      document.getElementById("lbs").innerText = "Link Copied";
    }
  };

  const handlebook = (val) => {
    window.open(val, "_blank");
  };

  // render the display
  return (
    <>
      <Helmet>
        <title>{`${booked.name}`} | Compass Publishing Indonesia</title>
        <meta name="description" content={`${booked.category}`} />
        <meta
          property="og:url"
          content={`https://www.compasspubindonesia.com/book-view/${booked._id}`}
        />
        <meta
          property="og:title"
          content={`${booked.name} | Compass Publishing Indonesia`}
        />
        <meta property="og:description" content={`${booked.category}`} />
        <meta property="og:image" content={`${booked.src}`} />
        <link
          rel="canonical"
          href={`https://www.compasspubindonesia.com/book-view/${booked._id}`}
        />
      </Helmet>
      <div className="party container">
        {isLoading === true ? (
          <div className="section loading">Loading post database...</div> // display status when loading
        ) : isEmpty ? (
          <div className="section empty">No data...</div> // display status when loading
        ) : (
          <>
            <div className="section">
              <div className="section headline">
                <h4>Book View</h4>
                <button onClick={() => navigate(`/books`)} className="btn">
                  See Books
                </button>
              </div>
              <div className="boog section">
                <div className="section">
                  <div className="image">
                    <img loading="lazy" src={booked.src} alt={booked.src} />
                  </div>
                  <div className="caption">
                    <div className="section">
                      {booked.name !== "" ? (
                        <>
                          <h1 title={booked.name}>{booked.name}</h1>
                        </>
                      ) : (
                        <></>
                      )}

                      {booked.isbn !== "" ? (
                        <>
                          <p>
                            <strong>ISBN:</strong> {booked.isbn}
                          </p>
                        </>
                      ) : (
                        <></>
                      )}

                      {booked.category !== "" ? (
                        <>
                          <p>
                            <strong>Category:</strong> {booked.category}
                          </p>
                        </>
                      ) : (
                        <></>
                      )}

                      {booked.cefr !== "" ? (
                        <>
                          <p>
                            <strong>CEFR Level:</strong> {booked.cefr}
                          </p>
                        </>
                      ) : (
                        <></>
                      )}

                      <button
                        onClick={() => handlebook(booked.url)}
                        className="btn"
                        style={{ fontWeight: "400", marginRight: "5px" }}
                      >
                        PREVIEW THIS BOOK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section"></div>
            <div className="section"></div>

            <div className="section recom">
              <div className="section headline">
                <h5 style={{ float: "left" }}>Recommendation</h5>
                <button
                  type="button"
                  onClick={() => navigate("/books")}
                  style={{
                    borderRadius: "10px",
                    background: "transparent",
                    color: "#111",
                    border: "1px hidden",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    float: "right",
                    fontWeight: "400",
                  }}
                  className="btn"
                >
                  <span style={{ marginRight: "10px" }}>See More</span>
                  &#10095;
                </button>
              </div>
              <div className="section scrollList">
                {booki.map((book, index) => (
                  <button
                    className="axe"
                    onClick={() => navigate(`/book-view/${book._id}`)}
                    key={index}
                  >
                    <img loading="lazy" src={book.src} alt={book.src} />
                    <p>
                      <strong>{book.name}</strong>
                    </p>
                    <p style={{ textTransform: "uppercase" }}>
                      <i className="fas fa-list"></i> {book.category}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="section"></div>
      <div className="section"></div>
      <button
        type="button"
        onClick={() => handleCopy()}
        className="fab"
        id="fab"
      >
        <span id="lbs">Share</span> <i className="fas fa-share-alt"></i>
      </button>
    </>
  );
}

export default BookView;
