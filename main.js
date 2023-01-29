Vue.component('like-button', {
  props: ['counter'],
  template: ` <button type="button" @click="increment">&#9829; {{ counter }}</button>`,
  methods: {
    increment() {
      this.$emit('update:counter', this.counter + 1);
    },
  },
});

Vue.component('dislike-button', {
  model: {
    prop: 'discount',
    event: 'enter',
  },
  props: ['discount'],
  template: ` <button type="button" @click="incrementDis">&#128148; {{ discount }}</button>`,
  methods: {
    incrementDis() {
      this.$emit('enter', this.discount + 1);
    },
  },
});

Vue.component('task-list', {
  props: ['tasks'],

  template: `
  <div class="list">
 <h2 v-if="">Завершенные задачи</h2>
        <div class="item" :class="{done: task.done}" v-for="task in tasks" :key="task.text">
          <input type="checkbox" v-model="task.done" />
          {{ task.text }}
          <like-button :counter.sync="task.likes" @click="increment()"></like-button>
          <dislike-button v-model="task.dislikes" @click="incrementDis()"></dislike-button>
        </div>
      </div>`,
});

var app = new Vue({
  el: '#app',
  data: {
    headerLikes: 2,
    formLikes: 3,
    headerDislikes: 2,
    formDislikes: 3,
    message: 'hello vue!',
    tasks: [
      {
        text: 'Развернуть окружение в Codepen',
        done: true,
        likes: 1,
        dislikes: 4,
      },
      { text: 'Пройти курс по Vue', done: false, likes: 2, dislikes: 5 },
      {
        text: 'Сделать интернет-магазин на Vue',
        done: false,
        likes: 2,
        dislikes: 6,
      },
    ],
  },
  methods: {
    addTask() {
      this.tasks.push({
        text: this.message,
        done: false,
        likes: 0,
        dislikes: 0,
      });
      this.message = '';
    },
    countDone() {
      return this.tasks.filter((task) => task.done).length;
    },
    countLikes() {
      return (
        this.headerLikes +
        this.formLikes +
        this.tasks.reduce((value, task) => value + task.likes, 0)
      );
    },
    countDislikes() {
      return (
        this.headerDislikes +
        this.formDislikes +
        this.tasks.reduce((value, task) => value + task.dislikes, 0)
      );
    },
  },
  computed: {
    count() {
      return this.tasks.filter((task) => !task.done).length;
    },
    completedTasks() {
      return this.tasks.filter((task) => task.done);
    },
    uncompletedTasks() {
      return this.tasks.filter((task) => !task.done);
    },
  },
});
