<template>
  <div class="container">
    <h1>TODO List</h1>
    <div class="App">
      <form v-on:submit.prevent="addNewTask">
        <input type="text" placeholder="Add New Task" v-model="taskname" id="tasknameinput" />
        <button v-if="this.isEdit === false">Submit</button>
        <button type="button" v-else v-on:click.prevent="updateTask">Update</button>
      </form>

      <div class="wrapper">
        <div class="listView" v-for="(todo) in todos" v-bind:key="todo._id">
          <p class="text">
            {{todo.text}}
            <!-- <span class="btn" v-on:click.prevent="editTask(todo.text, todo._id)">Edit</span> -->
            <!-- <span class="btn" v-on:click="deleteTask(todo._id)">Delete</span> -->
          </p>
          <div class="btns">
            <button class="btn" v-on:click.prevent="editTask(todo.text, todo._id)">Edit</button>
            <button class="btn" type="button" v-on:click="deleteTask(todo._id)">Delete</button>
          </div>
          <!-- <fa-icon class="faicons" icon="trash" /> -->
        </div>
      </div>
      <!-- <table>
        <tr v-for="(todo) in todos" v-bind:key="todo._id" v-bind:text="todo.text">
          <td>{{todo.text}}</td>
          <button v-on:click.prevent="editTask(todo.text, todo._id)">Edit</button>
          <button type="button" v-on:click="deleteTask(todo._id)">Delete</button>
        </tr>
      </table>-->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      todos: [],
      id: "",
      taskname: "",
      isEdit: false,
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios.get("/api/todo").then(
        (result) => {
          this.todos = result.data.response;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    addNewTask() {
      axios
        .post("/api/todo", { text: this.taskname })
        .then((res) => {
          this.taskname = "";
          this.getTasks();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editTask(text, id) {
      // console.log(text, id);
      this.id = id;
      this.taskname = text;
      this.isEdit = true;
      console.log(this.taskname, this.id);
    },
    updateTask() {
      axios
        .put("/api/todo/" + this.id, { text: this.taskname })
        .then((res) => {
          this.taskname = "";
          this.isEdit = false;
          this.getTasks();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask(id) {
      axios
        .delete(`/api/todo/${id}`)
        .then((res) => {
          this.taskname = "";
          this.getTasks();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
  border: 0;
}

html {
  background-color: #318085;
  /* height: 100%; */
  overflow: hidden;
}

/* .list-container {
  height: 415px;
  overflow: auto;
} */

.container {
  background-color: #318085;
  width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-weight: bold;
}

h1 {
  margin-top: 25px;
  margin-bottom: 7px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 600;
  font-size: 37px;
  color: white;
  text-transform: uppercase;
  /* fon */
}

.App {
  background-color: #3f3160;
  width: 500px;
  height: 590px;
  border-radius: 7px;
  margin-bottom: 25px;
}

input {
  width: 350px;
  height: 50px;
  border-radius: 7px;
  margin: 25px 7px 11px 29px;
  padding: 0 9px;
  color: rgb(73, 45, 45);
  font-size: 23px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 600;
}

button {
  width: 85px;
  height: 35px;
  border-radius: 7px;
  color: black;
  font-size: 19px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 600;
}

.btn {
  width: 61px;
  height: 25px;
  font-size: 13px;
  /* margin-top: -15px; */
  margin-bottom: 11px;
  /* margin-left: 1px; */
  margin-right: 7px;
  /* background-color: white; */
  color: black;
}

.wrapper {
  height: 500px;
  overflow-y: auto;
  /* background-color: white; */
}

.listView {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 92%;
  height: 50px;
  margin: 5px 11px 0;
  background-color: tomato;
  color: whitesmoke;
  padding: 5px 5px 0;
  border-radius: 5px;
  letter-spacing: 1px;
  font-size: 21px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bolder;
  /* margin: 15px; */
}

/* .text {
  margin: 5px;
  background-color: tomato;
} */

@media (max-width: 550px) {
  h1 {
    font-size: 29px;
    padding: 3px;
  }
  .list-container {
    height: 415px;
    overflow-y: auto;
  }
  #container {
    /* z-index: 11; */
    width: 100vw;
    height: 100vh;
  }

  .App {
    width: 270px;
    height: 500px;
  }

  input {
    width: 180px;
    height: 41px;
    margin-top: 15px;
    margin-left: 9px;
    font-size: 19px;
  }

  button {
    width: 65px;
    height: 25px;
    font-size: 15px;
  }

  .btn {
    width: 41px;
    height: 21px;
    font-size: 10px;
    margin-bottom: 7px;
    margin-right: 3px;
  }

  .listView {
    width: 91%;
    font-size: 17px;
    height: 37px;
  }
  p {
    line-height: 21px;
  }
}
</style>