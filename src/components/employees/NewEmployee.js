import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getlocations } from "../APIManager";

export const NewEmployeeForm = () => {
    const [employee, newEmployee] = useState({
        name: "",
        location: 1,
        manager: false,
        fulltime: false,
        hourlyrate: 1

    })
    const [locations, setlocations] = useState([])

    useEffect(
        () => {
            getlocations()
                .then(
                    (locations) => {
                        setlocations(locations)
                    }
                )
        },
        []
    )

    const history = useHistory()

    const saveEmployee = (event) => {
        event.preventDefault()

        const newEmployee = {
            name: employee.name,
            locationId: parseInt(employee.location),
            manager: employee.manager,
            fulltime: employee.fulltime,
            hourlyrate: parseInt(employee.hourlyrate)
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        }

        return fetch("http://localhost:8088/employees", fetchOptions)
            .then(() => {
                history.push("/employees")
            })
    }


    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.name = evt.target.value
                                newEmployee(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Manager:</label>
                    <input type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.manager = evt.target.checked
                                newEmployee(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Full-Time:</label>
                    <input type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.fulltime = evt.target.checked
                                newEmployee(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Hourly-Rate:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.hourlyrate = evt.target.value
                                newEmployee(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Pay per Hour"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Location:</label>
                    <select onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.location = evt.target.value
                            newEmployee(copy)
                        }
                    } name="location" id="location">
                        <option value="default">chosoe a location</option>
                        {locations.map((location) => {
                            return <option key={`location--${location.id}`} value={location.id}>{location.address}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveEmployee}>
                Hire Employee
            </button>
        </form>
    )
}