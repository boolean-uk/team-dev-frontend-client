import { useState, useEffect } from "react"
import client from "../../utils/client";
import AddCohortForm from "./AddCohortForm";

function AddCohortPage() {
    const [cohort, setCohort] = useState({
        "cohortName": ""
    })

    const handleChange = () => {
        console.log("Something has changed in the cohort form")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
        console.log('Something has been submitted in the cohort form')
        client
            .post("/cohort")
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <>
            <h1>Add new cohort</h1>
            <AddCohortForm handleChange={handleChange} handleSubmit={handleSubmit}/>
        </>
    )
}

export default AddCohortPage;