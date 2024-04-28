import React from "react";
import { formatToLocalTime } from "@component/app/services/weatherService";

function TimeAndLocation() {
    return (
      <div>
        <div className="flex items-center justify-center my-6">
          <p className="text-white text-xl font-extralight">
            Monday 10 am
          </p>
        </div>
  
        <div className="flex items-center justify-center my-3">
          <p className="text-white text-3xl font-medium">Philadephia, PA</p>
        </div>
      </div>
    );
  }

export default TimeAndLocation;