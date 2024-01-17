import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = () => {
  const [color, setColor] = useState('#ffffff'); // Initial color

  const handleChangeComplete = (newColor) => {
    setColor(newColor.hex);
  };

  return (
    <div>
      <h2>Color Picker</h2>
      <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
      <div style={{ marginTop: '20px' }}>
        Selected Color: <span style={{ color }}>{color}</span>
      </div>
    </div>
  );
};

export default ColorPicker;
