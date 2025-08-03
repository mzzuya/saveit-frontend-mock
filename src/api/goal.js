// import axios from "/node_modules/.vite/deps/axios.js?v=a717f434"

import  useTokenStore  from "@stores/useTokenStore"

const API_ADDRESS = 'localhost:8080';

export async function getUserExpense() {
  const token = useTokenStore.getState().token;

  const response = await fetch(`http://${API_ADDRESS}/api/goal/expense`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) throw new Error("서버 오류");
  return await response.json();
}

export async function getUserSave() {
  const token = useTokenStore.getState().token;

  const response = await fetch(`http://${API_ADDRESS}/api/goal/save`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) throw new Error("서버 오류");
  return await response.json();
}

export async function getUserGoal() {
  const token = useTokenStore.getState().token;

  const response = await fetch(`http://${API_ADDRESS}/api/goal`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  
  if (!response.ok) throw new Error("서버 오류");
  return await response.json();
}

export async function postUserGoal(goal_amount) {
    const token = useTokenStore.getState().token;

    const response = await fetch(`http://${API_ADDRESS}/api/goal`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({goalAmount : goal_amount})
    })

    if(!response.ok) {
        throw new Error("서버 오류")
    } 

    return await response.json()
} 

