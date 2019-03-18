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

 // Character Ducks
let duckArray = [
    
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
    attack: 80,
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


//Global variables
let myDuck;
let select = false;
let selector = false;
let playerDuck = false;
let enemyDuck = false;
let index = 0;
let pdIndex ;
let edIndex ;
let atkBtnOn = false;
let wins = 0;
let defeat = 0;
//My Functions



let CalcXp = function(duck1){
    duck1.xp +=10;
    if(duck1.xp > levelXp[duck1.level+1] ){
        duck1.level++;
    }
}

let roundRestart = () =>{
    $("#duckselect").css("display", "block");
    $("#duckpond").append($("#duck"+edIndex));
    $(".select").css('pointer-events', 'auto');
    $("#statbox").css("display","block");
    $("#duckselect").removeClass('col-12');
    $("#duckselect").addClass('col-8');
    
    duckArray[pdIndex].health = duckArray[pdIndex].maxHealth;
    duckArray[edIndex].health = duckArray[edIndex].maxHealth;
    select = true;
    SelectDuck();
    lockIn();

}


let Attack =function(duck1,duck2){
    let damage = (duck1.attack+((duck1.level-1)*5)) - Math.floor(duck2.defense*.5);
    if(duck2.health <= 0){
        console.log("You have defeated "+duck2.name+"!");
        wins++
        roundRestart();
    }
    if(duck2.health >0 && duck1.health >0){
    duck2.health -= damage;
    CalcXp(duck1);
    }
    
}

let Defend = function(duck1,duck2) {
    let damage = duck2.attack- Math.floor(duck1.defense*.5);

    if(duck1.health <= 0){
        console.log("You have been defeated");
        roundRestart();  
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



let SelectDuck = function(){
    if(selector === false){

        $(".select").on("click",function(e){
            index = e.target.id.slice(4);
            console.log(index)

            $('[select="this"]').css({"outline": "0px"});
            $('[select="this"]').removeAttr("select");
            $(this).css({"outline": "5px solid red"});
            $(this).attr("select","this");
            select = true;
            
                if(this.attributes.name.value == duckArray[index].name){
                console.log(duckArray[index].name);
                $("#stats").html(duckArray[index].name +"<br>Health: "+duckArray[index].health+"<br>Attack: "+duckArray[index].attack+"<br>Defense: "
                +duckArray[index].defense+"<br>Level: "+duckArray[index].level);
                    
                
                return myDuck = duckArray[index];
                
                }          
                                       
        })
    }
   
}


let lockIn = function(){
        $("#lckbtn").on("click",function(){
            

            
            
            if(playerDuck && enemyDuck && $("#duck"+pdIndex) != $('#duck'+edIndex)){
                atkBtnOn = true;
                $("#duckselect").css("display", "none");
                   
                
            }

          
            if(select && playerDuck && pdIndex != index){
             
          
                $('#enemyside').append($('[select="this"]'));
                enemyDuck = true;
                $('#fightbox').append()
                $("#lckbtn").text("Fight!");
                select = false;
                edIndex = parseInt(index);
                console.log("enemy index "+edIndex);
                $(".select").css('pointer-events', 'none'); // disable
                $('[select="this"]').removeAttr("select");
                

            }

            
            

            if(select && $("#duck"+pdIndex) != $('#duck'+edIndex) ){
                console.log("click");
                // $("#duck"+index).css('pointer-events', 'none'); // disable

                $("#statbox").css("display","none");
                $("#duckselect").removeClass('col-8');
                $("#duckselect").addClass('col-12');
                
                $('#playerside').append($('[select="this"]'));
                $('[select="this"]').removeAttr("select");
                

                playerDuck = true;
                pdIndex = parseInt(index);
                console.log("player index "+ pdIndex);
                
               
            }   
            
            

        })
 }

attackbtn = () =>  {
    $("#atkbtn").on("click",function(){
        
        if(atkBtnOn){
        Attack(duckArray[pdIndex],duckArray[edIndex]);
        console.log(duckArray[pdIndex].health,duckArray[edIndex].health);

        Defend(duckArray[pdIndex],duckArray[edIndex]);
        console.log(duckArray[pdIndex].health,duckArray[edIndex].health);
        }    
    })
}


//main function
$(document).ready(function(){
    SelectDuck();
    lockIn();
     assignDucks();
     attackbtn();
     
    
    
})
    










