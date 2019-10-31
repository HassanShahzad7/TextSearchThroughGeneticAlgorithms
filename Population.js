
class Population
{

    constructor(t, r, num)
    {
        this.population; // Array to hold the current population
        this.nextGeneration;
        this.totalFitness=0;
        this.generations = 0; // Number of generations
        this.finished = false; // Are we finished evolving?
        this.target = t; // Target phrase
        this.mutationRate = r; // Mutation rate
        this.best;
        this.worst;
        

        this.population=[];
        for (let i = 0; i < num; i++) {
            this.population[i] = new DNA(this.target.length);
          }

    }

    calcFitness()
    {
        this.total=0;
        for(let i=0;i<this.population.length;i++)
        {
            this.population[i].calcFitness(this.target);
            this.total+=this.population[i].fitness;
        }

    }

    naturalSelection()
    {
        this.best = 0;
        this.worst=0;
        var elite=0;
        this.nextGeneration=[];
        for (let i = 0; i < this.population.length; i++) 
        {
           
          if (this.population[i].fitness > this.population[this.best].fitness)
            this.best=i;

          if (this.population[i].fitness < this.population[this.worst].fitness)
            this.worst=i;
        }

        for(let i=0;i<this.population.length;i++)
        {
        let parentA=this.getParent();
        let parentB=this.getParent();
        if(parentA.fitness>1.5*this.getAverageFitness()) elite++;
        if(parentB.fitness>1.5*this.getAverageFitness()) elite++;
        this.nextGeneration[i] = parentA.crossover(parentB);
        this.nextGeneration[i].mutate(0.01);
        }

        this.population=this.nextGeneration;
        this.generations++;
        console.log(elite/(this.population.length*2));
    }

    getParent()
    {
        while(true)
        {
        let a=Math.floor(Math.random()*this.population.length);
        let x=Math.floor(Math.random()*(this.population[this.best].fitness-this.population[this.worst].fitness+1))+this.population[this.worst].fitness;
        if(this.population[a].fitness>=x && this.population[a].fitness>=this.getAverageFitness())
                return this.population[a];
        }
    }

    evaluate()
    {
        if(this.target==this.population[this.best].getPhrase())
            this.finished=true;
    }

    isFinished()
     {
        return this.finished;
    }
    
    getGenerations() 
    {
        return this.generations;
    }
    
      // Compute average fitness for the population
    getAverageFitness() 
    {
        return (this.total / (this.population.length));
    }
    
      allPhrases() 
    {
        let everything = "";
    
        let displayLimit = Math.min(this.population.length, 50);
    
    
        for (let i = 0; i < displayLimit; i++)
          everything += this.population[i].getPhrase() + "<br>";
        
        return everything;
    }

    getBest()
    {
        return this.population[this.best].getPhrase();
    }

}