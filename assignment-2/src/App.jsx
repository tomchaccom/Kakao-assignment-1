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
    <div className="bg-white w-full max-w-[480px] rounded-[30px] shadow-[0_10px_30px_rgba(150,150,150,0.08)] p-8 m-5">
      <header className="mb-6 text-center">
          <h1 className="text-[#5f1bd5] text-[28px] font-bold">My Todos</h1>
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
