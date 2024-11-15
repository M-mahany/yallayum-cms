import React, { useEffect, useState } from "react";
import { RadioGroup, Radio, Button, Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { FaMinusCircle } from "react-icons/fa";

const RadioOptions = ({
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
  const [selected, setSelected] = React.useState(null);

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      const updatedOptions = options.map((option) => ({
        ...option,
        isCorrect: option.name == selected,
      }));

      updatedOptions.push({
        name: newOption.trim(),
        isCorrect: false,
      });

      setOptions(updatedOptions);
      setNewOption("");
    }
  };

  const checkRadio = () => {
    const updatedOptions = options.map((option) => ({
      ...option,
      isCorrect: option.name == selected ? true : false,
    }));

    setOptions(updatedOptions);
  };

  useEffect(() => {
    checkRadio();
  }, [selected]);

  // Determine if the button should be disabled
  const isButtonDisabled = newOption.trim() === "";

  const handleDeleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };
  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: isRequired }}
        render={({ field }) => (
          <RadioGroup
            {...field}
            defaultValue={defaultValue}
            onValueChange={setSelected}
          >
            {options.map((option, index) => (
              <div key={index} className="flex items-center">
                <Radio key={index} value={option.name}>
                  {option.name}
                </Radio>
                <FaMinusCircle
                  className="ml-2 text-red-500 text-lg cursor-pointer"
                  onClick={() => handleDeleteOption(index)}
                />
              </div>
            ))}
          </RadioGroup>
        )}
      />

      <div className="flex items-end gap-4 mt-4">
        <Input
          placeholder="Enter option name"
          variant="bordered"
          color={"#00000"}
          size="lg"
          radius="md"
          defaultValue={defaultValue}
          value={newOption}
          classNames={{
            inputWrapper: [
              "bordered",
              "border-1",
              "border-[#EBEBEB]",
              "hover:border-[#3F7FAE]",
              "custom-input-design",
            ],
          }}
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
      </div>
    </div>
  );
};

export default RadioOptions;
