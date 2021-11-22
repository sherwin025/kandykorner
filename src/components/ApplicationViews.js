import React from "react"
import { Route } from "react-router-dom"
import { CustomerList } from "./Customers/CustomerList"
import { EmployeeList } from "./employees/EmployeeList"
import { NewEmployeeForm } from "./employees/NewEmployee"
import { LocationsList } from "./locations/locationslist"
import { ProductLst } from "./Products/productList"
import { PurchaseOrders } from "./purchases/Purchases"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/locations">
                <LocationsList />
            </Route>
            <Route path="/products">
                <ProductLst />
            </Route>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            <Route path="/employees/create">
                <NewEmployeeForm />
            </Route>
            <Route path="/customers">
                <CustomerList />
            </Route>
            <Route path="/purchases">
                <PurchaseOrders />
            </Route>    
        </>
    )
}