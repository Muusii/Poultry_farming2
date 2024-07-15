import { useState, ChangeEvent, FormEvent } from "react";
// import '../Pages/Feature.css';

function CreatePoultryRecord() {
  const [typeOfPoultry, setTypeOfPoultry] = useState<string>("");
  const [ageWeeks, setAgeWeeks] = useState<number>(0);
  const [feedType, setFeedType] = useState<string>("");
  const [vaccinationWeeks, setVaccinationWeeks] = useState<number>(0);
  const [numberOfPoultryType, setNumberOfPoultryType] = useState<number>(0);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Process form data here
    console.log({
      typeOfPoultry,
      ageWeeks,
      feedType,
      vaccinationWeeks,
      numberOfPoultryType
    });
  };

  return (
    <div className="form-container">
      <h1>Create Poultry Record</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="typeOfPoultry">Type of Poultry</label>
          <select
            id="typeOfPoultry"
            className="form-control"
            value={typeOfPoultry}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setTypeOfPoultry(e.target.value)}
          >
            <option value="">Select</option>
            <option value="broiler">Broiler</option>
            <option value="layer">Layer</option>
          </select>
        </div>
        
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
          <label htmlFor="feedType">Feed Type</label>
          <input
            type="text"
            id="feedType"
            className="form-control"
            value={feedType}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFeedType(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="vaccinationWeeks">Vaccination (weeks)</label>
          <select
            id="vaccinationWeeks"
            className="form-control"
            value={vaccinationWeeks}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setVaccinationWeeks(parseInt(e.target.value))}
          >
            {[...Array(11).keys()].map(week => (
              <option key={week} value={week}>{week}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="numberOfPoultryType">Number of Poultry Type</label>
          <input
            type="number"
            id="numberOfPoultryType"
            className="form-control"
            value={numberOfPoultryType}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNumberOfPoultryType(parseInt(e.target.value))}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreatePoultryRecord;