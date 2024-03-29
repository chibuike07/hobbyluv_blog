import { useState, useContext, useEffect } from "react";
import UpdateClientProfileStyles from "../../Styles/AdminComponents/UpDateClientProfileModal.module.css";
import Input from "../../Common/Input.component/Input";
// import Button from "../../Common/Button.component/Button";
import ReactModal from "react-modal";
import { AdminContext } from "../../Context_files/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faPenFancy,
  faCheckCircle,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../../Common/Image.component/Image";
import {
  handleEditPersonalData,
  handleUpdatePersonalData,
  handleCancelUpdatePersonalData,
  handleToggleLabel,
  handleMouseLeaveOnProfileContainer,
  handleUploadImage,
  setDataToState,
} from "./utils/UpdateClientProfileModal";

ReactModal.setAppElement("#root");

const UpdateClientProfileMadal = ({ url, openModal, setModal }) => {
  const [{ specifiedUserData }] = useContext(AdminContext);

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
  const [ID, setId] = useState("");

  const { REACT_APP_ENDPOINT } = process.env;

  const { iconWrapper, imgWrapper, img, input } = UpdateClientProfileStyles;
  useEffect(() => {
    //setting the default user data to the fields on mount

    setDataToState({
      specifiedUserData,
      setfirstName,
      setlastName,
      setemail,
      setphone,
      setId,
      setclientLoggedInIpAddress,
      setaddress,
      setposts,
      setcity,
      setstate,
      setprofileImage,
    });

    return [setDataToState];
  }, [specifiedUserData, REACT_APP_ENDPOINT]);

  return (
    <ReactModal isOpen={openModal}>
      <div style={{ marginTop: "1rem" }}>
        <div>
          <div className="d-flex  align-items-center">
            <div className="card-title">
              <h2>personal information</h2>
            </div>
            <div className={iconWrapper}>
              <FontAwesomeIcon
                icon={faPenFancy}
                cursor="pointer"
                title="Edit"
                onClick={() => handleEditPersonalData({ sethandleDisplay })}
              />

              <FontAwesomeIcon
                icon={faTimesCircle}
                cursor="pointer"
                onClick={() =>
                  handleCancelUpdatePersonalData({
                    setfirstName,
                    setlastName,
                    setemail,
                    sethandleDisplay,
                    setModal,
                    specifiedUserData,
                  })
                }
                title="Cancel"
                color="blue"
                size="2x"
              />

              <FontAwesomeIcon
                icon={faCheckCircle}
                color="green"
                size="2x"
                title="Update"
                cursor="pointer"
                onClick={() =>
                  handleUpdatePersonalData({
                    address,
                    city,
                    state,
                    firstName,
                    lastName,
                    email,
                    phone,
                    ID,
                    sethandleDisplay,
                    setModal,
                  })
                }
              />
            </div>
          </div>
          <div className={`container-fluid`}>
            {profileImage ? (
              <div
                className={`d-flex justify-content-center align-items-center  ${imgWrapper}`}
                // onMouseEnter={() =>
                //   handleToggleLabel({ setDisplayLabel, setShowAppreviation })
                // }
                // onMouseLeave={() =>
                //   handleMouseLeaveOnProfileContainer({
                //     setDisplayLabel,
                //     setShowAppreviation,
                //   })
                // }
              >
                <Image
                  src={profileImage}
                  alt="profile image"
                  width="100%"
                  height="50vh"
                  className={`card-img ${img}`}
                />
                <form style={{ display: "none" }}>
                  <Input
                    type="file"
                    accept="image/*"
                    id="image"
                    opacity="0"
                    value={file}
                    onChange={(e) => handleUploadImage({ e, setFile })}
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
                    onChange={(e) => handleUploadImage({ e, setFile })}
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
                className={`form-control ${input}`}
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
                className={`form-control ${input}`}
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
                className={`form-control ${input}`}
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
                className={`form-control ${input}`}
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
                className={`form-control ${input}`}
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
                className={`form-control ${input}`}
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
                className={`form-control ${input}`}
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
      {/* </form> */}
    </ReactModal>
  );
};

export default UpdateClientProfileMadal;
