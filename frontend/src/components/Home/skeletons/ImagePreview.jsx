import React, { useState } from 'react';

const ImagePreview = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {/* <h2>Property Images</h2> */}
      <div
        className='flex flex-wrap gap-4 justify-center items-center'
      >
        {/* Render Thumbnails */}
        {images.map((image, index) => (
          <div
            key={index}
            className='cursor-pointer border border-gray-400 overflow-hidden rounded-lg w-[350px] h-[200px]'
      
            onClick={() => handleThumbnailClick(image)}
          >
            <img
              src={image}
              alt={`Property ${index + 1}`}
              className='w-full h-full object-cover'
            
            />
          </div>
        ))}
      </div>

      {/* Full-Size Preview Modal */}
      {selectedImage && (
        <div
        className='fixed top-2 left-0 w-full h-full bg-black  z-50 flex flex-col lg:flex-row gap-4 overflow-y-auto lg:overflow-y-hidden'
        
        >
          <div style={{ position: "relative" }} className='flex justify-start'>
            <img
              src={selectedImage}
              alt="Full Size Preview"
              className='w-full lg:w-[800px] h-[600px] lg:h-[800px] rounded-lg'
              // style={{
              //   maxWidth: "90%",
              //   maxHeight: "90%",
              //   borderRadius: "8px",
              // }}
            />
            <button
              onClick={handleClosePreview}
              className='absolute top-0 right-0 bg-red-500 text-white rounded-full font-bold cursor-pointer h-[30px] w-[30px]'
            >
              &times;
            </button>
          </div>
          <div
        className='flex flex-wrap gap-4 justify-center items-center'
      >
        {/* Render Thumbnails */}
        <div className='grid grid-cols-2 gap-4 py-10'>
        {images.map((image, index) => (
          <div
            key={index}
            className='cursor-pointer border border-gray-400 overflow-hidden rounded-lg w-[150px] h-[150px] md:w-[300px] md:h-[300px] lg:w-[150px] lg:h-[150px]'
      
            onClick={() => handleThumbnailClick(image)}
          >
            <img
              src={image}
              alt={`Property ${index + 1}`}
              className='w-full h-full object-cover'
            
            />
          </div>
        ))}
        </div>
      </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
