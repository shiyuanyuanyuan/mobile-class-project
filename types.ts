export interface User {
    id: number;
    name: string;
  }
  
  export interface GoalUsersProps {
      goalId: string;
  }

export interface UserInput {
    text: string;
    image: string;
}

export interface goalData {
    text: string
    isWarning: boolean
    owner: string
    image?: string
}

export interface GoalFrontDB { 
    text: string;
    id: string;
  }