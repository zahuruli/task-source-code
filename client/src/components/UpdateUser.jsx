import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Checkbox, Button, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateUser = () => {
  const params = useParams();

  const navigate = useNavigate();
  const [allSectors, setAllSectors] = useState([]);
  const [name, setName] = useState("");
  const [sectors, setSectors] = useState("");
  const [agreement, setAgreement] = useState(Boolean);
  const [id, setId] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const parseData = JSON.parse(data);
      console.log(parseData);
      setName(parseData.name);
      setSectors(parseData.sectors);
      setId(parseData._id);
      setSlug(parseData.slug);
    }
  }, []);

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

  //handle update Submit:
  const handleUpdate = async () => {
    try {
      if (!name || !sectors || !agreement == true) {
        return toast.error("Please provide all the value");
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/update-user/${id}`,
        { name, sectors, agreement }
      );
      if (data?.success) {
        localStorage.setItem("user", JSON.stringify(data?.updateUser));
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handleClear:
  const handleClear = () => {
    localStorage.removeItem("user");
    setName("");
    setSectors("");
  };
  return (
    <section id="update" className="zahurul">
      <div className="wrapper">
        <h2>UPDATE USER</h2>
        <div className="content-container">
          <div className="user-form">
            <div className="name">
              <p>Name : </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="sectors">
              <p>Sectors : </p>{" "}
              <Select
                defaultValue={sectors}
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
              <button className="save-btn" onClick={handleUpdate}>
                Update user
              </button>
              <button className="save-btn" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateUser;
