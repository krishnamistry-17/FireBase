import React, { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
// import { signInWithPhoneNumber } from "firebase/auth";
import { db } from "../Config/firebase";
import { setDoc, doc } from "firebase/firestore";

const Phone = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  // Handle the phone number submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!number) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      const userRef = doc(db, "newusers");
      await setDoc(userRef, {
        phoneNumber: number,
      });

      console.log("Phone number saved to Firestore!");
      alert("Phone number saved successfully!");

      setNumber("");
    } catch (err) {
      console.error("Error saving phone number:", err);
      setError("Failed to save the phone number.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-[60px]">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-[380px]">
        <div className="px-[25px]">
          <h2 className="text-[25px] text-black font-bold mb-[24px] text-center pt-[20px]">
            Store Phone Number
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border w-full border-black rounded-md p-[10px]"
            />
            {/* <ReCAPTCHA
              sitekey="6LdrEicrAAAAAF4lZqPN7ZT6E3BIIpLoDzNnm8wv"
              onChange={setNumber}
            /> */}
            <div className="flex justify-center items-center mt-[20px]">
              <button
                className="w-[180px] py-[8px] px-[16px] text-white bg-blue-500 rounded-md mb-[20px] hover:bg-blue-600 focus:outline-none"
                type="submit"
              >
                Save Phone Number
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Phone;
