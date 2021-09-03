<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput @addTodo="addTodo"></TodoInput>
    <TodoList :propsdata="todoItems" :page="page"  @removeTodo="removeTodo" @deliveryInfinite="deliveryInfinite"></TodoList>
    <TodoFooter @removeAll ="clearAll"></TodoFooter>
  
  </div>
</template>

<script lang="ts">
import TodoHeader from '~/components/TodoHeader.vue'
import TodoInput from '~/components/TodoInput.vue'
import TodoList from '~/components/TodoList.vue'
import TodoFooter from '~/components/TodoFooter.vue'
import { Component, State, Vue } from 'nuxt-property-decorator';
import AxiosInstance from '~/util/api'


//import {store}from '~/store/index'

import { param } from '~/api/todolist'
import axios from 'axios'
import {stores} from 'store/index'


 

 @Component({
    components:{
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
    //  },
    // computed:{
    //   ...itemHelper.mapState({
    //    todoItems: state => state.todoItems
    //   })

    // },
    // methods:{
    //    ...itemHelper.mapMutations([
    //     'changeTodoItems'     // -> this.changeTodoItems()
    // ])
    
    }
  })



export default class MainComponent extends Vue {

  
    //변수
    public newTodoItem:String= ''
    public deleteTodoItem:String= ''
    public todoItems:String[] = [''] 
    
    //public todoItems = this.$store.state.item.todoItems
    
 
  //생성될때 실행되는 메서드
  private created() {
    // this.init() 
      this.fetchData()
  }
    
  // public get todos(){
  //   return this.$store.state.todoItems
  // }

    public async init(){
      // await this.$axios.get('/api/todolist').then((res)=>{
      //   //this.$store.commit('items/changeTodoItems', res.data)
      //  this.todoItems= res.data
      // })
     
      await AxiosInstance.getSearch().then((res)=>{
        //this.$store.commit('items/changeTodoItems', res.data)
       this.todoItems= res.data
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
        this.newTodoItem = todoItem;
         await AxiosInstance.postAdd(this.newTodoItem)
        .then( (res => {
          console.log('add data : ' + this.newTodoItem)
          this.init()
        }))
    }
    // public  async addTodo(todoItem: string){
    //     this.newTodoItem = todoItem
    //     this.$axios.post('/api/todolist/', {
    //      data:{ 'value':this.newTodoItem}
    //     }).then( (res => {
    //       console.log('add data : ' + this.newTodoItem)
    //       this.init()
    //     }))
    // }
    public async clearAll(){
      //  localStorage.clear();
      //  this.todoItems = [];
      await AxiosInstance.deleteClearAll().then((res)=> {
           this.init()
      })
     }
     public  async removeTodo(todoItem: string, index: number){
      //  localStorage.removeItem(todoItem);
      //  this.todoItems.splice(index, 1)
          this.deleteTodoItem = todoItem
          await AxiosInstance.deleteClear(this.deleteTodoItem)
          .then((res)=>{
               this.init()
          })
     }
    // public  async removeTodo(todoItem: string, index: number){
    //   //  localStorage.removeItem(todoItem);
    //   //  this.todoItems.splice(index, 1)
    //       this.deleteTodoItem = todoItem
    //       await this.$axios.delete(`/api/todolist/${this.deleteTodoItem}`, {
    //         data:{value:this.deleteTodoItem}
    //       }).then((res)=>{
    //           this.init()
    //       })
    //  }
 
 
 
 // infinite scroll 구현
  page=0
  //computed
  get url(){
    return "/api/todolist/" + this.page;
  }
  async fetchData() {
    const res = await this.$axios.get(this.url)
    this.todoItems = res.data
  }
  
  deliveryInfinite(Data:string[], page:any){
    Data.forEach((todoItem: any) => this.todoItems.push(todoItem))     
    this.page =page
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