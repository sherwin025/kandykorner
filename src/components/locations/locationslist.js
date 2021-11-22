import React, { useEffect, useState } from "react";
import { getlocations } from "../APIManager";

export const LocationsList = () => {
    const [locationsArray, setlocations ] = useState([])

    useEffect(
        () => {
            getlocations()
            .then (
                (locations) => {
                    setlocations(locations)
                }
            )
        },
        []
    )
    return (<>
    {
        locationsArray.map((locationA) => {
            return <p key={`location--${locationA.id}`}> {locationA.address}</p>
        })
    }
    </>)
}