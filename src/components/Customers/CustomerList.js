import { useEffect, useState } from "react"
import { getAllCustomers, getAllOrders } from "../APIManager"

export const CustomerList = () => {
    const [customers, setcustomers] = useState([])
    const [orders, setorders] = useState([])

    useEffect(
        () => {
            getAllCustomers()
                .then(
                    (customers) => {
                        setcustomers(customers)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            getAllOrders()
                .then(
                    (order) => {
                        setorders(order)
                    }
                )
        }
    )
            // sort and organize customers by # of orders 
    const customeraddedpurchasecount = customers.map((customer) => {
        const matchedOrder = orders.filter((order)=>{
            return order.customerId === customer.id
        })
        customer.purchases = matchedOrder.length
        return customer
    })
    const sortedcustomers = customeraddedpurchasecount.sort((a,b)=> {
        return b.purchases - a.purchases
    })

    return (<>
        {
            sortedcustomers.map((customer) => {
                return <div key={`customer--${customer.id}`}> <p>Name: {customer.name}</p> <p>Candy Bought: {customer.purchases} </p><p>Email: {customer.email}</p></div>
            })
        }
    </>)
}