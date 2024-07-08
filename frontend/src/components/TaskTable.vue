<template>
    <table class="table-auto w-full border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="border px-4 py-2 text-left">Tarefa</th>
          <th class="border px-4 py-2 text-left">Status</th>
          <th class="border px-4 py-2 text-center">Editar</th>
          <th class="border px-4 py-2 text-center">Deletar</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="task in tasks" 
          :key="task.id" 
          class="bg-white hover:bg-gray-50"
        >
          <td 
            class="border px-4 py-2"
            :class="taskClass(task.status)"
          >
            {{ task.title }}
          </td>
          <td 
            class="border px-4 py-2 cursor-pointer select-none"
            @click="$emit('change-status', task.id, task.status)"
          >
            <span :class="statusClass(task.status)">
              {{ task.status }}
            </span>
          </td>
          <td class="border px-4 py-2 text-center">
            <font-awesome-icon 
              :icon="['fas', 'pen']" 
              class="cursor-pointer text-blue-500 hover:text-blue-600" 
              @click="$emit('edit-task', task.id)"
            />
          </td>
          <td class="border px-4 py-2 text-center">
            <font-awesome-icon 
              :icon="['fas', 'trash']" 
              class="cursor-pointer text-red-500 hover:text-red-600" 
              @click="$emit('delete-task', task.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      tasks: Array,
    },
    methods: {
      taskClass(status) {
        return {
          'line-through text-green-600': status === 'Finalizado',
          'text-red-600': status === 'A fazer',
          'text-yellow-600': status === 'Em progresso',
        };
      },
      statusClass(status) {
        return {
          'text-red-500': status === 'A fazer',
          'text-yellow-500': status === 'Em progresso',
          'text-green-500': status === 'Finalizado',
        };
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
  </style>