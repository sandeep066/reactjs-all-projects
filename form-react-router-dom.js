import React, { useState, useContext, createContext } from "react";
import {
  useNavigate,
  useLocation,
  Link,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const Store = createContext(undefined);

const FormProvider = ({ children }) => {
  const { formData, handleSubmit, handleChange } = useFormInput();

  return (
    <Store.Provider value={{ formData, handleChange, handleSubmit }}>
      {children}
    </Store.Provider>
  );
};

const formConsumer = () => {
  const hooks = useContext(Store);
  if (!hooks) {
    return new Error("formConsumer error !!!");
  }
  return hooks;
};

const useFormInput = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    address: "",
    agreeTerms: false,
    country: "India",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/formPage", { state: { formData } });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  return { formData, handleSubmit, handleChange };
};

const FormInput = () => {
  const { formData, handleSubmit, handleChange } = formConsumer();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name"> Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="age"> Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="checkbox"
          name="agreeTerms"
          id="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
        />
        <label htmlFor="agreeTerms">Terms Agreement</label>
      </div>
      <div>
        <label>Country:</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Australia">Australia</option>
        </select>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

const Form = () => {
  return (
    <div className="App">
      <h1>Hello UseContext Form Input!!!</h1>
      <FormProvider>
        <FormInput />
      </FormProvider>
    </div>
  );
};

const FormOutput = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};
  return (
    <div>
      {formData && (
        <div>
          <p>Name: {formData.name}</p>
          <p>Age: {formData.age}</p>
          <p>Gender: {formData.gender}</p>
          <p>Address: {formData.address}</p>
          <p>Agree to Terms: {formData.agreeTerms ? "Yes" : "No"}</p>
          <p>Country: {formData.country}</p>
        </div>
      )}
      <Link to="/">Go Back</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/formPage" element={<FormOutput />} />
      </Routes>
    </Router>
  );
};

export default App;
