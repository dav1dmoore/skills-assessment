    // Allows DOM to load and then applies script. Allows Script call to remain in the head while not changing rendering
document.addEventListener("DOMContentLoaded", function(){

    // Document Elements
    let filter = document.querySelector('#contactsFilter');
    let contactEmails = document.getElementsByClassName('email');
    let contactInfo = document.getElementsByClassName('info');
    let nameData = document.getElementsByClassName('name');
    let contactNumbers = document.getElementsByClassName('number');
    let rowSelect = document.getElementsByClassName('selected');
    
    // Create Auto-Incrementing ID
    let num = 0;
    function incrementID(){
        num++
        return num
    }

    //Create Contact Objects
    let contacts = [
        {id:`${incrementID()}`, name: 'Christian', number: '509-123-4567', email: 'christian@yahoo.com', street:'6539 Wilton Ave.', city:'Spokane', state:'WA', zipcode:'99201'},
        {id:`${incrementID()}`, name: 'Rich', number: '509-891-0123', email: 'rich@aol.com', street:'6539 Wilton Ave.', city:'Spokane', state:'WA', zipcode:'99201'},
        {id:`${incrementID()}`, name: 'Scott', number: '509-456-7891', email: 'scottn@mailinator.com', street:'6539 Wilton Ave.', city:'Spokane', state:'WA', zipcode:'99201'},
        {id:`${incrementID()}`, name: 'Danny', number: '509-101-2345', email: 'danny@yahoo.com', street:'6539 Wilton Ave.', city:'Spokane', state:'WA', zipcode:'99201'},
        {id:`${incrementID()}`, name: 'Taka', number: '509-101-2345', email: 'taka@myspace.com', street:'6539 Wilton Ave.', city:'Spokane', state:'WA', zipcode:'99201'},
        {id:`${incrementID()}`, name: 'Tim', number: '509-101-2345', email: 'tim@netscape.com', street:'6539 Wilton Ave.', city:'Spokane', state:'WA', zipcode:'99201'},
        {id:`${incrementID()}`, name: 'Patrick', number: '509-101-2345', email: 'patrick@live.com', street:'6539 Wilton Ave.', city:'Spokane', state:'WA', zipcode:'99201'},
        {id:`${incrementID()}`, name: 'Jacques', number: '509-101-2345', email: 'jacques@aol.com', street:'6539 Wilton Ave.', city:'Spokane', state:'WA', zipcode:'99201'}
    ]

    //Create a status for the contact that determines circle color
    let contactStatus = [
        'family',
        'friend',
        'client'
    ]

    //Random function to be used to randomly select index of contact status
    function rand(){
        return Math.round(Math.random()*(contactStatus.length - 1))
    }
    rand();

    //Generate table based on Contacts Object
    function loadTable(contacts){
        var table = document.querySelector('#contactTable');

        //For Loop to build out table from contacts list
            for(let i = 0; i < contacts.length; i++){
            
            //Create Table Row & Table Data Elements
            let tr = document.createElement('tr');
            tr.setAttribute('id', contacts[i].id);

            let tdAllContactInfo = document.createElement('td');
            tdAllContactInfo.setAttribute("class", "info hide size");
            
            // Create Information Div to be shown on name selection
            let infoContainer = document.createElement('div');

            infoContainer.innerHTML = `<p><a href="mailto:${contacts[i].email}">${contacts[i].email}</a></p><br><p>${contacts[i].number}</p><br><p>${contacts[i].street}</p>${contacts[i].city}, ${contacts[i].state} ${contacts[i].zipcode}<p>`;

            tdAllContactInfo.appendChild(infoContainer);
            
            // Create Email table data
            let tdEmail = document.createElement('td');
            tdEmail.setAttribute("class", "email size");
            tdEmail.innerHTML = contacts[i].email;

            // Create Email number data
            let tdNumber = document.createElement('td');
            tdNumber.setAttribute("class", "number hide size");
            tdNumber.innerHTML = contacts[i].number;

            // Create Name table data
            let tdName = document.createElement('td');
            tdName.setAttribute("class", "name flx");

            //Employ random function to apply color based on contact status
            tdName.innerHTML = `<div class="circle ${contactStatus[rand()]}"></div> ${contacts[i].name}`;

            //Create EventListener that shows info, hides other elements on click
            tdName.addEventListener('click', function(){
                let selectedRow = document.getElementById(contacts[i].id)
                if(selectedRow.classList.contains('selected')){
                    if(filter.value == 'contactEmail'){
                        showEmail();
                    }else if(filter.value == 'contactNumber'){
                        showNumber();
                    }
                } else {
                    // This could be condensed and cleaned up. Feels extra heavy
                addClass(contactInfo, 'hide');
                removeClass(rowSelect, 'selected');
                addClass(allRows, 'notSelected');
                addClass(contactEmails, 'hide');
                addClass(contactNumbers, 'hide');
                selectedRow.classList.remove('notSelected');
                selectedRow.classList.add('selected');
                tdAllContactInfo.classList.remove('hide');
                }
            })

            // Append all table data to Table Row, Append TR to Table
            tr.appendChild(tdName);
            tr.appendChild(tdAllContactInfo);
            tr.appendChild(tdEmail);
            tr.appendChild(tdNumber);
            table.appendChild(tr);
            }
        //Return table that populates/renders HTML table
        return table
    }

    //Invoke loadTable function with contacts as argument
    loadTable(contacts);

    //Select all table rows
    let allRows = document.querySelectorAll ("tr");

    //Filter for input contactsFilter. Show email or phone numbers:
    filter.addEventListener('click', function(){
        if(filter.value == 'contactEmail'){
            showEmail();
        }else if(filter.value == 'contactNumber'){
            showNumber();
        }
    })

    // Repeating function calls to minimze repeat code
        //Add Class iterates through all the elements to apply a class, ensuring full functionality.
    function addClass(elements, cls){
        for(let element of elements){
            element.classList.add(cls)
        }
    }
        //Remove Class iterates through all the elements to apply a class, ensuring full functionality.
    function removeClass(elements, cls){
        for(let element of elements){
            element.classList.remove(cls)
        }
    }

        //Show Email & Number applies classes to elements to complete functionality
    function showEmail(){
        addClass(contactInfo, 'hide');
        addClass(contactNumbers, 'hide');
        removeClass(contactEmails, 'hide');
        removeClass(rowSelect, 'selected');
        removeClass(allRows, 'notSelected');
    }

    function showNumber(){
        addClass(contactInfo, 'hide');
        addClass(contactEmails, 'hide');
        removeClass(contactNumbers, 'hide');
        removeClass(rowSelect, 'selected');
        removeClass(allRows, 'notSelected');
    }
});