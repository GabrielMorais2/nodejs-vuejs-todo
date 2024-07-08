<!-- App.vue -->
<template>
  <div id="app">
    <task></task>
  </div>
</template>

<script>
import Task from './components/Task.vue'

export default {
  name: 'App',
  components: {
    Task
  }
}
</script>
