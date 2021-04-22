<template>
  <input v-model="form.firstName" type="text" />
  <input v-model="form.lastName" type="text" />
  <button @click="create">create</button>
  <ul>
    <li v-for="{firstName,lastName,id} in list" :key="id">
      {{ firstName }} {{ lastName }}
      <span style="cursor: pointer;color: red;" @click="remove(id)">X</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { User } from 'backend/user/entities/user.entity';
import { UserController } from 'backend/user/user.controller';
import { wrap } from '../../../../dist/index.js';

export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    const list = ref<User[]>([])
    const ctl = wrap(UserController)
    ctl.findAll().then(res => {
      list.value = res.results
    })
    async function create() {
      await ctl.create(form.value)
      await ctl.findAll().then(v => list.value = v.results)
    }
    
    async function remove(id: number) {
      await ctl.remove(id.toString())
      await ctl.findAll().then(v => list.value = v.results)
    }
    const form = ref<CreateUserDto>({ lastName: '', firstName: '' })
    return { create, remove, list, form }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul {
  list-style: none;
}
</style>
