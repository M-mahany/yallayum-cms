import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { Checkbox } from "@nextui-org/react";

const InputField = ({
  type,
  isInvalid,
  label,
  placeholder,
  errortext,
  isRequired,
  options,
  register,
  name,
  defaultValue,
  disabled = false,
  setValue = () => {},
  errors,
  value,
  emailTrue = false,
  text = ["active", "inactive"],
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="field-wrapper">
        <label className="text-[#8F8F8F] text-sm font-medium px-2 capitalize relative z-0">
          {label}
          {isRequired && <span className="text-red-700"> *</span>}
        </label>
        <div className="field-container mt-2">
          {type === "select" ? (
            <Select
              variant="bordered"
              label={placeholder}
              required={isRequired}
              options={options}
              isInvalid={isInvalid}
              defaultSelectedKeys={[String(defaultValue)]}
              isDisabled={disabled}
              size="lg"
              radius="md"
              aria-label={label || placeholder}
              color={disabled ? "primary" : "#8F8F8F"}
              {...register(name)}
              classNames={{
                inputWrapper: [
                  "bordered",
                  "border-1",
                  "relative",
                  "z-0",
                  "border-black",
                  "hover:border-[#3F7FAE]",
                  "custom-input-design",
                ],
              }}
            >
              {options.map((item, key) => (
                <SelectItem key={item.id ? item.id : item} value={item.id}>
                  {emailTrue
                    ? item?.email
                    : item.name
                    ? item.name
                    : item
                    ? text[0]
                    : text[1]}
                </SelectItem>
              ))}
            </Select>
          ) : type === "Checkbox" ? (
            <Checkbox
              defaultSelected={defaultValue}
              required={isRequired}
              variant="bordered"
              placeholder={placeholder}
              isInvalid={isInvalid}
              errorMessage={errortext}
              size="lg"
              radius="md"
              aria-label={label || placeholder}
              labelPlaceholder="Secondary"
              color={isInvalid ? "#00000" : "#8F8F8F"}
              {...register(name, { required: isRequired ? true : false })}
            >
              yes
            </Checkbox>
          ) : type === "textarea" ? (
            <Textarea
              type={isVisible ? "text" : type}
              required={isRequired}
              variant="bordered"
              placeholder={placeholder}
              isInvalid={isInvalid}
              errorMessage={errortext}
              size="lg"
              radius="md"
              aria-label={label || placeholder}
              labelPlaceholder="Secondary"
              defaultValue={defaultValue}
              value={value}
              onValueChange={setValue}
              color={isInvalid ? "#00000" : "#8F8F8F"}
              {...register(name, { required: isRequired ? true : false })}
              classNames={{
                inputWrapper: [
                  "bordered",
                  "border-1",
                  "border-[#EBEBEB]",
                  "hover:border-[#3F7FAE]",
                  "custom-input-design",
                ],
              }}
            />
          ) : (
            <Input
              type={isVisible ? "text" : type}
              required={isRequired}
              variant="bordered"
              placeholder={placeholder}
              isInvalid={isInvalid}
              errorMessage={errortext}
              size="lg"
              radius="md"
              aria-label={label || placeholder}
              labelPlaceholder="Secondary"
              defaultValue={defaultValue}
              value={value}
              onValueChange={setValue}
              color={isInvalid ? "#00000" : "#8F8F8F"}
              {...register(name, { required: isRequired ? true : false })}
              endContent={
                type === "password" && (
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                )
              }
              classNames={{
                inputWrapper: [
                  "bordered",
                  "border-1",
                  "border-[#EBEBEB]",
                  "hover:border-[#3F7FAE]",
                  "custom-input-design",
                ],
              }}
            />
          )}
          {/* {error && <p className="text-sm text-red-800 p-2">{error}</p>} */}
          {errors && errors[name] && (
            <p className="text-tiny text-danger pl-3 mt-1">
              {errortext ? errortext : errors[name].message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default InputField;
