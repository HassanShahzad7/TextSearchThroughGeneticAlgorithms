/*
function   newChar() 
{
    let c=Math.floor(Math.random()*(57-48+1)+48);
  
    return String.fromCharCode(c);
}*/

function newChar() {
    let c = Math.floor(Math.random()*(123-97+1)+97);
    if (c === 123) c = 32;
    //if (c === 64) c = 46;
  
    return String.fromCharCode(c);
  }

class DNA
{
    constructor(length)
    {
        // The genetic sequence
        this.genes = [];
        this.fitness = 0;

        for (let i = 0; i < length; i++)
            this.genes[i] = newChar(); // Pick from range of chars
    }

    getPhrase()
    {
        return this.genes.join("");
    }

    calcFitness(target)
    {
        let score=0;
        for(let i=0;i<this.genes.length;i++)
            if(this.genes[i]==target.charAt(i))
                score++
            
        this.fitness=Math.pow(2,score);
    }

    crossover(parent)
    {
        let child=new DNA(this.genes.length);
        var a=this.genes.length;
        if(Math.random()<0.8)
         a= Math.floor(this.genes.length/2);
        //let a=Math.floor(Math.random()*this.genes.length);

        for(let i=0;i<this.genes.length;i++)
            if(i<a)
                child.genes[i]=this.genes[i];
            else
                child.genes[i]=parent.genes[i];
        
        return child;

    }

    mutate(mutationRate)
    {
        for(let i=0;i<this.genes.length;i++)
            if(Math.random()<mutationRate)
                this.genes[i]=newChar();
    }

}