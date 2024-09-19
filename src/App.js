import "./App.css";
import React, { useState } from "react";
import Airdropimg from "../src/assests/Airdrop.svg";
import debateimg from "../src/assests/Debate.svg";
import NFTimg from "../src/assests/NFT.svg";
import Albumimg from "../src/assests/album.svg";
import Audioimg from "../src/assests/audio.svg";
import crossimg from "../src/assests/crossimg.svg"
import leftimg from '../src/assests/leftarrow.svg'
import rightimg from '../src/assests/rightarrow.svg'
import { Button, Input, Select, Typography } from "antd";
import { ArrowLeftOutlined,ArrowRightOutlined  } from "@ant-design/icons";
import "antd/dist/reset.css";
import TextArea from "antd/es/input/TextArea";
const { Text } = Typography;
const { Option } = Select;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const maxLength = 1000;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (
      value.length <=
      maxLength + Math.abs(value.length - inputValue.length)
    ) {
      setInputValue(value);
    }
  };

  const lengthDifference = inputValue.length - maxLength;
  const isExceeded = lengthDifference > 0;
  const buttonStyle = inputValue.trim()
    ? "bg-black text-white "
    : "bg-gray-500 text-black";
  const textAreaStyle = isExceeded
    ? "text-red-500 border-red-500"
    : "text-black border-gray-300";

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

 

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files.map(file => URL.createObjectURL(file)));
    setCurrentImageIndex(0); 
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  const removeImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    if (indexToRemove === currentImageIndex && selectedImages.length > 1) {
      setCurrentImageIndex(0); 
    }
  };
 
  return (
    <main className="flex justify-center items-center bg-[#f0f0f0] h-screen">
      <div className="p-4 bg-white rounded-lg  shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-3">
          <h5 className="text-lg font-bold">Create new post</h5>
          
          <button  className="text-gray-500 bg-[rgb(247,244,244)] hover:brightness-50  rounded-full">
            <img src={crossimg} alt="cross" />
          </button>
        </div>
        <div className="my-3"
        >
          <TextArea
            placeholder="Any new idea?"
            value={inputValue}
            onChange={handleInputChange}
            maxLength={maxLength + 1000}
            rows={4}
            className={`border-0 p-2 ${textAreaStyle}`}
          />
        </div>

        <div className="my-4">
          {selectedImages.length > 0 && (
            <div className="relative w-full h-64 bg-gray-100 rounded-lg">
              <img
                src={selectedImages[currentImageIndex]}
                alt={`selected-img-${currentImageIndex}`}
                className="w-full h-full object-cover rounded-lg"
              />
              
              <button
                className="absolute rounded-full left-3 top-1/2  -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
                onClick={goToPreviousImage}
              >
              <img className="hover:brightness-75" src={leftimg} alt="" />
              </button>
              
              <button
                className="absolute rounded-full right-3 top-1/2   -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
                onClick={goToNextImage}
              >
                 <img className="hover:brightness-75" src={rightimg} alt="" />
              </button>
        
              <button
                className="absolute top-2 right-2 rounded-full p-1 hover:brightness-50 shadow-lg "
                onClick={() => removeImage(currentImageIndex)}
              >
              
            <img src={crossimg} alt="" />
          
              </button>
            </div>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageUpload"
          />
        </div>


        <footer className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button className="border-0" onClick={showModal}>
              <img src={debateimg} className="w-6 h-6 hover:brightness-75 transition duration-300" alt="debate" />
            </Button>
            <Button className="border-0">
              <img src={Airdropimg} className="w-6 h-6 hover:brightness-75 transition duration-300" alt="airdrop" />
            </Button>
            <Button className="border-0">
              <img src={NFTimg} className="w-6 h-6 hover:brightness-75 transition duration-300" alt="NFT" />
            </Button>
            <label
            htmlFor="imageUpload"
            className=" cursor-pointer mt-0.5"
          >
            <img src={Albumimg} className="w-7 h-7  hover:brightness-75 transition duration-300" alt="album" />
         
          </label>
            <Button className="border-0">
              <img src={Audioimg} className="w-6 h-6 hover:brightness-75 transition duration-300" alt="audio" />
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Text className="text-sm text-gray-600">
              {isExceeded
                ? `-${Math.abs(lengthDifference)}`
                : `${maxLength - inputValue.length}`}
            </Text>

            <Button
              type="primary"
              className={`px-4 py-2 rounded-full  ${buttonStyle}`}
              disabled={!inputValue.trim()}
            >
              Post
            </Button>
          </div>
        </footer>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleCloseModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <h2 className="font-bold text-lg">Start Debate</h2>
              </div>
            </div>

            <div className="space-y-4">
              <TextArea
                placeholder="Question"
                className="w-full h-12 border border-gray-300 p-2 rounded"
                rows={2}
              />
              <Input
                placeholder="Argument of the For side"
                className="w-full h-12 bg-gray-200 border border-gray-300 p-2 rounded"
              />
              <Input
                placeholder="Argument of the Against side"
                className="w-full h-12 bg-gray-200 border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <Text className="text-md font-semibold">Deadline</Text>
              <Select
                defaultValue="7 days"
          
                className="w-23 bg-transparent border-0"
                dropdownClassName="bg-gray-200"
              >
                <Option value="1 day">1 day</Option>
                <Option value="3 days">3 days</Option>
                <Option value="1 week">1 week</Option>
                <Option value="3 weeks">3 weeks</Option>
                <Option value="1 month">1 month</Option>
                <Option value="unlimited">Unlimited</Option>
              </Select>
            </div>

            <button
              className="w-full bg-black text-white py-2 rounded-lg mt-6"
              onClick={handleCloseModal}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
