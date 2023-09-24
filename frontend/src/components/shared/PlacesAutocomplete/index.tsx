/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, useEffect, useState, useCallback } from "react";

import { Autocomplete, TextField } from "@mui/material";
import debounce from "lodash/debounce";

import { getPredictions, getQueryPredictions } from "./utils";

interface Props {
  size?: "small" | "medium" | undefined;
  name: string;
  value: string;
  onChange: Function;
}

const PlacesAutocomplete = (
  { size, name, value, onChange }: Props,
  ref: any
) => {
  const [active, setActive] = useState(false);
  const [predictions, setPredictions] = useState<any>(null);
  const [placeValue, setPlaceValue] = useState<any>(null);

  const handleFetchAddress = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!active) {
      setActive(true);
    }
    if (e.target.value) {
      const res = await getPredictions(e.target.value);
      setPredictions(res?.reverse() ?? []);
    } else {
      setPredictions([]);
    }
  };

  const handleFetchAddressDebounce = useCallback(
    debounce(handleFetchAddress, 300),
    []
  );

  const handleAddressChange = (e: any, value: any) => {
    onChange(value.description);
    setActive(false);
  };

  useEffect(() => {
    const initialize = async () => {
      if (value) {
        const query = await getQueryPredictions(value);
        setPlaceValue(query?.[0]);
      }
    };

    initialize();
  }, [value]);

  return (
    <Autocomplete
      open={active}
      freeSolo
      disableClearable
      options={predictions || []}
      onChange={handleAddressChange}
      getOptionLabel={(d) => d.description}
      filterOptions={(arr) => arr}
      value={placeValue ?? null}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          size={size}
          label="Location"
          sx={{ fontSize: 12 }}
          onChange={handleFetchAddressDebounce}
          onClick={() => setActive(true)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        />
      )}
    />
  );
};

export default forwardRef(PlacesAutocomplete);
