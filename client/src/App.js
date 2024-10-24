import React, { useState } from "react";
import BottomPanel from "./components/BottomPanel";
import TreeFlow from "./components/TreeFlow";
import axios from "axios";
import LandingAnimation from "./components/LandingAnimations";


const API_ENDPOINT = process.env.REACT_APP_MODE === 'development'
  ? "http://localhost:3000/"
  : "http://quillall-aws-env.eba-3mdctcb2.eu-north-1.elasticbeanstalk.com/";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const updateBranchContent = async () => {
    try {
      const res = await axios.post(`${API_ENDPOINT}api/update_content`, {
        content: inputValue,
      });
      setResponse(res.data.answer);
      setInputValue(""); // Clear input after sending it to the API
      setUpdateTrigger((prev) => !prev); // Trigger the update in TreeFlow
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  return (
    <div>
      <LandingAnimation />
      <BottomPanel
        inputValue={inputValue}
        setInputValue={setInputValue}
        updateBranchContent={updateBranchContent}
      />
      <TreeFlow inputValue={response} updateTrigger={updateTrigger} />
      {response && <div className="response">{response}</div>}
    </div>
  );
};

export default App;
