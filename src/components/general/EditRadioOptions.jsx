import React, { useEffect, useState } from "react";
import { RadioGroup, Radio, Button, Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { FaMinusCircle } from "react-icons/fa";

const EditRadioOptions = ({
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

  const checkRadio = (checkOption) => {
    const updatedOptions = options.map((option) => ({
      ...option,
      isCorrect: option.name == checkOption ? true : false,
    }));

    setOptions(updatedOptions);
  };
  const [correctOption, setCorrectOption] = useState("");

  useEffect(() => {
    checkRadio(selected);
  }, [selected]);

  useEffect(() => {
    checkRadio(correctOption);
  }, [correctOption]);

  //find correct options start

  useEffect(() => {
    for (const option of options) {
      if (option.isCorrect) {
        setCorrectOption(option.name);
        break;
      }
    }
  }, [options]);

  //find correct options end

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
          render={({ field }) => (
            <RadioGroup
              {...field}
              defaultValue={correctOption}
              onValueChange={setSelected}
            >
              {options.map((option, index) => (
                <div key={index} className="w-full grid grid-cols-5  bg-gray-100 px-2 py-2 rounded-sm">
                  <div className="col-span-4">
                    <Radio
                      value={option.name}
                      className="flex items-center w-[80%]"
                    >
                      {option.name}
                    </Radio>
                  </div>
                  <div className="w-{20%} flex justify-end">
                    <FaMinusCircle
                      className="ml-2 text-red-500 text-lg cursor-pointer "
                      onClick={() => handleDeleteOption(index)}
                    />
                  </div>
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
    )
  );
};

export default EditRadioOptions;
