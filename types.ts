export interface User {
    id: number;
    name: string;
  }
  
  export interface GoalUsersProps {
      goalId: string;
  }


export interface goalData {
    text: string
    isWarning: boolean
    owner: string
}

export interface GoalFrontDB { 
    text: string;
    id: string;
  }