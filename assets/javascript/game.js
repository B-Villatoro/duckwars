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
    name: "Obi Wan Duckobi",
    health: 100,
    attack: 10,
    defense: 10,
    xp : 0,
    level : 1,
    },

    {
    name: "Duck Skywaddler",
    health: 110,
    attack: 8,
    defense: 12,
    xp : 0,
    level : 1,

    },

    {
    name: "Duck Vader",
    health: 90,
    attack: 18,
    defense: 5,
    xp : 0,
    level : 1,

    },

    {
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
//My Functions


let CalcXp = function(duck1){
    duck1.xp +=10;
    if(duck1.xp > levelXp[duck1.level+1] ){
        duck1.level++;
    }
}

let Attack =function(duck1,duck2){
    let damage = (duck1.attack+((duck1.level-1)*5)) - Math.floor(duck2.defense*.5);
    if(duck2.health >0){
    duck2.health -= damage;
    CalcXp(duck1);
        if(duck2.health <= 0){
            console.log("You have defeated "+duck2.name+"!");
        }
    }
}

let assignDucks = function(){
    for(var i =0; i < 4; i++){     
       $("#duck"+i).attr(duckArray[i]);
    }
}



let SelectDuck = function(){
    if(selector === false){

        $(".select").on("click",function(){
            $('[select="this"]').css({"outline": "0px"});
            $('[select="this"]').removeAttr("select");
            $(this).css({"outline": "5px solid red"});
            $(this).attr("select","this");
            
            for(let j = 0; j<4;j++){
                if(this.attributes.name.value == duckArray[j].name){
                console.log(duckArray[j].name);
                $("#stats").html(duckArray[j].name +"<br>Health: "+duckArray[j].health+"<br>Attack: "+duckArray[j].attack+"<br>Defense: "
                +duckArray[j].defense+"<br>Level: "+duckArray[j].level);
                    
                select = true;
                return myDuck = duckArray[j];
                
                }          
            }                             
        })
    }
    else if(selector == true){
        console.log("lockedout");
    }
}

let lockIn = function(){
    $(".btn").on("click",function(){
        console.log("click");
        $(".select").css('pointer-events', 'none'); // disable

        $("#statbox").remove();
        $("#duckselect").append('class ="col-12"');
        console.log($('[select="this"]'));

        
        

    })
}

//main function
$(document).ready(function(){
    SelectDuck();
    lockIn();
     assignDucks();
    
    
})
    










