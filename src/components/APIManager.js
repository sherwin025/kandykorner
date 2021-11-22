



export const getAllCustomers = () => {
    return fetch("http://localhost:8088/customers")
        .then(res => res.json())
}

export const getEmployees = () => {
    return fetch("http://localhost:8088/employees?_expand=location")
        .then(res => res.json())
}

export const getlocations = () => {
    return fetch("http://localhost:8088/locations")
        .then(res => res.json())
}

export const getOrders = () => {
    const currentUser = localStorage.getItem("kandy_customer")
    return fetch(`http://localhost:8088/purchases?customerId=${currentUser}&_expand=product`)
    .then(res=>res.json())
}

export const getAllOrders = () => {
    return fetch(`http://localhost:8088/purchases?_expand=product&_expand=customer`)
    .then(res=>res.json())
}