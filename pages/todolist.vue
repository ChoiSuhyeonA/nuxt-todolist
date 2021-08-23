<template>
  <div id="app">
    {{data}}
    {{data2}}
    <TodoHeader></TodoHeader>
    <TodoInput @addTodo="addTodo"></TodoInput>
    <TodoList :propsdata="todoItems" @removeTodo="removeTodo"></TodoList>
    <TodoFooter @removeAll ="clearAll"></TodoFooter>
    
  </div>
</template>


<script lang="ts">
import TodoHeader from '../components/TodoHeader.vue'
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import TodoFooter from '../components/TodoFooter.vue'
import Vue from 'vue'

export default Vue.extend ({
  
  components:{
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },

  data(){      
     return {
     data : '',
     data2: '',
      todoItems : ['']  
     } ;
  }
    
   
    
    // return {
    //  todoItems : ['']  
    // } as {
    //     todoItems: Array<string>
    // };
  ,   
  async created() {
    await this.$axios.get('/api/todolist').then((res) =>{
        //const result: string = res.data
       this.data = res.data.name
       this.data2 = res.data.name2
    });
    
  },
  methods:{
   
     addTodo(todoItem: string){
        localStorage.setItem(todoItem, todoItem);
        this.todoItems.push(todoItem);
     },
     clearAll():void{
       localStorage.clear();
       this.todoItems = [];
     },
     removeTodo(todoItem: string, index: number):void{
       localStorage.removeItem(todoItem);
       this.todoItems.splice(index, 1)
     }
  }
})
</script>

<style>
  body{
    text-align: center;
    background-color: #91e0fd;
  }
  input{
    border-style: groove;
    width:200px;
  }
  button{
    border-style:groove;
  }
  .shadow{
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.03);
  }
</style>
