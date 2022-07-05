<template>
  <div class= "login--card">
    <p>Vous n'avez pas encore de compte ? cliquez sur INSCRIPTION</p>

  <div class="input--name">
    <label for="name"> Identifiant :</label>

    <input type="text" id="name" name="name" required size="20">
 </div>
 <div class="input--mdp">
    <label for="mdp">Mot de passe : </label>

    <input type="password" id="mdp" name="mdp" required size="20">

    <a href="#"> mot de passe oublié ?</a>

 </div>

 <input class="inscription--btn"
       type="button"
       value="Inscription">
    
 <input class="connect--btn"
       type="submit"
       value="Connexion">

</div>
</template>

<style lang="scss">

.login--card { 

    width:45%;
    height:40vh;
    background-color: whitesmoke;
    border-radius: 10% 10% 10% 10%;
    padding-bottom: 50px;
    
  p {
    background-color:#1E90FF;
    border-top-left-radius: 15%;
    border-top-right-radius: 15%;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 15px;
    color:wheat ;
   }
   
   .input--name {
    color: #8FBC8F;
    padding-left: 15px;
    padding-bottom: 10px;

  input {
      margin-left: 15px;
  }

}
   .input--mdp {
       color: #8FBC8F ;
        padding-left: 15px;
        padding-top: 10px;
        :hover

    input {
        margin-left:15px;
    }
   }

   .inscription--btn {
        
        margin: 20px 10px;

   }
   a {
       color:cornflowerblue;
       text-decoration: none;
   }

   a:hover {
       text-decoration:underline;
   }
}
</style>
