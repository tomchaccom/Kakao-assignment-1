import WeekCalendar from "./components/WeekCalendar.jsx";
import TodoForm from "./components/TodoForm.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import FilteringTabs from "./components/FilteringTabs.jsx";
import TodoList from "./components/TodoList.jsx";

import { useDate } from "./hooks/useDate.js";
import { useTodos } from "./hooks/useTodos.js";
import { useFilter } from "./hooks/useFilter.js";

function App() {
  const { selectedDate, changeSelectedDate, selectDate } = useDate();
  const { todos, isErrorVisible, addTodo, deleteTodo, toggleComplete, startEdit, saveEdit, cancelEdit } = useTodos(selectedDate);
  const { currentFilter, setCurrentFilter, filteredTodos } = useFilter(todos, selectedDate);

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
        todos={filteredTodos} 
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
