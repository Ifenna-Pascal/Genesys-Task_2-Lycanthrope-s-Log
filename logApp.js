// Imports the werewolf dataset and array of objects
const WerewolfEvents = require("./DataSet")

function tableLog (event,activities){
    let table = [0,0,0,0]
    // loops through the werewolf dataset
    for(i in activities){
    // gets specific dataset 
        let specificEventList = activities[i];
    // initilaizes index to 0
        let index = 0;
    // updates index to 1 if specific dataset has the required event
        if(hasEvent(event, specificEventList)) index +=1;
    // updates dataset to 2 if the event would make our werewolf turn
        if(specificEventList.turn) index+=2;
    // updates the table array to 1 using the rsultant index as the key
        table[index] += 1
    }
    return table  
}

// Function to calculate correlation Index using the correlation formular
function correlation_Formular(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
        (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
    )
}

// Function checks if a the dataset has a particular event
function hasEvent (event, activites){
    return activites.events.includes(event) 
}

// Function returns an array containing the events of the werewolf without repitition  
function getSpecificEventWithoutRepetition(activities){
    const non_repeated_events = [];
    for(var event of activities){
        for(var specificEvent of event.events){
            if(!non_repeated_events.includes(specificEvent)){
                non_repeated_events.push(specificEvent)
            }
        }
    }
    return non_repeated_events
}



for(var eventItem of getSpecificEventWithoutRepetition(WerewolfEvents)){
    const correlation = correlation_Formular(tableLog(eventItem, WerewolfEvents));
    /*
    
        NB: Our Werewolf would move if the correllation index is greater than 0.3 and  less than -0.5 based on prediction
    
    */
    if(correlation > 0.47 || correlation < -0.5){
            console.log( "\n" + `Activity: ${eventItem.toUpperCase()}` + "   .......  " +  `Correlation: ${correlation}`);
            console.log("\n***************************************************");
            console.log(eventItem .toUpperCase() + " ACTIVITY WOULD CAUSE THE WEREWOLF TO TURN \n" );

    }
}
 
