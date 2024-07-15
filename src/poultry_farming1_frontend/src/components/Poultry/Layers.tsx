import { useState, ChangeEvent, FormEvent } from "react";

function Layers() {
  const [ageWeeks, setAgeWeeks] = useState<number>(0);
  const [numberOfLayers, setNumberOfLayers] = useState<number>(0);
  const [breed, setBreed] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Process form data here
    console.log({
      ageWeeks,
      numberOfLayers,
      breed
    });
  };

  return (
    <div className="form-container">
      <h1>Create Layer Record</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ageWeeks">Age (weeks)</label>
          <select
            id="ageWeeks"
            className="form-control"
            value={ageWeeks}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setAgeWeeks(parseInt(e.target.value))}
          >
            {[...Array(11).keys()].map(week => (
              <option key={week} value={week}>{week}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="numberOfLayers">Number of Layers</label>
          <input
            type="number"
            id="numberOfLayers"
            className="form-control"
            value={numberOfLayers}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNumberOfLayers(parseInt(e.target.value))}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="breed">Breed</label>
          <select
            id="breed"
            className="form-control"
            value={breed}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setBreed(e.target.value)}
          >
            <option value="">Select</option>
            <option value="leghorn">Leghorn</option>
            <option value="hybrid">Hybrid</option>
            <option value="austrawhite">Austrawhite</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Layers;
