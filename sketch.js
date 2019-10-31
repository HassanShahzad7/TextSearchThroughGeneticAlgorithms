let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;
let timer;
function setup() 
{

  var main=document.getElementById("main")
  
  bestPhrase=document.createElement("p");  
  bestPhrase.className="best";
  bestPhrase.appendChild(document.createTextNode("best Phrase"))
  main.appendChild(bestPhrase);

  allPhrases=document.createElement("p");
  allPhrases.className="all";
  allPhrases.appendChild(document.createTextNode("all Phrases"));
  main.appendChild(allPhrases);


  stats=document.createElement("p");
  stats.className="stats";
  stats.appendChild(document.createTextNode("stats"))
  main.appendChild(stats);

  timer=document.createElement("p");
  stats.className="timer";
  stats.appendChild(document.createTextNode("timer"))
  main.appendChild(timer);

  target = "to be or not to be";
  popmax = 1000;
  mutationRate = 0.01;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
}

function evolution() 
{
  //fitness
  population.calcFitness();

  // crossover + mutation
  population.naturalSelection();

  //is finished ?
  population.evaluate();

  displayInfo();

}

function displayInfo() 
{
  // Display current status of population
  let answer = population.getBest();

  bestPhrase.innerHTML=("Best phrase:<br>" + answer);

  let statstext = "<b>Stats</b><br>total generations:     " + population.getGenerations() + "<br>";
  statstext += "average fitness:       " + Math.round(population.getAverageFitness()) + "<br>";
  statstext += "total population:      " + popmax + "<br>";
  statstext += "mutation rate:         " + Math.floor(mutationRate * 100) + "%";

  stats.innerHTML=(statstext);

  allPhrases.innerHTML=("<b>All phrases:</b><br>" + population.allPhrases())
}

function draw()
{
  var secs=0;
    var refreshIntervalId=setInterval(
    function(){
        
        if(population.isFinished())  
              clearInterval(refreshIntervalId);

        else
            evolution();

        timer.innerHTML=("<b>"+secs+"</b>");
    secs+=0.01;
    },10);
}