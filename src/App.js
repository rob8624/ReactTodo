import "./styles.css";
import { useState } from "react";

const DisplayCities = ({
  cities,
  deleteCities,
  editCities,
  editing,
  setEditing,
  currentlyEditing,
  saveEdit,
  name,
  country,
  setName,
  setCountry,
}) => {
  return (
    <ol>
      {cities.map((item, index) => {
        return (
          <li key={item.id}>
            {editing && currentlyEditing === item.id ? (
              <>
                <input
                  className="edit-input"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <input
                  className="edit-input"
                  value={country}
                  type="text"
                  onChange={(e) => setCountry(e.target.value)}
                ></input>
                <button
                  onClick={() => {
                    saveEdit(item.id, name, country);
                  }}
                >
                  Save
                </button>
                <button onClick={() => setEditing(!editing)}>Cancel</button>
              </>
            ) : (
              <>
                {index + 1}.{item.name}:{item.country}
                <button onClick={() => editCities(item.id)}>Edit</button>
                <button onClick={() => deleteCities(item.id)}>X</button>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
};

const CityForm = ({ cities, addCities, addingCities, setAddingCities }) => {
  return (
    <>
      <form id="myForm" onSubmit={addCities}>
        <label>Add a city</label>
        <input
          type="text"
          name="city-input"
          onChange={(e) => {
            const value = e.target.value;
            setAddingCities(value.trim() !== "");
          }}
        />
        <label>Country</label>
        <input type="text" name="country-input" />
        {addingCities ? (
          <button type="submit">Add city</button>
        ) : (
          <button type="submit" disabled="true" className="btn-disabled">
            Add city
          </button>
        )}
      </form>
      {addingCities ? null : <div>Enter city to submit</div>}
    </>
  );
};

export default function App() {
  //state
  const [cities, setCities] = useState([
    { id: 0, name: "London", country: "UK" },
    { id: 1, name: "New York", country: "USA" },
  ]);

  const [editing, setEditing] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(null);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [addingCities, setAddingCities] = useState(false);

  //add item function
  const addCities = (event) => {
    event.preventDefault();
    const city = event.target.elements["city-input"].value;
    const country = event.target.elements["country-input"].value;
    const id = cities.length;
    setCities((prevState) => [
      ...prevState,
      { id: id, name: city, country: country },
    ]);
    document.getElementById("myForm").reset();
  };

  //delete item function
  const deleteCities = (id) => {
    setCities(cities.filter((items) => items.id !== id));
  };

  const editCities = (id, name, country) => {
    setEditing(!editing);
    setCurrentlyEditing(id);
    cities.map((item) => {
      item.id == id ? (setName(item.name), setCountry(item.country)) : item;
    });
  };

  const saveEdit = (id, name, country) => {
    setCities((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, name: name, country: country } : item
      )
    );
    setEditing(false);
    setCurrentlyEditing(null);
    setName("");
    setCountry("");
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      <h2>List some cities you want to visit!</h2>
      <div className="flex-col">
        <DisplayCities
          cities={cities}
          deleteCities={deleteCities}
          editCities={editCities}
          editing={editing}
          editCities={editCities}
          setEditing={setEditing}
          currentlyEditing={currentlyEditing}
          saveEdit={saveEdit}
          name={name}
          country={country}
          setName={setName}
          setCountry={setCountry}
        />
        <CityForm
          cities={cities}
          addCities={addCities}
          addingCities={addingCities}
          setAddingCities={setAddingCities}
        />
      </div>
    </div>
  );
}
