import React from "react";
import { Slider } from "@mui/material";

interface TimeSliderProps {
  position: number;
  duration: number;
  handleSliderChange: (event: Event, value: number | number[]) => void;
}

const TimeSlider: React.FC<TimeSliderProps> = ({
  position,
  duration,
  handleSliderChange,
}) => (
  <Slider
    aria-label="time-indicator"
    size="small"
    value={position}
    min={0}
    max={duration}
    onChange={handleSliderChange}
    sx={{
      padding: 0,
      width: "100%",
      height: 4,
      "& .MuiSlider-thumb": {
        width: 8,
        height: 8,
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&.Mui-active": {
          width: 20,
          height: 20,
        },
      },
    }}
  />
);

export default TimeSlider;
