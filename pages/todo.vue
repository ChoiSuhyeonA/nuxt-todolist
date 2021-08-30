<template>
  <div id="app">

    <TodoHeader></TodoHeader>
    <TodoInput @addTodo="addTodo"></TodoInput>
    <TodoList :propsdata="todoItems" @removeTodo="removeTodo"></TodoList>
    <TodoFooter @removeAll ="clearAll"></TodoFooter>

  </div>
</template>


<script lang="ts">
import TodoHeader from '~/components/TodoHeader.vue'
import TodoInput from '~/components/TodoInput.vue'
import TodoList from '~/components/TodoList.vue'
import TodoFooter from '~/components/TodoFooter.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { param } from '~/api/todolist'
import axios from 'axios'

 @Component({
    components:{
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
    }
  })

export default class MainComponent extends Vue {

    //변수
    public newTodoItem:String= ''
    public deleteTodoItem:String= ''
    public todoItems:String[] = [''] 
 
  //생성될때 실행되는 메서드
  private created() {
     this.init()
  }
  
    
    public async init(){
      await this.$axios.get('/api/todolist').then((res)=>{
        this.todoItems= res.data
        // console.log(this.todoItems)
         console.log('init test')
      })
    }   
    //  async addTodo(todoItem: string){
    //     // localStorage.setItem(todoItem, todoItem);
    //     // this.todoItems.push(todoItem);
       
    //      //새로 추가할 데이터 값을 서버에게 전달.
    //     this.newTodoItem = todoItem
    //     await this.$axios.get('/api/todolist/insert', {
    //      params:{ value:this.newTodoItem}
    //     }).then((res)=>{
    //       this.init()
    //     })
    public  async addTodo(todoItem: string){
        this.newTodoItem = todoItem
        this.$axios.post('/api/todolist/', {
         data:{ 'value':this.newTodoItem}
        }).then( (res => {
          console.log('add init test')
          this.init()
        }))
    }
    public async clearAll(){
      //  localStorage.clear();
      //  this.todoItems = [];
      await this.$axios.delete('api/todolist/').then((res)=> {
        this.init()
      })
     }
    public  async removeTodo(todoItem: string, index: number){
      //  localStorage.removeItem(todoItem);
      //  this.todoItems.splice(index, 1)
          this.deleteTodoItem = todoItem
          await this.$axios.delete(`/api/todolist/${this.deleteTodoItem}`, {
            data:{value:this.deleteTodoItem}
          }).then((res)=>{
              this.init()
          })
     }
  
}
</script>

<style>
  body{
    text-align: center;
    background-color: #91e0fd;
  }
  ul{
    list-style: none;
    text-align: left;
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