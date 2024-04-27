import React from 'react'

function TimeAndLocation() {
  return (
    <div>
        <div className="flex items-center justify-center my-6">
            <p className="text-white text-xl font-extralight">
                Monday, April 29 | 10:05 AM
            </p>
        </div>
        <div className="flex items-center justify-center my-3">
            <p className="text-white text-3xl font-medium">
                Philadelphia, PA
            </p>
        </div>
    </div>
  );
}

export default TimeAndLocation;