<template>
    <div class="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
      <h2 class="text-center text-3xl font-bold text-gray-800 mb-5">To do - Node Js + Vue js</h2>
  
      <div class="flex items-center mb-5">
        <input 
          type="text" 
          v-model="taskTitle" 
          placeholder="Digite a sua tarefa..."
          class="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-indigo-200" 
        />
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          @click="submitTask"
        >
          {{ editedTask !== null ? 'UPDATE' : 'SUBMIT' }}
        </button>
      </div>
  
      <TaskTable 
        :tasks="tasks" 
        @change-status="changeStatus"
        @edit-task="editTask"
        @delete-task="deleteTask"
      />
    </div>
  </template>
  
  <script>
  import TaskTable from './TaskTable.vue';
  import TaskService from '../service/TaskService';
  
  export default {
    name: "Task",
    components: {
      TaskTable,
    },
    data() {
      return {
        taskTitle: "",
        editedTask: null,
        tasks: [],
        statuses: ["A fazer", "Em progresso", "Finalizado"]
      };
    },
    created() {
      this.fetchTasks();
    },
    methods: {
      fetchTasks() {
        TaskService.getTasks()
          .then(response => {
            this.tasks = response.data.map(task => ({
              ...task,
              status: task.status || 'A fazer'
            }));
          })
          .catch(error => {
            console.error('Error fetching tasks:', error);
          });
      },
      changeStatus(id, currentStatus) {
        let newIndex = this.statuses.indexOf(currentStatus);
        if (++newIndex >= this.statuses.length) newIndex = 0;
        TaskService.updateTaskStatus(id, this.statuses[newIndex])
          .then(() => {
            this.fetchTasks();
          })
          .catch(error => {
            console.error('Error updating task status:', error);
          });
      },
      deleteTask(id) {
        TaskService.deleteTask(id)
          .then(() => {
            this.fetchTasks();
          })
          .catch(error => {
            console.error('Error deleting task:', error);
          });
      },
      editTask(id) {
        const task = this.tasks.find(task => task.id === id);
        this.taskTitle = task.title;
        this.editedTask = id;
      },
      submitTask() {
        if (this.taskTitle.length === 0) return;
        if (this.editedTask !== null) {
          TaskService.updateTask(this.editedTask, this.taskTitle)
            .then(() => {
              this.fetchTasks();
            })
            .catch(error => {
              console.error('Error updating task:', error);
            });
          this.editedTask = null;
        } else {
          TaskService.createTask(this.taskTitle)
            .then(() => {
              this.fetchTasks();
            })
            .catch(error => {
              console.error('Error creating task:', error);
            });
        }
        this.taskTitle = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .pointer {
    cursor: pointer;
  }
  
  .select-none {
    user-select: none;
  }
  
  .line-through {
    text-decoration: line-through;
  }
  
  .table-auto th, .table-auto td {
    padding: 0.5rem;
  }
  
  .table-auto th {
    background-color: #f9fafb;
  }
  
  .bg-white {
    background-color: #ffffff;
  }
  
  .hover\:bg-gray-50:hover {
    background-color: #f9fafb;
  }
  </style>