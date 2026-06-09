import WeekCalendar from "./components/WeekCalendar.jsx";
import TodoForm from "./components/TodoForm.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import FilteringTabs from "./components/FilteringTabs.jsx";
import TodoList from "./components/TodoList.jsx";

function App() {
  return (
    <>
   <WeekCalendar />
   <TodoForm />
   <ErrorMessage />
   <FilteringTabs />
   <TodoList />

   </>
  )
}
export default App
