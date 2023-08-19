import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Checkbox, Button, Select } from "antd";

import { Link, useNavigate } from "react-router-dom";
const { Option } = Select;

const RegisterUser = () => {
  const navigate = useNavigate();
  const [allSectors, setAllSectors] = useState([]);
  const [name, setName] = useState("");
  const [sectors, setSectors] = useState("");
  const [agreement, setAgreement] = useState(Boolean);
  const [slug, setSlug] = useState("");

  //get all categories:
  const getAllSectors = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/sector/all-sector`
      );
      setAllSectors(data?.sectors);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting All Categories");
    }
  };

  useEffect(() => {
    getAllSectors();
  }, []);

  //handleSubmit:
  const handleSubmit = async () => {
    try {
      if (!name || !sectors || !agreement == true) {
        return toast.error("Please provide all the value");
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/create-user`,
        { name, sectors, agreement }
      );
      if (data?.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setName(data?.user?.name);
        setSectors(data?.user?.sectors);
        setAgreement(data?.user?.agreement);
        setSlug(data?.user?.slug);
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section id="user" className="zahurul">
      <div className="wrapper">
        <h2>
          Please enter your name and pick the Sectors you are currently involved
          in
        </h2>
        <div className="content-container">
          <div className="user-form">
            <div className="name">
              <p>Name : </p>
              <input
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="sectors">
              <p>Sectors : </p>{" "}
              <Select
                bordered={false}
                placeholder="Select a sector"
                size="large"
                className="form-select mb-3"
                style={{ width: "85%" }}
                onChange={(value) => {
                  setSectors(value);
                }}
              >
                {allSectors.map((c) => (
                  <Option key={c._id} value={c.name}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="checked">
              <Checkbox onChange={(e) => setAgreement(e.target.checked)}>
                Agree to terms
              </Checkbox>
            </div>
            <div className="save">
              <button className="save-btn" onClick={handleSubmit}>
                save
              </button>
            </div>
            <div className="update-link">
              <Link to={`/update-user/:${slug}`} className="link">
                Edit user ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterUser;
