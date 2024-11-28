import { defineStore } from 'pinia'

const baselevelScore = 20
const levels = new Array(101).fill(0).map((_,i) => baselevelScore * Math.pow(2, i)) 

const levelScore = levels.map((_, level) => {
  for (let [index, value] of levels.entries()) {
    if (index > level) {
      return value
    } 
  }
  return levels.slice(level + 1).reduce((sum, value) => sum + value, 0)
}); 

function computeLevelByScore(score) {
  for( let [index, value] of levelScore.entries()){
    if(score < value){
      return { 
        level: index, 
        value: levels[index]
      }
    }
  }
}

export const useScoreStore = defineStore('score', {
  state: () => ({
    score: 0,
  }),
  getters:{
    level: (state) => computeLevelByScore(state.score),  
    currentScore(state){
      if (this.level.level == 0) {
        return state.score
      }
      return state.score - levelScore[this.level.level - 1]
    } 
  },
  actions: {
    add(score = 1){
      this.score += score
    }, 
    setScore(score){
      this.score = score
    }
  }
})
