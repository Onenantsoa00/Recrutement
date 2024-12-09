<template>
    <!-- <div class = "bg-gray-800">hey</div> -->
    <router-view></router-view>

</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color : #2c3e50
}
/* 
body {
background-color: rgb(128, 110, 90);
}

* {
margin: 0;
padding: 0;
list-style: none;
text-decoration: none;
}

.sidebar {
position: fixed;
left: -250px;
width: 250px;
height: 100%;
background: rgb(0, 30, 95);
transition: all 0.5s ease;
}

.sidebar header {
font-size: 22px;
color: white;
text-align: center;
line-height: 70px;
background: rgb(0, 56, 177);
user-select: none;
}

.sidebar ul a {
display: block;
height: 100%;
width: 100%;
line-height: 65px;
font-size: 20px;
color: aliceblue;
padding-left: 40px;
box-sizing: border-box;
border-top: 1px solid rgb(255, 255, 255, 0.1);
border-bottom: 1px solid black;
transition: 0.4s;
}

ul li:hover a {
padding-left: 50px;
}

#check {
display: none;
}

label #btn,
label #cancel {
position: absolute;
cursor: pointer;
background: black;
border-radius: 3px;
}

label #btn {
left: 40px;
top: 25px;
font-size: 20px;
color: white;
padding: 6px 12px;
transition: all 0.5s;
}

label #cancel {
z-index: 1111;
left: -197px;
top: 50px;
font-size: 30px;
color: white;
padding: 6px 12px;
transition: all 0.5s ease;
}

#check:checked ~ .sidebar {
left: 0;
}

#check:checked ~ label #btn {
left: 250px;
opacity: 0;
pointer-events: none;
}

#check:checked ~ label #cancel {
left: 197px;
}

nav {
width: 100%;
display: flex;
align-items: center;
justify-content: space-around;
padding: 10px;
}

.contenaire{
  margin-left: 250px;
  background-color : grey;
  margin-top: 5%;
  margin-right: 5%;
  height: 100vh;
} */
</style>
