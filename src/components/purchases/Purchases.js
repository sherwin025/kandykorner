import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getOrders } from "../APIManager";

export const PurchaseOrders = () => {
    const [orders, setorders] = useState([])

    useEffect(
        () => {
            getOrders()
                .then(
                    (data) => {
                        setorders(data)
                    }
                )
        },
        []
    )

    const createLineItem = () => {
        const arrayMap = new Map()
        for (const order of orders) {
            if (arrayMap.has((`${order.productId}--${order.product.price}`))) {
                arrayMap.set((`${order.productId}--${order.product.price}`), arrayMap.get((`${order.productId}--${order.product.price}`)) + 1)
            } else {
                arrayMap.set((`${order.productId}--${order.product.price}`), 1)
            }

        }

        const backtoArray = Array.from(arrayMap)
        
        const newArray = backtoArray.map(
            (order)=> {
                const [productId, productPrice] = order[0].split(`--`)
                const specificProduct = orders.find((order) => order.product.id === parseInt(productId))
                return {
                    productId: parseInt(productId),
                    productName: specificProduct.product.name,
                    productPrice: parseFloat(productPrice),
                    quantity: order[1],
                    total: order[1] * parseFloat(productPrice)
                }
            }
        )

        return newArray
    }


    return (
        <>
            {
                createLineItem().map(
                    (order) => {
                        return <p key={`order--${order.productId}`}> {order.productName} Total cost ${order.total} quantity: {order.quantity} </p>
                    }
                )
            }
        </>
    )
}