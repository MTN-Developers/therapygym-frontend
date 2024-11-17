/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { Select } from "antd";
//@ts-ignore
import { useCountries } from "use-react-countries";
import { Controller } from "react-hook-form";

const CountrySelect = ({
  control,
  name,
  error,
}: {
  control: any;
  name: string;
  error: string;
}) => {
  const { countries } = useCountries();

  return (
    <div className="max-w-[364px] w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            className="max-w-[364px] w-full"
            showSearch
            allowClear
            value={field.value}
            onChange={(value) => field.onChange(value)}
            placeholder="Select Country"
            optionFilterProp="labelText"
            filterOption={(input, option) =>
              option?.labelText?.toLowerCase().includes(input.toLowerCase())
            }
            options={countries.map((country: any) => ({
              value: country.name, // Use country name as value
              labelText: country.name,
              label: (
                <div className="flex items-center">
                  <img
                    src={country.flags.png}
                    alt={country.name}
                    className="mx-2"
                    width={20}
                  />
                  {country.name}
                </div>
              ),
            }))}
          />
        )}
      />
      {error && <p className="text-red-500 text-[14px]">{error}</p>}
    </div>
  );
};

export default CountrySelect;
