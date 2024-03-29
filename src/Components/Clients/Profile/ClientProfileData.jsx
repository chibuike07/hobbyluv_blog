import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../Context_files/UserContext";
import ClientProfileDataStyles from "../../../Styles/Clients/ClientProfileData.module.css";
import Input from "../../../Common/Input.component/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
  faCamera,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

import Image from "../../../Common/Image.component/Image";
import {
  handleEditPersonalData,
  handleCancelUpdatePersonalData,
  handleUpdatePersonalData,
  handleToggleLabel,
  handleMouseLeaveOnProfileContainer,
  handleUploadImage,
  setDataToState,
} from "../util/ClientProfileData";

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
  const {
    container,
    card,
    cardTitle,
    iconWrapper,
    img,
    imgWrapper,
    label,
    dummyImg,
    loggedInIp,
  } = ClientProfileDataStyles;
  useEffect(() => {
    //setting the default user data to the fields on mount

    setDataToState({
      personalData,
      setfirstName,
      setlastName,
      setemail,
      setphone,
      setclientLoggedInIpAddress,
      setaddress,
      setposts,
      setcity,
      setstate,
      setprofileImage,
    });

    return [setDataToState];
  }, [personalData, REACT_APP_ENDPOINT]);

  return (
    <div className={`${container}`}>
      <div className={`card $${card}`}>
        <div className="card-body container-fluid d-flex justify-content-between align-items-center">
          <div className={cardTitle}>
            <h2 className="card-title">personal information</h2>
          </div>
          <div className={`${iconWrapper}`}>
            <FontAwesomeIcon
              cursor="pointer"
              title="Edit"
              icon={faUserEdit}
              color="rgb(48, 187, 181)"
              onClick={() => handleEditPersonalData({ sethandleDisplay })}
            />

            <FontAwesomeIcon
              cursor="pointer"
              title="Cancel"
              icon={faTimesCircle}
              onClick={() =>
                handleCancelUpdatePersonalData({
                  personalData,
                  setfirstName,
                  setlastName,
                  setemail,
                  sethandleDisplay,
                })
              }
              color="rgb(48, 187, 181)"
              size="2x"
            />

            <FontAwesomeIcon
              cursor="pointer"
              title="Update"
              icon={faCheckCircle}
              color="rgb(48, 187, 181)"
              size="2x"
              onClick={() =>
                handleUpdatePersonalData({
                  address,
                  city,
                  state,
                  firstName,
                  lastName,
                  email,
                  phone,
                  sethandleDisplay,
                })
              }
            />
          </div>
        </div>
        <div className="container-fluid d-flex justify-content-center">
          {profileImage ? (
            <div
              className={` card d-flex justify-content-center align-items-center ${imgWrapper}`}
              onMouseEnter={() =>
                handleToggleLabel({ setDisplayLabel, setShowAppreviation })
              }
              onMouseLeave={() =>
                handleMouseLeaveOnProfileContainer({
                  setDisplayLabel,
                  setShowAppreviation,
                })
              }
            >
              <Image
                src={profileImage}
                alt="profile image"
                className={`card-img ${img}`}
              />
              <form style={{ display: "none" }}>
                <Input
                  type="file"
                  accept="image/*"
                  id="image"
                  opacity="0"
                  value={file}
                  onChange={(e) => handleUploadImage({ e, setstate, setFile })}
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
                  className={label}
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
              className={dummyImg}
              onMouseEnter={() =>
                handleToggleLabel({ setDisplayLabel, setShowAppreviation })
              }
              onMouseLeave={() =>
                handleMouseLeaveOnProfileContainer({
                  setDisplayLabel,
                  setShowAppreviation,
                })
              }
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
                  onChange={(e) => handleUploadImage({ e, setstate, setFile })}
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
              type="text"
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
            />
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
              <h3 className="card-title">Your loggedin Ip Address</h3>
              <br />
              <span className={`card-text ${loggedInIp}`}>
                {clientLoggedInIpAddress}
              </span>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default ProfilePersonalData;
