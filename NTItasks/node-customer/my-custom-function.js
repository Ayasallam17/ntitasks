
const fs = require('fs')
const loadCustomersData = () => {
    let data
    try{
        data = JSON.parse(fs.readFileSync('data.json').toString())
        if(!data.length)
            throw new Error()
    }
    catch(e){
        data = []
    }
    return data
}
const saveCustomersData = (customers)=>{
    fs.writeFileSync('data.json', JSON.stringify(customers))
    console.log("added")
}

const addNewCustomer =(customer)=>{
    const data = loadCustomersData()
    const duplicated = data.find((t)=> t.id === customer.id)
    if(duplicated) return console.log('id used before')
    data.push(customer)
    saveCustomersData(data)
}

const searchByName = (customerName) =>{
    const allData = loadCustomersData()
    const resultSearch = allData.filter(customer =>{
        return customer.name == customerName 
    })
    if(resultSearch.length==0) result="not found"
    return resultSearch
}

const searchById = (customerid) =>{
    const allData=loadCustomersData()
    const resultSearch = allData.findIndex(customersid =>{
        return customersid.id == customerid
    } )
    return resultSearch
}

const editCustomerById = (id , newcustomerdata) => {
    allData = loadCustomersData()
    const customerIndex = searchById(id)
    allprop = Object.keys(newcustomerdata)
    flag = false
    allprop.forEach(prop => {
        try{
            newcustomerdata[prop] = newcustomerdata[prop].trim()
        }catch{}
        if(newcustomerdata[prop]){
            allData[customerIndex][prop] = newcustomerdata[prop]
            flag =true
        }
    }); 
    if(flag){
        saveCustomersData(allData)
        console.log("edited")
    }
    else console.log("no edites")
}

const deleteCustomerById = (customerId) =>{
    const customerIndex = searchById(customerId)
    if(customerIndex == -1) return console.log("not found to be deleted")
    const allData = loadCustomersData()
    allData.splice(customerIndex , 1)
    saveCustomersData(allData)
    console.log("deleted")
}

module.exports = {
    loadCustomersData,
    saveCustomersData,
    addNewCustomer,
    searchByName,
    searchById,
    editCustomerById,
    deleteCustomerById
}