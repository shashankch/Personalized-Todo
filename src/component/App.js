import React, { useState, useEffect } from 'react';
import Todo from './Todo';

function App() {
  //states
  const [task, setTask] = useState('');
  const [taskList, settaskList] = useState([]);
  const [status, setStatus] = useState('');
  const [filter, setFilter] = useState('filter');
  const [filterList, setFilterList] = useState([]);

  //on filter or task add/remove
  useEffect(() => {
    onFilterChange();
  }, [taskList, filter]);

  // fetch once from localStorage
  useEffect(() => {
    if (localStorage.getItem('taskList') === null) {
      localStorage.setItem('taskList', JSON.stringify([]));
    } else {
      settaskList(JSON.parse(localStorage.getItem('taskList')));
    }
  }, []);

  // display time..
  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);
  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);

  // to display filtered list on selection
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  //update local storage & display notifications on list change
  useEffect(() => {
    if (localStorage.getItem('taskList') === null) {
      localStorage.setItem('taskList', JSON.stringify([]));
    } else {
      localStorage.setItem('taskList', JSON.stringify(taskList));
    }
    setTimeout(() => setStatus(''), 3000);
  }, [taskList]);

  //set task on input change
  const onTaskChange = (e) => {
    setTask({ text: e.target.value, done: false, id: Math.random() * 100 });
  };

  //add task to list and set notify message(status) && localStorage update
  const addTask = () => {
    settaskList((prevTasks) => {
      return [...prevTasks, task];
    });
    localStorage.setItem('taskList', JSON.stringify(taskList));
    setTask('');
    setStatus('Task Added !');
  };

  //remove task
  const removeTask = (id) => {
    const updateTaskList = taskList.filter((task) => task.id !== id);
    settaskList(updateTaskList);
    setStatus('Task Removed !');
  };

  //cross task completed and set notify message.
  const completeTask = (id) => {
    settaskList(
      taskList.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      })
    );
    setStatus('Task Status updated !');
  };

  //update filtered list on status
  const onFilterChange = () => {
    if (filter === 'Done') {
      setFilterList(taskList.filter((task) => task.done === true));
    } else if (filter === 'Not-Done') {
      setFilterList(taskList.filter((task) => task.done === false));
    } else {
      setFilterList(taskList);
    }
  };

  return (
    <div className='App'>
      <h1 className='clock'>{currentTime}</h1>

      <Todo
        task={task}
        onTaskChange={onTaskChange}
        addTask={addTask}
        removeTask={removeTask}
        completeTask={completeTask}
        status={status}
        filter={filter}
        filterList={filterList}
        handleChange={handleChange}
      />
    </div>
  );
}

export default App;
