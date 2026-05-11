import * as React from "react";
import { options } from "@/lib/data";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  return (
    <div className="flex items-center w-40">
      <Combobox items={options} itemToStringValue={(option) => option.label}>
        <ComboboxInput placeholder="Thời gian" readOnly />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(option) => (
              <ComboboxItem
                key={option.value}
                value={option}
                onClick={() => {
                  setDateQuery(option.value);
                }}
              >
                {option.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default DateTimeFilter;
