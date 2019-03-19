// Constant Objects
const levelXp ={
    2:50,
    3:100,
    4:200,
    5:350,
    6:500,
    7:700,
    8:950,
}
//Global variables
let duckArray = []
let myDuck;
let selected = false;
let bothSelected = false;
let toggleclick = false;
let toggle = true;
let atkBtnOn = false;
let index = -1;
let pdIndex ;
let edIndex ;
let wins = 0;
let defeat = 0;

 // Character Ducks
duckArray = [
    
    {

    maxHealth : 100,
    name: "Obi Wan Duckobi",
    health: 100,
    attack: 10,
    defense: 12,
    xp : 0,
    level : 1,
    },

    {
    maxHealth : 110,        
    name: "Duck Skywaddler",
    health: 110,
    attack: 8,
    defense: 18,
    xp : 0,
    level : 1,

    },

    {
    maxHealth : 90,
    name: "Duck Vader",
    health: 90,
    attack: 18,
    defense: 5,
    xp : 0,
    level : 1,

    },

    {
    maxHealth: 70,
    name: "Duck Maul",
    health: 70,
    attack: 25,
    defense: 1,
    xp : 0,
    level : 1,

    },
]



//My Functions


let calcXp = function(duck1){
    duck1.xp +=10;
    if(duck1.xp > levelXp[duck1.level+1] ){
        duck1.level++;
    }
}

let roundRestart = () =>{
    $("#duckselect").css("display", "block");
    $("#duckselect").removeClass('col-12');
    $("#duckselect").addClass('col-8');
    $("#duckpond").append($("#duck"+pdIndex));
    $("#duckpond").append($("#duck"+edIndex));
    $(".select").css('pointer-events', 'auto');
    $("#statbox").css("display","block");
    
    
    duckArray[pdIndex].health = duckArray[pdIndex].maxHealth;
    duckArray[edIndex].health = duckArray[edIndex].maxHealth;
    select = true;
    selectDuck();
    lockIn();

}


let attack =function(duck1,duck2){
    let damage = (duck1.attack+((duck1.level-1)*5)) - Math.floor(duck2.defense*.5);
    if(duck2.health <= 0){
        wins++
       
    }
    if(duck2.health >0 && duck1.health >0){
    duck2.health -= damage;
    calcXp(duck1);
    }
    
}

let Defend = function(duck1,duck2) {
    let damage = duck2.attack- Math.floor(duck1.defense*.5);

    if(duck1.health <= 0){
        console.log("You have been defeated");
          
        defeat++;
    }
    if(duck1.health >= 0 && duck2.health >= 0){
        duck1.health -=damage;   
        
        
    }
}

let assignDucks = function(){
    for(var i =0; i < 4; i++){     
       $("#duck"+i).attr(duckArray[i]);
    }
}

let selectToStats = function(){
    if(index >-1){
        $("#stats").html(duckArray[index].name +"<br>Health: "+duckArray[index].health+"<br>Attack: "+duckArray[index].attack+"<br>Defense: "
        +duckArray[index].defense+"<br>Level: "+duckArray[index].level)+"<br>Wins: "+wins+"<br>Defeated: "+defeat; 

        return duckArray[index];   
    }
}
    
let selectDuck = function(){
    $(".select").on("click",function(e){
        index = e.target.id.slice(4);
        console.log(index)
        $('.selectOutline').removeClass("selectOutline");
        $('#duck'+index).addClass("selectOutline");
        selectToStats();      
    })
    
}

let sendToFightpit  = function(){
    $('#playerside').append($('#duck'+pdIndex));
    $('#enemyside').append($('#duck'+edIndex))
}
                 

let toggleSelect = function(){
   
    if(toggle === true){
        $('.selectOutline').removeClass('selectOutline');
        $(".select").css('pointer-events', 'none'); // disable 
        toggle = false;       
    }
    else{
        $('.selectOutline').removeClass('selectOutline');
        $(".select").css('pointer-events', 'auto'); // enable
        toggle = true;
    }
}
let toggleAttack = function(){
   
    if(atkBtnOn === false){
        $('#atkbtn').addClass("hideDiv");
        atkBtnOn = true;
    }
    else{
        $('#atkbtn').removeClass("hideDiv");
        atkBtnOn = false;
    }
}

let lockIn = function(){
        $("#lckbtn").on("click",function(){
            
            if(selected === false && index > -1){
                pdIndex = index
                selected = true;
                console.log("pd selected");
                $('#lckbtn').text("To The Pit!");
            }


            if(selected === true && index != pdIndex){
                edIndex = index;
                bothSelected = true;
                console.log("ed selected");
            }

            if(selected === true && bothSelected === true){
                console.log("both selected");
                sendToFightpit();
                $('#lckbtn').addClass("hideDiv");
                toggleSelect();
                toggleAttack();  
                 
            }      
        })
}


let attackbtn = function(){
    $("#atkbtn").on("click",function(){
        displayHealth();
       
        
        if(atkBtnOn === false){
            attack(duckArray[pdIndex],duckArray[edIndex]);
            console.log(duckArray[pdIndex].health,duckArray[edIndex].health);
            Defend(duckArray[pdIndex],duckArray[edIndex]);
            displayHealth();
        }    
    })
}

let displayHealth = function(){
    $('#healthBox').removeClass("hideDiv");
    $('#healthBox').html("Your Health "+duckArray[pdIndex].health+"<br>Enemy Health "+duckArray[edIndex].health);
    if(duckArray[pdIndex].health <=0){
        $("#healthBox").html('<br><span class="fail"> Defeat</span>');
        backToPond();
        
        
    }
    if(edIndex > -1 && duckArray[edIndex].health <= 0){
        $("#healthBox").html('<br><span class="win"> Success!</span>');
        backToPond();
        

    }
}
let backToPond = function (){
    $('#atkbtn').html("Back To Pond");  
    if(toggleclick === true){        
        if (pdIndex > edIndex){
            $("#duckpond").append($("#duck"+edIndex));
            $("#duckpond").append($("#duck"+pdIndex));
            reset();
        }
        else{
            $("#duckpond").append($("#duck"+pdIndex));
            $("#duckpond").append($("#duck"+edIndex));
            reset();
        }
    }
    else{
        toggleclick = true;
    }
}

let reset = function(){
    $("#atkbtn").text("Attack");
    $('#lckbtn').removeClass("hideDiv");
    $('#lckbtn').text("Lock In");
    $('#healthBox').html("");

    toggleSelect();
    toggleAttack();
    duckArray[pdIndex].health = duckArray[pdIndex].maxHealth;
    duckArray[edIndex].health = duckArray[edIndex].maxHealth;
    select = false;
    pdIndex = null;
    edIndex = null;
    selected = false;
    bothSelected = false;
    toggleclick = false;
    
   

}

//main function
$(document).ready(function(){
    selectDuck();
    selectToStats();
    lockIn();
     assignDucks();
     attackbtn();
     toggleAttack();
     
     
    
    
})
    










