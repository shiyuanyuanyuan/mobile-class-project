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
}

export interface GoalFrontDB { 
    text: string;
    id: string;
  }