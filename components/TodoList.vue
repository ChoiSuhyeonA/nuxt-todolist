<template>
  <section>
    <ul>
      <li v-for="(todoItem, index) in propsdata" :key="index" >
         <i class="checkBtn fas fa-check" aria-hidden="true"></i>
         {{ todoItem.name }}
         <span class="removeBtn" type="Button" @click="removeTodo(todoItem.id, index)">
           <i class ="far fa-trash-alt" aria-hidden="true"></i>
         </span>
      </li>
    </ul> 
    <infinite-loading  spinner="spiral" @infinite="infiniteScroll"></infinite-loading>

    <!-- <RecycleScroller
      class="scroller"
      :items="propsdata"
      :item-size="32"
      key-field="index"
      v-slot="{ todoItem }"
    >
      {{ todoItem.name }}
     </RecycleScroller> -->
  </section>
</template>



<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator';
import inputs from '@/components/TodoInput.vue'
import InfiniteLoading from 'vue-infinite-loading'
import AxiosInstance from '~/util/api'
// import VueVirtualScroller from 'vue-virtual-scroller'


@Component
export default class TodoList extends Vue{

  
  // eslint-disable-next-line vue/require-prop-types   
   //props:['propsdata']
   @Prop() propsdata: string[] | undefined
   @Prop() page: any | undefined

  //임시 배열 변수 Data입니다.
  Data: string[] =['']
   //computed
  get url(){
    return "/api/todolist/" + this.page;
  }

  public async infiniteScroll($state: {​​​​​​​​ loaded: () =>void; complete: () =>void }​​​​​​​​​​​​​​​​){
      setTimeout((async) => {
					  this.page = this.page+10
            this.Data = []
            this.$axios.get(this.url).then((res)=>{
           // this.Data= res.data
      	
						if (res &&res.data.length > 1) {
              res.data.forEach((todoItem: any) => this.Data.push(todoItem))     
              this.$emit('deliveryInfinite', this.Data, this.page)
							$state.loaded()							
							} else {							
							$state.complete()
							}
					})
					.catch((err) => {
						console.log(err)
					})
				}, 1000)
  }
  
  public removeTodo(todoItem:string, index:number):void{
     this.$emit('removeTodo', todoItem, index);
    }
  //  @Emit('removeTodo')
  //  removeTodo(todoItem:string, index:number){
  //    return (todoItem, index)
  //  }
  
}
</script>

<style scoped>
  ul{
    /* 리스트에 점을 없애준다. */
    list-style-type: none; 
    padding-left: 0px;
    margin-top: 0;
    text-align: left; 
    margin-left: 10px;
  }
  li{
    display: flex;
    min-height:30px;
    height:50px;
     line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 20px;
  }
  .checkBtn{
    line-height: 45px;
    color:rgb(7, 177, 126);
    margin-left: 30px;
    margin-right: 70px;
  }
  .removeBtn{
    margin-left:auto;
    color:rgb(245, 9, 213)
  }
</style>