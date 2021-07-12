



//const yargs = require('yargs')
const yargsobj = require('yargs')
const customFunctionObj= require('./my-custom-function')
yargsobj.command({
    command:"addnewcustomer",
    builder:{
        id:{
            type:"number",
            demandOption:true
        },
        name:{
            type:"string"
        },
        balance:{
            type:"number"
        }

    },
    handler(argv){
        customer={
            id:argv.id,
            name:argv.name,
            balance:argv.balance
        }
        customFunctionObj.addNewCustomer(customer)
    }
})

yargsobj.command({
    command:"loadcustomer",
     
    handler(){

        const customerData= customFunctionObj.loadCustomersData()
        console.log(customerData)
        
    }
})

yargsobj.command({
    command:"searchbyname",
     builder:{
        name:{
            type:'string',
            demandCommand:true
        }
    },
    handler(argv){

        const result = customFunctionObj.searchByName(argv.name)
        
    }
})

yargsobj.command({
    command:"searchbyid",
    builder:{
        id:{
            type:'number',
            demandOption:true
        }
    },
    handler(argv){
        const searchresult = customFunctionObj.searchById(argv.id)
        console.log(searchresult)
    }
})

yargs.command({
    command:'editcustomer',
    builder:{
        id:{
            type:'number',
            demandOption:true
        },
        name:{
            type:'string',
        },
        balance:{
            type:'number'
        }
    },
    handler(argv){
        const newCustomerData = {
            name:argv.name,
            balance:argv.balance
        }
        customFunctionObj.editCustomerById(argv.id , newCustomerData )
    }
})
yargs.command({
    command:"deletecustomerbyid",
    builder:{
        id:{
            type:'number',
            demandOption:true
        }
    },
    handler(argv){
        customFunctionObj.deleteCustomerById(argv.id)
    }
})
yargsobj.parse()