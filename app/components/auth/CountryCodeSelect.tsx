import React from "react";
import { Select } from "antd";
import { useCountries } from "use-react-countries";
import { Controller } from "react-hook-form";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";

const CountryCodeSelect = ({
  control,
  name,
  error,
  setValue,
}: // label,
{
  control: any;
  name: string;
  error: string;
  setValue: any;
  // label?: string;
}) => {
  const { countries } = useCountries();
  const t = useTranslations("CountryCodeSelect");
  const { locale } = useTranslationContext();

  const EditedCountries = React.useMemo(() => {
    const filteredCountries = countries.filter(
      (country: any) => country.name !== "Western Sahara"
    );
    return filteredCountries;
  }, [countries]);

  return (
    <div className="relative w-full mb-6 border border-gray-300 rounded-lg ">
      {/* Label */}
      <label
        htmlFor={name}
        className={`absolute -top-3 ${
          locale === "en" ? "left-4" : "right-4"
        }  bg-white px-1 text-gray-500 text-sm z-10`}
      >
        {t("SelectCountry")}
      </label>
      {/* Select Field */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            id={name}
            className="!h-[55px] w-full !bg-transparent  rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400"
            showSearch
            allowClear
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              setValue(
                "country",
                EditedCountries.find((c) => c.countryCallingCode === value)
                  ?.name
              );
            }}
            // placeholder={t("SelectCountry")}
            optionFilterProp="labelText"
            filterOption={(input, option) =>
              option?.labelText?.toLowerCase().includes(input.toLowerCase())
            }
            options={EditedCountries?.sort((a, b) =>
              a.name.localeCompare(b.name)
            ).map((country: any, i: number) => ({
              key: i,
              value: country.countryCallingCode,
              labelText: `${country.name} (${country.countryCallingCode})`,
              label: (
                <div key={i} className="flex items-center">
                  <Image
                    src={country.flags.png}
                    alt={country.name}
                    className="mx-2"
                    width={20}
                    height={20}
                  />
                  {country.name} ({country.countryCallingCode})
                </div>
              ),
            }))}
          />
        )}
      />
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CountryCodeSelect;
