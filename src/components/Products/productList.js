import React, { useEffect, useState } from "react";

export const ProductLst = () => {
    const [productsArray, setProducts] = useState([])
    const [searchterm, setsearch] = useState([])

    useEffect(
        ()=>{
            return fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId&_order=asc")
            .then(res=> res.json())
            .then(
                (products) => {
                    return  setProducts(products)
                }
            )
        },
        []
    )

    useEffect(
        ()=>{
            filteredCandy()
        },
        [searchterm]
    )

    const PurchaseCandy = (event) => {
            event.preventDefault()
            
        const purchaseOrder = {
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            productId: parseInt(event.target.value)
        }

        return fetch("http://localhost:8088/purchases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchaseOrder)
        })
    }

    const filteredCandy = () => {
        const thecandies = productsArray.filter((order)=>{
            const lowername = order.name.toLowerCase()
            const lowertype = order.productType.type.toLowerCase()
            return lowername.includes(`${searchterm.searchterm}`) || lowertype.includes(`${searchterm.searchterm}`)
        })

        return thecandies
    }


    return (
        <>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Search Products:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...searchterm}
                                copy.searchterm = evt.target.value
                                setsearch(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter product name or type of candy"
                    />
                </div>
            </fieldset>
        {
            filteredCandy().length > 0? filteredCandy().map(
                (each) => {
                    return <p key={`product--${each.id}`}> {each.name} is a {each.productType.type} and costs {each.price}
                    <button value={each.id} className="btn btn-primary" onClick={PurchaseCandy}
                    >Purchase</button></p>
                }
            )
            : productsArray.map(
                (each) => {
                    return <p key={`product--${each.id}`}> {each.name} is a {each.productType.type} and costs {each.price}
                    <button value={each.id} className="btn btn-primary" onClick={PurchaseCandy}
                    >Purchase</button></p>
                }
            )
        }
        </>
    )
}