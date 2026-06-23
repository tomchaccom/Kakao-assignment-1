"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} 환경변수가 설정되지 않았습니다.`);
  }
  return value;
}

const API_URL = getRequiredEnv("NEXT_PUBLIC_API_URL");

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoFormState = {
  error: string | null;
};

const initialErrorMessage = "요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.";

async function getErrorMessage(response: Response) {
  try {
    const body = (await response.json()) as { detail?: string };
    return body.detail ?? initialErrorMessage;
  } catch {
    return initialErrorMessage;
  }
}

async function requestTodos(todoId?: number, init?: RequestInit) {
  const url = new URL(`${API_URL.replace(/\/$/, "")}/todos`);

  if (todoId !== undefined) {
    url.searchParams.set("id", String(todoId));
  }

  return fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
}

async function saveTodo(
  todoId: number | null,
  title: string,
  completed: boolean,
) {
  const response = await requestTodos(todoId ?? undefined, {
    method: todoId === null ? "POST" : "PUT",
    body: JSON.stringify({ title, completed }),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}

export async function getTodos(): Promise<Todo[]> {
  const response = await requestTodos();

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json() as Promise<Todo[]>;
}

export async function getTodo(todoId: number): Promise<Todo | undefined> {
  const todos = await getTodos();
  return todos.find((todo) => todo.id === todoId);
}

export async function createTodo(
  _previousState: TodoFormState,
  formData: FormData,
): Promise<TodoFormState> {
  const title = String(formData.get("title") ?? "").trim();

  if (!title) {
    return { error: "할 일을 입력해주세요." };
  }

  try {
    await saveTodo(null, title, false);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : initialErrorMessage,
    };
  }

  revalidatePath("/todos");
  redirect("/todos");
}

export async function updateTodo(
  todoId: number,
  _previousState: TodoFormState,
  formData: FormData,
): Promise<TodoFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const completed = formData.get("completed") === "on";

  if (!title) {
    return { error: "할 일을 입력해주세요." };
  }

  try {
    await saveTodo(todoId, title, completed);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : initialErrorMessage,
    };
  }

  revalidatePath("/todos");
  redirect("/todos");
}

export async function toggleTodo(
  todoId: number,
  title: string,
  completed: boolean,
) {
  await saveTodo(todoId, title, completed);
  revalidatePath("/todos");
}

export async function deleteTodo(todoId: number) {
  const response = await requestTodos(todoId, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  revalidatePath("/todos");
}
