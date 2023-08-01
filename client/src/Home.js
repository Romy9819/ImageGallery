import React, {useState} from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./Home.css"

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("image", selectedFile);
    formData.append("title", title);
    formData.append("description", description)

    try {
      const response = await axios.post('/images', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus(response.data.message);
      setSelectedFile(null);
      setTitle("");
      setDescription("");
    }
    catch (error) {
      setUploadStatus("Error uploading image.");
      console.error(error);
    }
  }

  return (
    <>
      <Navbar/>
      <div className="parentContainer">
        <div className="UploadContainer">
          {/* Your existing content inside the UploadContainer */}
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])}/>
          <input placeholder="Title" type="text" onChange={(e) => setTitle(e.target.value)}/>
          <input placeholder="Description" type="text" onChange={(e) => setDescription(e.target.value)}/>
          <button onClick={handleUpload}>Upload</button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      </div>
    </>
  );
};

export default Home;
