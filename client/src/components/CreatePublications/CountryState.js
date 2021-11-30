import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryStateAction } from "../../redux/actions";

const CountryState = ({ setState, infoJobs, handleChange, editValue }) => {
  const dispatch = useDispatch();
  const { countryState } = useSelector((state) => state);

  useEffect(() => {
    if (!countryState) dispatch(getCountryStateAction());
    if (infoJobs && countryState) {
      const province = countryState.allStates.filter(
        (s) => s.name_country === infoJobs.country
      );
      setState(province);
    }
  }, [countryState]);

  const handleSelect = (e) => {
    const province = countryState.allStates.filter(
      (s) => s.name_country === e.target.value
    );
    setState(province);
    handleChange(e);
  };

  return (
    countryState && (
      <>
        <select
          value={infoJobs && infoJobs.country}
          name="country"
          onChange={handleSelect}
          className={`form-control ${
            editValue === undefined ? null : !editValue && "green-shadow"
          }`}
          disabled={editValue && editValue}
        >
          <option>{infoJobs ? null : "Selecciona un país"}</option>
          {countryState.countryNoRepeat.map((c, i) => (
            <option
              // selected={infoJobs && infoJobs.country === c ? true : false}
              key={i}
              value={c}
            >
              {c}
            </option>
          ))}
        </select>
      </>
    )
  );
};

export default CountryState;
