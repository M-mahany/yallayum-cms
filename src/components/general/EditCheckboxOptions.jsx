import React, { useEffect, useState } from "react";
import { CheckboxGroup, Checkbox, Button, Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { FaMinusCircle } from "react-icons/fa";

const EditCheckboxOptions = ({
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

  useEffect(() => {
    const initiallySelected = options.filter((option) => option.isCorrect);

    const initiallySelectedNames = initiallySelected.map(
      (option) => option.name
    );

    setSelected(initiallySelectedNames);
  }, []);

  const handleAddOption = () => {
    const updatedOptions = [];

    for (let index = 0; index < options.length; index++) {
      updatedOptions.push({
        name: options[index].name,
        isCorrect: selected.includes(options[index].name),
      });
    }

    if (newOption != "") {
      updatedOptions.push({
        name: newOption,
        isCorrect: selected.includes(newOption),
      });
    }

    setOptions(updatedOptions);

    setNewOption("");
  };

  const handleCheckboxChange = (value) => {
    const updatedOptions = [];

    for (let index = 0; index < options.length; index++) {
      updatedOptions.push({
        name: options[index].name,
        isCorrect: value.includes(options[index].name),
      });
    }

    setOptions(updatedOptions);
    setSelected(value);

    setNewOption("");
  };

  const [correctOption, setCorrectOption] = useState([]);

  useEffect(() => {
    const correctOptionss = options.filter((option) => option.isCorrect);
    setCorrectOption(correctOptionss.map((option) => option.name));
  }, [options]);

  const isButtonDisabled = newOption.trim() === "";

  const handleDeleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };
  return (
    correctOption && (
      <div>
        <Controller
          control={control}
          name={name}
          defaultValue={selected}
          render={({ field }) => (
            <CheckboxGroup
              {...field}
              value={selected}
              onChange={handleCheckboxChange}
            >
              {options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <Checkbox key={index} value={option.name}>
                    {option.name}
                  </Checkbox>
                  <FaMinusCircle
                    className="ml-2 text-red-500 text-lg cursor-pointer"
                    onClick={() => handleDeleteOption(index)}
                  />
                </div>
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
    )
  );
};

export default EditCheckboxOptions;
