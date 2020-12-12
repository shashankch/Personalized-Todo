import React, { useState, useEffect } from 'react';
import Todo from './Todo';

function App() {
  // time

  useEffect(() => {
    if (localStorage.getItem('taskList') === null) {
      localStorage.setItem('taskList', JSON.stringify([]));
    } else {
      settaskList(JSON.parse(localStorage.getItem('taskList')));
    }
  }, []);

  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);

  const [task, setTask] = useState('');
  const [taskList, settaskList] = useState([]);
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (localStorage.getItem('taskList') === null) {
      localStorage.setItem('taskList', JSON.stringify([]));
    } else {
      localStorage.setItem('taskList', JSON.stringify(taskList));
    }

    setTimeout(() => setStatus(''), 3000);
  }, [taskList]);
  const onTaskChange = (e) => {
    setTask({ text: e.target.value, done: false, id: Math.random() * 100 });
  };
  const addTask = () => {
    settaskList((prevTasks) => {
      return [...prevTasks, task];
    });
    localStorage.setItem('taskList', JSON.stringify(taskList));
    setTask('');
    setStatus('Task Added !');
  };
  const removeTask = (id) => {
    const updateTaskList = taskList.filter((task) => task.id !== id);
    settaskList(updateTaskList);
    setStatus('Task Removed !');
  };
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

  return (
    <div className='App'>
      <h1 className='clock'>{currentTime}</h1>

      <Todo
        task={task}
        taskList={taskList}
        onTaskChange={onTaskChange}
        addTask={addTask}
        removeTask={removeTask}
        completeTask={completeTask}
        status={status}
      />
    </div>
  );
}

export default App;
