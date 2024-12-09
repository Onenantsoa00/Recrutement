<template>
  <div>
    <input type="checkbox" id="check" />
    <label for="check">
      <i class="fas fa-bars" id="btn">Liste</i>
      <i class="fas fa-times" id="cancel">F</i>
    </label>

    <div class="sidebar">
      <header>Admin</header>
      <ul>
        <li>
          <router-link to="/about"><h4>Home</h4></router-link>
        </li>

        <li>
          <router-link to="/propos"><h4>à Propos</h4></router-link>
        </li>

        <li>
          <router-link to="/liste_d_attente"><h4>Liste d'attente</h4></router-link>
        </li>

        <li>
          <router-link to="/suivi"><h4>Suivies</h4></router-link>
        </li>

        <li>
          <router-link to="/client"><h4>Client</h4></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
