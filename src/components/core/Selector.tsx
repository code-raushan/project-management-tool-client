// SelectEditor.js
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectEditorProps = {
  getValue: () => string;
  onChange: (event: { target: { value: string } }) => void;
};

const options = [
  { value: "Scheduled", label: "Scheduled" },
  { value: "Not Scheduled", label: "Not Scheduled" },
];

const SelectEditor: React.FC<SelectEditorProps> = ({ getValue, onChange }) => {
  const handleChange = (value: string) => {
    onChange({ target: { value } });
  };

  return (
    <Select value={getValue()} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectEditor;
