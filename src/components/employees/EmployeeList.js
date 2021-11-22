import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getEmployees } from "../APIManager";

export const EmployeeList = () => {
    const [employees, setemployee] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getEmployees()
                .then(
                    (employees) => {
                        setemployee(employees)
                    }
                )
        },
        []
    )
    const deleteEmployee = (event) => {
        return fetch(`http://localhost:8088/employees/${event.target.value}`, {
            method: "DELETE"
        })
            .then(() => {
                getEmployees(
                )
            })
            .then(
                (employees) => {
                    setemployee(employees)
                }
            )
    }

    return (
        <>
            <div>
                <button onClick={() => history.push("/employees/create")}>Hire Employee</button>
            </div>

            {employees.map((emp) => {
                return <p key={`employee--${emp.id}`}> {emp.name} works at {emp.location.address}
                    <button className="btn btn-primary" value={emp.id} onClick={deleteEmployee}>
                        Fire Employee
                    </button></p>
            })}
        </>
    )
}