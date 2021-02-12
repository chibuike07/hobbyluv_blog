import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../Context_files/UserContext";
import Input from "../../../Common/Input.component/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenFancy,
  faTimesCircle,
  faCheckCircle,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

import {
  infoToastify,
  successToastify,
  errorToastify,
} from "../../../Common/react_toastify/toastify.jsx";
import Axios from "axios";
import Image from "../../../Common/Image.component/Image";

const ProfilePersonalData = () => {
  //destructure personal data
  const [{ personalData }] = useContext(UserContext);

  //setting the input default values
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [phone, setphone] = useState("");
  const [posts, setposts] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState();
  const [state, setstate] = useState("");
  const [showAppreviation, setShowAppreviation] = useState(true);
  const [displayLabel, setDisplayLabel] = useState(false);
  const [clientLoggedInIpAddress, setclientLoggedInIpAddress] = useState("");
  const [handleDisplay, sethandleDisplay] = useState(true);
  const [file, setFile] = useState("");

  const { REACT_APP_ENDPOINT } = process.env;

  //handling the editing of the personal data
  const handleEditPersonalData = () => {
    //setting the inputs to the read only
    sethandleDisplay(false);

    //prompting a message to the user
    infoToastify("please proceed to editing of your personal details");
  };

  //setting the userData to the default data when cancelled
  const handleCancelUpdatePersonalData = () => {
    setfirstName(personalData[0].firstName);
    setlastName(personalData[0].lastName);
    setemail(personalData[0].email);
    sethandleDisplay(true);
  };

  //sending the updated data to the server
  const handleUpdatePersonalData = async () => {
    let contact = {
      address,
      city,
      state,
    };
    let currentState = {
      firstName,
      lastName,
      email,
      contact,
      phone,
    };

    await Axios.put(`${REACT_APP_ENDPOINT}/user/update_profile`, currentState, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        //alert the user of the success updating of the data
        successToastify(res.data.message);

        //set fields to read only
        sethandleDisplay(true);
      })

      //watching for error
      .catch((error) =>
        error.response === undefined
          ? false
          : errorToastify(error.response.data.message)
      );
  };

  const handleToggleLabel = () => {
    setDisplayLabel((curVal) => true);
    setShowAppreviation(false);
  };

  const handleMouseLeaveOnProfileContainer = () => {
    setDisplayLabel((curVal) => false);
    setShowAppreviation(true);
  };

  const handleUploadImage = async ({ target }) => {
    setFile(target.value);
    const Forms = new FormData();

    Forms.append("file", target.files[0]);
    await Axios.put(`${REACT_APP_ENDPOINT}/profile/image`, Forms, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        setstate((data) => ({
          ...data,
          personalData: res.data.data,
        }));
        successToastify(res.data.message);
      })
      .catch((error) =>
        error.response === undefined
          ? false
          : errorToastify(error.response.data.message)
      );
  };

  useEffect(() => {
    //setting the default user data to the fields on mount
    const setDataToState = () => {
      if (personalData.length) {
        setfirstName(personalData[0].firstName);
        setlastName(personalData[0].lastName);
        setemail(personalData[0].email);
        setphone(personalData[0].phone);
        setposts(personalData[0].posts);
        setclientLoggedInIpAddress(personalData[0].ClientLoggedInIpAddress);
        setaddress(personalData[0].contact.address);
        setcity(personalData[0].contact.city);
        setstate(personalData[0].contact.state);
        setprofileImage(personalData[0].profileImage);
      }
    };
    setDataToState();

    return [setDataToState];
  }, [personalData, REACT_APP_ENDPOINT]);

  return (
    <div className="container-fluid" style={{ marginTop: "1rem" }}>
      <div className="card">
        <div className="card-body container-fluid d-flex justify-content-between align-items-center">
          <div className="card-title">
            <h2>personal information</h2>
          </div>
          <div
            className="container d-flex justify-content-end align-items-center "
            style={{ width: "20%", marginRight: "1rem" }}
          >
            <FontAwesomeIcon
              icon={faPenFancy}
              onClick={handleEditPersonalData}
            />

            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={handleCancelUpdatePersonalData}
              color="blue"
              size="2x"
            />

            <FontAwesomeIcon
              icon={faCheckCircle}
              color="green"
              size="2x"
              onClick={handleUpdatePersonalData}
            />
          </div>
        </div>
        <div className="container-fluid d-flex justify-content-center">
          {profileImage ? (
            <div
              className="d-flex justify-content-center align-items-center card"
              style={{
                backgroundColor: "#000",
                width: "20%",
              }}
              onMouseEnter={handleToggleLabel}
              onMouseLeave={handleMouseLeaveOnProfileContainer}
            >
              <Image
                src={profileImage}
                alt="profile image"
                width="100%"
                className="card-img"
              />
              <form style={{ display: "none" }}>
                <Input
                  type="file"
                  accept="image/*"
                  id="image"
                  opacity="0"
                  value={file}
                  onChange={handleUploadImage}
                  name="file"
                />
              </form>
              {displayLabel && (
                <label
                  htmlFor="image"
                  style={{
                    zIndex: 4,
                    position: "absolute",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    color="#fff"
                    cursor="pointer"
                    size="2x"
                  />
                </label>
              )}
            </div>
          ) : (
            <div
              className=""
              style={{
                backgroundColor: "blue",
                width: "15%",
                height: "20vh",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onMouseEnter={handleToggleLabel}
              onMouseLeave={handleMouseLeaveOnProfileContainer}
            >
              {firstName && showAppreviation && (
                <h5
                  className="card-text"
                  style={{
                    color: "#fff",
                    fontSize: "3rem",
                    opacity: showAppreviation ? 1 : 0.3,
                  }}
                >
                  {`${firstName[0].toLocaleUpperCase()} ${lastName[0].toLocaleUpperCase()}`}
                </h5>
              )}
              <form style={{ display: "none" }}>
                <Input
                  type="file"
                  accept="image/*"
                  id="image"
                  opacity="0"
                  value={file}
                  onChange={handleUploadImage}
                  name="file"
                />
              </form>
              {displayLabel && (
                <label htmlFor="image">
                  <FontAwesomeIcon
                    icon={faCamera}
                    color="#fff"
                    cursor="pointer"
                    size="2x"
                  />
                </label>
              )}
            </div>
          )}
        </div>
        <br />
        <br />
        <div className="container">
          <div className="form-group">
            <label>First Name</label>
            <Input
              width="40%"
              type="text"
              name="firstname"
              value={firstName}
              placeholder="henry"
              onChange={(e) => setfirstName(e.target.value)}
              className="form-control"
              readOnly={handleDisplay}
            />
            <br />
            <label>Last Name</label>
            <Input
              width="40%"
              type="text"
              name="lastname"
              value={lastName}
              placeholder="williams"
              onChange={(e) => setlastName(e.target.value)}
              className="form-control"
              readOnly={handleDisplay}
            />
          </div>
          <hr />

          <div className="form-group">
            <label>Email</label>
            <Input
              width="60%"
              type="email"
              name="email"
              value={email}
              placeholder="youremail@gmail.com"
              onChange={(e) => setemail(e.target.value)}
              className="form-control"
              readOnly={handleDisplay}
            />
            <br />

            <label>Number</label>
            <Input
              width="60%"
              type="number"
              name="phone"
              value={phone}
              placeholder="12345678901"
              onChange={(e) => setphone(e.target.value)}
              className="form-control"
              readOnly={handleDisplay}
            />
            <br />
          </div>
          <hr />

          <div className="form-group">
            <label>Address</label>
            <Input
              width="80%"
              type="text"
              name="address"
              value={address}
              placeholder="address"
              onChange={(e) => setaddress(e.target.value)}
              className="form-control"
              readOnly={handleDisplay}
            />
            <br />
            <label>City</label>
            <Input
              width="80%"
              type="text"
              name="city"
              value={city}
              placeholder="city"
              onChange={(e) => setcity(e.target.value)}
              className="form-control"
              readOnly={handleDisplay}
            />
            <br />
            <label>State</label>
            <Input
              width="80%"
              type="text"
              name="state"
              value={state}
              placeholder="state"
              onChange={(e) => setstate(e.target.value)}
              className="form-control"
              readOnly={handleDisplay}
            />{" "}
          </div>
          <div className="form-group">
            <div className="card-body">
              <h3 className="card-title">Total Post</h3>
              <span
                className="card-text"
                style={{
                  backgroundColor: "#ccc",
                  borderRadius: "10px",
                  padding: "10px",
                  opacity: "0.6",
                }}
              >
                {posts}
              </span>
            </div>
            <div className="card-body">
              <h3 className="card-title">Your Registered Ip Address</h3>
              <br />
              <span
                className="card-text"
                style={{
                  backgroundColor: "#ccc",
                  borderRadius: "10px",
                  padding: "10px",
                  opacity: "0.6",
                }}
              >
                {clientLoggedInIpAddress}
              </span>
            </div>
            {/*

            
            
            <Input
              width="40%"
              type="email"
              name="firstname"
              value={email}
              placeholder="youremail@gmail.com"
              onChange={(e) => setemail(e.target.value)}
              className="form-control"
              readOnly={handleDisplay}
            /> */}
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default ProfilePersonalData;