HO-CSRF
========

_**Exemple d'utilisation**_

```js
const csrf = require('./ho-csrf.js');
     //...
app.get('/admin/user/add', csrf.token,
   (req, res, next) => User.isConnected(req, res, next), 
   (req, res, next) => User.formAddProcess(req, res, next)
);
app.post('/admin/user/add', urlencodedParser, uploadFile, csrf.verify,
   (req, res, next) => User.isConnected(req, res, next), 
   (req, res, next) => User.formAddProcess(req, res, next)
);
```
Dans la 1ere route (en get), il y a **csrf.token**,  c’est la méthode qui génère le csrf token.
Dans la 2eme route (en post), il y a **csrf.verify**,  c’est la méthode qui vérifie que le csrf token envoyé par le formulaire correspond bien. 
_**Il est indispensable d’appeler cette méthode après le middleware bodyParser.**_


**Dans la vue**
Vous devez ajouter le champ csrf dans votre formulaire :
```pug
input(type="hidden" name="csrf" value=csrf)
```