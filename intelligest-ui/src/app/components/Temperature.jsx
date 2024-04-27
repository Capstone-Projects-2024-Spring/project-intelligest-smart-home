import React from 'react'
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
  } from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from '@component/services/weatherService';

function Temperature() {
  return (
    <div>
        <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
            <p>Cloudy</p>
        </div>
        <div className="flex flex-row items-center justify-between text-white py-3">
            <img src="http://openweathermap.org/img/wn/01d@2xpng"
            alt=""
            className="w-20"
            />
            <p className="text-5xl"> 34°</p>
            <div className="flex flex-col space-y-2">
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTemperature size={18} className="mr-1"/>
                        Feeling:
                    <span className="font-medium ml-1">32°</span>
                </div>
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTear size={18} className="mr-1"/>
                        Humidity:
                    <span className="font-medium ml-1">65%</span>
                </div>
                <div className="flex font-light text-sm items-center justify-center">
                    <UilWind size={18} className="mr-1"/>
                        Wind:
                    <span className="font-medium ml-1">11 km/hr</span>
                </div>
            </div>
        </div>

        <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
            <UilSun />
            <p className="font-light">
            Rise:{" "}
            <span className="font-medium ml-1">
                {formatToLocalTime(sunrise, timezone, "hh:mm a")}
            </span>
            </p>
            <p className="font-light">|</p>

            <UilSunset />
            <p className="font-light">
            Set:{" "}
            <span className="font-medium ml-1">
                {formatToLocalTime(sunset, timezone, "hh:mm a")}
            </span>
            </p>
            <p className="font-light">|</p>

            <UilSun />
            <p className="font-light">
            High:{" "}
            <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
            </p>
            <p className="font-light">|</p>

            <UilSun />
            <p className="font-light">
            Low:{" "}
            <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
            </p>
        </div>

    </div>
  )
}

export default Temperature;