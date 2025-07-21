import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function EventPartyAdd() {
  // Fetches latest Event count for serie generation (Optional)
  const [isLoading, setIsLoading] = useState(true); // state for loading
  const [isEmpty, setIsEmpty] = useState(false);

  const { id } = useParams();

  const [event, setEvent] = useState({});

  const [selectedFile, setSelectedFile] = useState(null);
  const [eventData, setEventData] = useState({});

  // Setting up useNavigate
  const navigat = useNavigate();

  const navigate = (val) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigat(val);
  };

  const pierce = parseFloat(event.price, 12);

  const handleChange = (event) => {
    // For non-file inputs, set the value directly
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    // Access the filename from the selected file
    const fileDir = "https://compasspubindonesia.com/media/api/bills/img/";
    const file = event.target.files[0];
    const filename = fileDir + file.name;
    setEventData({
      ...eventData,
      file: filename,
    });
  };

  const AddEvent = async (e) => {
    document.getElementById("submit").type = "reset";
    document.getElementById("submit").textContent =
      "Saving data, please wait..";

    e.preventDefault();

    const cleanedData = {
      ...eventData,
      event: event._id,
    };

    const formData = {
      title: event.title,
      group: event.group,
      start: event.start,
      end: event.end,
      name: eventData.name,
      email: eventData.email,
      method: eventData.method,
      referral: eventData.referral,
    };

    const formiData = new FormData();
    formiData.append("img", selectedFile);

    if (
      event !== "" &&
      eventData !== "" &&
      formData !== "" &&
      formiData !== ""
    ) {
      try {
        // Add the Event into database with axios
        await axios.post(
          `https://seg-server.vercel.app/api/parties`,
          cleanedData
        );

        await axios.post(
          `https://compasspubindonesia.com/media/api/bills/index.php`,
          formiData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        await axios.post(
          `https://compasspubindonesia.com/media/api/mails/index.php`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Navigate to main page
        alert(
          `Halo ${
            eventData.name !== "" ? eventData.name : eventData.parentName
          }! Anda berhasil terdaftar dalam acara ${
            event.title
          }! Silakan tunggu informasi lebih lanjut terkait acara ini yang akan kami kirim melalui email.`
        );

        navigate(`/events`);
      } catch (error) {
        window.alert(error.message); // Display error messages
      }
    } else {
      alert("Please fill the blanks.. | Silakan isi bagian yang kosong..");
    }
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

  // setting up useEffect to do tasks in real-time

  useEffect(() => {
    // create party loader callback function
    const getEvent = async () => {
      try {
        const url = `https://seg-server.vercel.app/api/events/id/${id}`; // modify URL based on backend
        const datas = await axios.get(url); // get datas from URL with axios
        datas.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
        setIsLoading(false);
        setEvent(datas.data);
      } catch (error) {
        window.alert(error.message); // display error message
      }
    };

    getEvent(); // dependency array with only `search`
  }, [id]); // dependency array with only `getParty`

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

  const handleCopy = () => {
    const uri = `https://www.compasspubindonesia.com/event-join.php?id=${event._id}`;
    const copied = navigator.clipboard.writeText(uri);
    if (copied) {
      document.getElementById("fab").classList.add("active");
      document.getElementById("lbs").innerText = "Link Copied";
    }
  };

  return (
    <>
      <Helmet>
        <title>Events | Compass Publishing Indonesia</title>
        <meta name="description" content={`${event.desc}`} />
        <meta
          property="og:url"
          content={`https://www.compasspubindonesia.com/event-join/${event._id}`}
        />
        <meta
          property="og:title"
          content={`${event.title} | Compass Publishing Indonesia`}
        />
        <meta property="og:description" content={`${event.desc}`} />
        <meta property="og:image" content={`${event.img}`} />
        <link
          rel="canonical"
          href={`https://www.compasspubindonesia.com/event-join/${event._id}`}
        />
      </Helmet>
      <div className="party container">
        {isLoading === true ? (
          <div className="section loading">Loading Event Database...</div> // display status when loading
        ) : isEmpty ? (
          <div className="section empty">No data...</div> // display status when loading
        ) : (
          <>
            <div className="left">
              {event.title !== "" ? (
                <div>
                  <h3>{event.title}</h3>
                </div>
              ) : (
                <></>
              )}
              <div className="section"></div>
              {event.img !== "" ? (
                <div className="section">
                  <img
                    src={event.img}
                    alt={event.img}
                    onClick={() => window.open(event.img, "_blank")}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="section"></div>
              <div
                id="peg"
                style={{
                  display: "block",
                }}>
                <div
                  style={{
                    width: "100%",
                    padding: "1rem 5px",
                    textAlign: "center",
                    borderBottom: "1px solid #111",
                  }}>
                  <h4>Event Description</h4>
                </div>
                <div className="section"></div>
                {event.title !== "" ? (
                  <div className="section">
                    <p>
                      <strong>Title:</strong>
                    </p>
                    <p>{event.title}</p>
                  </div>
                ) : (
                  <></>
                )}
                {event.model !== "" ? (
                  <div className="section">
                    <p>
                      <strong>Role:</strong>
                    </p>
                    <p>{event.model}</p>
                  </div>
                ) : (
                  <></>
                )}
                {event.contact !== "" ? (
                  <div className="section">
                    <p>
                      <strong>Contact:</strong>
                    </p>
                    <p>
                      <a href={`https://wa.me/62${event.contact}`}>
                        {event.contact}
                      </a>
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                {event.start !== "" && event.type === "Registration" ? (
                  <div className="section">
                    <p>
                      <strong>Time:</strong>
                    </p>
                    <p>{formatTime(event.start)}</p>
                  </div>
                ) : (
                  <></>
                )}
                {event.address !== "" ? (
                  <div className="section">
                    <p>
                      <strong>Location:</strong>
                    </p>
                    <p>{event.address}</p>
                  </div>
                ) : (
                  <></>
                )}
                {event.price !== "" && event.price > 0 ? (
                  <div className="section">
                    <p>
                      <strong>Price:</strong>
                    </p>
                    <p>{event.price > 0 ? formatCurrency(event.price) : `-`}</p>
                  </div>
                ) : (
                  <></>
                )}
                {event.desc !== "" ? (
                  <div className="section">
                    <p>
                      <strong>Description:</strong>
                    </p>
                    <pre>{event.desc}</pre>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="section"></div>
              {event.type === "Registration" ||
              event.type === "Agent" ||
              event.type === "Contest" ? (
                <div>
                  <p>
                    Untuk mendaftar, silakan lakukan pembayaran via transfer ke
                    no. rekening BCA atas nama PT. SOLUSI EDUKASI GEMILANG,
                    berikut ini:
                    <br />
                    <br />
                    BCA - 4685015898
                    <br />
                    PT. Solusi Edukasi Gemilang
                    {event.contact !== "" ? (
                      <>
                        <br />
                        <br />
                        Informasi selengkapnya, hubungi:
                        <br />
                        CS -{" "}
                        <a href={`https://wa.me/62${event.contact}`}>
                          {event.contact}
                        </a>
                      </>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              ) : event.type === "Booking" ? (
                <div>
                  <p>
                    Silakan untuk booking terlebih dahulu dengan mengisi
                    formulir dibawah.
                    <br />
                    {event.contact !== "" ? (
                      <>
                        <br />
                        <br />
                        Informasi selengkapnya, hubungi:
                        <br />
                        CS -{" "}
                        <a href={`https://wa.me/62${event.contact}`}>
                          {event.contact}
                        </a>
                      </>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              ) : (
                <></>
              )}
              <div className="section"></div>
              <div className="section"></div>
            </div>
          </>
        )}

        {isLoading === true ? (
          <></> // display status when loading
        ) : isEmpty ? (
          <></> // display status when loading
        ) : (
          <div className="right">
            <div className="section headline">
              <h4>Join Event / Class</h4>
              <button onClick={() => navigate(`/events`)} className="btn">
                See Events
              </button>
            </div>
            <div className="section">
              <form onSubmit={AddEvent} className="form">
                {event.type === "Registration" ||
                event.type === "Agent" ||
                event.type === "Booking" ||
                event.type === "Survey" ? (
                  <>
                    <div className="field">
                      <label className="label">
                        <strong>Name | Nama</strong>
                      </label>
                      <input
                        type="text"
                        autoComplete="on"
                        className="input"
                        id="name"
                        name="name"
                        value={eventData.name}
                        onChange={handleChange}
                        placeholder="Name | Nama"
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="label">
                        <strong>Occupation | Pekerjaan</strong>
                      </label>
                      <select
                        id="job"
                        name="job"
                        value={eventData.job}
                        onChange={handleChange}
                        required>
                        <option value="">
                          --- Select Occupation | Pilih Pekerjaan ---
                        </option>
                        <option value="Headmaster">
                          Headmaster | Kepala Sekolah
                        </option>
                        <option value="Teacher">Teacher | Guru</option>
                        <option value="Tutor">Tutor | Tutor</option>
                        <option value="Parent">Parent | Orang Tua</option>
                        <option value="Student">Student | Pelajar</option>
                        <option value="College">
                          College Student | Mahasiswa
                        </option>
                        <option value="Employee">Employee | Karyawan</option>
                        <option value="Other">Other | Lainnya</option>
                      </select>
                    </div>
                    <div className="field">
                      <label className="label">
                        <strong>
                          School/Organization/Personal |
                          Sekolah/Organisasi/Personal
                        </strong>
                      </label>
                      <input
                        type="text"
                        autoComplete="on"
                        className="input"
                        id="company"
                        name="company"
                        value={eventData.company}
                        onChange={handleChange}
                        placeholder="School/Organization/Personal | Sekolah/Organisasi/Personal"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {event.type === "Contest" || event.type === "Contest-Part" ? (
                  <>
                    <div className="field">
                      <label className="label">
                        <strong>Parent's Name | Nama Orangtua</strong>
                      </label>
                      <input
                        type="text"
                        autoComplete="on"
                        className="input"
                        id="parentName"
                        name="parentName"
                        value={eventData.parentName}
                        onChange={handleChange}
                        placeholder="Parent's Name | Nama Orangtua"
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="label">
                        <strong>Child's Name | Nama Anak</strong>
                      </label>
                      <input
                        type="text"
                        autoComplete="on"
                        className="input"
                        id="childName"
                        name="childName"
                        value={eventData.childName}
                        onChange={handleChange}
                        placeholder="Child's Name | Nama Anak"
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="label">
                        <strong>School | Sekolah</strong>
                      </label>
                      <input
                        type="text"
                        autoComplete="on"
                        className="input"
                        id="school"
                        name="school"
                        value={eventData.school}
                        onChange={handleChange}
                        placeholder="School | Sekolah"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="field">
                  <label className="label">
                    <strong>Email | Email</strong>
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    className="input"
                    id="email"
                    name="email"
                    value={eventData.email}
                    onChange={handleChange}
                    placeholder="Email | Email"
                    required
                  />
                </div>
                <div className="field">
                  <label className="label">
                    <strong>WhatsApp / Phone | WhatsApp / Telepon</strong>
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    className="input"
                    id="phone"
                    name="phone"
                    value={eventData.phone}
                    onChange={handleChange}
                    placeholder="Phone | Telepon"
                    required
                  />
                </div>
                <div className="field">
                  <label className="label">
                    <strong>City | Kota</strong>
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    className="input"
                    id="address"
                    name="address"
                    value={eventData.address}
                    onChange={handleChange}
                    placeholder="City | Kota"
                    required
                  />
                </div>
                {event.model === "Hybrid (Online & Onsite)" ? (
                  <div className="field">
                    <label className="label">
                      <strong>Attendance | Kehadiran</strong>
                    </label>
                    <select
                      id="room"
                      name="room"
                      value={eventData.room}
                      onChange={handleChange}
                      required>
                      <option value="">
                        --- Select Attendance | Pilih Kehadiran ---
                      </option>
                      <option value="Online">Online | Daring</option>
                      <option value="Onsite">Onsite | Luring</option>
                    </select>
                  </div>
                ) : (
                  <></>
                )}
                {event.type === "Agent" ||
                event.type === "Contest" ||
                event.type === "Contest-Part" ? (
                  <>
                    <div className="field">
                      <label className="label">
                        <strong>
                          From whom did you hear about this event? | Dari siapa
                          anda tahu acara ini?
                        </strong>
                      </label>
                      <input
                        type="text"
                        autoComplete="on"
                        className="input"
                        id="referral"
                        name="referral"
                        value={eventData.referral}
                        onChange={handleChange}
                        placeholder="Sebutkan nama dengan jelas.."
                        required
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {event.type === "Survey" || event.type === "Contest-Part" ? (
                  <div className="field">
                    <label className="label">
                      <strong>Payment Plan | Rencana Pembayaran</strong>
                    </label>
                    <select
                      id="method"
                      name="method"
                      value={eventData.method}
                      onChange={handleChange}
                      required>
                      <option value="">
                        --- Select Payment Plan | Pilih Rencana Pembayaran ---
                      </option>
                      <option value="Bank Transfer (Full Payment)">
                        Bank Transfer (Full Payment) | Transfer bank (pembayaran
                        penuh)
                      </option>
                      <option value="Bank Transfer (Installment Payment)">
                        Bank Transfer (Installment Payment) | Transfer bank
                        (pembayaran cicilan)
                      </option>
                      <option value="Digital Payment (Full Payment)">
                        Digital Payment (Full Payment) | Digital payment
                        (pembayaran penuh)
                      </option>
                      <option value="Digital Payment (Installment Payment)">
                        Digital Payment (Installment Payment) | Digital payment
                        (pembayaran cicilan)
                      </option>
                      <option value="Credit Card">
                        Credit Card | Kartu Kredit
                      </option>
                      <option value="Other">Other | Lainnya</option>
                    </select>
                    {(event.type === "Contest-Part" &&
                      eventData.method ===
                        "Bank Transfer (Installment Payment)" &&
                      pierce > 0) ||
                    (event.type === "Contest-Part" &&
                      eventData.method ===
                        "Digital Payment (Installment Payment)" &&
                      pierce > 0) ? (
                      <>
                        <br />
                        <label className="label">
                          <strong>
                            Terms of Payment | Ketentuan Pembayaran:
                          </strong>
                        </label>
                        <br />
                        <label className="label">
                          - First Payment | Pembayaran Pertama ={" "}
                          <strong>{formatCurrency(event.price * 0.47)}</strong>
                        </label>
                        <br />
                        <label className="label">
                          - Second Payment | Pembayaran Kedua ={" "}
                          <strong>{formatCurrency(event.price * 0.265)}</strong>
                        </label>
                        <br />
                        <label className="label">
                          - Third Payment | Pembayaran Ketiga ={" "}
                          <strong>{formatCurrency(event.price * 0.265)}</strong>
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                {(event.type === "Contest" && pierce > 0) ||
                (event.type === "Contest-Part" && pierce > 0) ||
                (event.type === "Registration" && pierce > 0) ||
                (event.type === "Agent" && pierce > 0) ? (
                  <div className="field">
                    <label className="label">
                      <strong>Proof of Payment | Bukti Pembayaran</strong>
                    </label>
                    <br />
                    <label style={{ fontSize: "10pt" }}>
                      Please attach your{" "}
                      {(event.type === "Contest-Part" &&
                        eventData.method ===
                          "Bank Transfer (Installment Payment)" &&
                        pierce > 0) ||
                      (event.type === "Contest-Part" &&
                        eventData.method ===
                          "Digital Payment (Installment Payment)" &&
                        pierce > 0)
                        ? "first proof of installment payment"
                        : ""}{" "}
                      bank slip transfer | Sisipkan bukti slip pembayaran{" "}
                      {(event.type === "Contest-Part" &&
                        eventData.method ===
                          "Bank Transfer (Installment Payment)" &&
                        pierce > 0) ||
                      (event.type === "Contest-Part" &&
                        eventData.method ===
                          "Digital Payment (Installment Payment)" &&
                        pierce > 0)
                        ? "cicilan pertama anda."
                        : ""}
                    </label>
                    <input
                      type="file"
                      autoComplete="on"
                      className="input"
                      id="img"
                      name="img"
                      onChange={handleFile}
                      placeholder="Proof of Payment | Bukti Pembayaran"
                      required
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="section">
                  <div className="controls forms">
                    <button type="submit" className="btn" id="submit">
                      Join This Event / Class
                    </button>
                  </div>
                </div>
                {event.type === "Survey" ? (
                  <>
                    <div className="section">
                      <p>
                        <strong>Perhatian:</strong> Dengan mengisi formulir
                        diatas, anda telah melakukan booking untuk Event / Kelas
                        ini. Untuk informasi pembayaran biaya pendaftaran akan
                        kami hubungi lagi nanti. Terima kasih.
                      </p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="section"></div>
      <div className="section"></div>
      <button
        type="button"
        onClick={() => handleCopy()}
        className="fab"
        id="fab">
        <span id="lbs">Share</span> <i className="fas fa-share-alt"></i>
      </button>
    </>
  );
}

export default EventPartyAdd;
