<template>
  <div class="inputBox">
    <input  v-model="newTodoItem" type="text" class= "inputContent" placeholder="Type what you have to do" @keyup.enter ="addTodo">
    <span class="addContainer" @abort="addTodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop , Emit} from 'nuxt-property-decorator';
@Component
export default class TodoInput extends Vue{
 
   newTodoItem:string=''
   
  // public addTodo():void{
  //     if(this.newTodoItem!==""){
  //       const value:string = this.newTodoItem && this.newTodoItem.trim() ;
  //         this.$emit('addTodo', value);
  //         this.newTodoItem  ='' 
  //     }
  //   }

  @Emit('addTodo')
  addTodo(){
     if(this.newTodoItem!==""){
      const value:string = this.newTodoItem && this.newTodoItem.trim() ;
      
      this.newTodoItem  =''
      return value
     }
    

  }
  
}
</script>



<style scoped>
   /*input의 영역을 보여주지 않는다.*/
  /* input:focus{
    outline:none;
  } */
  .inputContent{
     background:rgb(200, 234, 240);
   width: 50em;
    text-align: center;
  }
  .inputBox{
      background:rgb(200, 234, 240);
    height:50px;
    line-height: 50px;
    border-radius:5px
  }
  .inputBox input{
    border-style:none;
    font-size: 0.9rem;
  }
  .addContainer{
    float:right;
    background:linear-gradient(to right, #a7f7cf, #e0fa9a);
    display: block;
    width:3rem;
    border-radius: 0 5px 5px 0;
  }
  .addBtn{
    color:white;
       vertical-align: middle;
  }
</style>