import axios from "axios";
import useTokenStore from "@stores/useTokenStore";

export async function getSave(offset = 0) {
  const token = useTokenStore.getState().token;

  try {
    const response = await axios.get(`http://localhost:8080/api/save?offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error("getSave 에러:", error);

    const message =
      error.response?.data?.message ||
      error.message ||
      "서버 오류";

    throw new Error(message);
  }
}

export async function postSave(day, kind, category, amount) {
  const token = useTokenStore.getState().token;

  const response = await fetch(`http://localhost:8080/api/save`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ saveDate: day, kind, category, amount })
  })

  if (!response.ok) {
    throw new Error("서버 오류")
  }

  return await response.json()
}

export async function patchSave(id, payload) {
  const token = useTokenStore.getState().token;

  try {
    const response = await axios.patch(`http://localhost:8080/api/save/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("patchSave 에러:", error);
    const message =
      error.response?.data?.message || error.message || "서버 오류";
    throw new Error(message);
  }
}

export async function deleteSave(id) {
  const token = useTokenStore.getState().token;

  try {
    const response = await axios.delete(`http://localhost:8080/api/expense/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("deleteExpense 에러:", error);
    const message =
      error.response?.data?.message || error.message || "서버 오류";
    throw new Error(message);
  }
}