import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";

export default function SelectInputs() {
  // 1. Manage state for Select
  const [singleValue, setSingleValue] = useState("");
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];

  const [selectedValues, setSelectedValues] = useState<string[]>(["1", "3"]);
  const multiOptions = [
    { value: "1", text: "Option 1" },
    { value: "2", text: "Option 2" },
    { value: "3", text: "Option 3" },
    { value: "4", text: "Option 4" },
    { value: "5", text: "Option 5" },
  ];

  const handleSingleChange = (e: any) => {
    setSingleValue(e.target.value);
  };

  const handleMultiChange = (e: any) => {
    setSelectedValues(e.target.value);
  };

  return (
    <ComponentCard title="Select Inputs">
      <div className="space-y-6">
        <div>
          <Label>Select Input</Label>
          <Select
            name="demo-single-select"
            value={singleValue}
            options={options}
            placeholder="Select Option"
            onChange={handleSingleChange}
            onBlur={() => {}}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <MultiSelect
            label="Multiple Select Options"
            name="demo-multi-select"
            options={multiOptions}
            value={selectedValues}
            onChange={handleMultiChange}
            onBlur={() => {}}
          />
          <p className="sr-only">
            Selected Values: {selectedValues.join(", ")}
          </p>
        </div>
      </div>
    </ComponentCard>
  );
}
