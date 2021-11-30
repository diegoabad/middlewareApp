import { useSelector } from "react-redux";

const Languages = ({ setInfoUser, infoUser }) => {
  const { languages } = useSelector((state) => state);

  const handleSelectLanguages = (lang) => {
    setInfoUser((r) => {
      if (!r.languages.length === 0)
        return { ...r, infoUserChanged: true, languages: [lang] };
      if (!r.languages.includes(lang)) {
        return {
          ...r,
          infoUserChanged: true,
          languages: [...r.languages, lang],
        };
      } else {
        const filter = r.languages.filter((c) => c._id !== lang._id);
        return { ...r, infoUserChanged: true, languages: filter };
      }
    });
  };

  return (
    <>
      {languages.map((lang, i) => {
        return (
          <span key={i}>
            <input
              style={{ focus: "none" }}
              type="checkbox"
              className="btn-check btn-checkbox-focus"
              id={lang._id}
              onChange={() => handleSelectLanguages(lang)}
              value={lang.name}
              checked={
                infoUser.languages.find((e) => e._id === lang._id)
                  ? true
                  : false
              }
            />
            <label
              className="btn btn-outline-dark m-1 btn-checkbox-focus"
              htmlFor={lang._id}
              style={{ padding: "1px 5px" }}
            >
              {lang.name}
            </label>
          </span>
        );
      })}
    </>
  );
};

export default Languages;
