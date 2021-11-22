import React, { useEffect, useState } from "react";

export const ProductLst = () => {
    const [productsArray, setProducts] = useState([])

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


    return (
        <>
        {
            productsArray.map(
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