


let customers = JSON.parse(localStorage.getItem('customers')) || [];

const validateData=function(item , validationObj){
    let err=[];
    options=Object.keys(validationObj);
    options.forEach(option => {
        if(option=="required"){
            if(!item || item==''){
                err.push("requird");
            }
        }
        if(option == "onlypositiv"){
            if(item<0){
                err.push("negative number");
            }
        }
        if(option == "onlychar"){
            
        }
    });

    return err;
}
 
// CREATE NEW OBJECT FOR CLIENTS

const addNewCustomer = function(id , name ,balance=0){
    name=name.trim()

    const newCustomer ={id ,name ,balance };

    const allValidators = {  
        validId      :validateData(id,{} ),
        validName    :validateData(name , {"required":true ,"onlychar":true }),
        validBalance :validateData(balance , {"required" :true , "onlypositiv":true}),  //customer should deposit money when creating account   
    }

    validationErrFlag =false;
    allValidatorskeys = Object.keys(allValidators);

    allValidatorskeys.forEach(key => {
        if(allValidators[key].length > 0){
            validationErrFlag = true;
        }
    });

    if(validationErrFlag){
        console.log(allValidators);
    }
    else{
        customers.push(newCustomer);
        localStorage.setItem('customers' , JSON.stringify(customers));
    }
    
}
const search = function(searchkey){
    return customers.findIndex(ele => ele.id == searchkey)
}
// deposit 
const searchAndAddDeposit=function(customerId,amount=0){
    const customerindex = search(customerId)
    if(customerindex != -1){
        customers[customerindex].balance += amount 
        console.log("added amount to balance")
    }
    else return console.log("not found to deposit")
}
// withdrawing

const withdraw=function (customerId,amount){
    const customerindex = search(customerId)
    if(customerindex != -1){
        if(customers[customerindex].balance >= amount){ 
            customers[customerindex].balance -= amount
            return console.log("done withdraw")
        }
        else{ 
        return console.log("not enougth money")}
    }
    else return console.log("not found to withdraw")
}

const deleteCustomer =function(customerId){
    const customerIndex = search(customerId)
    if(customerIndex != -1){
        customers.splice(customerIndex , 1)
        return console.log("deleted")
    }
    else{
        return console.log("not found to delete")
    }
     
}
 
const showAllCustomers = function(){
    console.log(customers);
}

// operation execution

//const res =search("ahmed")
//addNewCustomer(Date.now(),'ali' ,400 );
//addNewCustomer(Date.now(),'mahmoud' ,500 );
//searchAndAddDeposit(1612127948048,200);
//withdraw(1612127948048,250);
//deleteCustomer(1612127948048);
showAllCustomers();
