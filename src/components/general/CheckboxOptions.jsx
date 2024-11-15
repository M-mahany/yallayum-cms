import React, { useEffect, useState } from "react";
import { CheckboxGroup, Checkbox, Button, Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";

const CheckboxOptions = ({
  defaultValue,
  name,
  errors,
  control,
  isRequired,
  errortext,
  setOptions,
  options,
}) => {
  const [newOption, setNewOption] = useState("");
  const [selected, setSelected] = useState([]);

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      const updatedOptions = [...options, { name: newOption.trim(), isCorrect: false }];
      setOptions(updatedOptions);
      setNewOption("");
    }
  };
  useEffect(() => {
    // Update the isCorrect property of options only when selected changes
    const updatedOptions = options.map((option) => ({
      ...option,
      isCorrect: selected.includes(option.name),
    }));
    setOptions(updatedOptions);
  }, [selected]); // Only run the effect when selected changes
  

  // Determine if the button should be disabled
  const isButtonDisabled = newOption.trim() === "";

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: isRequired }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <CheckboxGroup {...field} value={selected} onChange={setSelected}>
            {options.map((option, index) => (
              <Checkbox key={index} value={option.name}>
                {option.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      />
      <div className="flex items-end gap-4 mt-4">
        <Input
          placeholder="Enter option name"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
        />
        <Button
          onClick={handleAddOption}
          auto
          className={`w-full text-white text-sm font-medium py-6 border ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-themeBtn-0"
          } md:w-[20%]`}
          disabled={isButtonDisabled}
        >
          Add Option
        </Button>
        {errors && errors[name] && (
          <p className="text-tiny text-danger pl-3 mt-1">{errortext}</p>
        )}
      </div>
    </div>
  );
};

export default CheckboxOptions;
