
customers = getCustomers()
//console.log(customers)
addbtn = document.querySelector('#addBtn')
showAllBtn = document.querySelector('#showAllBtn')

errorLableObj = document.querySelector('#errorLable')
 
function getCustomers(){
    return(JSON.parse(localStorage.getItem('customers')) || [])
}

const saveCustomers = function(){
    localStorage.setItem('customers', JSON.stringify(customers))
}

createNewElement = (parent,elementName,txt='', classes='' , attributes=[]) =>{
    element = document.createElement(elementName)
    if(classes != '' )element.className=classes
    if(Text !='') {
        element.value = txt
        element.textContent=txt
    }
    if(attributes.length!=0){
        attributes.forEach(attribute=>{
            element.setAttribute(attribute.attrName,attribute.attrVal)
        })    
    }
    parent.appendChild(element)
    return element
}

const showAllCustomers = function(){
    
    customers = getCustomers()
    console.log(customers)
    body = document.querySelector('#row')
    body.textContent=''
    inputId=[]
    inputName=[]
    inputBalance=[]
    tr=[]
    inputAttributes = [{ attrName:'disabled', attrVal:true}]

    customers.forEach((customer,i) =>{
        tr[i] = createNewElement(body , 'tr' )
        tdId = createNewElement(tr[i] , 'td')
        tdName = createNewElement(tr[i] , 'td')
        tdBalance = createNewElement(tr[i] , 'td')
        tdButtons = createNewElement(tr[i] , 'td' )
        inputId[i]= createNewElement(tdId , 'input' , customer.accNum ,'' ,inputAttributes)
        inputName[i] = createNewElement(tdName , 'input' , customer.cName , '' ,inputAttributes)
        inputBalance[i]= createNewElement(tdBalance , 'input' , customer.balance , '' , inputAttributes)
        buttonEdit = createNewElement(tdButtons , 'button' , 'edit' ,'btn' )
        buttonDelete= createNewElement(tdButtons , 'button' , 'delete' , 'btn')

        buttonEdit.addEventListener('click' , (e)=>{
            if(inputId[i].disabled){
                inputId[i].disabled=false
                inputName[i].disabled=false
                inputBalance[i].disabled=false
            }
            else{
                inputId[i].disabled=true
                inputName[i].disabled=true
                inputBalance[i].disabled=true
                customers[i].accNum=inputId[i].value
                customers[i].cName=inputName[i].value
                customers[i].balance=inputBalance[i].value
                //buttonEdit[i].textContent='edit'
                saveCustomers()
            }
        })
        buttonDelete.addEventListener('click' , ()=>{
            customers.forEach(()=>{
                customers.splice(i, 1)
            })
            saveCustomers()
            tr[i].remove()
        })
    })
}

const showHide = function(sectionId){
    document.querySelectorAll('section').forEach((section, index)=>{
        if(index!=0) section.classList.add('d-none')
    })
    document.querySelector(`#${sectionId}`).classList.remove('d-none');
}
addbtn.addEventListener('click', function(){
    showHide('addCustomer')
})

showAllBtn.addEventListener('click',function(e){
    showHide('allCustomers')
    showAllCustomers();
})

const addCustomer = function(customer){
    customers.push(customer)
    saveCustomers()
}
const validateData = function(item, validationObj){
    let errors = []
    options = Object.keys(validationObj)
    options.forEach(option => {
        if(option == 'required'){
            if(item == '') errors.push('required')
        }
         if(option =='minlength'){
            value = validationObj[option]
            if(item.length<value) errors.push("small")
        }
        if(option == 'maxlength'){
            value = validationObj[option]
            if(item.length>value) errors.push("big")
        }
        if(option == 'positive'){
            if(item <= 0){
                errors.push("negative")
            }
        }
    });
     return errors 
}
document.querySelector('#addForm').addEventListener('submit',function(e){
    e.preventDefault()
    const ele = this.elements
    nameInput=ele["cName"].value;
    balanceInput = ele.balance.value;
    
    minlength=5;
    maxlength=30;
    let validationsName=validateData(nameInput , {"required":true ,"minlength":minlength , "maxlength":maxlength})
    let validationsBalance=validateData(balanceInput , {"required":true , "positive":true})
    flag = false
    if(validationsName.length > 0){ 
        validationsName.forEach(err =>{
            if(err == "required"){
                errorLableObj.textContent="name should't be empty"
            }
            else if(err == "small"){
                errorLableObj.textContent=`name must be at least ${minlength}` 
            }
            else if(err == "big"){
                errorLableObj.textContent=`name must be at most ${maxlength}`
            }
        })
        flag=true
    }

    if(validationsBalance.length > 0){
        validationsBalance.forEach(err =>{
            if(err == 'required'){
                errorLableObj.textContent="balance should not be empty"
            }
            else if(err == 'negative'){
                errorLableObj.textContent="balance must be positive"
            }
        })
        flag=true
    }

    
    let user = {
        accNum : Date.now(),
        cName: ele.cName.value,
        balance: ele.balance.value
    }
     addCustomer(user)
    this.reset()
})
/////////////
search = function(searchKey, type){
    let c = customers.filter(customer=>{
        return customer[type]==searchKey
    })
    return c;
}

custId = document.querySelector('#customerId')
custName = document.querySelector('#customerName')
custBalance =  document.querySelector('#customerBalance')
searchId = document.querySelector('#searchId')

showBtn = document.querySelector('#showBtn')

showBtn.addEventListener('click' ,  function(e){
    showHide('singleCustomer')
} )

document.querySelector('#searchForm').addEventListener('submit' ,function(e){
    e.preventDefault()
     
    const ele = this.elements
    custInputId=ele["searchId"].value;
    const result = search(custInputId , 'accNum')
    custId.textContent = result.accNum
    custName.textContent = result.cName
    custBalance.textContent = result.balance
    //this.reset()
    
})
const findIndexc = function(id){
    const cust =getCustomers()
    console.log(cust)
    const result=  cust.findIndex(ele =>{
        return ele.accNum == id
    })
    return result
}

document.querySelector('#addBalanceBtn').addEventListener('click' , function(){
    showHide('addbalance')
})

document.querySelector('#addbalanceform').addEventListener('submit' , function(e){
    e.preventDefault()
    const ele =this.elements
    custInputId = ele['cId'].value
    custAmount = ele['amount'].value
    custIndex = findIndexc(custInputId)
    customers[custIndex].balance+=custAmount
    saveCustomers()
    //console.log("id"+ custInputId + "amount "+custAmount)
})

document.querySelector('#withDrawBtn').addEventListener('click' , function(){
    showHide('withdrawbalance')
})
document.querySelector('#withdrawbalanceform').addEventListener('submit' , function(e){
    e.preventDefault()
    customers = getCustomers()
    const ele =this.elements
    custInputId = ele['cId'].value
    console.log(custInputId)
    custAmount = ele['amount'].value
    custIndex = findIndexc(custInputId)
    customers[custIndex].balance -= custAmount
    saveCustomers()
     
})