 // Generates a random integer between the min and max
  export const getRandomInteger = (min:number,max:number) => {
    return Math.floor(Math.random() * (max-min+1))+ min
  }

