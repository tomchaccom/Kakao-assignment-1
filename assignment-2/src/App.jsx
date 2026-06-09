import { useState, useEffect } from "react";
import WeekCalendar from "./components/WeekCalendar.jsx";
import TodoForm from "./components/TodoForm.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import FilteringTabs from "./components/FilteringTabs.jsx";
import TodoList from "./components/TodoList.jsx";
import { formatDateKey } from "./utils/date.js";

const TODO_STORAGE_KEY = 'todo-list';

function App() {
  const [todos, setTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    if (storedTodos !== null) {
      const parsedTodos = JSON.parse(storedTodos).map(todo => ({
        ...todo,
        isEditing: false
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // Save to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() === '') {
      setIsErrorVisible(true);
      return;
    }
    setIsErrorVisible(false);

    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      date: formatDateKey(selectedDate),
      isCompleted: false,
      isEditing: false
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const toggleComplete = (todoId) => {
    setTodos(todos.map(todo => 
      todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const startEdit = (todoId) => {
    setTodos(todos.map(todo => 
      todo.id === todoId ? { ...todo, isEditing: true } : todo
    ));
  };

  const saveEdit = (todoId, newText) => {
    if (newText.trim() === '') {
      alert('수정할 내용을 입력해주세요.');
      return;
    }
    setTodos(todos.map(todo => 
      todo.id === todoId ? { ...todo, text: newText.trim(), isEditing: false } : todo
    ));
  };

  const cancelEdit = (todoId) => {
    setTodos(todos.map(todo => 
      todo.id === todoId ? { ...todo, isEditing: false } : todo
    ));
  };

  const changeSelectedDate = (dayAmount) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + dayAmount
    );
    setSelectedDate(newDate);
  };

  const selectDate = (date) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(newDate);
  };

  const getFilteredTodos = () => {
    const selectedDateKey = formatDateKey(selectedDate);
    const selectedDateTodos = todos.filter(todo => todo.date === selectedDateKey);

    if (currentFilter === 'active') {
      return selectedDateTodos.filter(todo => !todo.isCompleted);
    }

    if (currentFilter === 'completed') {
      return selectedDateTodos.filter(todo => todo.isCompleted);
    }

    return selectedDateTodos;
  };

  return (
    <div className="container">
      <header>
          <h1>My Todos</h1>
      </header>
      <WeekCalendar 
        selectedDate={selectedDate} 
        changeSelectedDate={changeSelectedDate} 
        selectDate={selectDate} 
        todos={todos} 
      />
      <TodoForm addTodo={addTodo} />
      <ErrorMessage isVisible={isErrorVisible} />
      <FilteringTabs currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
      <TodoList 
        todos={getFilteredTodos()} 
        deleteTodo={deleteTodo} 
        toggleComplete={toggleComplete} 
        startEdit={startEdit} 
        saveEdit={saveEdit} 
        cancelEdit={cancelEdit} 
      />
    </div>
  );
}

export default App;
